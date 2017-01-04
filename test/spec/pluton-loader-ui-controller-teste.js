describe('Controlador implementando os recursos do UI ROUTER', function() {
    'use strict';

    var $rootScope;
    var $scope;
    var $controller;
    var controlador;
    var PlutonLoaderService;

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad');
        module('pluton-loader.services');
        module('pluton-loader.controllers');
    });

    beforeEach( inject(function(_$rootScope_, _$controller_, _PlutonLoaderService_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        PlutonLoaderService = _PlutonLoaderService_;

        $scope = $rootScope.$new();

        controlador = $controller('LoaderUiRouterController', {'$scope': $scope, PlutonLoaderService: PlutonLoaderService});
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
            spyOn(PlutonLoaderService,'enable').and.callThrough();

            $rootScope.$broadcast('$stateChangeStart', {});

            expect(PlutonLoaderService.enable).toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeTruthy();
        });

        it('Escuta o evento $stateChangeError', function(){
            spyOn(PlutonLoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeError', {});

            expect(PlutonLoaderService.disable).toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeFalse();
        });

        it('Escuta o evento $stateChangeSuccess', function(){
            spyOn(PlutonLoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeSuccess', {});

            expect(PlutonLoaderService.disable).toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeFalse();
        });

        it('Escuta o evento $stateNotFound', function(){
            spyOn(PlutonLoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateNotFound', {});

            expect(PlutonLoaderService.disable).toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeFalse();
        });
    });

    describe('Registra e desregistra e não deve responder os eventos', function(){
        beforeEach(function(){
            controlador.setUp();
            controlador.tearDown();
        });

        it('Não escuta o evento $stateChangeStart', function(){
            spyOn(PlutonLoaderService,'enable').and.callThrough();

            $rootScope.$broadcast('$stateChangeStart', {});

            expect(PlutonLoaderService.enable).not.toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeFalse();
        });

        it('Não Escuta o evento $stateChangeError', function(){
            spyOn(PlutonLoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeError', {});

            expect(PlutonLoaderService.disable).not.toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeFalse();
        });

        it('Não Escuta o evento $stateChangeSuccess', function(){
            spyOn(PlutonLoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateChangeSuccess', {});

            expect(PlutonLoaderService.disable).not.toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeFalse();
        });

        it('Não Escuta o evento $stateNotFound', function(){
            spyOn(PlutonLoaderService,'disable').and.callThrough();

            $rootScope.$broadcast('$stateNotFound', {});

            expect(PlutonLoaderService.disable).not.toHaveBeenCalled();
            expect(PlutonLoaderService.isShowing).toBeFalse();
        });
    });
});
