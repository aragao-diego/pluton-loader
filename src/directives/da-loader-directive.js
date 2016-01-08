
angular
    .module('da-loader.directives')
    .directive('daLoader', LoaderDirective);

/* @ngInject */
function LoaderDirective($rootScope, LoaderService){
    return {
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: "DALoaderController",
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
            attrs.hooks = ["LoaderUiRouterController"];
        }

        if(!Array.isArray(attrs.hooks)){
            attrs.hooks = [attrs.hooks];
        }

        $scope.hooks = attrs.hooks;
        delete attrs.hooks;
    }

    function postLink($scope, element, attrs, controller) {
        console.log(controller);
        controller.setUp();
    }
}
