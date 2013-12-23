## Router
Small and simple JavaScript library for client-side routing.

### Requirements
Router works fine in Internet Explorer >=6, Firefox >= 3, Opera, Chrome, Safari.
This library is compatible with AMD and CommonJS modules. Also can be exported to global var.

### Installing router
```bash
# Using jam
jam install router

# Using bower
bower install js-router
```

### Example
```javascript
// set a prefix if needed
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
    // we can get request values as arguments
    // or we can use this.request from Route context
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
