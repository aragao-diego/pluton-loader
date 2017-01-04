angular
    .module('pluton-loader.controllers')
    .controller('LoaderNgRouterController', LoaderNgRouterController);

/* @ngInject */
function LoaderNgRouterController($scope, $rootScope, PlutonLoaderService){
    var vm = this;

    var onStart;
    var onError;
    var onSuccess;
    var onDestroy;

    vm.setUp = setUp;
    vm.tearDown = tearDown;

    ///////////
    function setUp(){
        onStart = $rootScope.$on('$routeChangeStart', function(event, toState, toParams, fromState, fromParams){
            PlutonLoaderService.enable();
        });

        onError = $rootScope.$on('$routeChangeError', function(event, toState, toParams, fromState, fromParams, error){
            PlutonLoaderService.disable();
        });

        onSuccess = $rootScope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            PlutonLoaderService.disable();
        });
    }

    function tearDown(){
        onStart();
        onError();
        onSuccess();
    }
}
