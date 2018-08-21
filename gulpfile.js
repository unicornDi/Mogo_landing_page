const gulp = require('gulp')
const purgecss = require('gulp-purgecss')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


gulp.task('purgecss', ['sass'], () => {
    return gulp
      .src('project/css/*.css')
      .pipe(
        purgecss({
          content: ['project/index.html']
        })
      )
      .pipe(gulp.dest('project/css/'))
    })

gulp.task('postcss', ['sass', 'purgecss'], function () {
    const plugins = [
        autoprefixer({browsers: ['last 15 version']}),
        cssnano()
    ];
    return gulp.src('project/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('project/css'))
        .pipe(browserSync.reload({
            stream: true
          }));
});

const pathToSass = 'project/sass/style.scss'

gulp.task ('sass', function () {
    return gulp.src(pathToSass)
        .pipe(sass())
        .pipe(gulp.dest('project/css'))
});


// watcher

gulp.task('reload', function() {
    browserSync.init({
        server: {
            baseDir: 'project'
        },
    })
})

gulp.task('watch', ['sass', 'purgecss', 'postcss', 'reload'], function() {
    gulp.watch('project/sass/*.scss', ['sass', 'postcss']);
    gulp.watch('project/index.html', browserSync.reload)
});

gulp.task('default', ['watch']);