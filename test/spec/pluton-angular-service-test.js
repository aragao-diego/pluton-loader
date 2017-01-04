describe('Serviço do loader', function() {
    'use strict';

    var PlutonLoaderService;
    var $rootScope;
    var $state;
    var $templateCache;
    var stateProvider;
    var $timeout;
    var $compile;
    var directive;
    var $scope;

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad');
        module('pluton-loader.services');
        module('pluton-loader.directives');
    });

    beforeEach( inject(function(_$state_, _$rootScope_, _PlutonLoaderService_, _$timeout_, _$compile_, _$templateCache_){
        $state = _$state_;
        $rootScope = _$rootScope_;
        PlutonLoaderService = _PlutonLoaderService_;
        $timeout = _$timeout_;
        $compile = _$compile_;
        $templateCache = _$templateCache_;

        $templateCache.put('pluton-loader/loader.html','<div class="pluton-loader">loading</div>');

    }));

    describe('Métodos e propriedades', function(){
        it('Que tenha função enable', function(){
            expect(PlutonLoaderService).toHaveMethod('enable');
        });
        it('Que tenha função disable', function(){
            expect(PlutonLoaderService).toHaveMethod('disable');
        });
        it('Que tenha função toggle', function(){
            expect(PlutonLoaderService).toHaveMethod('toggle');
        });
        it('Que tenha função isActive', function(){
            expect(PlutonLoaderService).toHaveMethod('isActive');
        });
    });

    describe('Configurações iniciais do serviço', function(){
        it('Inicialmente, estado de carregamento é falso', function(){
            expect(PlutonLoaderService.isActive()).toBe(false);
        });
        it('Exibindo o loader com o enable', function(){
            PlutonLoaderService.enable();
            expect(PlutonLoaderService.isActive()).toBeTruthy();
        });
        it('Removendo exibição o loader com o disable', function(){
            PlutonLoaderService.disable();
            expect(PlutonLoaderService.isActive()).toBeFalse();
        });
        it('Exibindo o loader com o toggle', function(){
            PlutonLoaderService.disable();
            PlutonLoaderService.toggle();
            expect(PlutonLoaderService.isActive()).toBeTruthy();
        });
        it('Removendo a exibição o loader com o toggle', function(){
            PlutonLoaderService.enable();
            PlutonLoaderService.toggle();
            expect(PlutonLoaderService.isActive()).toBeFalse();
        });
    });
});
