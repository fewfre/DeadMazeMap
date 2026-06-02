var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var tsify = require('tsify');

function core() {
	return browserify({
		basedir: '.',
		entries: ['src/Main.ts'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.bundle()
	.pipe(source('core.js'))
	.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object - needed for "uglify" to work
	.pipe(uglify())
	.pipe(gulp.dest('build'));
}

function copyImages() {
	return gulp.src(['images/*'], {
		base: '',
		encoding: false
	}).pipe(gulp.dest('build/images'));
}

function copyWeb() {
	return gulp.src(['web/*'], {
		base: ''
	}).pipe(gulp.dest('build'));
}

exports.core = core;
exports.copyImages = copyImages;
exports.copyWeb = copyWeb;
exports.default = gulp.parallel(copyWeb, copyImages, core);
