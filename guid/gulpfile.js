let gulp = require('gulp');
let babel = require('gulp-babel');
let sass = require('gulp-ruby-sass');

//es6 + jsx -> es5
gulp.task('es5-jsx', function(){
    return gulp.src('public/src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('public/dist'));
});

gulp.task('sass', () => {
    sass(['./public/src/style.scss'], {
        style: 'expanded' //sass -h
    }).on('error', sass.logError).pipe(gulp.dest('./public/dist'));
});

//default task
gulp.task('default', ['es5-jsx', 'sass'], function(){
    
});