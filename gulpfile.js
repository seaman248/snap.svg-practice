'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var coffee = require('gulp-coffee');
var gutil = require('gulp-util')
gulp.task('connect', function () {
	var connect = require('connect');
	var app = connect()
		.use(require('connect-livereload')({ port: 35729 }))
		.use(connect.static('app'))
		.use(connect.directory('app'));

	require('http').createServer(app)
		.listen(9000)
		.on('listening', function () {
			console.log('Started connect web server on http://localhost:9000');
		});
});

gulp.task('coffee', function(){
	gulp.src('app/scripts/coffee/**/*.coffee')
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest('app/scripts/'));
});

gulp.task('serve', ['connect'], function () {
	require('opn')('http://localhost:9000');
});

gulp.task('watch', ['coffee','connect', 'serve'], function () {
	var server = $.livereload();
	gulp.watch('app/scripts/coffee/**/*.coffee', ['coffee'])
	gulp.watch([
		'app/*.html',
		'app/styles/**/*.css',
		'app/scripts/**/*.js',
		'app/scipts/coffee/**/*.coffee'
	]).on('change', function (file) {
		server.changed(file.path);
	});
});

