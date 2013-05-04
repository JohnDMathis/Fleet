#!/usr/bin/env node

 /*
  * This is Voost's own custom version of the handlebars compiler which walks
  * the whole tree and compiles all the files. It supports a directory
  * structure and creates the output files in the same structure.
  */
var optimist = require('optimist')
    .usage('Precompile handlebar templates.\nUsage: $0 template...', {
      'f': {
        'type': 'string',
        'description': 'Output File',
        'alias': 'output'
      },
      'd': {
        'type': 'string',
        'description': 'Output Directory',
        'alias': 'outputDir'
      },
      'e': {
        'type': 'string',
        'description': 'File extension',
        'alias': 'extension',
        'default': '.js'
      },
      'k': {
        'type': 'string',
        'description': 'Known helpers',
        'alias': 'known'
      },
      'o': {
        'type': 'boolean',
        'description': 'Known helpers only',
        'alias': 'knownOnly'
      },
      'm': {
        'type': 'boolean',
        'description': 'Minimize output',
        'alias': 'min'
      },
      's': {
        'type': 'boolean',
        'description': 'Output template function only.',
        'alias': 'simple'
      },
      'r': {
        'type': 'string',
        'description': 'Template root. Base value that will be stripped from template names.',
        'alias': 'root'
      }
    })

    .check(function(argv) {
      var template = [0];
      if (!argv._.length) {
        throw 'Must define at least one template or directory.';
      }

      argv._.forEach(function(template) {
        try {
          fs.statSync(template);
        } catch (err) {
          throw 'Unable to open template file "' + template + '"';
        }
      });
    })
    .check(function(argv) {
      if (argv.simple && argv.min) {
        throw 'Unable to minimze simple output';
      }
      if (argv.simple && (argv._.length !== 1 || fs.statSync(argv._[0]).isDirectory())) {
        throw 'Unable to output multiple templates in simple mode';
      }
    });

var fs = require('fs'), path = require('path'),
    handlebars = require('handlebars'),
    basename = path.basename,
    UglifyJS = require('uglify-js');

var argv = optimist.argv,
    template = argv._[0];

// Convert the known list into a hash
var known = {};
if (argv.known && !Array.isArray(argv.known)) {
  argv.known = [argv.known];
}
if (argv.known) {
  for (var i = 0, len = argv.known.length; i < len; i++) {
    known[argv.known[i]] = true;
  }
}

function processTemplate(template, root) {
  var tpath = template,
      stat = fs.statSync(tpath), output = [];
  if (stat.isDirectory()) {
    fs.readdirSync(template).map(function(file) {
      var tpath = template + '/' + file;

    if (/\.handlebars$/.test(tpath) || /\.hb$/.test(tpath) || fs.statSync(tpath).isDirectory()) {
        processTemplate(tpath, root || template);
      }
    });
  } else {
    var data = fs.readFileSync(tpath, 'utf8');

    var options = {
      knownHelpers: known,
      knownHelpersOnly: argv.o
    };

    // Clean the template name
    if (!root) {
      template = basename(template);
    } else if (template.indexOf(root) === 0) {
      template = template.substring(root.length+1);
    }
    template = template.replace(/\.handlebars$/, '').replace(/\.hb$/, '');

    if (argv.simple) {
      output.push(handlebars.precompile(data, options) + '\n');
    } else {
      output.push('(function() {define([\'require\', \'handlebars\'], function(require) { require(\'handlebars\'); var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};');
	  output.push('templates[\'' + template.replace('/', '_') + '\'] = template(' + handlebars.precompile(data, options) + ');');
      output.push('}) })();');
    }
    output = output.join('');
    var finalout;

	if (argv.min) {
	  // backwards compatible for uglify 1.x vs. 2.x
	  if (UglifyJS.parser) {
	    var ast = UglifyJS.parser.parse(output);
	    ast = UglifyJS.uglify.ast_mangle(ast);
	    ast = UglifyJS.uglify.ast_squeeze(ast);
	    finalout = UglifyJS.uglify.gen_code(ast);
	  } else {
        output = UglifyJS.minify(output, {"fromString": true});
        finalout = output.code;
	  }
	}
	if (argv.outputDir) {
	  dir = argv.outputDir + '/' + path.dirname(template);
	  if (!fs.existsSync(dir)) {
  	    fs.mkdirSync(dir);
	  }
	  fs.writeFileSync(argv.outputDir + '/' + template + argv.extension, finalout, 'utf8');
	} else {
	  console.log(finalout);
	}

  }
}



argv._.forEach(function(template) {
  processTemplate(template, argv.root);
});
