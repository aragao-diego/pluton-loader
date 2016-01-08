describe('Diretiva do loader', function() {
    'use strict';

    var LoaderService;
    var $rootScope;
    var $state;
    var $templateCache;
    var stateProvider;
    var $timeout;
    var $compile;
    var directive;
    var $scope;
    var $controller;
    var controlador;

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad')
        module('da-loader.services');   
        module('da-loader.directives');
    });
    
    angular
        .module('da-loader.directives')
        .controller('TestController', function($scope){
            $scope.info;
            $scope.loaded = false;

            this.setUp = function(){
                $scope.loaded = true;
                console.log($scope.info);
            }
        });


    beforeEach( inject(function(_$state_, _$rootScope_, _LoaderService_, _$timeout_, _$compile_, _$templateCache_, _$controller_){
        $state = _$state_;
        $rootScope = _$rootScope_;
        LoaderService = _LoaderService_;
        $timeout = _$timeout_;
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $controller = _$controller_;           
        
    }));

    describe('Compilação simples da diretiva', function(){ 
        beforeEach( function(){
            $templateCache.put('da-loader/loader.html','<div class="da-loader" controller="TestController">loading {{info}}</div>');

            $scope = $rootScope.$new();
            $scope.info = "";
            $scope.loaded = false;  

            controlador = $controller("TestController", {'$scope': $scope, LoaderService: LoaderService});
        });

        it('Conteúdo da diretiva deve ser o esperado de acordo com o template informado',function(){  
            $scope.info = "From controller";

            directive = compiledDirective();

            expect(directive.html()).toBe("loading From controller");
        });

        it('Executa o comando de setUp na criação da diretiva', function(){
            $scope.info = "From test";
            
            directive = compiledDirective();
            console.log($scope.info);

            expect($scope.loaded).toBeTruthy();
        });
    });



    function compiledDirective(){
        //$scope = $rootScope.$new();

        var element = angular.element('<da-loader></da-loader>');
        var compiledElement = $compile(element)($scope);

        $rootScope.$digest();
        return compiledElement;
    }
})