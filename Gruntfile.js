/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var webpack = require('webpack');

module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['build'],
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['images/**'], dest: 'build/'
                }]
            }
        },
        compass: {
            options: {
                sassDir: 'assets/scss',
                cssDir: 'build/css',
                imagesDir: 'build/images',
                environment: 'production',
                httpPath: '/',
                outputStyle: 'compressed',
                noLineComments: true,
                httpGeneratedImagesPath: '/public/images/'
            },
            dev: {
                options: {
                    watch: true
                }
            },
            prod: {}
        },
        concurrent: {
            dev: ['compass:dev', 'nodemon:app', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: [
                '*.js',
                '{actions,components,services,stores}/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        nodemon: {
            app: {
                script: './server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx,md'
                }
            }
        },
        webpack: {
            dev: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './client.js',
                output: {
                    path: './build/js',
                    publicPath: '/public/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].[chunkhash].js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.jsx$/, loader: 'jsx-loader' },
                        { test: /\.json$/, loader: 'json-loader'}
                    ]
                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin('common.js', undefined, 2),
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
                ],
                stats: {
                    colors: true
                },
                devtool: 'source-map',
                watch: true,
                keepalive: true
            },
            prod: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './client.js',
                output: {
                    path: './build/js',
                    // publicPath: 'https://s.yimg.com/os/flx/js/',
                    // filename: '[name].[chunkhash].min.js',
                    // chunkFilename: '[name].[chunkhash].min.js'
                    publicPath: '/public/js/',
                    filename: '[name].js',
                    chunkFilename: '[name].[chunkhash].js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.jsx$/, loader: 'jsx-loader' },
                        { test: /\.json$/, loader: 'json-loader'}
                    ]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),

                    // These are performance optimizations for your bundles
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.DedupePlugin(),
                    // new webpack.optimize.CommonsChunkPlugin('common.[chunkhash].min.js', undefined, 2),
                    new webpack.optimize.CommonsChunkPlugin('common.js', undefined, 2),

                    // This ensures requires for `react` and `react/addons` normalize to the same requirement
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
                ],

                // removes verbosity from builds
                progress: false
            }
        }
    });

    // libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');

    // tasks
    grunt.registerTask('default', 'dev');
    grunt.registerTask('dev', ['clean', 'copy', 'jshint', 'concurrent:dev']);
    grunt.registerTask('build', ['clean', 'copy', 'compass:prod', 'webpack:prod']);
};