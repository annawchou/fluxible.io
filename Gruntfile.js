'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                '{actions,components,services,stores}/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        webpack: {
            app: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './client.js',
                output: {
                    path: './build/js',
                    filename: 'client.js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.jsx$/, loader: 'jsx-loader' }
                    ]
                },
                watch: true
            }
        },
        nodemon: {
            app: {
                script: './server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.error('Please specify a target.');
    });

    grunt.registerTask('dev', ['jshint', 'webpack:app', 'nodemon:app']);
    grunt.registerTask('build', ['webpack:app']);
};