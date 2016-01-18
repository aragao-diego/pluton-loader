(function(){
    angular
        .module('da-loader.controllers')
        .controller('LoaderHttpController', LoaderHttpController);

    /* @ngInject */
    function LoaderHttpController($scope, LoaderService){
        var vm = this;

        ///////////
        //@TODO Registrar interceptor por meio de algum serviço (tempo de execução)
        function setUp(){
        }

        //@TODO Desregistrar interceptor por meio de algum serviço (tempo de execução)
        function tearDown(){
        }
    }
})();
