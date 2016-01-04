(function(){
'use strict'
var subModules = ['controllers', 'directives', 'services', 'views'];
subModules.forEach(createSubModules);

var module = 'da-loader';

angular
    .module(module, ['ui.router', 'oc.lazyLoad'].concat(subModules) );

function createSubModules(element, index, array){
    var moduleName = module+element;
    angular.module(moduleName, []);
    array[index] = moduleName;
};

configDaLoader.$inject = ["$ocLazyLoadProvider"];angular
    .module('da-loader')
    .config(configDaLoader);

/* @ngInject */
function configDaLoader($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'da-loader',
            files: [
                'bower_components/da-loader/dist/da-loader.html',
                'bower_components/da-loader/dist/da-loader.css'
            ]
        }]
    });
}

DaLoaderController.$inject = ["$scope"];angular
    .module('da-loader')
    .controller('daLoaderController', DaLoaderController);

/* @ngInject */
function DaLoaderController($scope){

}


LoaderDirective.$inject = ["$rootScope", "LoaderService"];
angular
    .module('da-loader')
    .directive('daLoader', LoaderDirective);

/* @ngInject */
function LoaderDirective($rootScope, LoaderService){
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AE',
        // template: '',
        templateUrl: 'id-loader/loader.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, element, attrs, controller) {

            $scope.displayStatus = function(){
                return LoaderService.status() ? 'block' : 'none';
            }


            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                LoaderService.show();
                //event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
                console.log('$stateChangeStart');
            });


            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
                LoaderService.hide();
                //event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
                console.log('$stateChangeError');
            });


            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                LoaderService.hide();
                //event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
                console.log('$stateChangeSuccess');
            });


            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
                LoaderService.hide();
                //event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
                console.log('$stateNotFound');
            });
        }
    };
}


LoaderService.$inject = ["$state"];angular
    .module('da-loader')
    .service('LoaderService', LoaderService );

/* @ngInject */
function LoaderService($state){
    var vm = this;

    var isShowing = false;

    var service = {
        isShowing: isShowing,

        show: show,
        hide: hide,
        toggle: toggle,
        status: status
    };

    return service;

    ///////

    function show(){
        service.isShowing = true;
    };
    function hide(){
        service.isShowing = false;
    };
    function toggle(){
        service.isShowing = !service.isShowing;
    };
    function status(){
        return service.isShowing;
    };
}

viewConfig.$inject = ["$templateCache"];angular
    .module('da-loader')
    .run(viewConfig);
    
/* @ngInject */
function viewConfig($templateCache){
    $templateCache.put('da-loader/loader.html', '<div class="da-loader" ng-style="{\'display\': displayStatus()}"></div>');
}
})();