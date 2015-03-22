module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      target: {
        files: {
          'public/js/app.min.js': [
          'vendors/jquery/dist/jquery.js',
          'vendors/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
          'vendors/jquery-easing/jquery.easing.1.3.min.js',
          'public/js/main.js'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['vendors/font-awesome-sass/assets/fonts/font-awesome/*'], dest: 'public/fonts/font-awesome/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['vendors/bootstrap-sass-official/assets/fonts/bootstrap/*'], dest: 'public/fonts/', filter: 'isFile'}
        ]
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'public/sass/*', 'public/js/main.js'],
      tasks: ['jshint', 'uglify', 'sass']
    },
    sass: {
      dist: {
        files: {
          'public/css/app.min.css': 'public/sass/main.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 9001,
          base: {
            path: '.',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build', ['jshint', 'sass', 'uglify', 'copy:main']);
  grunt.registerTask('default', ['build', 'watch']);

};
