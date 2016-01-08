angular
    .module('da-loader.controllers')
    .controller('LoaderUiRouterController', LoaderUiRouterController);

/* @ngInject */
function LoaderUiRouterController($scope, $rootScope, LoaderService){

    var onStart;
    var onError;
    var onSuccess;
    var onNotFound;
    var onDestroy;   

    var vm = {
        setUp: setUp,
        tearDown: tearDown
    };

    return vm;

    ///////////
    function setUp(){
        onStart = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            LoaderService.enable();
        });

        onError = $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            LoaderService.disable();
        });

        onSuccess = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            LoaderService.disable();
        });

        onNotFound = $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            LoaderService.disable();
        });

        onDestroy = $scope.$on('$destroy', function(){
            console.log("Tear down");
            tearDown();
        });
    };  

    function tearDown(){
        onStart();
        onError();
        onSuccess();
        onNotFound();
        onDestroy();
    };
}