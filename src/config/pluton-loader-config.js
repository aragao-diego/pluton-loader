angular
    .module('pluton-loader')
    .config(configLoader);

/* @ngInject */
function configLoader($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'pluton-loader',
            serie: true,
            files: [
                'bower_components/pluton-loader/dist/pluton-loader.css',
                'bower_components/pluton-loader/dist/pluton-loader.html'
            ]
        }]
    });
}
