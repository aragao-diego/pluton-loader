angular
    .module('da-loader.controllers')
    .controller('LoaderRestangularController', LoaderRestangularController);

/* @ngInject */
function LoaderRestangularController($scope, LoaderService, Restangular){
    var vm = this;

    vm.pendingRequests = 0;
    vm.setUp = setUp;
    vm.tearDown = tearDown;
    vm.incrementRequest = incrementRequest;
    vm.decrementRequest = decrementRequest;
    vm.hasPendingRequests = hasPendingRequests;

    ///////////
    function setUp(){
        Restangular.addFullRequestInterceptor(requestInterceptor);
        Restangular.addResponseInterceptor(responseInterceptor);
        Restangular.addErrorInterceptor(errorInterceptor);
    }

    function tearDown(){
    }

    function requestInterceptor(element, operation, what, url, headers, params, httpConfig) {
        if(httpConfig && httpConfig.hasOwnProperty('da-loader') && httpConfig['da-loader'] === false ){
            return element;
        }

        if (vm.pendingRequests === 0) {
            LoaderService.enable();
        }
        vm.incrementRequest();
        return element;
    }

    function responseInterceptor(data, operation, what, url, response, deferred) {
        //Sem o fullResponse não tem como saber qual os headers do request
        if(Restangular.configuration.fullResponse === false){
            vm.decrementRequest();
            if (!vm.hasPendingRequests()) {
                LoaderService.disable();
            }
            return data;
        }

        deferred.promise.then(checkForFullResponse);
        return data;
    }

    function errorInterceptor(response, deferred, responseHandler) {
        vm.decrementRequest();
        if (!vm.hasPendingRequests()) {
            LoaderService.disable();
        }
        return true; // error not handled
    }

    function checkForFullResponse(data){
        if(data && data.config && data.config.hasOwnProperty('da-loader') && data.config['da-loader'] === false ){
            return true;
        }

        vm.decrementRequest();
        if (!vm.hasPendingRequests()) {
            LoaderService.disable();
        }
    }

    function incrementRequest(){
        self.pendingRequests++;
    }

    function decrementRequest(){
        self.pendingRequests--;
    }

    function hasPendingRequests(){
        return self.pendingRequests > 0;
    }
}
