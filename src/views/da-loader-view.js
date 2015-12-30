angular
    .module('da-loader')
    .run(ViewConfig);
    
/* @ngInject */
function ViewConfig($templateCache){
    $templateCache.put('da-loader/loader.html', '<div id="loading" ng-style="{\'display\': displayStatus()}"></div>');
}