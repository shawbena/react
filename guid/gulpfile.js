let gulp = require('gulp');
let babel = require('gulp-babel');
let sass = require('gulp-ruby-sass');

//jsx -> es5
gulp.task('jsx', function(){
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
    sass(['./src/style.scss'], {
        style: 'expanded' //sass -h
    }).on('error', sass.logError).pipe(gulp.dest('./dist'));
});

//default task
gulp.task('default', ['jsx', 'sass'], function(){
    
});