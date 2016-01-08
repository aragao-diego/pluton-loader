
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
        controller.setUp();

        $scope.displayStatus = LoaderService.isActive() ? 'block' : 'none';            

        $scope.$watch(function(){
            return LoaderService.isActive();
        }, function(newValue){
            $scope.displayStatus = LoaderService.isActive() ? 'block' : 'none';
        });        
    };
};