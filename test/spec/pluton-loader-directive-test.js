// describe('Diretiva do loader', function() {
//     'use strict';
//
//     var PlutonLoaderService;
//     var $rootScope;
//     var $state;
//     var $templateCache;
//     var stateProvider;
//     var $timeout;
//     var $compile;
//     var directive;
//     var $scope;
//     var $controller;
//     var controlador;
//
//     beforeEach( function(){
//         module('ui.router');
//         module('oc.lazyLoad')
//         module('pluton-loader.services');
//         module('pluton-loader.directives');
//     });
//
//     angular
//         .module('pluton-loader.directives')
//         .controller('TestController', function($scope){
//             $scope.info;
//             $scope.loaded = false;
//
//             this.setUp = function(){
//                 $scope.loaded = true;
//                 console.log($scope.info);
//             }
//         });
//
//
//     beforeEach( inject(function(_$state_, _$rootScope_, _PlutonLoaderService_, _$timeout_, _$compile_, _$templateCache_, _$controller_){
//         $state = _$state_;
//         $rootScope = _$rootScope_;
//         PlutonLoaderService = _PlutonLoaderService_;
//         $timeout = _$timeout_;
//         $compile = _$compile_;
//         $templateCache = _$templateCache_;
//         $controller = _$controller_;
//
//     }));
//
//     describe('Compilação simples da diretiva', function(){
//         beforeEach( function(){
//             $templateCache.put('pluton-loader/loader.html','<div class="pluton-loader" controller="TestController">loading {{info}}</div>');
//
//             $scope = $rootScope.$new();
//             $scope.info = "";
//             $scope.loaded = false;
//
//
//         });
//
//         it('Conteúdo da diretiva deve ser o esperado de acordo com o template informado',function(){
//             $scope.info = "From controller";
//
//             directive = compiledDirective();
//
//             expect(directive.html()).toBe("loading From controller");
//         });
//
//         it('Executa o comando de setUp na criação da diretiva', function(){
//             $scope.info = "From test";
//             controlador = $controller("TestController", {'$scope': $scope, PlutonLoaderService: PlutonLoaderService});
//             directive = compiledDirective();
//             console.log($scope.info);
//
//             expect($scope.loaded).toBeTruthy();
//         });
//     });
//
//
//
//     function compiledDirective(){
//         //$scope = $rootScope.$new();
//
//         var element = angular.element('<pluton-loader></pluton-loader>');
//         var compiledElement = $compile(element)($scope);
//
//         $rootScope.$digest();
//         return compiledElement;
//     }
// })
