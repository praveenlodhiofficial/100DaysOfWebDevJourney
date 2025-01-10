function delayedCall(fn) {
    setTimeout(fn, 3000);
}
delayedCall(function () {
    console.log('Hello, World');
});
