angular
    .module('pluton-loader.controllers')
    .controller('PlutonLoaderController', PlutonLoaderController);

/*@ngInject*/
function PlutonLoaderController($scope, $controller, $rootScope, PlutonLoaderService){
    var vm = this;
    var onDestroy;
    var watchChangeInService;

    vm.setUp = setUp;
    vm.tearDown = tearDown;
    vm.createHooks = createHooks;
    vm.hooks = [];
    $scope.display = false;

    ///////////////
    function verifyHook(hook){
        if(!hook.setUp || !hook.tearDown){
            return false;
        }
        return true;
    }

    function createHooks(){
        angular.forEach($scope.hooks, function(nomeControlador, index){
            var controlador = $controller(nomeControlador, {'$scope': $scope});
            if(!verifyHook(controlador)){
                throw new Error("O controlador "+ nomeControlador +" não implementa as funções esperadas(setUp,tearDown)");
            }

            vm.hooks.push(controlador);
        });
    }

    function setUpHooks(){
        angular.forEach(vm.hooks, function(controlador, index){
            controlador.setUp();
        });
    }

    function tearDownHooks(){
        angular.forEach(vm.hooks, function(controlador, index){
            controlador.tearDown();
        });
    }

    function setUp(){
        watchChangeInService = $scope.$watch(function(){
            return PlutonLoaderService.isActive();
        }, function(newValue, oldValue){
            $scope.display = newValue;
        });

        onDestroy = $scope.$on('$destroy',tearDown);
        return setUpHooks();
    }

    function tearDown(){
        onDestroy();
        watchChangeInService();
        return tearDownHooks();
    }
}
