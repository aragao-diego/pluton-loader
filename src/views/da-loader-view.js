(function(){
angular
    .module('da-loader')
    .run(ViewConfig);

function ViewConfig($templateCache){
    $templateCache.put('id-loader/loader.html', '<div id="loading" ng-style="{\'display\': displayStatus()}"></div>');
}

})();