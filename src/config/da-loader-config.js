angular
    .module('da-loader')
    .config(configLoader);

/* @ngInject */
function configLoader($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'da-loader',
            files: [
                'bower_components/da-loader/dist/da-loader.html',
                
            ]
        }]
    });
}