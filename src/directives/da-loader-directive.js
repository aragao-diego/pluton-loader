(function(){
angular
    .module('da-loader')
    .directive(LoaderDirective);

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
                return LoaderService.isShowing ? 'block' : 'none';
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
})();