var flarum = require('flarum-gulp');

flarum({
    modules: {
        'ogioncz/mdeditor': [
            'src/**/*.js'
        ]
    }
});
