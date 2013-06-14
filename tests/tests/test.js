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

    ok($._.e, '_.e exists');
    ok($._.text, '$._.text exists');
    equal(
        ($._.text === 'innerText' || $._.text === 'textContent' || false),
        true, '$._.text is correct'
    );

    deepEqual($.query('span', div)[0], span, '$.query');

    deepEqual($('#test-span'), new $.$('#test-span'), '$ return instance of tinydollar.$');

});

test('Instance API', function() {

    var $instance = $('#test-span');

    'addClass,attr,each,getAttr,off,on,rmAttr,rmClass,text,toggleAttr,toggleClass'
        .split(',').forEach(function(method) {
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
    equal(span.className, 'test', 'addClass');

    $('#test-span').rmClass('test');
    equal(span.className, '', 'rmClass');

    $('#test-span').toggleClass('test');
    equal(span.className, 'test', 'toggleClass 1st');

    $('#test-span').toggleClass('test');
    equal(span.className, '', 'toggleClass 2nd');

    $('#test-span').addClass('test').addClass('red');
    equal(span.className, 'test red', 'addClass 2 classes');

    $('#test-span').rmClass('test');
    equal(span.className, 'red', 'rmClass 1');

    $('#test-span').rmClass('red');
    equal(span.className, '', 'rmClass 2');

    $('#test-span').addClass('test').addClass('test');
    equal(span.className, 'test test', 'addClass 2 identical classes');

    $('#test-span').rmClass('test');
    equal(span.className, '', 'rmClass 2 identical classes');

    /**
     * text / html
     */
    $('#test-span').text('foo');
    equal((span.innerText || span.textContent), 'foo', 'text set');

    $('#test-span').html('<p>foo</p>');
    equal(span.innerHTML, '<p>foo</p>', 'html set');

    /**
     * Attributes
     */
    $('#test-span').attr('rel', 'test');
    equal(span.getAttribute('rel'), 'test', 'attr');

    equal($('#test-span').getAttr('rel'), 'test', 'getAttr');

    $('#test-span').rmAttr('rel');
    equal(span.getAttribute('rel'), null, 'rmAttr');

    $('#test-span').toggleAttr('rel', 'test');
    equal(span.getAttribute('rel'), 'test', 'toggleAttr');
    $('#test-span').toggleAttr('rel', 'test');
    equal(span.getAttribute('rel'), null, 'toggleAttr');

    /**
     * Hide/Show/Toggle
     */
    $('#test-span').hide();
    equal(span.style.display, 'none', 'hide - span is hidden');
    $('#test-span').show();
    equal(span.style.display, '', 'show - span is displayed');

    $('#test-span').toggle();
    equal(span.style.display, 'none', 'toggle - span is hidden');
    $('#test-span').toggle();
    equal(span.style.display, '', 'toggle - span is hidden');
});