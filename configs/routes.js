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
    guides: {
        path: '/guides',
        method: 'get',
        page: 'guides',
        label: 'Guides',
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Fluxible | Guides' });
            done();
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
