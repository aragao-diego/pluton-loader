(function(){
    angular
        .module('da-loader.services')
        .factory('daLoaderHttpInterceptor', LoaderHttpInterceptorFactory);

    /*@ngInject*/
    function LoaderHttpInterceptorFactory($q, LoaderService) {
        return {
            // optional method
            'request': requestInterceptor,
            'requestError': requestErrorInterceptor,
            'response': responseInterceptor,
            'responseError': reponseErrorInterceptor
        };
        ///////////////
        function requestInterceptor(config){
            return config;
        }

        function requestErrorInterceptor(rejection){
            return rejection;
        }

        function responseInterceptor(response){
            return response;
        }

        function reponseErrorInterceptor(rejection){
            return rejection;
        }
    }
})();
