var fs = require('fs');
var osenv = require('osenv');
var home = osenv.home();

var secrets = JSON.parse(fs.readFileSync(home + '/.secrets/secrets.json', 'utf8'));

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  // Project configuration.
  grunt.initConfig({
    config: {
      'name': 'weekly-quiz',
      'src': 'src/',
      'build': 'www/',
      'tmp': '.tmp/'
    },
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%=config.tmp%>project.css': '<%=config.src%>style/scss/project.scss'
        }
      },
      build: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          '<%=config.tmp%>project.css': '<%=config.src%>style/scss/project.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        // Task-specific options go here.
      },
      dev: {
        options: {
          map: true
        },
        src: '<%=config.tmp%>project.css',
        dest: '<%=config.build%>style/project.css'
      },
      build: {
        options: {
          map: false
        },
        src: '<%=config.tmp%>project.css',
        dest: '<%=config.build%>style/project.css'
      }
    },
    jshint: {
      options: {
        scripturl: true,
        ignores: ['<%=config.src%>js/lib/*.js']
      },
      all: ['Gruntfile.js', 'test/*.js', '<%=config.src%>js/**/*.js']
    },
    jst: {
      compile: {
        options: {
          namespace: "templates",
          processName: function(filepath) {
            var result = filepath.substr(10, filepath.length - 4);
            return result;
          },
          amd: true,
        },
        files: {
          "<%=config.src%>js/templates.js": ["<%=config.src%>templates/*.html"]
        }
      }
    },
    watch: {
      styles: {
        files: ['<%=config.src%>style/scss/*.scss'],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      js: {
        files: ['<%=config.src%>js/**/*.js'],
        tasks: ['requirejs:dev']
      },
      jst: {
        files: ['<%=config.src%>templates/*'],
        tasks: ['jst', 'requirejs:dev']
      },
      data: {
        files: ['<%=config.src%>data/**/*.json'],
        tasks: ['copy']
      },
      test: {
        files: ['js/spec/*.js'],
        tasks: ['']
      },
      html: {
        files: ['<%=config.src%>*.html'],
        tasks: ['copy']
      },
      img: {
        files: ['<%=config.src%>img/*'],
        taks: ['copy']
      },
      options: {
        livereload: true,
      }
    },
    browserSync: {
      bsFiles: {
        src: '<%=config.build%>**/*'
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "<%=config.build%>"
        }
      }
    },
    jasmine: {
      test: {
        src: 'src/**/*.js',
        options: {
          specs: 'test/*.js',
          helpers: 'test/*Helper.js'
        }
      }
    },
    requirejs: {
      dev: {
        options: {
          "modules": [{
            "name": "main",
          }],
          "baseUrl": "<%=config.src%>js",
          "dir": "<%=config.build%>js",
          "preserveLicenseComments": false,
          "optimize": "none",
          // "optimize": "uglify2",
          "useStrict": true,
          "uglify2": {
            "beautify": true,
            "toplevel": true
          },
          "paths": {
            "jquery": '../../bower_components/jquery/dist/jquery',
            "backbone": '../../bower_components/backbone/backbone',
            "underscore": '../../bower_components/underscore/underscore',
            "jquery_ui": "lib/jquery-ui.min",
            "jquery_ui_touch_punch": "lib/jquery.ui.touch-punch.min",
            "mobile_detect": "lib/mobile-detect",
            "d3": '../../bower_components/d3/d3',
            "mapbox": '../../bower_components/mapbox.js/mapbox.uncompressed'
              // "api/ads": "api/ads",
              // "api/analytics": "api/analytics"
          },
          "shim": {
            'backbone': {
              "deps": ['underscore', 'jquery'],
              "exports": 'Backbone'
            },
            'underscore': {
              "exports": '_'
            },
            "jquery_ui_touch_punch": {
              "deps": [
                "jquery",
                "jquery_ui"
              ],
              "exports": "jQuery"
            }
          }
        }
      },
      deploy: {
        options: {
          "modules": [{
            "name": "main",
            "exclude": [
              "jquery",
              "underscore",
              "backbone"
            ]
          }],
          "baseUrl": "<%=config.src%>js",
          "dir": "<%=config.build%>js",
          // "generateSourceMaps": true,
          "preserveLicenseComments": false,
          // "optimize": "none",
          "optimize": "uglify2",
          "useStrict": true,
          "uglify2": {
            "beautify": true,
            "toplevel": true
          },
          "paths": {
            "jquery": '../../bower_components/jquery/dist/jquery',
            "backbone": '../../bower_components/backbone/backbone',
            "underscore": '../../bower_components/underscore/underscore',
            "jquery_ui": "lib/jquery-ui.min",
            "jquery_ui_touch_punch": "lib/jquery.ui.touch-punch.min",
            "mobile_detect": "lib/mobile-detect",
            "d3": '../../bower_components/d3/d3',
            "mapbox": '../../bower_components/mapbox.js/mapbox.uncompressed'
              // "api/ads": "api/ads",
              // "api/analytics": "api/analytics"
          },
          "shim": {
            'backbone': {
              "deps": ['underscore', 'jquery'],
              "exports": 'Backbone'
            },
            'underscore': {
              "exports": '_'
            },
            "jquery_ui_touch_punch": {
              "deps": [
                "jquery",
                "jquery_ui"
              ],
              "exports": "jQuery"
            }
          }
        }
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: '<%=config.src%>',
            src: ['*.html'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          },
          // {expand: true, src: ['js/**/*.js', 'js/**/*.json'], dest: 'www/', filter: 'isFile'},
          {
            expand: true,
            cwd: '<%=config.src%>',
            src: ['img/*'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: '<%=config.src%>',
            src: ['data/*.json'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          }, {
            expand: true,
            src: ['bower_components/requirejs/*.js'],
            dest: '<%=config.build%>',
            filter: 'isFile'
          }

        ]
      }
    },

    ftp: {
      options: {
        host: secrets.akamai_1.host,
        user: secrets.akamai_1.user,
        pass: secrets.akamai_1.pass
      },
      upload: {
        files: {
          '/17200/experiments/usatoday/2015/1/weekly-quiz//': '<%=config.build%>style/*',
          '/17200/experiments/usatoday/2015/1/weekly-quiz/': '<%=config.build%>js/main.js'
        }
      }
    },

    clean: ["cwd: '<%=config.build%>',"]

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ftp');

  // Default task(s).

  grunt.registerTask('default', ['clean', 'jst', 'requirejs:dev', 'sass:dev', 'autoprefixer:dev', 'copy', 'browserSync', 'watch']);
  grunt.registerTask('build', ['clean', 'jst', 'requirejs:deploy', 'sass:build', 'autoprefixer:build', 'copy'])
  grunt.registerTask('deploy', ['build', 'ftp']);
};