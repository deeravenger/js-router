## Router
Small and simple JavaScript library for routing.

### Example
```javascript
// If you need a prefix (for example '#!')
// you can pass by value
var router = new Router('!');
router
    .when('/', function () {
        console.log('Main page');
    })
    .when('/hello/:name', function (request) {
        console.log('Hello page with request: ', request);
    })
    .when('/hello/:name/:surname', function (request) {
        console.log('Extended hello page with request: ', request);
    })
    .otherwise(function () {
        console.log('Page not found')
    })
    .listen();
```

### System requirements
