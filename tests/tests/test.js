var div = document.createElement('div'),
    span = document.createElement('span'),
    a = document.createElement('a');

div.appendChild(span);
span.appendChild(a);

span.id = 'test-span';
a.id = 'test-a';

document.body.appendChild(div);

test('Static API', function() {

    ok(window.$, '$ exposed');
    equal(typeof window.$, 'function', '$ is a function');

    'x,_,query,rmClass,addClass'.split(',').forEach(function(method) {
        ok($[method], method + ' exists');
        if (method !== '_') {
            equal(typeof $[method], 'function', method + ' is a function');
        }
    });

    deepEqual($('#test-span'), new $.$('#test-span'), '$ return instance of tinydollar.$');

});

test('Instance API', function() {

    var $instance = $('#test-span');

    'addClass,attr,each,getAttr,off,on,rmAttr,rmClass,text,toggleAttr,toggleClass'.split(',').forEach(function(method) {
        ok($instance[method], method + ' exists');
        equal(typeof $instance[method], 'function', method + ' is a function');
    });
});

test('Functional', function() {

    var res = [],
        span1 = document.createElement('span'),
        span2 = document.createElement('span');

    span1.className = 'test';
    span2.className = 'test';

    div.appendChild(span1);
    div.appendChild(span2);

    /**
     * each - iterator
     */

    // single
    $('#test-span').each(function() {
        res.push(this);
    });
    equal(res.length, 1, 'each iteration count');
    deepEqual(res[0], span, 'each this is span');

    // multi
    res = [];
    $('.test').each(function() {
        res.push(this);
    });
    equal(res.length, 2, 'each iteration count');
    deepEqual(res[0], span1, 'each this is span1');
    deepEqual(res[1], span2, 'each this is span2');

    /**
     * CSS class manipulation
     */
    $('#test-span').addClass('test');
    equal(span.className, ' test', 'addClass');

    $('#test-span').rmClass('test');
    equal(span.className, '', 'rmClass');

    $('#test-span').toggleClass('test');
    equal(span.className, ' test', 'toggleClass 1st');

    $('#test-span').toggleClass('test');
    equal(span.className, '', 'toggleClass 2nd');

    /**
     * text / html
     */
    $('#test-span').text('foo');
    equal((span.innerText || span.textContent), 'foo', 'text set');

    $('#test-span').html('<p>foo</p>');
    equal(span.innerHTML, '<p>foo</p>', 'html set');
});