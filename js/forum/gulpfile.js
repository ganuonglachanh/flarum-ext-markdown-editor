var flarum = require('flarum-gulp');

flarum({
    files: [
        'library/SimpleMDE.js'
    ],
    modules: {
        'ogioncz/mdeditor': [
            'src/**/*.js'
        ]
    }
});