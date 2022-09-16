const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const styleInject = require('gulp-style-inject');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');

const scssCompilation = (cb) => {
  gulp.src('src/styles.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
      extname: '.min.css'
    }))    
    .pipe(gulp.dest('dest/'));

  cb()
}

const templateCompilation = (cb) => {
  gulp.src('src/templates/**/*.liquid')
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(styleInject({
      path: 'dest/',
    }))
    .pipe(gulp.dest('dest/templates'))

  cb()
}

const watchTask = () => {
  gulp.watch([
    'src/styles.scss',
    'src/templates/**/*.liquid'
  ], gulp.series(scssCompilation, templateCompilation))
}

exports.default = watchTask