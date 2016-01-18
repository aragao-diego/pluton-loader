(function(){
    angular
        .module('da-loader.services')
        .factory('daLoaderHttpInterceptor', LoaderHttpInterceptorFactory);

    /*@ngInject*/
    function LoaderHttpInterceptorFactory($q, LoaderService) {
        var interceptor = {
            // optional method
            'request': requestInterceptor,
            'requestError': requestErrorInterceptor,
            'response': responseInterceptor,
            'responseError': reponseErrorInterceptor,
            'pendingRequests': 0
        };
        return interceptor;

        ///////////////
        function requestInterceptor(config){
            if(notUseLoader(config.headers)){
                return config;
            }

            if (interceptor.pendingRequests === 0) {
                LoaderService.enable();
            }
            interceptor.incrementRequest();

            return config;
        }

        function requestErrorInterceptor(rejection){
            return rejection;
        }

        function responseInterceptor(response){
            if(notUseLoader(response.config.headers)){
                return response;
            }

            interceptor.decrementRequest();
            if (!interceptor.hasPendingRequests()) {
                LoaderService.disable();
            }

            return response;
        }

        function reponseErrorInterceptor(rejection){
            if(notUseLoader(rejection.config.headers)){
                return rejection;
            }

            interceptor.decrementRequest();
            if (!interceptor.hasPendingRequests()) {
                LoaderService.disable();
            }

            return rejection;
        }

        function notUseLoader(data){
            if(data && data.hasOwnProperty('da-loader') && data['da-loader'] === false ){
                return true;
            }

            return false;
        }

        function incrementRequest(){
            interceptor.pendingRequests++;
        }

        function decrementRequest(){
            interceptor.pendingRequests--;
        }

        function hasPendingRequests(){
            return interceptor.pendingRequests > 0;
        }
    }
})();
