module.exports = [
    {
        category: '',
        children: [
            {
                label: 'Quick Start',
                routeName: 'docs',
                navParams: {
                    slug: 'quick-start'
                }
            }
        ]
    },
    {
        category: 'Guides',
        children: [
            {
                label: 'Isomorphic Flux',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    slug: 'bringing-flux-to-the-server'
                }
            },
            {
                label: 'Dispatcher',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    slug: 'dispatcher'
                }
            },
            {
                label: 'Stores',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    slug: 'stores'
                }
            },
            {
                label: 'Actions',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    slug: 'actions'
                }
            },
            {
                label: 'Controller Views',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    slug: 'controller-views'
                }
            },
            {
                label: 'Data Services',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    slug: 'data-services'
                }
            },
            {
                label: 'Plugins',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    slug: 'plugins'
                }
            }
        ]
    },
    {
        category: 'Tutorials',
        children: [
            {
                label: 'Routing',
                routeName: 'docs',
                navParams: {
                    type: 'tutorials',
                    slug: 'routing'
                }
            }
        ]
    },
    {
        category: 'Community',
        children: [
            {
                label: 'Libraries',
                routeName: 'docs',
                navParams: {
                    type: 'community',
                    slug: 'libraries'
                }
            },
            {
                label: 'Presentations',
                routeName: 'docs',
                navParams: {
                    type: 'community',
                    slug: 'presentations'
                }
            }
        ]
    }
];
