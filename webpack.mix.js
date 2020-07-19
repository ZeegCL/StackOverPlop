const mix = require('laravel-mix');

mix.js('resources/assets/js/app.js', 'public/js/app.js')
    .styles('resources/assets/css/app.css', 'public/css/app.css')
    .combine([
      'node_modules/materialize-css/dist/js/materialize.min.js',
    ], 'public/js/third_party.js')

    .combine([
      'node_modules/materialize-css/dist/css/materialize.min.css',
    ], 'public/css/third_party.css')

   .copyDirectory('resources/assets/img', 'public/img')
