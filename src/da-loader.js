var subModules = ['controllers', 'directives', 'services', 'views'];
subModules.forEach(createSubModules);

var module = 'da-loader';

angular
    .module(module, ['ui.router'].concat(subModules) );


var version = '0.0.94';


function createSubModules(element, index, array){
    var moduleName = module+element;
    angular.module(moduleName, []);
    array[index] = moduleName;
};