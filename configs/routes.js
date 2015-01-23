var showDoc = require('../actions/showDoc');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        label: 'Home',
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Fluxible | Home' });
            done();
        }
    },
    getting_started: {
        path: '/getting-started.html',
        method: 'get',
        page: 'started',
        label: 'started',
        action: function (context, payload, done) {
            var params = { key: 'docs/getting-started.md' };
            context.executeAction(showDoc, params, done);
        }
    },
    guides: {
        path: '/:type/:key*.html',
        method: 'get',
        page: 'guides',
        label: 'guides',
        action: function (context, payload, done) {
            var params = { key: 'docs/' + payload.params.type + '/' + payload.params.key + '.md' };
            context.executeAction(showDoc, params, done);
        }
    },
    github: {
        path: 'https://github.com/yahoo/fluxible',
        method: 'get',
        page: 'github',
        label: 'GitHub',
        target: '_blank',
        action: function (context, payload, done) {
            done();
        }
    }
};
