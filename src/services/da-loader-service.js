angular
    .module('da-loader.services')
    .service('LoaderService', LoaderService );

/* @ngInject */
function LoaderService($state){
    var vm = this;

    var isShowing = false;

    var service = {
        isShowing: isShowing,

        show: show,
        hide: hide,
        toggle: toggle,
        status: status
    };

    return service;

    ///////

    function show(){
        service.isShowing = true;
    };
    function hide(){
        service.isShowing = false;
    };
    function toggle(){
        service.isShowing = !service.isShowing;
    };
    function status(){
        return service.isShowing;
    };
}