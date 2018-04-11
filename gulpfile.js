const gulp = require('gulp');
const s3 = require('gulp-s3-deploy');
const gutil = require('gulp-util');

const s3Options = { headers: { 'Cache-Control': 'max-age=315360000, no-transform, public' } };
const s3Credentials = require('../../moneybags-secrets/gulp-secrets').admin_ui;

const DIST_PATH = 'dist';
const isProduction = gutil.env.production ? true : false;

gulp.task('deploy', () => {
  gutil.log(gutil.colors.green(`Deploying to bucket ${isProduction ? s3Credentials.production.bucket : s3Credentials.qa.bucket}`));
  return gulp.src(DIST_PATH + '/**')
    .pipe(s3(isProduction ? s3Credentials.production : s3Credentials.qa, s3Options));
});
