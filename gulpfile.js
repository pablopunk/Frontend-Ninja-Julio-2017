const gulp = require('gulp')
const sass = require('gulp-sass')
const notify = require('gulp-notify')
const importHtml = require('gulp-html-import')
const buffer = require('gulp-buffer')
const tap = require('gulp-tap')
const sourcemaps = require('gulp-sourcemaps')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')
const responsive = require('gulp-responsive')
const browser = require('browser-sync').create()
const browserify = require('browserify')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

gulp.task('default', ['build'], () => {
  browser.init({ proxy: 'http://127.0.0.1:3100/', browser: 'google chrome' })
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass'])
  gulp.watch(['src/*.html', 'src/**/*.html'], ['html'])
  gulp.watch(['src/js/*.js', 'src/js/**/*.js'], ['js'])
})

gulp.task('build', ['sass', 'html', 'js', 'img'], () => console.log('building...'))

gulp.task('sass', () => {
  gulp.src('./src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', error => notify().write(error)))
  .pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/'))
  .pipe(browser.stream())
})

gulp.task('html', () => {
  gulp.src('src/*.html')
  .pipe(importHtml('src/components/'))
  .pipe(htmlmin({collapseWhiteepace: true}))
  .pipe(gulp.dest('dist/'))
  .pipe(browser.stream())
})

gulp.task('js', () => {
  gulp.src('src/js/main.js')
  .pipe(tap(file => {
    file.contents = browserify(file.path, {debug: true})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .on('error', error => notify().write(error))
  }))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/'))
  .pipe(browser.stream())
})

gulp.task('img', () => {
  gulp.src('src/img/*')
  .pipe(responsive({ // generamos las versiones responsive
    '*': [
      {width: 150, rename: {suffix: '-150px'}},
      {width: 250, rename: {suffix: '-250px'}},
      {width: 300, rename: {suffix: '-300px'}}
    ]
  }))
  .pipe(imagemin()) // optimizamos el peso de las imágenes
  .pipe(gulp.dest('dist/img/'))
})
