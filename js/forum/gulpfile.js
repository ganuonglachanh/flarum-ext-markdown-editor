var flarum = require('flarum-gulp');

flarum({
    files: [
        'bower_components/simplemde/dist/simplemde.min.js'
    ],
    modules: {
        'ogioncz/mdeditor': [
            'src/**/*.js'
        ]
    }
});
