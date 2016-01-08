describe('Controlador implementando os recursos do UI ROUTER', function() {
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

    beforeEach( inject(function(_$rootScope_, _$controller_, _LoaderService_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        LoaderService = _LoaderService_;

        $scope = $rootScope.$new();

        controlador = $controller('LoaderUiRouterController', {'$scope': $scope, LoaderService: LoaderService});
    }));


    describe('Propriedades do escopo do controlador', function(){
        it('Ter o método setUp', function(){
            expect(controlador).toHaveMethod('setUp');
        });   
        it('Ter o método tearDown', function(){
            expect(controlador).toHaveMethod('tearDown');
        });      
    });

    describe('Registra os e responde aos eventos esperados depois da função setUp', function(){
        beforeEach(function(){
            controlador.setUp();
        });

        it('Escuta o evento $stateChangeStart', function(){            
            spyOn(LoaderService,'enable').and.callThrough();

            $rootScope.$broadcast('$stateChangeStart', {});

            expect(LoaderService.enable).toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeTruthy();
        });

        it('Escuta o evento $stateChangeError', function(){
            spyOn(LoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeError', {});

            expect(LoaderService.disable).toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeFalse();
        });

        it('Escuta o evento $stateChangeSuccess', function(){
            spyOn(LoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeSuccess', {});

            expect(LoaderService.disable).toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeFalse();
        });

        it('Escuta o evento $stateNotFound', function(){
            spyOn(LoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateNotFound', {});

            expect(LoaderService.disable).toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeFalse();
        });
    });

    describe('Registra e desregistra e não deve responder os eventos', function(){
        beforeEach(function(){
            controlador.setUp();
            controlador.tearDown();
        });

        it('Não escuta o evento $stateChangeStart', function(){            
            spyOn(LoaderService,'enable').and.callThrough();

            $rootScope.$broadcast('$stateChangeStart', {});

            expect(LoaderService.enable).not.toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeFalse();
        });

        it('Não Escuta o evento $stateChangeError', function(){
            spyOn(LoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeError', {});

            expect(LoaderService.disable).not.toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeFalse();
        });

        it('Não Escuta o evento $stateChangeSuccess', function(){
            spyOn(LoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeSuccess', {});

            expect(LoaderService.disable).not.toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeFalse();
        });

        it('Não Escuta o evento $stateNotFound', function(){
            spyOn(LoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateNotFound', {});

            expect(LoaderService.disable).not.toHaveBeenCalled();
            expect(LoaderService.isShowing).toBeFalse();
        });
    });
})