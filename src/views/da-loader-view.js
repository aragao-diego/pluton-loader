angular
    .module('da-loader.views')
    .run(viewConfig);
    
/* @ngInject */
function viewConfig($templateCache){
    //$templateCache.put('da-loader/loader.html', '<div class="da-loader" ng-style="{\'display\': displayStatus()}"></div>');
}