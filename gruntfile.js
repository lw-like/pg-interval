module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , clean: ['./dist/*.js']
        , concat: {
            js: {//target
                src: ['./src/*.js'],
                dest: './dist/pg-interval.js'
            }
        }
        , uglify: {
            options: {
              mangle: {
                reserved: ['PGI']
              }
            },
            js: {//target
                src: ['./dist/pg-interval.js'],
                dest: './dist/pg-interval.min.js'
            }
        }
        , watch: {
            scripts: {
                files: [
                    './src/**/*.js'
                ],
                tasks: ['default'],
                options: {
                    debounceDelay: 100
                }
            }
        }
    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //register grunt default task
    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
};
