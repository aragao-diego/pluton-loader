angular
    .module('pluton-loader.controllers')
    .controller('LoaderUiRouterController', LoaderUiRouterController);

/* @ngInject */
function LoaderUiRouterController($scope, $rootScope, PlutonLoaderService){
    var vm = this;

    var onStart;
    var onError;
    var onSuccess;
    var onNotFound;
    var onDestroy;

    vm.setUp = setUp;
    vm.tearDown = tearDown;

    ///////////
    function setUp(){
        onStart = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            PlutonLoaderService.enable();
        });

        onError = $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            PlutonLoaderService.disable();
        });

        onSuccess = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            PlutonLoaderService.disable();
        });

        onNotFound = $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            PlutonLoaderService.disable();
        });
    }

    function tearDown(){
        onStart();
        onError();
        onSuccess();
        onNotFound();
    }
}
