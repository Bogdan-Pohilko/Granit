const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

function style() {
	return gulp.src('./scss/**/*.scss')
	.pipe(sass())
	// .pipe(sass{сюда})можно добавлять команды напр. минификация см. документацию
	.pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}
function watch(){
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);

}
function sync(){
    browserSync.init({
        server:{
            baseDir:"./"
        },
        port: 3000
    })
};

exports.style = style;
exports.watch = watch;

gulp.task('default', gulp.parallel(sync, watch));

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css_min'));
});


 
gulp.task('autopref_min', () => {
	style();
    return gulp.src('css/*.css')
    	.pipe(rename("./autopref_min.css"))
    	.pipe(cleanCSS({debug: true}, (details) => {
	      console.log(`${details.name}: ${details.stats.originalSize}`);
	      console.log(`${details.name}: ${details.stats.minifiedSize}`);
	    }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
});

// преименоване css
// function newname (){
// 	return gulp.src("./css_min/*.css")
// 		.pipe(rename("./css_min/prefStyle.css"))
// 		.pipe(gulp.dest("./"));
// }
// exports.newname = newname;

// мнификация css + лог дебаг
// gulp.task('minify-css-log', () => {
//   return gulp.src('css/*.css')
//     .pipe(cleanCSS({debug: true}, (details) => {
//       console.log(`${details.name}: ${details.stats.originalSize}`);
//       console.log(`${details.name}: ${details.stats.minifiedSize}`);
//     }))
//   .pipe(gulp.dest('./css_min'));
// });