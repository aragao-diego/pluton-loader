angular
    .module('da-loader')
    .config(configDaLoader);

/* @ngInject */
function configDaLoader($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'da-loader',
            files: [
                'bower_components/da-loader/dist/da-loader.html',
                'bower_components/da-loader/dist/da-loader.css'
            ]
        }]
    });
}