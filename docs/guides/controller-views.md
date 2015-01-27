# Controller Views

Controller views are a special type of React component/view that has access to the Fluxible [componentContext](https://github.com/yahoo/fluxible#getcomponentcontext) and can therefore access data from stores and execute actions. These components will typically listen for changes to a store so that they can re-render themselves individually instead of having to re-render the root component of the application.

```js
var React = require('react/addons');
var updateTime = require('../actions/updateTime');

module.exports = React.createClass({
    getInitialState: function () {
        this.store = this.props.context.getStore('TimeStore');
        return this.store.getState();
    },
    componentDidMount: function() {
        this.store.on('change', function () {
            var state = this.store.getState();
            this.setState(state);
        }.bind(this));
    },
    onReset: function (event) {
        // context property contains the executeAction method to fire an action
        this.props.context.executeAction(updateTime);
    },
    render: function() {
        return (
            <em onClick={this.onReset}>{this.state.time}</em>
        );
    }
});
```

## Store Listeners

The `storeListeners` property is defined in the `statics` property of the controller view. The Fluxible StoreMixin is a utility to automatically handle the adding and removing of store event listeners. By default, the mixin will attach an `onChange` method that gets called when a store updates. However, you can define your custom methods to attach to the store. Check out the [`StoreMixin` docs](https://github.com/yahoo/fluxible#store-mixin) for usage.

Taking our example from above, we can add the `StoreMixin` library:

```js
module.exports = React.createClass({
    mixins: [ StoreMixin ]
});
```

Then list the `TimeStore` as a store listener:

```js
module.exports = React.createClass({
    statics: {
        storeListeners: [ TimeStore ]
    }
});
```

And finally, update the `onChange` method to update the component state:

```js
module.exports = React.createClass({
    onChange: function() {
        var state = this.store.getState();
        this.setState(state);
    }
});
```

The complete set of changes is provided below:

```js
var React = require('react/addons');
var StoreMixin = require('fluxible').StoreMixin;
var updateTime = require('../actions/updateTime');
var TimeStore = require('../stores/TimeStore');

module.exports = React.createClass({
    mixins: [ StoreMixin ],
    statics: {
        storeListeners: [ TimeStore ]
    },
    getInitialState: function () {
        this.store = this.props.context.getStore(TimeStore);
        return this.store.getState();
    },
    onChange: function() {
        var state = this.store.getState();
        this.setState(state);
    },
    onReset: function (event) {
        // context property contains the executeAction method to fire an action
        this.props.context.executeAction(updateTime);
    },
    render: function() {
        return (
            <em onClick={this.onReset}>{this.state.time}</em>
        );
    }
});
```

