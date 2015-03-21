/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var showDoc = require('../actions/showDoc');
var Home = require('../components/Home.jsx');
var Docs = require('../components/Docs.jsx');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        component: Home,
        githubPath: '/docs/home.md',
        action: showDoc,
        pageTitle: 'Fluxible | A Pluggable Container for Isomorphic Flux Applications'
    },
    quickStart: {
        path: '/quick-start.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/quick-start.md',
        action: showDoc,
        pageTitlePrefix: 'Quick Start'
    },
    actions: {
        path: '/api/actions.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/Actions.md',
        action: showDoc,
        pageTitlePrefix: 'API: Actions'
    },
    components: {
        path: '/api/components.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/Components.md',
        action: showDoc,
        pageTitlePrefix: 'API: Components'
    },
    fluxible: {
        path: '/api/fluxible.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/Fluxible.md',
        action: showDoc,
        pageTitlePrefix: 'API: Fluxible'
    },
    fluxibleContext: {
        path: '/api/fluxible-context.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/FluxibleContext.md',
        action: showDoc,
        pageTitlePrefix: 'API: FluxibleContext'
    },
    plugins: {
        path: '/api/plugins.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/Plugins.md',
        action: showDoc,
        pageTitlePrefix: 'API: Plugins'
    },
    stores: {
        path: '/api/stores.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/Stores.md',
        action: showDoc,
        pageTitlePrefix: 'API: Stores'
    },
    testUtils: {
        path: '/api/test-utils.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/TestUtils.md',
        action: showDoc,
        pageTitlePrefix: 'API: TestUtils'
    },
    routing: {
        path: '/tutorials/routing.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/tutorials/routing.md',
        action: showDoc,
        pageTitlePrefix: 'Routing Tutorial'
    },
    isomorphicFlux: {
        path: '/api/bringing-flux-to-the-server.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/guides/bringing-flux-to-the-server.md',
        action: showDoc,
        pageTitlePrefix: 'Bringing Flux to the Server'
    },
    dataServices: {
        path: '/guides/data-services.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/guides/data-services.md',
        action: showDoc,
        pageTitlePrefix: 'Data Services Guide'
    },
    libraries: {
        path: '/community/libraries.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/community/libraries.md',
        action: showDoc,
        pageTitlePrefix: 'Community Libraries'
    },
    presentations: {
        path: '/community/presentations.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/community/presentations.md',
        action: showDoc,
        pageTitlePrefix: 'Community Presentations'
    },
    referenceApplications: {
        path: '/community/reference-applications.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/community/reference-applications.md',
        action: showDoc,
        pageTitlePrefix: 'Community Reference Applications'
    }
};
