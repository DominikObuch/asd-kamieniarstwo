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
var realFavicon = require('gulp-real-favicon');
var fs = require('fs');
var rimraf = require("rimraf");
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'docs/images/icons/faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function (done) {
  realFavicon.generateFavicon({
    masterPicture: 'app/images/icons/favicon.png',
    dest: 'docs/images/icons',
    iconsPath: './images/icons/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '42%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#603cba',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#0d426c',
        manifest: {
          name: 'asd-kamieniarstwo',
          startUrl: 'asd-kamieniarstwo.pl',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#0d426c'
      }
    },
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: true,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function () {
  return gulp.src(['app/*.html'])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('app/'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function (done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
  });
});


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

gulp.task('dataJSON', [], function () {
  gulp.src("app/js/dataJSON/*.json")
    .pipe(gulp.dest('docs/js/dataJSON/'));
});
gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', browserSync.reload);
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
        /\.products__list-point/,
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
  return gulp.src(['app/**/*.html'])
    .pipe(useref())
    .pipe(gulpIf('*.js', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf("app/*.html", htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    })))
    .pipe(gulp.dest('docs/'))
});

// gulp.task('compressjs', function () {
//   gulp.src('docs/js/script.min.js')
//     .pipe(minify())
//     .pipe(gulp.dest('docs/js'))
// });

gulp.task('movejs', function () {
  gulp.src("js/*")
    .pipe(gulp.dest("docs/js/"))
  setTimeout(function () {
      del.sync(["./js", "./css"])
  }, 3000)
})

gulp.task('scripts', () => {
  return gulp.src(['docs/js/script.min.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('docs/js/script.min.js'));
})

gulp.task('minifyhtml', () => {
  return gulp.src('docs/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true
    }))
    .pipe(gulp.dest('docs/'));
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
  runSequence('clean:docs', "generate-favicon", ['sass', 'images'], 'prefixer', 'uncss', 'useref', 'minifyhtml', 'dataJSON', 'movejs',
    callback)
})

gulp.task('minbuild', function (callback) {
  runSequence('clean:docs', ['sass', 'images'], "useref", "dataJSON", "movejs", callback)
})