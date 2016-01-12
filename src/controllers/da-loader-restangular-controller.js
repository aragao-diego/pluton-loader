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
        Restangular.addRequestInterceptor(requestInterceptor);
        Restangular.addResponseInterceptor(responseInterceptor);
        Restangular.addErrorInterceptor(errorInterceptor);
    }

    function tearDown(){
    }

    function requestInterceptor(element, operation, what, url) {
        if (vm.pendingRequests === 0) {
            LoaderService.enable();
        }
        vm.incrementRequest();
        return element;
    }

    function responseInterceptor(data, operation, what, url, response, deferred) {
        vm.decrementRequest();
        if (!vm.hasPendingRequests()) {
            LoaderService.disable();
        }
        return data;
    }

    function errorInterceptor(response, deferred, responseHandler) {
        vm.decrementRequest();
        if (!vm.hasPendingRequests()) {
            LoaderService.disable();
        }
        return true; // error not handled
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
