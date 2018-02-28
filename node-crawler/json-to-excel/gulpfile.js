const gulp = require('gulp')
const json2csv = require('gulp-json2csv')

gulp.task('default', function() {
  gulp
    .src('./temp.json')
    .pipe(json2csv())
    .pipe(gulp.dest('dist'))
})
