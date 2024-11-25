import gulp from "gulp";
import sass from "gulp-sass";
import dartSass from "sass"; // Usamos Dart Sass como compilador
import cleanCSS from "gulp-clean-css";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";

// Configurar Gulp para usar Dart Sass
const sassCompiler = sass(dartSass);

// Rutas de archivos
const paths = {
  styles: {
    src: "src/scss/**/*.scss", // Archivos Sass fuente
    dest: "public/build/css/"  // Carpeta de salida CSS
  },
  scripts: {
    src: "src/js/**/*.js",     // Archivos JavaScript fuente
    dest: "public/build/js/"   // Carpeta de salida JS
  }
};

// Tarea para compilar Sass
export const styles = () => {
  return gulp
    .src(paths.styles.src)        // Fuente de archivos SCSS
    .pipe(sourcemaps.init())      // Inicializa sourcemaps
    .pipe(sassCompiler().on("error", sassCompiler.logError)) // Compila Sass
    .pipe(cleanCSS())             // Minifica CSS
    .pipe(sourcemaps.write("."))  // Escribe los sourcemaps
    .pipe(gulp.dest(paths.styles.dest)); // Salida final
};

// Tarea para manejar scripts JS
export const scripts = () => {
  return gulp
    .src(paths.scripts.src)       // Fuente de archivos JS
    .pipe(sourcemaps.init())      // Inicializa sourcemaps
    .pipe(concat("main.js"))      // Concatenar todos los archivos JS en uno
    .pipe(uglify())               // Minifica los archivos JS
    .pipe(sourcemaps.write("."))  // Escribe los sourcemaps
    .pipe(gulp.dest(paths.scripts.dest)); // Salida final
};

// Tarea por defecto: compilar estilos y scripts en paralelo
export default gulp.series(gulp.parallel(styles, scripts));
