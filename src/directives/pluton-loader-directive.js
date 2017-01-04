
angular
    .module('pluton-loader.directives')
    .directive('PlutonLoader', LoaderDirective);

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
