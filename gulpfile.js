var gulp = require('gulp');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var replace = require('gulp-replace');
// var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var path = require('path');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var tsify = require("tsify");

// gulp.task('core', function() {
// 	// Make sure these are ordered from least reliant to most reliant.
// 	return gulp.src(['src/js/Utils.js', 'src/js/WikiData.js', 'src/js/i18n.js', 'src/js/RCMOptions.js', 'src/js/RCMWikiPanel.js',  'src/js/RCMModal.js', 'src/js/RCData.js', 'src/js/RCList.js', , 'src/js/RCMManager.js', 'src/js/Main.js'])
// 		// .pipe(jshint())
// 		// .pipe(jshint.reporter('default', {  }))
// 		.pipe(concat('core.js'))
// 		.pipe(gulp.dest("build"))
// 	;
// });

gulp.task('core', function() {
	return browserify({
		basedir: '.',
		// debug: true,
		entries: ['src/Main.ts'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.bundle()
	.pipe(source('core.js'))
	.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object - needed for "uglify" to work
	.pipe(uglify())
	.pipe(gulp.dest("build"))
	;
});

// https://opnsrce.github.io/how-to-make-gulp-copy-a-directory-and-its-contents
gulp.task('copy-images', function() {
	return gulp.src(['images/*'], {
		base: ''
	}).pipe(gulp.dest('build/images'));
});
gulp.task('copy-web', function() {
	return gulp.src(['web/*'], {
		base: ''
	}).pipe(gulp.dest('build'));
});

// gulp.task('typescript', function() {
// 	return tsProject.src()
// 		.pipe(tsProject())
// 		.js.pipe(gulp.dest("dist"));
// 	;
// });

// place code for your default task here
gulp.task('default', [ 'copy-web', 'copy-images', 'core' ]);
