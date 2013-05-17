test('API', function() {
    ok(window.$, '$ exposed');
    equal(typeof window.$, 'function', '$ is a function');
});