module.exports = function(grunt) {
	require('jit-grunt')(grunt,
	{
		versioning: 'grunt-static-versioning'
	});
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
			  separator: ';',
			},
			dist: {
			  	src: [
					"js/plugins.js",
					"js/main.js"
			  	],
			  	dest: 'js/<%= pkg.name %>.js',
			},
		},
		uglify: {
		  options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
		  },
		  build: {
			src: 'js/<%= pkg.name %>.js', 	
			dest: 'dist/<%= pkg.name %>.min.js'
		  }
		},
		less: {
			options: {
				compress: true,
        		yuicompress: true,
        		optimization: 3
			},
			files: {
				src : "css/style.less",
				dest : "css/style.css"
			}
		},
		watch: {
			scripts: {
				files: [
					'js/*.js', 
					'css/**/*.less', 
					'src-img/*.{png,jpg,gif}'
				],
				tasks: ['less', 'jshint', 'concat','uglify', 'imagemin'],
				options: {
					event: ['added', 'deleted', 'changed']
				},
			},
		},
		jshint: {
		    all: [
		    	'Gruntfile.js', 
		    	'js/**/*.js', 
		    	'!js/*.min.js',
		    	'!js/plugins.js',
		    	'!js/vendor/*.js',
				'!js/<%= pkg.name %>.js'
		    ]
		},
		imagemin: {    
			dynamic: {
				options: {                       // Target options
					optimizationLevel: 4
				},                         // Another target
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'src-img/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'img/'                  // Destination path prefix
				}]
			}
		},
		versioning: {
			options: {
				cwd: 'public',
				outputConfigDir: 'public/config',
				output: 'php'
			},
			dist: {
				files: [{
					assets: [{
			            src: [ 'dist/<%= pkg.name %>.min.js' ],
			            dest: 'dist/<%= pkg.name %>.min.js'
			        }], 
					key: 'global',
					dest: '',
					type: 'js',
					ext: '.min.js'
				}, {
					assets: [{
			            src: [ 'css/style.css' ],
			            dest: 'css/style.css'
			        }], 
					key: 'global',
					dest: '',
					type: 'css',
					ext: '.css'
				}]
			}
		}
	});
	
	/*
	 * Watch differently LESS and JS
	 */
	grunt.event.on('watch', function(action, filepath) {
		if (filepath.indexOf('.js') > -1 ) {
			grunt.config('watch.scripts.tasks', ['jshint', 'concat', 'uglify', 'versioning']);
		}
		else if(filepath.indexOf('.less') > -1 ){
			grunt.config('watch.scripts.tasks', ['less', 'versioning']);
		}
		else if( filepath.indexOf('.png') > -1  ||
			filepath.indexOf('.jpg') > -1  ||
			filepath.indexOf('.gif') > -1 ){ 
			grunt.config('watch.scripts.tasks', ['imagemin']);
		}
	});

	/* Using JIT to load tasks */
	/*grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-static-versioning');*/

	// Default task(s).
	grunt.registerTask('default', ['jshint','concat','uglify','less','imagemin', 'versioning']);
};