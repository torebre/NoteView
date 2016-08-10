var gulp = require('gulp');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html']
};

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");


gulp.task('default', function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("./build"));
});

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("build"));
});

// Found information about the use of browserify in gulp here:
// https://www.typescriptlang.org/docs/handbook/gulp.html
gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/ts/viewer/Stave.ts', 'src/ts/viewer/NoteViewer.ts'],
        cache: {},
        packageCache: {}
    })
        .require('./src/ts/viewer/Stave.ts', {expose: 'Stave'})
        .require('./src/ts/viewer/NoteViewer.ts', {expose: 'NoteViewer'})
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("build"));
});

gulp.task('build', ['bower-files', 'bower']);