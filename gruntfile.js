module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      local: {
        options: {
          unixNewlines: true,
          style: 'compact',
          lineNumbers: false,
          quiet: true
        },
        files: [{
          expand: true,
          src: ['*.scss'],
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      local: {
        options: {
          // Task-specific options go here.
          // @see: https://github.com/ai/autoprefixer#browsers
          browsers: ['last 5 version', 'ie 8', 'ie 9'],
          map: false
        },
        expand: true,
        flatten: true,
        src: '*.css'
      }
    },
    watch: {
      styles: {
        files: ['sass/**/*.*'],
        tasks: ['sass', 'autoprefixer']
      }
    }
  });
  grunt.registerTask('default', ['sass', 'autoprefixer']);
};
