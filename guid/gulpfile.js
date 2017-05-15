const gulp = require('gulp');
const babel = require('gulp-babel');

//es6 + jsx -> es5
gulp.task('es5-jsx', function(){
    return gulp.src('public/src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('public/dist'));
});

//default task
gulp.task('default', ['es5-jsx'], function(){
    console.log('tasks completed...');     
});