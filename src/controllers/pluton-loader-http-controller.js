(function(){
    angular
        .module('pluton-loader.controllers')
        .controller('LoaderHttpController', LoaderHttpController);

    /* @ngInject */
    function LoaderHttpController($scope, PlutonLoaderService){
        var vm = this;

        vm.setUp = setUp;
        vm.tearDown = tearDown;

        ///////////
        //@TODO Registrar interceptor por meio de algum serviço (tempo de execução)
        function setUp(){
        }

        //@TODO Desregistrar interceptor por meio de algum serviço (tempo de execução)
        function tearDown(){
        }
    }
})();
