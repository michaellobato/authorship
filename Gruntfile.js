module.exports = function(grunt) {
  "use strict";

  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: {
      buildDir: "build",
      src: {
        // We have to specify the first element separately because the module file has to be included first
        js: ['app/authorship.js', 'app/*.js', 'app/**/*.js'],
        html: 'app/**/*.html',
        css: 'app/**/*.css'
      }
    },
    less: {
      options: {
        compress: false,
        report: "min"
      },
      app: {
        files: {
          "styles.css": "styles.less",
        }
      },
    },
    copy: {
      app: {
        expand: true,
        flatten: false,
        src: ['<%= app.src.html %>', '<%= app.src.css %>'],
        dest: '<%= app.buildDir %>'
      },
      lib: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'node_modules',
          src: [
            "angular/angular.min.js",
            "angular/angular.min.js.map",
            "angular-route/angular-route.min.js",
            "angular-route/angular-route.min.js.map",
            "bootstrap/dist/css/bootstrap.min.css",
            "ng-dialog/css/ngDialog.min.css",
            "ng-dialog/js/ngDialog.min.js",
            "underscore/underscore-min.js",
            "underscore/underscore-min.js.map",
          ],
          dest: '<%= app.buildDir %>/lib'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', '<%= app.src.js %>']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= app.src.js %>',
        dest: '<%= app.buildDir %>/app/<%= pkg.name %>.min.js'
      }
    },
    clean: {
      build: ['build']
    }
  });

  grunt.registerTask('buildPartial',
  [
      'less',
      'copy'
  ]);

  grunt.registerTask('build', ['buildPartial', 'jshint', 'uglify']);
  grunt.registerTask('default', ['build']);
};