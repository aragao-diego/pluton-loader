(function(){
    angular
        .module('pluton-loader.services')
        .factory('PlutonLoaderHttpInterceptor', LoaderHttpInterceptorFactory);

    /*@ngInject*/
    function LoaderHttpInterceptorFactory($q, PlutonLoaderService) {
        var interceptor = {
            // optional method
            'request': requestInterceptor,
            'requestError': requestErrorInterceptor,
            'response': responseInterceptor,
            'responseError': reponseErrorInterceptor,
            'pendingRequests': 0,
            'incrementRequest': incrementRequest,
            'decrementRequest': decrementRequest,
            'hasPendingRequests': hasPendingRequests
        };
        return interceptor;

        ///////////////
        function requestInterceptor(config){
            if(notUseLoader(config)){
                return config;
            }

            interceptor.incrementRequest();
            if (hasPendingRequests()) {
                PlutonLoaderService.enable();
            }


            return config;
        }

        function requestErrorInterceptor(rejection){
            return $q.reject(rejection);
        }

        function responseInterceptor(response){
            if(notUseLoader(response.config)){
                return response;
            }

            interceptor.decrementRequest();
            if (!interceptor.hasPendingRequests()) {
                PlutonLoaderService.disable();
            }

            return response;
        }

        function reponseErrorInterceptor(rejection){
            if(notUseLoader(rejection.config)){
                return $q.reject(rejection);
            }

            interceptor.decrementRequest();
            if (!interceptor.hasPendingRequests()) {
                PlutonLoaderService.disable();
            }

            return $q.reject(rejection);
        }

        function notUseLoader(data){
            if(data && data.hasOwnProperty('pluton-loader') && data['pluton-loader'] === false ){
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
