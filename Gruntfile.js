/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// format `*.[chunkhash].min.js`
var CHUNK_REGEX = /^([A-Za-z0-9_\-]+)\..*/;

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
        protractor_webdriver: {
            options: {
                path: './node_modules/.bin/'
            },
            all: {}
        },
        protractor: {
            options: {
                configFile: './tests/spec/protractor.conf.js',
                args: {
                    baseUrl: 'http://127.0.0.1:3000/'
                }
            },
            all: {}
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
                        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
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
                    publicPath: 'http://l.yimg.com/os/flx/js/',
                    filename: '[name].[chunkhash].min.js',
                    chunkFilename: '[name].[chunkhash].min.js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
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
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.CommonsChunkPlugin('common.[chunkhash].min.js', 2),

                    // This ensures requires for `react` and `react/addons` normalize to the same requirement
                    new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons')),

                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),

                    // generates webpack assets config to use hashed assets in production mode
                    function webpackStatsPlugin() {
                        this.plugin('done', function(stats) {
                            var data = stats.toJson();
                            var assets = data.assetsByChunkName;
                            var output = {
                                assets: {},
                                cdnPath: this.options.output.publicPath
                            };

                            Object.keys(assets).forEach(function eachAsset(key) {
                                var value = assets[key];

                                // if `*.[chunkhash].min.js` regex matched, then use file name for key
                                var matches = key.match(CHUNK_REGEX);
                                if (matches) {
                                    key = matches[1];
                                }

                                output.assets[key] = value;
                            });

                            fs.writeFileSync(
                                path.join(process.cwd(), 'build', 'assets.json'),
                                JSON.stringify(output, null, 4)
                            );
                        });
                    }
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
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-protractor-runner');

    // tasks
    grunt.registerTask('default', 'dev');
    grunt.registerTask('dev', ['clean', 'copy', 'jshint', 'concurrent:dev']);
    grunt.registerTask('build', ['clean', 'copy', 'compass:prod', 'webpack:prod']);
    grunt.registerTask('func', ['protractor_webdriver', 'protractor']);
};