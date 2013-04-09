function log(str) {
    console.log(str);
}


require(["app"], function (app) {
    log('app loaded');
});