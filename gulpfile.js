const gulp = require('gulp'),
			compass = require('gulp-compass'),
			path = require('path'),
			connect = require('gulp-connect');

const sassSources = ['components/sass/style.scss'];
const jsSources = ['development/js/*.js'];
const htmlSources = ['development/*.html'];

gulp.task('compass', function(done){
	gulp.src(sassSources)
	.pipe(compass({
		css: 'development/css',
		sass: path.normalize(__dirname+'/components/sass'),
		style: 'expanded',
		comments: true
	}))
	.on('error', console.log)
	.pipe(gulp.dest('development/css'))
	.pipe(connect.reload());
	done();
});

gulp.task('js', function(done){
	gulp.src(jsSources)
	.pipe(connect.reload());
	done();
});

gulp.task('html', function(done){
	gulp.src(htmlSources)
	.pipe(connect.reload());
	done();
});

gulp.task('watch', function(){
	gulp.watch('components/sass/*.scss', gulp.series('compass'));
	gulp.watch(jsSources, gulp.series('js'));
	gulp.watch(htmlSources, gulp.series('html'));
});

gulp.task('connect', function(){
	connect.server({
		root: 'development',
		livereload: true
	});
});

const seriesFunctions = gulp.series('js', 'html', 'compass');
const parallelFunctions = gulp.parallel('connect', 'watch');

gulp.task('all', gulp.series(seriesFunctions, parallelFunctions));
