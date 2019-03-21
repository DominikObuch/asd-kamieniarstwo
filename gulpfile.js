var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var uncss = require('gulp-uncss');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

gulp.task('browserSync', () => {
  browserSync.init({
    open: false,
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', () => {
  return gulp.src('app/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg|mp4|webm)')
    .pipe(gulp.dest('docs/images'))
});
gulp.task('dataJSON', () => {
  return gulp.src('app/js/**/*.json)')
    .pipe(gulp.dest('docs'))
});

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task("uncss", function () {
  return gulp.src([
      'app/css/main.css'
    ])
    .pipe(uncss({

      html: [
        'app/*.html',
        'app/**/*.html'
      ],
      ignore: [
        /\.lazy-loaded/,
        /\.show/,
        /\.hamburger__expanded/,
        /\.collapsed/,
        /\.menu__show/,
        /\.collapsing/
      ]
    }))
    .pipe(gulp.dest('app/css'));
})

gulp.task('useref', () => {
  return gulp.src(['app/*.html'], )
    .pipe(useref())
    .pipe(gulpIf('*.js',
      babel({
        presets: ['@babel/env']
      })
    ))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf("app/*.html", htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    })))
    .pipe(gulp.dest('docs'))
});

gulp.task('scripts', () => {
  return gulp.src(['app/js/*.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('docs/js'));
})

gulp.task('minifyhtml', () => {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('prefixer', () =>
  gulp.src('app/css/*.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('app/css'))
);

gulp.task('clean:docs', () => {
  return del.sync('docs');
})

gulp.task('default', function (callback) {
  runSequence(['watch', 'sass', 'browserSync'],
    callback
  )
})

gulp.task('build', function (callback) {
  runSequence('clean:docs', ['sass', 'images'], 'prefixer', 'uncss', 'useref','dataJSON',
    callback)
})