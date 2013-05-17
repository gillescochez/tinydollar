tinydollar - $
==========

tiny DOM manipulation library

For API doc see the doc folder, aimed at modern browser only.

Support simple features like querying dom, wrapper around the nodes to perform basis tasks
such as fiddling with the classes, attributes, text, html, events...

I'll admit mostly built to get my mind some time off another project....

```html

<div id="foo">foo</div>
<div class="boo">boo</div>
<div class="boo">boo</div>
<div class="boo">boo</div>
<div class="boo">boo</div>
<div class="boo">boo</div>
<div class="boo">boo</div>
<div class="boo">boo</div>
<div id="click">click</div>
<button>Button</button>

```

```javascript

$('#foo').addClass('red');

$('#click').on('click', function() {
    $('#foo').toggleClass('red');
    $('button').toggleAttr('disabled');
    $('.boo').toggle();
});

$('.boo').addClass('blue');

```