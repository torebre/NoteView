module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      //jshintrc: true,
      options: {
        "multistr": true,
        "asi": true
      },
      all: ['Gruntfile.js', 'src/js/**']
    },
    less: {
      compile: {
        files: {
          'build/css/compiled.css': 'public/css/layout.css'
        }
      }
    },
    clean: {
      js: 'build/js'
    },

    browserify: {
      js: {
        src: 'src/js/viewer/**/*.js',
        dest: 'build/js/app.js',
      },

      glyphDemo: {
        src: 'src/js/dev/**/*.js',
        dest: 'build/js/showGlyphs.js',
      },

    },

    copy: {
      all: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.html', '**/*.css'],
        dest: 'build/',
      }
    },

    watch: {
      rebuild: {
        tasks: ['browserify', 'copy'],
        files: ['src/js/**/*.js']
      },
      html: {
        tasks: ['copy'],
        files: ['src/**/*.html']
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify', 'copy']);
  grunt.registerTask('check', ['jshint']);
};
