describe('Serviço do loader', function() {
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

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad');
        module('da-loader.services');
        module('da-loader.directives');
    });

    beforeEach( inject(function(_$state_, _$rootScope_, _LoaderService_, _$timeout_, _$compile_, _$templateCache_){
        $state = _$state_;
        $rootScope = _$rootScope_;
        LoaderService = _LoaderService_;
        $timeout = _$timeout_;
        $compile = _$compile_;
        $templateCache = _$templateCache_;

        $templateCache.put('da-loader/loader.html','<div class="da-loader">loading</div>');

    }));

    describe('Métodos e propriedades', inject(function(LoaderService){
        it('Que tenha função enable', function(){
            expect(LoaderService).toHaveMethod('enable');
        });
        it('Que tenha função disable', function(){
            expect(LoaderService).toHaveMethod('disable');
        });
        it('Que tenha função toggle', function(){
            expect(LoaderService).toHaveMethod('toggle');
        });
        it('Que tenha função isActive', function(){
            expect(LoaderService).toHaveMethod('isActive');
        });
    }));

    describe('Configurações iniciais do serviço', function(){
        it('Inicialmente, estado de carregamento é falso', function(){
            expect(LoaderService.isActive()).toBe(false);
        });
        it('Exibindo o loader com o enable', function(){
            LoaderService.enable();
            expect(LoaderService.isActive()).toBeTruthy();
        });
        it('Removendo exibição o loader com o disable', function(){
            LoaderService.disable();
            expect(LoaderService.isActive()).toBeFalse();
        });
        it('Exibindo o loader com o toggle', function(){
            LoaderService.disable();
            LoaderService.toggle();
            expect(LoaderService.isActive()).toBeTruthy();
        });
        it('Removendo a exibição o loader com o toggle', function(){
            LoaderService.enable();
            LoaderService.toggle();
            expect(LoaderService.isActive()).toBeFalse();
        });
    });
});
