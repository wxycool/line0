/*
	npm install -g grunt-cli

	npm install --save-dev
	npm install grunt --save-dev

	核心型
	npm install grunt-contrib-connect --save-dev			//Start a connect web server
	npm install grunt-contrib-watch --save-dev				//Run tasks whenever watched files change
	npm install grunt-contrib-htmlmin --save-dev			//Minify HTML
	npm install grunt-contrib-sass --save-dev					//Compile Sass to CSS
	npm install grunt-contrib-uglify --save-dev				//Minify files with UglifyJS
	npm install grunt-contrib-imagemin --save-dev			//Minify PNG, JPEG and GIF images

	CSS型：
	npm install grunt-contrib-compass --save-dev			//Compile Sass to CSS using Compass
	npm install grunt-contrib-less --save-dev					//Compile LESS files to CSS
	npm install grunt-contrib-stylus --save-dev				//Compile Stylus files to CSS
	npm install grunt-contrib-cssmin --save-dev				//Compress CSS files
	npm install grunt-contrib-csslint --save-dev			//Lint CSS files

	JavaScript型：
	npm install grunt-contrib-requirejs --save-dev		//Optimize RequireJS projects using r.js
	npm install grunt-contrib-coffee --save-dev				//Compile CoffeeScript files to JavaScript
	npm install grunt-contrib-yuidoc --save-dev				//Compile YUIDoc Documentation

	质量保障型：
	npm install grunt-contrib-jshint --save-dev				//Validate files with JSHint
	npm install grunt-contrib-jst --save-dev					//Precompile Underscore templates to JST file
	npm install grunt-contrib-handlebars --save-dev		//Precompile Handlebars templates to JST file
	npm install grunt-contrib-nodeunit --save-dev			//Run Nodeunit unit tests
	npm install grunt-contrib-qunit --save-dev				//Run QUnit unit tests in a headless PhantomJS instance
	npm install grunt-contrib-jasmine --save-dev			//Run jasmine specs headlessly through PhantomJS

	文件操作型：
	npm install grunt-contrib-concat --save-dev				//Concatenate files
	npm install grunt-contrib-compress --save-dev			//Compress files and folders
	npm install grunt-contrib-clean --save-dev				//Clean files and folders
	npm install grunt-contrib-copy --save-dev					//Copy files and folders
	
	其它：
	npm install grunt-contrib-jade --save-dev					//Compile Jade templates
	npm install grunt-markdown --save-dev							//将markdown文档转为HTML文档
	npm install grunt-contrib-symlink --save-dev			//Create symbolic links
	npm install grunt-browser-sync --save-dev					//文件修改时，刷新所有设备中的页面
*/

module.exports = function(grunt) {

	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			serverHost: 'm.line0.cc',
			serverPort: 80,
			livereload: 35729,
			basePath: './',
			htmlSrcPath: './src',
			htmlDestPath: './dest',
			sassSrcPath: './src/sass',
			cssDestPath: './dest/style',
			scriptSrcPath: './src/js',
			scriptDestPath: './dest/script',
			imgSrcPath: './src/img',
			imgDestPath: './dest/images'
		},

		/**
		 * TODO:connect模块
		 */
			connect: {
				options : {
					hostname: '<%= meta.serverHost%>',
					port: '<%= meta.serverPort%>',
					livereload: '<%= meta.livereload%>'
				},
				server: {
					options: {
						open: true
						//base: ['app']
					}
				}
			},

		/**
		 * TODO:watch模块
		 */
			watch: {
				options: {
					spawn: false,
					livereload: {
						options : {
							livereload : '<%= meta.livereload%>'
						}
					}
				},
				html: {
					files: ['<%= meta.htmlSrcPath%>/**/*.htm'],
					tasks: ['htmlmin:dev']
				},
				css: {
					files: ['<%= meta.sassSrcPath%>/**/*.scss'],
					tasks: ['sass:dev']
				},
				concat : {
					files: ['<%= meta.scriptSrcPath%>/**/*.js'],
					tasks: ['concat:ng']
				},
				script : {
					files: ['<%= meta.scriptSrcPath%>/**/*.js'],
					tasks: ['uglify:dev']
				}
//				image: {
//					files: ['<%= meta.imgSrcPath%>/**/*.{png,jpg,gif}'],
//					tasks: ['imagemin:static']
//				}
		},

			/**
			 * TODO:htmlmin模块
			 */
			htmlmin: {
				dist: {
					options: {
						removeComments: true,
						collapseWhitespace: true
					},
				 files:[{
						expand: true,
						cwd: '<%= meta.htmlSrcPath%>',
						src: '**/*.htm',
						dest: '<%= meta.htmlDestPath%>',
						ext: '.html'
					}]
				},
				dev: {
					files: [{
						expand: true,
						cwd: '<%= meta.htmlSrcPath%>',
						src: '**/*.htm',
						dest: '<%= meta.htmlDestPath%>',
						ext: '.html'
					}]
				}
			},

			/**
			 * TODO:sass模块
			 */
			sass: {
				dist: {
					options: {
						style: 'compressed',
						noCache: true
					},
					files: {
						'<%= meta.cssDestPath%>/index.css' : '<%= meta.sassSrcPath%>/index.scss'
					}
				},
				dev: {
					options: {
						sourcemap: true,
						compass: false,
						lineNumbers: false,
						style: 'expanded', //nested/expanded/compact/compressed
						noCache: true
						//cacheLocation: '<%= meta.sassSrcPath%>/.sass-cache'
					},
					files: {
						'<%= meta.cssDestPath%>/index.css' : '<%= meta.sassSrcPath%>/index.scss'
					}
				}
			},

			/**
			 * TODO:uglify模块
			 */
			uglify: {
				dist: {
					options: {
						banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n\n",
						mangle: {
							except: ['jQuery', 'Backbone']
						},
						compress: {
							drop_console: true
						},
						report: "min",
						preserveComments: 'some'
					},
					files: [{
						expand: true,
						cwd: '<%= meta.scriptSrcPath%>',
						src: '**/*.js',
						dest: '<%= meta.scriptDestPath%>',
						ext: '.min.js'
					}]
				},
				dev: {
					options: {
						mangle: {
							except: ['jQuery', 'Backbone']
						},
						compress: {
							drop_console: false
						},
						beautify: true,
						preserveComments: 'all'
					},
					files: [{
						expand: true,
						cwd: '<%= meta.scriptSrcPath%>',
						src: '**/*.js',
						dest: '<%= meta.scriptDestPath%>',
						ext: '.min.js'
					}]
				}
			},

			/**
			 * TODO:concat模块
			 */
			concat: {
				an: {
					src: ['./dest/lib/angular/angular.min.js',
								'./dest/lib/angular/angular-animate.min.js',
								'./dest/lib/angular/angular-ui-router.min.js'
								],
					dest: './dest/lib/angular/an.min.js'
				},
				ng: {
					src: ["<%= meta.scriptSrcPath%>/ng-app.js",
								'<%= meta.scriptSrcPath%>/ng-controller-top.js',
								'<%= meta.scriptSrcPath%>/ng-controller-index.js',
								'<%= meta.scriptSrcPath%>/ng-controller-search.js',
								'<%= meta.scriptSrcPath%>/ng-controller-cate.js',
								'<%= meta.scriptSrcPath%>/ng-controller-store.js',
								'<%= meta.scriptSrcPath%>/ng-controller-stored.js',
								'<%= meta.scriptSrcPath%>/ng-controller-goods.js',
								'<%= meta.scriptSrcPath%>/ng-controller-promotion.js',
								'<%= meta.scriptSrcPath%>/ng-controller-hot.js',
								'<%= meta.scriptSrcPath%>/ng-directive.js',
								'<%= meta.scriptSrcPath%>/ng-filter.js',
								'<%= meta.scriptSrcPath%>/ng-service.js'
								],
					dest: '<%= meta.scriptSrcPath%>/ng.js'
				}
			},

			/**
			 * TODO:imagemin模块
			 */
			imagemin: {
				static: {
					options: {
						//optimizationLevel: 3
					},
					files: [{
						expand: true,
						cwd: '<%= meta.imgSrcPath%>',
						src: ['**/*.{png,jpg,gif}'],
						dest: '<%= meta.imgDestPath%>'
					}]
				}
			}

	});

	/**
	 * TODO:加载提供任务的插件
	 */

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');

	/**
	 * TODO:注册默认任务
	 */
	grunt.registerTask('default', ['connect:server', 'watch']);
};