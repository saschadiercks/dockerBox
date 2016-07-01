module.exports = function(grunt) {

	// Dependencies
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

	// Initializing configuration objects
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// SASS
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'htdocs/assets/css/site.min.css': 'src/scss/site.scss'
				}
			}
		},

		// PostCSS
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({browsers: ['last 2 versions', '>0.1%']}), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			dist: {
				src: 'htdocs/assets/css/*.min.css'
			}
		},


		// Watch
		watch: {
			src: {
				files: ['**/*.scss'],
				tasks: ['default'],
				options: {
					event: ['changed', 'added', 'deleted'],
				}
			}
		},
	});

	// Load packages
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');

	// Register Tasks
	grunt.registerTask('default', ['sass','postcss']);
};
