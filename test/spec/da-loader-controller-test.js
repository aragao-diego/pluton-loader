describe('Testando o controlador prinicipal da diretiva', function(){
    'use strict';

    var $rootScope;
    var $scope;
    var $controller;
    var controlador;

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad');
        module('da-loader.controllers');
    });

    beforeEach( inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;

        $scope = $rootScope.$new();
    }));

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
        .controller('TestController2', function($scope){
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


    it('Dá erro quando um controlador de hook não implementa o contrato', inject(function($controller){
        $scope.hooks = ['TestBadController'];

        controlador = $controller('DALoaderController', {'$scope': $scope});
        expect(controlador.createHooks).toThrow( new Error('O controlador TestBadController não implementa as funções esperadas(setUp,tearDown)'));
    }));

    it('Instancia um controllador de hook informado e chama a função de setUp', inject(function($controller){
        $scope.hooks = ['TestController'];

        controlador = $controller('DALoaderController', {'$scope': $scope});
        controlador.createHooks();

        spyOn(controlador.hooks[0],'setUp');
        controlador.setUp();

        expect(controlador.hooks[0].setUp).toHaveBeenCalled();
    }));

    it('Instancia um controllador de hook informado e chama a função de tearDown', inject(function($controller){
        $scope.hooks = ['TestController'];

        controlador = $controller('DALoaderController', {'$scope': $scope});
        controlador.createHooks();
        controlador.setUp();

        spyOn(controlador.hooks[0],'tearDown');

        controlador.tearDown();

        expect(controlador.hooks[0].tearDown).toHaveBeenCalled();
    }));

    it('Instancia dois controladores de hooks e chama a função de setUp', inject(function($controller){
        $scope.hooks = ['TestController', 'TestController2'];

        controlador = $controller('DALoaderController', {'$scope': $scope});
        controlador.createHooks();

        spyOn(controlador.hooks[0],'setUp');
        spyOn(controlador.hooks[1],'setUp');
        controlador.setUp();

        expect(controlador.hooks[0].setUp).toHaveBeenCalled();
        expect(controlador.hooks[1].setUp).toHaveBeenCalled();
    }));

    it('Instancia um controllador de hook informado e chama a função de tearDown', inject(function($controller){
        $scope.hooks = ['TestController', 'TestController2'];

        controlador = $controller('DALoaderController', {'$scope': $scope});
        controlador.createHooks();
        controlador.setUp();

        spyOn(controlador.hooks[0],'tearDown');
        spyOn(controlador.hooks[1],'tearDown');

        controlador.tearDown();

        expect(controlador.hooks[0].tearDown).toHaveBeenCalled();
        expect(controlador.hooks[1].tearDown).toHaveBeenCalled();
    }));
});
