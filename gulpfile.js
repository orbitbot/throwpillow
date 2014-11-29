var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var templatecache = require('gulp-angular-templatecache');
var karma = require('karma').server;
var _ = require('lodash');

gulp.plumbedSrc = function( ){
  return gulp.src.apply( gulp, arguments )
    .pipe( plumber() );
};


var paths = {
  bower_fonts : 'bower_components/**/*.{ttf,woff,eof,svg}',
  fonts       : 'src/assets/fonts/*.*',
  html        : 'dist/*.html',
  images      : 'src/assets/img/**/*.*',
  index       : 'src/index.html',
  js          : 'src/app/**/*.js',
  styles      : ['src/assets/less/*.less', 'src/app/**/**/*.less'],
  templates   : 'src/app/components/**/*.html'
};


gulp.task('usemin', function() {
  return gulp.src(paths.index)
    .pipe(plugins.usemin({
      css: ['concat',
            plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'),
            plugins.size({ title: 'css', showFiles: true })],
      less: ['concat',
              plugins.size({ title: 'less', showFiles: true }),
              plugins.less()],
      js: ['concat']
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('templates', function () {
  return gulp.src(paths.templates)
    .pipe(templatecache('templates.js', { standalone: true }))
    .pipe(plugins.size({ title: 'templates' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(plugins.connect.reload());
});


gulp.task('copy-images', function(){
  return gulp.src(paths.images)
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(plugins.size({ title: 'images', showFiles: true }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(plugins.size({ title: 'fonts' }))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-bower_fonts', function(){
  return gulp.src(paths.bower_fonts)
    .pipe(plugins.size({ title: 'bower fonts'}))
    .pipe(gulp.dest('dist/lib'));
});


var karmaConf = {
  browsers: ['PhantomJS'],
  frameworks: ['mocha', 'chai'],
  files: [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-ui-ace/ui-ace.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'src/app/app.js',
    'src/app/components/**/*.js',
    'dist/js/templates.js'
  ],
  reporters: ['mocha'],
  plugins: [
    'karma-chai',
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-phantomjs-launcher'
  ]
};

gulp.task('karma', ['templates'], function(done) {
  karma.start(_.assign({}, karmaConf, { singleRun: true, colors: true }), done);
});

gulp.task('karma-ci', ['templates'], function(done) {
  karma.start(_.assign({}, karmaConf, { singleRun: false, colors: true, autoWatch: true }), done);
});

gulp.task('watch', function () {
  gulp.watch([paths.images], ['copy-images']);
  gulp.watch([paths.fonts], ['copy-fonts']);
  gulp.watch([paths.bower_fonts], ['copy-bower_fonts']);
  gulp.watch([paths.styles, paths.index, paths.js], ['usemin']);
  gulp.watch([paths.templates], ['templates']);
  gulp.watch([paths.js], ['jshint']);
  gulp.watch([paths.html], ['html']);
});


gulp.task('jshint', function() {
  gulp.src(paths.js)
    .pipe(plugins.jshint('config/.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});


gulp.task('server', function() {
  plugins.connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('livereload', function() {
  gulp.src('dist/**/*.*')
  .pipe(plugins.watch())
  .pipe(plugins.connect.reload());
});

gulp.task('html', function () {
  gulp.src(paths.html)
    .pipe(plugins.connect.reload());
});

gulp.task('copy-assets', ['copy-images', 'copy-fonts', 'copy-bower_fonts']);
gulp.task('build', ['usemin', 'templates', 'copy-assets']);
gulp.task('default', ['build', 'server', 'watch']);
