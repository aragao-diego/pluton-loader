describe('Testando o controlador prinicipal da diretiva', function(){
    'use strict';

    var $rootScope;
    var $scope;
    var $controller;
    var controlador;
    var LoaderService;

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad');
        module('da-loader.services');
        module('da-loader.controllers');
    });

    angular
        .module('da-loader.controllers')
        .controller('TestController', function($scope){
            $scope.called = false;
            this.setUp = function(){
                $scope.called = true;
            };
            this.tearDown = function(){

            };
        })
        .controller('TestBadController', function($scope){
            $scope.called = false;
        });


    beforeEach( inject(function(_$rootScope_, _$controller_, _LoaderService_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        LoaderService = _LoaderService_;

        $scope = $rootScope.$new();


    }));








});
