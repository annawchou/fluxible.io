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
    docs: {
        path: '/docs',
        method: 'get',
        page: 'docs',
        label: 'Docs',
        action: function (context, payload, done) {
            var params = { key: 'docs/overview.md' };
            context.executeAction(showDoc, params, done);
        }
    },
    doc_page: {
        path: '/docs/:key*',
        method: 'get',
        page: 'doc_page',
        label: 'Doc Page',
        action: function (context, payload, done) {
            var params = { key: payload.url.substring(1) + '.md' };
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
