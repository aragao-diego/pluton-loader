var subModules = ['controllers', 'directives', 'services', 'views'];
subModules.forEach(createSubModules);


angular
    .module('da-loader', ['ui.router'].concat(subModules) );


var version = '0.0.41';


function createSubModules(element, index, array){
    var moduleName = 'da-loder.'+element;
    angular.module(moduleName, []);
    array[index] = moduleName;
};