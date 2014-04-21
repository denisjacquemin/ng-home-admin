module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concurrent: {
            serverApp: ['express:devApp',  'watch'],
            serverAPI: ['express:devAPI']
        },
        express: {
            options: {
                //background: false
            },
            devApp: {
                options: {
                    script: 'adminserver.js'
                }
            },
            prodApp: {
                options: {
                    script: 'path/to/prod/apiserver.js',
                    node_env: 'production'
                }
            },
            testApp: {
                options: {
                    script: 'path/to/test/apiserver.js'
                }
            },
            devAPI: {
                options: {
                    script: '../API/apiserver.js'
                    //script: 'testing/stubbedserver/stubbedserver.js'
                }
            },
            prodAPI: {
                options: {
                    script: 'path/to/prod/apiserver.js',
                    node_env: 'production'
                }
            },
            testAPI: {
                options: {
                    script: 'path/to/test/apiserver.js'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'assets/css/styles.css' : 'sass/styles.scss'
                }
            }
        },
        watch: {
            expressApp: {
                files:  [ 'app/**/*.js' ],
                tasks:  [ 'concurrent:serverApp' ],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                }
            },
            expressAPI: {
                files:  [ '../API/**/*.js' ],
                tasks:  [ 'concurrent:serverAPI' ],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                }
            },
            css: {
                files: 'sass/**/*.scss',
                tasks: ['sass']
            }
        }


    });


    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', [ 'express:devApp', 'watch']); // , 'express:devAPI'

};