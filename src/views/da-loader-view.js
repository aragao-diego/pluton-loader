angular
    .module('da-loader')
    .run(ViewConfig);
    
/* @ngInject */
function ViewConfig($templateCache){
    $templateCache.put('da-loader/loader.html', '<div class="da-loader" ng-style="{\'display\': displayStatus()}"></div>');
}