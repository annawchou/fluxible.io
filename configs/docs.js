module.exports = [
    {
        category: '',
        children: [
            {
                label: 'Quick Start',
                routeName: 'docs',
                navParams: {
                    key: 'quick-start'
                }
            }
        ]
    },
    {
        category: 'Guides',
        children: [
            {
                label: 'Dispatcher',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'dispatcher'
                }
            },
            {
                label: 'Stores',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'stores'
                }
            },
            {
                label: 'Actions',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'actions'
                }
            },
            {
                label: 'Controller Views',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'controller-views'
                }
            },
            {
                label: 'Data Services',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'data-services'
                }
            },
            {
                label: 'Plugins',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'plugins'
                }
            }
        ]
    },
    {
        category: 'Tutorials',
        children: [
            {
                label: 'Chat',
                routeName: 'docs',
                navParams: {
                    type: 'tutorials',
                    key: 'chat'
                }
            },
            {
                label: 'Routing',
                routeName: 'docs',
                navParams: {
                    type: 'tutorials',
                    key: 'routing'
                }
            },
            {
                label: 'Todo MVC',
                routeName: 'docs',
                navParams: {
                    type: 'tutorials',
                    key: 'todo-mvc'
                }
            }
        ]
    }
];
