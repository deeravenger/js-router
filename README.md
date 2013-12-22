## Router
Small and simple JavaScript library for client-side routing.

### Requirements
Router works fine in Internet Explorer >=6, Firefox >= 3, Opera, Chrome, Safari.
This library is compatible with AMD and CommonJS modules. Also can be exported to global var.

### Example
```javascript
// you can set a prefix (for example '#!')
var router = new Router('!');
router
    .when('/', function () {
        // this.request === {}
    })
    .when('/hello/:name', function (name) {
        // for url /hello/john
        // name === 'john'
        // this.request === { 'name': 'john' }
    })
    // we can use get values as arguments
    // or we can use this.request in Route context
    .when('/hello/:name.:surname', function (name, surname) {
        // for url /hello/john.do
        // name === 'john'
        // surname === 'do'
        // this.request === { 'name': 'john', 'surname': 'do' }
    })
    // otherwise function haven't route context, so this.request will be undefined
    .otherwise(function () {
        // this.request === undefined
    })
    .listen();
```
