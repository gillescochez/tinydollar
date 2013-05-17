/**
 * Self executing function - closure
 */
(function(doc) {

    /**
     * Helper function which return a new instance of $
     * @param selector {String} CSS string
     * @param context {HTMLElement} A parent element
     * @namespace
     */
    var tinydollar = function(selector, context) {
        return new tinydollar.$(selector, context);
    };

    /**
     * Main $ class which wrap around the queried elements
     * @param selector {String} CSS string
     * @param context {HTMLElement} A parent element
     */
    tinydollar.$ = function(selector, context) {
        return this.init(selector, context);
    };

    /**
     * Helper function which copies the property of the source object into the target
     * @param target {Object} Object to copy properties into
     * @param source {Object} Object from which copied properties come from
     */
    tinydollar.x = function(target, source) {
        for (var prop in source) target[prop] = source[prop];
    };

    /**
     * Namespace to handle few cross-browser variables
     * @namespace
     */
    tinydollar._ = {
        e: doc.createElement('div')
    };

    /**
     * Cross-browser innerText
     * @type {string}
     */
    tinydollar._.text = tinydollar._.e.innerText ? 'innerText' : 'textContent';

    /**
     * Query the context or document against the provided CSS selector string
     * @param selector {String} CSS string
     * @param context {HTMLElement} A parent element
     */
    tinydollar.query = function(selector, context) {
        return Array.prototype.slice.call((context|| doc).querySelectorAll(selector));
    };

    /**
     * Static function to remove a CSS class
     * @param node {HTMLElement} The targeted element
     * @param className {String} The CSS class name
     * @static
     */
    tinydollar.removeClass = function(node, className) {
        node.className = node.className !== undefined
            ? node.className.replace(new RegExp(' ' + className + ' ', 'gi'), '')
            : '';
    };

    /**
     * Static function to add a CSS class
     * @param node {HTMLElement} The targeted element
     * @param className {String} The CSS class name
     * @static
     */
    tinydollar.addClass = function(node, className) {
        node.className += ' ' + className + ' ';
    };

    tinydollar.x(tinydollar.$.prototype, {

        /**
         * Start the wrapper object by storing the nodes and returning self
         */
        init: function() {

            this.nodes = tinydollar.query.apply(null, arguments);
            return this;
        },

        /**
         * Function to iterate over the node and execute a call back on each node
         * The context of the callback is the node itself so it is accessible on this
         * @param callback {Function} The function to execute on each iteration
         */
        each: function(callback) {

            this.nodes.forEach(function(node) {
                callback.apply(node)
            });

            return this;
        },

        /**
         * Toggle a given class of each nodes
         * @param className {String} The CSS class name
         */
        toggleClass: function(className) {
            return this.each(function() {
                if (this.className.indexOf(' ' + className + ' ') !== -1) {
                    tinydollar.removeClass(this, className);
                }
                else tinydollar.addClass(this, className);
            });
        },

        /**
         * Add a given class on each nodes
         * @param className {String} The CSS class name
         */
        addClass: function(className) {
            return this.each(function() {
                tinydollar.addClass(this, className);
            });
        },

        /**
         * Remove a given class on each nodes
         * @param className {String} The CSS class name
         */
        removeClass: function(className) {
            return this.each(function() {
                tinydollar.removeClass(this, className);
            });
        },

        /**
         * Update the body of the nodes with some text
         * @param value {String} The text string
         */
        text: function(value) {
            return this.each(function() {
                this[tinydollar._.text] = value;
            });
        },

        on: tinydollar._.e.addEventListener
            ? function(type, fn) {
                return this.each(function() {
                    this.addEventListener(type, fn, false);
                });
            }
            : function(type, fn) {
                return this.each(function() {
                    this.attachEvent('on' + type, fn);
                });
            },

        off: tinydollar._.e.removeEventListener
            ? function(type, fn) {
                return this.each(function() {
                    this.removeEventListener(type, fn, false);
                });
            }
            : function(type, fn) {
                return this.each(function() {
                    this.detachEvent('on' + type, fn);
                });
            }
    });

    window.$ = tinydollar;

})(document);