const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tsify = require('tsify');

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
		.pipe(buffer()) // converts from streaming to buffered vinyl file object - needed for "uglify" to work
		.pipe(uglify())
		.pipe(gulp.dest('build'));
}

function copyImages() {
	return gulp.src('images/**/*', { base: 'images', encoding: false })
		.pipe(gulp.dest('build/images'));
}

function copyWeb() {
	return gulp.src('web/*', { base: '' })
		.pipe(gulp.dest('build'));
}

exports.core = core;
exports.copyImages = copyImages;
exports.copyWeb = copyWeb;
exports.default = gulp.parallel(copyWeb, copyImages, core);
