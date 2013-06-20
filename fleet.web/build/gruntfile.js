module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.log.writeln('grunting');
    grunt.unify = { };
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '../client/<%= pkg.main %>.js',
                dest: 'client/<%= pkg.main %>.min.js'
            }
        },
        mod: {
            foo: {
                src: '.'
            },
            bar: {
                src: '../client/modules/main/loader.js'
            }
        }
    });
    grunt.registerTask('release', ['unify:main', 'unify:inventory']);
    grunt.registerTask('default', []);

    grunt.registerMultiTask('clean', function() {
        console.log("clean it:" + this.filesSrc);
        var txt = grunt.file.read(this.fileSrc);
        var lines = txt.split['\n'];
        console.log(lines.count);   
    });

    grunt.registerTask('unify', 'Convert a set of Marionette Module files to a single file', function (modName) {
        console.log('unify marionette module: ' + modName);
        var loader = '../client/modules/' + modName + '/loader.js';
        var code = grunt.file.read(loader);
        var placeholder = code.indexOf("// PLACEHOLDER.");
        var placeholderEnd = code.indexOf("\n", placeholder);
        var sectionDelim = code.indexOf("// SECTION DELIMITER.");

        if (placeholder === -1 || sectionDelim === -1) {
            console.log('Missing placeholder ["// PLACEHOLDER."] or section delimiter ["// SECTION DELIMITER."] comment markers.');
            return;
        }

        var prefixCode = code.substr(0, placeholder - 1);
        var start = placeholderEnd + 1;
        var len = sectionDelim - start;
        var suffixCode = code.substr(start, len);
        
        grunt.unify.moduleCode = "";
        
        // add generated templates
        var templatesFile = '../client/generated/' + modName + '-templates.js';
        if (grunt.file.exists(templatesFile)) {
            grunt.unify.moduleCode += '\n' + grunt.file.read(templatesFile);
        }

        grunt.unify.moduleCode += prefixCode;
        grunt.file.recurse('../client/modules/' + modName, grunt.unify.addModuleFile);
        grunt.unify.moduleCode += suffixCode;
        
        grunt.file.write('../client/generated/' + modName + '.js', grunt.unify.moduleCode);
    });

    grunt.unify.addModuleFile = function (abspath, rootdir, subdir, filename) {
        if (filename === 'loader.js') return;
        var parts = filename.split('.');
        if (parts[1] === 'js') {
            console.log('  Adding ' + filename);
            grunt.unify.moduleCode += grunt.unify.getModuleCode(abspath);
        }
    };

    grunt.unify.getModuleCode = function(file) {
        var code = grunt.file.read(file);
        var ch = code.charCodeAt(code.length - 1, 1);
        if (ch !== 10) {
            code += '\n';
        }
        var lines = code.split('\r\n');
        code = "";
        var skippingFirst = true;
        for (var i = 0; i < lines.length - 2; i++) {
            if (lines[i] === '') continue;
            if (skippingFirst) {
                skippingFirst = false;
                continue;
            }
            code += lines[i] + '\r\n';
        }
        return code;
    };
    
};

