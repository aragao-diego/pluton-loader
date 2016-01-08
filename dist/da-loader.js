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
};

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

LoaderController.$inject = ["$controller"];angular
    .module('da-loader.controllers')
    .controller('LoaderController', LoaderController);

/*@ngInject*/
function LoaderController($controller){
    
}

LoaderUiRouterController.$inject = ["$rootScope", "LoaderService"];angular
    .module('da-loader.controllers')
    .controller('LoaderNgRouterController', LoaderUiRouterController);

/* @ngInject */
function LoaderUiRouterController($rootScope, LoaderService){
    var vm = this;

    return vm;

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

LoaderUiRouterController.$inject = ["$rootScope", "LoaderService"];angular
    .module('da-loader.controllers')
    .controller('LoaderUiRouterController', LoaderUiRouterController);

/* @ngInject */
function LoaderUiRouterController($rootScope, LoaderService){
    var vm = {
        config: config


    };

    return vm;


    function config(){
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            LoaderService.enable();
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            LoaderService.disable();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            LoaderService.disable();
        });

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            LoaderService.disable();
        });
    };    
}

LoaderDirective.$inject = ["$rootScope", "LoaderService"];
angular
    .module('da-loader.directives')
    .directive('daLoader', LoaderDirective);

/* @ngInject */
function LoaderDirective($rootScope, LoaderService){
    return {
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: "@",
        name: "controller",
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
        }            
    };

    function preLink($scope, element, attrs, controller) {
        if( !attrs.controller ){
            attrs.controller = "LoaderUiRouterController";
        }
    };

    function postLink($scope, element, attrs, controller) {
        $scope.displayStatus = LoaderService.isActive() ? 'block' : 'none';            

        $scope.$watch(function(){
            return LoaderService.isActive();
        }, function(newValue){
            $scope.displayStatus = LoaderService.isActive() ? 'block' : 'none';
        });        
    };
};

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
    };
    function disable(){
        service.isShowing = false;
    };
    function toggle(){
        service.isShowing = !service.isShowing;
    };
    function isActive(){
        return service.isShowing;
    };
}

viewConfig.$inject = ["$templateCache"];angular
    .module('da-loader.views')
    .run(viewConfig);
    
/* @ngInject */
function viewConfig($templateCache){
    //$templateCache.put('da-loader/loader.html', '<div class="da-loader" ng-style="{\'display\': displayStatus()}"></div>');
}
})();