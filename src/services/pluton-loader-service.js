angular
    .module('pluton-loader.services')
    .service('PlutonLoaderService', PlutonLoaderService );

/* @ngInject */
function PlutonLoaderService(){
    var vm = this;

    var isShowing = false;

    var service = {
        isShowing: isShowing,

        enable: enable,
        disable: disable,
        toggle: toggle,
        isActive: isActive
    };

    return service;

    ///////
    function enable(){
        service.isShowing = true;
    }
    function disable(){
        service.isShowing = false;
    }
    function toggle(){
        service.isShowing = !service.isShowing;
    }
    function isActive(){
        return service.isShowing;
    }
}
