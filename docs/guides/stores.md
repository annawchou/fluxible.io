# Stores

Stores contain the application state and logic. The store is registered as a unit rather than individual callbacks. Stores contain a `handlers` property that maps action names to Store methods. The Store handlers receive a payload and update its' state appropriately. Once updated, the store calls `this.emitChange()` to notify Controller Views of state changes. These views can leverage the [Fluxible Mixin](https://github.com/yahoo/fluxible#mixin) to re-render themselves.


```js
var createStore = require('fluxible/utils/createStore');
var Page = createStore({
    initialize: function () {
        // Called immediately after instantiation
        this.page = null;
    },
    storeName: 'PageStore',
    handlers: {
        'NAVIGATE': 'handleNavigate'
    },
    handleNavigate: function handleNavigate(payload) {
        this.page = payload.page;
        this.emitChange();
    },
    getPage: function () {
        return this.page;
    }
});
module.exports = Page;
```

```js
var FluxibleMixin = require('fluxible').Mixin;
var PageStore = require('./stores/PageStore'); // Your store
var Component = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [PageStore]
    },
    onChange: function (payload) {
        var page = this.getStore(PageStore).getPage();
        this.setState(page);
    },
    render: function () {
        // markup
    }
});
```
