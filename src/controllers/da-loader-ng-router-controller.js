angular
    .module('da-loader.controllers')
    .controller('LoaderNgRouterController', LoaderNgRouterController);

/* @ngInject */
function LoaderNgRouterController($rootScope, LoaderService){
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
            LoaderService.enable();
        });

        onError = $rootScope.$on('$routeChangeError', function(event, toState, toParams, fromState, fromParams, error){
            LoaderService.disable();
        });

        onSuccess = $rootScope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            LoaderService.disable();
        });
    }
    
    function tearDown(){
        onStart();
        onError();
        onSuccess();
    }
}
