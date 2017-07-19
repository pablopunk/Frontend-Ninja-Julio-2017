const gulp = require('gulp')
const sass = require('gulp-sass')
const notify = require('gulp-notify')
const importHtml = require('gulp-html-import')
const browser = require('browser-sync').create()

gulp.task('default', ['sass', 'html'], () => {
  browser.init({ server: 'dist/' })
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass'])
  gulp.watch(['src/*.html', 'src/**/*.html'], ['html'])
})

gulp.task('sass', () => {
  gulp.src('./src/scss/style.scss')
  .pipe(sass().on('error', error => notify().write(error)))
  .pipe(gulp.dest('./dist/'))
  .pipe(browser.stream())
})

gulp.task('html', () => {
  gulp.src('src/*.html')
  .pipe(importHtml('src/components/'))
  .pipe(gulp.dest('dist/'))
  .pipe(browser.stream())
})
