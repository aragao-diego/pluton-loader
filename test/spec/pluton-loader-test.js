describe('Diretiva com o controlador ui-router do loader', function() {
    'use strict';
    /*
    var PlutonLoaderService;
    var $rootScope;
    var $state;
    var $templateCache;
    var stateProvider;
    var $timeout;
    var $compile;
    var directive;
    var $scope;
    var $controller;
    var _states = {
        'app': {
            url: '/app',                
            resolve: {               
            }
        },
        'app.tela1': {
            url: '/tela1',                
            resolve: {
            }
        },
        'app.tela2': {
            url: '/tela2',                
            resolve: {
            }
        }
    };

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad')
        module('pluton-loader.controllers');   
    });

    beforeEach( module(function($stateProvider, $provide, $urlRouterProvider){
        stateProvider = $stateProvider; 
        //$urlRouterProvider.deferIntercept();

        angular.forEach(_states, function(stateConfig, stateName){
            stateProvider.state(stateName,stateConfig);
        }); 
    }));

    beforeEach( inject(function(_$state_, _$rootScope_, _PlutonLoaderService_, _$timeout_, _$compile_, _$templateCache_, _$controller_){
        $state = _$state_;
        $rootScope = _$rootScope_;
        PlutonLoaderService = _PlutonLoaderService_;
        $timeout = _$timeout_;
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $controller = _$controller_;

        
    }));
    
    describe('Eventos de mudança de states', function(){  
        it('$state inicial ser app',function(){  
            $state.transitionTo('app', {}, {});
            $rootScope.$digest(); 

            expect($state.current.name).toBe('app');
        });

        it('Deve chamar enable e disabled quando mudar para um state valido', inject(function(PlutonLoaderService){
            spyOn(PlutonLoaderService,"enable");
            spyOn(PlutonLoaderService,"disable");
            directive = compiledDirective(); 

            $state.transitionTo('app.tela1', {}, {});
            $rootScope.$digest();

            expect($state.current.name).toBe('app.tela1');
            expect(PlutonLoaderService.enable).toHaveBeenCalled();
            expect(PlutonLoaderService.disable).toHaveBeenCalled();  
        }));

        it('Deve chamar disabled quando mudar para um state invalido', inject(function(PlutonLoaderService){
            $state.transitionTo('app', {}, {});
            $rootScope.$digest();

            spyOn(PlutonLoaderService,"enable");
            spyOn(PlutonLoaderService,"disable");

            directive = compiledDirective(); 

            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
                event.preventDefault();
            });

            $state.transitionTo('app.nao-existe', {}, {});
            $rootScope.$digest(); 
            

            expect($state.current.name).toBe('app');
            expect(PlutonLoaderService.disable).toHaveBeenCalled();
            expect(PlutonLoaderService.isActive()).toBeFalse();
        }));

    });



    function compiledDirective(){
        $scope = $rootScope.$new();

        var element = angular.element('<pluton-loader></pluton-loader>');
        var compiledElement = $compile(element)($scope);

        $rootScope.$digest();
        return compiledElement;
    }
    */
})