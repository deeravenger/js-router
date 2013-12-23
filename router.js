/**
 * JavaScript library for client-side routing
 * @author Dmitry Kuznetsov <kuznetsov2d@gmail.com>
 * @license The MIT License (MIT)
 */
(function (root, factory) {
    if (typeof exports === 'object') {
        factory(exports);
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else {
        factory(window);
    }
})(this, function (exports) {
    exports.Router = function (prefix) {
        var routes = [],
            defaultController,
            Route = function (rule, controller) {
                var values = [], request = {};

                function match(url) {
                    var pattern = rule
                        .replace(/[-[\]{}()|?*+.,\\^$|#\s]/g, '\\$&')
                        .replace(/(:[a-z]+)/gi, '(\\w+)');
                    pattern = new RegExp('^' + pattern + '$');
                    values = pattern.exec(url);
                    return !!values;
                }

                function run() {
                    var keys = rule.match(/(:\w+|\([^)]+\))/g) || [];
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i].substr(0, 1) === ':' ? keys[i].substr(1) : keys[i];
                        request[key] = values[i + 1];
                    }
                    return controller.apply(this, (values || []).slice(1));
                }

                return {
                    request: request,
                    match: match,
                    run: run
                };
            };

        /**
         * Add new route
         * @param {string} rule
         * @param {function} controller
         * @returns {Router}
         */
        function when(rule, controller) {
            routes.push(new Route(rule, controller));
            return this;
        }

        /**
         * Set default route
         * @param controller
         * @returns {Router}
         */
        function otherwise(controller) {
            defaultController = controller;
            return this;
        }

        /**
         * Match route by url
         * @param {string} url
         * @returns {*}
         */
        function match(url) {
            var result, found = false;
            for (var i = 0; i < routes.length; i++) {
                if (routes[i].match(url)) {
                    found = true;
                    result = routes[i].run();
                    break;
                }
            }
            if (!found) {
                result = defaultController();
            }
            return result;
        }

        /**
         * Watch hash for changes
         */
        function listen() {
            var lastUrl, currentUrl,
                check = function () {
                    currentUrl = window.location.hash.substr(('#' + prefix).length) || '/';
                    if (lastUrl !== currentUrl) {
                        lastUrl = currentUrl;
                        match(currentUrl);
                    }
                };
            check();
            if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
                window.onhashchange = check;
            } else {
                setInterval(check, 50);
            }
        }

        return {
            when: when,
            otherwise: otherwise,
            match: match,
            listen: listen
        };
    };
});