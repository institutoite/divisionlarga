// webpack.mix.js
const mix = require('laravel-mix');
// Minificar un archivo JS específico
mix.js('resources/js/app.js', 'public/js')
   .minify('public/js/header.js'); // Minifica el resultado
