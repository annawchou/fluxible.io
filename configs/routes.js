/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import showDoc from '../actions/showDoc';
import Home from '../components/Home.jsx';
import Docs from '../components/Docs.jsx';

export default {
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
    faq: {
        path: '/faq.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/faq.md',
        action: showDoc,
        pageTitlePrefix: 'FAQ'
    },

    // API
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

    // Addons
    baseStore: {
        path: '/api/addons/BaseStore.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/addons/BaseStore.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/BaseStore'
    },
    fluxibleComponent: {
        path: '/api/addons/FluxibleComponent.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/addons/FluxibleComponent.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/FluxibleComponent'
    },
    fluxibleMixin: {
        path: '/api/addons/FluxibleMixin.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/addons/FluxibleMixin.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/FluxibleMixin'
    },
    connectToStores: {
        path: '/api/addons/connectToStores.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/addons/connectToStores.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/connectToStores'
    },
    createStore: {
        path: '/api/addons/createStore.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/addons/createStore.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/createStore'
    },
    provideContext: {
        path: '/api/addons/provideContext.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/api/addons/provideContext.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/provideContext'
    },

    // Tutorials
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

    // Guides
    dataServices: {
        path: '/guides/data-services.html',
        method: 'get',
        component: Docs,
        githubPath: '/docs/guides/data-services.md',
        action: showDoc,
        pageTitlePrefix: 'Data Services Guide'
    },

    // Community
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
