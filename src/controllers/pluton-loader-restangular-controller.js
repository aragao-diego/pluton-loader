angular
    .module('pluton-loader.controllers')
    .controller('LoaderRestangularController', LoaderRestangularController);

/* @ngInject */
function LoaderRestangularController($scope, PlutonLoaderService, Restangular){
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
        if(httpConfig && httpConfig.hasOwnProperty('pluton-loader') && httpConfig['pluton-loader'] === false ){
            return element;
        }
        vm.incrementRequest();

        if (hasPendingRequests()) {
            PlutonLoaderService.enable();
        }

        return element;
    }

    function responseInterceptor(data, operation, what, url, response, deferred) {
        //Sem o fullResponse não tem como saber qual os headers do request
        if(Restangular.configuration.fullResponse === false){
            vm.decrementRequest();
            if (!vm.hasPendingRequests()) {
                PlutonLoaderService.disable();
            }
            return data;
        }

        deferred.promise.then(checkForFullResponse);
        return data;
    }

    function errorInterceptor(response, deferred, responseHandler) {
        vm.decrementRequest();
        if (!vm.hasPendingRequests()) {
            PlutonLoaderService.disable();
        }
        return true; // error not handled
    }

    function checkForFullResponse(data){
        if(data && data.config && data.config.hasOwnProperty('pluton-loader') && data.config['pluton-loader'] === false ){
            return true;
        }

        vm.decrementRequest();
        if (!vm.hasPendingRequests()) {
            PlutonLoaderService.disable();
        }
    }

    function incrementRequest(){
        vm.pendingRequests++;
    }

    function decrementRequest(){
        vm.pendingRequests--;
    }

    function hasPendingRequests(){
        return vm.pendingRequests > 0;
    }
}
