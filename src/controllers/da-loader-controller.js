angular
    .module('da-loader.controllers')
    .controller('DALoaderController', DALoaderController);

/*@ngInject*/
function DALoaderController($scope, $controller, $rootScope){
    var vm = this;
    var onDestroy;

    vm.setUp = setUp;
    vm.tearDown = tearDown;
    vm.createHooks = createHooks;
    vm.hooks = [];

    ///////////////
    function verifyHook(hook){
        if(!hook.setUp || !hook.tearDown){
            return false;
        }
        return true;
    }

    function createHooks(){
        angular.forEach($scope.hooks, function(nomeControlador, index){
            var controlador = $controller(nomeControlador, {'$scope': $rootScope.$new()});
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
        onDestroy = $scope.$watch('$destroy',tearDown);
        return setUpHooks();
    }

    function tearDown(){
        onDestroy();
        return tearDownHooks();
    }
}
