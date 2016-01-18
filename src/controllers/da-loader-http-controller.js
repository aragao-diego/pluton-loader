(function(){
    angular
        .module('da-loader.controllers')
        .controller('LoaderRestangularController', LoaderHttpController);

    /* @ngInject */
    function LoaderHttpController($scope, LoaderService){
        var vm = this;

        ///////////
        function setUp(){
        }

        function tearDown(){
        }
    }


})();
