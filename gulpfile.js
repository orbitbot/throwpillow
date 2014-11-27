var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var templateCache = require('gulp-angular-templatecache');

var paths = {
  bower_fonts: 'bower_components/**/*.{ttf,woff,eof,svg}',
  fonts: 'src/assets/fonts/*.*',
  images: 'src/assets/img/**/*.*',
  index: 'src/index.html',
  js: 'src/app/**/*.js',
  styles: ['src/assets/less/*.less', 'src/app/**/*.less'],
  templates: 'src/app/components/**/*.html'
};

gulp.task('usemin', function() {
  return gulp.src(paths.index)
    .pipe(plugins.usemin({
      css: ['concat', plugins.size({ title: 'css' })],
      less: ['concat', plugins.size({ title: 'less' }), plugins.less()],
      js: ['concat']
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('templates', function () {
  return gulp.src(paths.templates)
    .pipe(plugins['angular-templatecache']('templates.js', { standalone: true }))
    .pipe(gulp.dest('dist/js'));
});



gulp.task('copy-images', function(){
  return gulp.src(paths.images)
    .pipe(plugins.size({ title: 'images' }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(plugins.size({ title: 'fonts' }))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-bower_fonts', function(){
  return gulp.src(paths.bower_fonts)
    .pipe(plugins.size({ title: 'bower fonts' }))
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('templates', function () {
  return gulp.src(paths.templates)
    .pipe(templateCache('templates.js', { standalone: true }))
    .pipe(plugins.size({ title: 'templates' }))
    .pipe(gulp.dest('dist/js'));
});
/**
 * Watch src
 */
gulp.task('watch', function () {
  gulp.watch([paths.images], ['copy-images']);
  gulp.watch([paths.fonts], ['copy-fonts']);
  gulp.watch([paths.bower_fonts], ['copy-bower_fonts']);
  gulp.watch([paths.styles, paths.index, paths.js], ['usemin']);
  gulp.watch([paths.templates], ['templates']);
});


/*  */

gulp.task('server', function() {
  plugins.connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('livereload', function() {
  gulp.src([
    'dist/*.*',
    'dist/**/*.*'
  ])
  .pipe(plugins.watch)
  .pipe(plugins.connect.reload());
});

gulp.task('copy-assets', ['copy-images', 'copy-fonts', 'copy-bower_fonts']);
gulp.task('build', ['usemin', 'templates', 'copy-assets']);
gulp.task('default', ['build', 'server', 'watch']);