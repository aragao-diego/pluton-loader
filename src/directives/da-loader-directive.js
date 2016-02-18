
angular
    .module('da-loader.directives')
    .directive('daLoader', LoaderDirective);

/* @ngInject */
function LoaderDirective($rootScope, LoaderService, $parse){
    return {
        scope: true,
        priority: 500,
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
        controller.createHooks();
        controller.setUp();
    }
}
