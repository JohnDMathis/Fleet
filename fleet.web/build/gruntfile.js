module.exports = function(grunt) {
  grunt.log.writeln('foo', 'bar', 'baz');

  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'build/<%= pkg.name %>.min.js'
    }
  }
  });

    grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
	
  // grunt.registerMultiTask('clean', function() {
    // this.filesSrc.forEach(function(filepath) {
      // console.log('delete', filepath);
    // });
};

