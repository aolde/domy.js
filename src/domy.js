(function () {
    "use strict";

    window.Domy = function (selector) {
        return new Domy.fn.init(selector);
    };

    if (!window.$)
        window.$ = window.Domy;
    if (!window.D)
        window.D = window.Domy;

    Domy.fn = Domy.prototype = {
        init: function (selector) {
            this.elements = [];

            if (typeof selector == 'string') {
                this.selector = selector;
                this.elements = document.querySelectorAll(selector);
            } else if (selector.toString().indexOf('HTML') != -1) { // for D(document) or D(document.getElementById('logo'))
                this.elements.push(selector);
            }

            this.push.apply(this, this.elements);
            return this;
        },

        get: function (index) {
            return this.elements[index];
        },

        size: function () {
            return this.elements.length;
        },

        bind: function (event, callback) {
            return this.each(function (el) {
                el.addEventListener(event, callback, false);
            });
        },

        click: function (callback) {
            return this.bind('click', callback);
        },

        each: function (callback) {
            for (var i = 0; i < this.elements.length; i++) {
                callback.call(this, this.elements[i], i);
            }
            return this;
        },

        prop: function (name, value) {
            if (value == undefined)
                return this[0][name];

            return this.each(function (el) {
                el[name] = value;
            });
        },

        attr: function (name, value) {
            if (value == undefined) {
                var attribute = this[0].attributes[name];
                return attribute ? attribute.value : undefined;
            }

            return this.each(function (el) {
                el.setAttribute(name, value);
            });
        },

        removeAttr: function (name) {
            return this.each(function (el) {
                el.removeAttribute(name);
            });
        },

        css: function (styles) {
            if (typeof styles == 'string' && arguments.length == 1) {
                return this[0].style[styles];
            }

            return this.each(function (el) {
                for (var property in styles) {
                    el.style[property] = styles[property];
                }
            });
        },

        addClass: function (name) {
            return this.each(function (el) {
                el.classList.add(name);
            });
        },

        removeClass: function (name) {
            return this.each(function (el) {
                el.classList.remove(name);
            });
        },

        hasClass: function (name) {
            var result = false;
            this.each(function (el) {
                if (el.classList.contains(name)) {
                    result = true;
                }
            });
            return result;
        },

        remove: function () {
            return this.each(function (el) {
                el.parentNode.removeChild(el);
            });
        },

        html: function (value) {
            if (value == undefined)
                return this.elements[0].innerHTML;

            return this.each(function (el) {
                el.innerHTML = value;
            });
        },

        text: function (value) {
            if (value == undefined)
                return this.elements[0].textContent;

            return this.each(function (el) {
                el.textContent = value;
            });
        },

        val: function (value) {
            if (value == undefined)
                return this.elements[0].value;

            return this.each(function (el) {
                if ('value' in el)
                    el.value = value;
            });
        },

        // Make object "Array Like"
        push: Array.prototype.push,
        sort: [].sort,
        splice: Array.prototype.slice
    };

    Domy.ready = function (callback) {
        document.addEventListener('DOMContentLoaded', callback, false);
    };

    Domy.ajax = function (options) {
        /* 
        OPTIONS:
        url : string
        type : string
        data : object
        [dataType: string - json, text]

        success: func
        error: func
        beforeSend: func
        */

        if (!options)
            return;

        if (options.type == undefined)
            options.type = 'GET';

        var formData = new FormData();

        if (options.data && options.type == 'POST') {
            for (var prop in options.data) {
                formData.append(prop, options.data[prop]);
            }
        } else if (options.data && options.type == 'GET') {
            var queryString = options.url.indexOf('?') != -1 ? '&' : '?';

            for (var prop in options.data) {
                queryString += prop + '=' + options.data[prop];
            }
            options.url += queryString;
        }

        var xhr = new XMLHttpRequest();

        if (options.error) {
            xhr.onerror = function () {
                options.error(xhr.responseText, xhr);
            };
        }

        if (options.success) {
            xhr.onload = function () {
                options.success(xhr.responseText, xhr);
            };
        }

        if (options.beforeSend) {
            options.beforeSend(xhr);
        }

        xhr.open(options.type, options.url, true);
        xhr.send(options.type == 'POST' ? formData : null);
    };


    Domy.post = function (url, data, success) {
        Domy.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: success
        });
    };

    Domy.get = function (url, data, success) {
        Domy.ajax({
            type: 'GET',
            url: url,
            data: data,
            success: success
        });
    };

    Domy.getJSON = function (url, data, success) {
        Domy.ajax({
            type: 'GET',
            url: url,
            data: data,
            success: function (response, xhr) {
                if (success) {
                    success(JSON.parse(response), xhr);
                }
            }
        });
    };

    Domy.fn.init.prototype = Domy.fn;
})();