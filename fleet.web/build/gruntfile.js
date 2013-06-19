module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.log.writeln('grunting');

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

    grunt.registerTask('default', ['uglify']);

    grunt.registerMultiTask('clean', function() {
        console.log("clean it:" + this.filesSrc);
        var txt = grunt.file.read(this.fileSrc);
        var lines = txt.split['\n'];
        console.log(lines.count);   
    });

    grunt.registerTask('mod', 'Convert a set of Marionette Module files to a single file', function() {
        console.log("mod it:" + this.filesSrc);
        //var txt = grunt.file.read(this.fileSrc);
        //var lines = txt.split['\n'];
        //console.log(lines.count);
    });
    
    grunt.registerTask('unify', 'Convert a set of Marionette Module files to a single file', function (modName) {
        console.log('unify marionette module: ' + modName);
        var loader = '../client/modules/' + modName + '/loader.js';
        var code = grunt.file.read(loader);
        var sectionDelim = code.indexOf("// insert dependencies here");
        if (sectionDelim === -1) return;

        var depStart = code.indexOf("var dependencies", sectionDelim);
        if (depStart === -1) return;
        
        depStart = code.indexOf('"', depStart + 16);
        var depEnd = code.indexOf("]", depStart);
        var dependencies = code.substr(depStart, (depEnd - depStart)).split(',');
        for (var i = 0; i < dependencies.length; i++) {
            var str = dependencies[i].replace('\r\n', '').trim();
            str = str.substr(1, str.length - 2);
            dependencies[i] = str;
            console.log(dependencies[i]);
        }

        var moduleCode = code.substr(0, sectionDelim - 4);
        
        for (var x in dependencies) {
            var file = "../client/" + dependencies[x] + ".js";
            moduleCode += grunt.getModuleCode(file);
        }
        moduleCode += "\r\n});\r\n";
        console.log(moduleCode);
        grunt.file.write('../client/generated/' + modName + '.js', moduleCode);
    });
    
    grunt.getModuleCode = function (file) {
        console.log(file);
        var code = grunt.file.read(file);
        var ch = code.charCodeAt(code.length - 1, 1);
        console.log('last char: [' + ch+']');
        if(ch !== 10) {
            console.log('adding CR');
            code += '\n';
        }
        var lines = code.split('\r\n');
        code = "";
        var skippingFirst = true;
        for (var i = 0; i < lines.length - 2; i++) {
            if (lines[i] === '') continue;
            if(skippingFirst) {
                skippingFirst = false;
                continue;
            }
            code += lines[i] + '\r\n';
        }
        return code;
    }
    
};

