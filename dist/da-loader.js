(function(){
'use strict'
var moduleName = 'da-loader';

var subModules = ['controllers', 'directives', 'services', 'views'];
subModules.forEach(createSubModules);

angular
    .module(moduleName, ['ui.router', 'oc.lazyLoad'].concat(subModules) );

function createSubModules(element, index, array){
    var subModuleName = moduleName+'.'+element;
    angular.module(subModuleName, []);
    array[index] = subModuleName;
}


configLoader.$inject = ["$ocLazyLoadProvider"];angular
    .module('da-loader')
    .config(configLoader);

/* @ngInject */
function configLoader($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'da-loader',
            serie: true,
            files: [
                'bower_components/da-loader/dist/da-loader.css',
                'bower_components/da-loader/dist/da-loader.html'                
            ]
        }]
    });
}

DALoaderController.$inject = ["$scope", "$controller", "$rootScope", "LoaderService"];angular
    .module('da-loader.controllers')
    .controller('DALoaderController', DALoaderController);

/*@ngInject*/
function DALoaderController($scope, $controller, $rootScope, LoaderService){
    var vm = this;
    var onDestroy;
    var watchChangeInService;

    vm.setUp = setUp;
    vm.tearDown = tearDown;
    vm.createHooks = createHooks;
    vm.hooks = [];
    vm.display = false;

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
        watchChangeInService = $scope.$watch(function(){
            return LoaderService.isActive();
        }, function(newValue, oldValue){
            vm.display = newValue;
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


LoaderNgRouterController.$inject = ["$rootScope", "LoaderService"];angular
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

LoaderUiRouterController.$inject = ["$scope", "$rootScope", "LoaderService"];angular
    .module('da-loader.controllers')
    .controller('LoaderUiRouterController', LoaderUiRouterController);

/* @ngInject */
function LoaderUiRouterController($scope, $rootScope, LoaderService){
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
    }

    function tearDown(){
        onStart();
        onError();
        onSuccess();
        onNotFound();
        onDestroy();
    }
}


LoaderDirective.$inject = ["$rootScope", "LoaderService", "$parse"];
angular
    .module('da-loader.directives')
    .directive('daLoader', LoaderDirective);

/* @ngInject */
function LoaderDirective($rootScope, LoaderService, $parse){
    return {
        scope: true, // {} = isolate, true = child, false/undefined = no change
        controller: "DALoaderController",
        controllerAs: "vm",
        restrict: 'AE',
        templateUrl: 'da-loader/loader.html',
        replace: true,
        compile: compile
    };

    ////////////////
    function compile(element, attrs, transclude){
        return {
            pre: preLink,
            post: postLink
        };
    }

    function preLink($scope, element, attrs, controller) {
        if(!attrs.hooks){
            attrs.hooks = '["LoaderUiRouterController"]';
        }
        var hooks = $parse(attrs.hooks)($scope);

        $scope.hooks = hooks;
        delete attrs.hooks;
    }

    function postLink($scope, element, attrs, controller){
        controller.setUp();
    }
}


LoaderService.$inject = ["$state"];angular
    .module('da-loader.services')
    .service('LoaderService', LoaderService );

/* @ngInject */
function LoaderService($state){
    var vm = this;

    var isShowing = false;

    var service = {
        isShowing: isShowing,

        enable: enable,
        disable: disable,
        toggle: toggle,
        isActive: isActive
    };

    return service;

    ///////
    function enable(){
        service.isShowing = true;
    }
    function disable(){
        service.isShowing = false;
    }
    function toggle(){
        service.isShowing = !service.isShowing;
    }
    function isActive(){
        return service.isShowing;
    }
}

})();