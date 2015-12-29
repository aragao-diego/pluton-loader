(function(){
'use strict';

angular
    .module('da-loader')
    .controller('daLoaderController', DaLoaderController);

DaLoaderController.$injector = ['$scope'];

function DaLoaderController(){

}
})();
(function(){
    
angular
    .module('da-loader', []);

})();
(function(){

ConfigRoutes.$inject = ["$scope", "servicoTeste"];
angular.module('da-loader')
    .config(ConfigRoutes);

/* @ngInject */
function ConfigRoutes($scope, servicoTeste){

}

})();
(function(){
angular
    .module('da-loader')
    .config(configViews);


function configViews(){

}
})();