angular
    .module('da-loader.controllers')
    .controller('LoaderNgRouterController', LoaderNgRouterController);

/* @ngInject */
function LoaderNgRouterController($rootScope, LoaderService){
    var vm = {
        config: config
    };

    return vm;

    //////////////////////////
    function config(){
        $rootScope.$on('$routeChangeStart', function(event, toState, toParams, fromState, fromParams){
            LoaderService.enable();
        });

        $rootScope.$on('$routeChangeError', function(event, toState, toParams, fromState, fromParams, error){
            LoaderService.disable();
        });

        $rootScope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            LoaderService.disable();
        });

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            LoaderService.disable();
        });
    }    
}