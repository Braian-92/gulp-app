import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

// Rutas
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'public/build/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'public/build/js/'
    }
};

// Tarea: Compilar Sass a CSS
export const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
};

// Tarea: Procesar y minificar JavaScript
export const scripts = () => {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest));
};

// Tarea: Monitorear cambios
export const watch = () => {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
};

// Tarea por defecto
export default gulp.series(gulp.parallel(styles, scripts), watch);
