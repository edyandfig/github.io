// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var
 	cssGlobbing = require('gulp-css-globbing'),
 	sass = require('gulp-sass'),
 	prefix = require('gulp-autoprefixer'),
 	concat = require('gulp-concat'),
 	uglify = require('gulp-uglify'),
 	rename = require('gulp-rename'),
 	cp = require('child_process'),
 	browserSync = require('browser-sync'),
 	svgSprite  = require('gulp-svg-sprite');

 // file paths
 var jsFiles = [
 		],
 		cssFiles = [
 		'assets/scss/style.scss',
 		];

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var svgConfig = {
    mode : {
    	symbol : true
    }
   };

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Lint Task
/*
gulp.task('lint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
*/

// Compile Sass
gulp.task('sass', function() {
    return gulp.src(cssFiles)
		    .pipe(cssGlobbing({extensions: ['.scss']}))
        .pipe(sass({ outputStyle: 'nested', onError: browserSync.notify }))
        .on('error', handleError)
    		.pipe(prefix({ browsers: ['last 2 versions', 'ie >= 8'] }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('footer.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(gulp.dest('_site/assets/js'))
        .pipe(rename('footer.min.js'))
        .pipe(uglify())
        .on('error', handleError)
        .pipe(gulp.dest('_site/assets/js'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('svg', function() {
	return gulp.src('assets/svgs-to-sprite/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest('assets/images'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch(jsFiles, ['scripts']);
    gulp.watch(['assets/scss/**/*', 'assets/lib/**/*.scss'],['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*.md', 'assets/images/*'], ['jekyll-rebuild']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);
