(function(tinydollar) {

    tinydollar.$ = function() {
        return this.init.apply(this, arguments);
    };

    tinydollar.x = function(target, source) {
        for (var prop in source) target[prop] = source[prop];
    };

    tinydollar._ = {
        e: document.createElement('div'),
        text: this.e.innerText ? 'innerText' : 'textContent'
    };

    tinydollar.query = function(selector, context) {
        return Array.prototype.slice.call((context|| document).querySelectorAll(selector));
    };

    tinydollar.x(tinydollar.$.prototype, {

        init: function() {

            this.nodes = tinydollar.query.apply(null, arguments);
            return this;
        },

        each: function(callback) {

            this.nodes.forEach(function(node) {
                callback.apply(node)
            });

            return this;
        },

        addClass: function(className) {
            return this.each(function() {
                this.className += ' ' + className;
            });
        },

        removeClass: function(className) {
            return this.each(function() {
                this.className = this.className !== undefined ? this.className.replace(new RegExp(' ' + className, 'gi'), '') : '';
            });
        },

        text: function(value) {
            return this.each(function() {
                this[tinydollar._.text] = value;
            });
        },

        on: tinydollar._.e.addEventListener
            ? function(type, fn) {
                return this.each(function(node) {
                    node.addEventListener(type, fn, false);
                });
            }
            : function(type, fn) {
                return this.each(function(node) {
                    node.attachEvent('on' + type, fn);
                });
            },

        off: tinydollar._.e.removeEventListener
            ? function(type, fn) {
                return this.each(function(node) {
                    node.removeEventListener(type, fn, false);
                });
            }
            : function(type, fn) {
                return this.each(function(node) {
                    node.detachEvent('on' + type, fn);
                });
            }
    });

    window.$ = tinydollar;

})(function() {
    return new this.$.apply(null, arguments);
});