(function(){
'use strict'
var moduleName = 'pluton-loader';

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
    .module('pluton-loader')
    .config(configLoader);

/* @ngInject */
function configLoader($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'pluton-loader',
            serie: true,
            files: [
                'bower_components/pluton-loader/dist/pluton-loader.css',
                'bower_components/pluton-loader/dist/pluton-loader.html'
            ]
        }]
    });
}


PlutonLoaderController.$inject = ["$scope", "$controller", "$rootScope", "PlutonLoaderService"];angular
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

(function(){
    LoaderHttpController.$inject = ["$scope", "PlutonLoaderService"];
    angular
        .module('pluton-loader.controllers')
        .controller('LoaderHttpController', LoaderHttpController);

    /* @ngInject */
    function LoaderHttpController($scope, PlutonLoaderService){
        var vm = this;

        vm.setUp = setUp;
        vm.tearDown = tearDown;

        ///////////
        //@TODO Registrar interceptor por meio de algum serviço (tempo de execução)
        function setUp(){
        }

        //@TODO Desregistrar interceptor por meio de algum serviço (tempo de execução)
        function tearDown(){
        }
    }
})();


LoaderNgRouterController.$inject = ["$scope", "$rootScope", "PlutonLoaderService"];angular
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


LoaderRestangularController.$inject = ["$scope", "PlutonLoaderService", "Restangular"];angular
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


LoaderUiRouterController.$inject = ["$scope", "$rootScope", "PlutonLoaderService"];angular
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


LoaderDirective.$inject = ["$rootScope", "PlutonLoaderService", "$parse"];
angular
    .module('pluton-loader.directives')
    .directive('plutonLoader', LoaderDirective);

/* @ngInject */
function LoaderDirective($rootScope, PlutonLoaderService, $parse){
    return {
        scope: true,
        priority: 500,
        controller: "PlutonLoaderController",
        controllerAs: "vm",
        restrict: 'AE',
        templateUrl: 'pluton-loader/loader.html',
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

        controller.createHooks();
        controller.setUp();
    }
    function postLink($scope, element, attrs, controller){
    }
}

(function(){
    LoaderHttpInterceptorFactory.$inject = ["$q", "PlutonLoaderService"];
    angular
        .module('pluton-loader.services')
        .factory('PlutonLoaderHttpInterceptor', LoaderHttpInterceptorFactory);

    /*@ngInject*/
    function LoaderHttpInterceptorFactory($q, PlutonLoaderService) {
        var interceptor = {
            // optional method
            'request': requestInterceptor,
            'requestError': requestErrorInterceptor,
            'response': responseInterceptor,
            'responseError': reponseErrorInterceptor,
            'pendingRequests': 0,
            'incrementRequest': incrementRequest,
            'decrementRequest': decrementRequest,
            'hasPendingRequests': hasPendingRequests
        };
        return interceptor;

        ///////////////
        function requestInterceptor(config){
            if(notUseLoader(config)){
                return config;
            }

            interceptor.incrementRequest();
            if (hasPendingRequests()) {
                PlutonLoaderService.enable();
            }


            return config;
        }

        function requestErrorInterceptor(rejection){
            return $q.reject(rejection);
        }

        function responseInterceptor(response){
            if(notUseLoader(response.config)){
                return response;
            }

            interceptor.decrementRequest();
            if (!interceptor.hasPendingRequests()) {
                PlutonLoaderService.disable();
            }

            return response;
        }

        function reponseErrorInterceptor(rejection){
            if(notUseLoader(rejection.config)){
                return $q.reject(rejection);
            }

            interceptor.decrementRequest();
            if (!interceptor.hasPendingRequests()) {
                PlutonLoaderService.disable();
            }

            return $q.reject(rejection);
        }

        function notUseLoader(data){
            if(data && data.hasOwnProperty('pluton-loader') && data['pluton-loader'] === false ){
                return true;
            }

            return false;
        }

        function incrementRequest(){
            interceptor.pendingRequests++;
        }

        function decrementRequest(){
            interceptor.pendingRequests--;
        }

        function hasPendingRequests(){
            return interceptor.pendingRequests > 0;
        }
    }
})();

angular
    .module('pluton-loader.services')
    .service('PlutonLoaderService', PlutonLoaderService );

/* @ngInject */
function PlutonLoaderService(){
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