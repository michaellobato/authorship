module.exports = function(grunt) {
  "use strict";

  require('jit-grunt')(grunt, {
    ngtemplates: 'grunt-angular-templates'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karmaConfig: grunt.file.readJSON('karma.config.json'),
    app: {
      buildDir: "build",
      src: {
        // We have to specify the first element separately because the module file has to be included first
        js: ['app/authorship.js', 'app/*.js', 'app/**/*.js'],
        html: 'app/**/*.html',
        less: 'app/**/*.less',
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
          "app/styles.css": "app/styles.less",
        }
      },
    },
    ngtemplates: {
      app: {
        options: {
          base: 'app/',
          module: 'lobato-authorship'
        },
        src: '<%= app.src.html %>',
        dest: '<%= app.buildDir %>/templates.js'
      }
    },
    copy: {
      app: {
        expand: true,
        flatten: false,
        src: ['<%= app.src.css %>'],
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
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['<%= app.src.js %>', '<%= app.buildDir %>/templates.js'],
        dest: '<%= app.buildDir %>/app/<%= pkg.name %>.js'
      }
    },
    watch: {
      less: {
        files: ['<%= app.src.less %>'],
        tasks: ['buildPartial'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['<%= app.src.js %>'],
        tasks: ['jshint', 'concat'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['<%= app.src.html %>'],
        tasks: ['ngtemplates', 'concat'],
        options: {
          spawn: false
        }
      }
    },
    clean: {
      build: ['build']
    },
    karma: {
      options: '<%= karmaConfig %>',
      dev: {
        options: {
          singleRun: true,
          browsers: ["PhantomJS"]
        }
      }
    }
  });

  grunt.registerTask('buildPartial',
  [
      'less',
      'copy',
      'ngtemplates'
  ]);

  grunt.registerTask('build', ['buildPartial', 'jshint', 'concat', "karma"]);
  grunt.registerTask('default', ['build']);
};