const gulp = require('gulp')
const sass = require('gulp-sass')
const notify = require('gulp-notify')
const browser = require('browser-sync').create()

gulp.task('default', () => {
  browser.init({ server: 'src/' })
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass'])
  gulp.watch(['src/*.html']).on('change', () => {
    browser.reload()
    notify('Compiled html 📝')
  })
})

gulp.task('sass', () => {
  gulp.src('./src/scss/style.scss')
  .pipe(sass().on('error', error => notify().write(error)))
  .pipe(gulp.dest('./src/css/'))
  .pipe(browser.stream())
  .pipe(notify('Compiled sass 💄'))
})
