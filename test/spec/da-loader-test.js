describe('Diretiva com o controlador ui-router do loader', function() {
    'use strict';
    /*
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
        module('da-loader.controllers');   
    });

    beforeEach( module(function($stateProvider, $provide, $urlRouterProvider){
        stateProvider = $stateProvider; 
        //$urlRouterProvider.deferIntercept();

        angular.forEach(_states, function(stateConfig, stateName){
            stateProvider.state(stateName,stateConfig);
        }); 
    }));

    beforeEach( inject(function(_$state_, _$rootScope_, _LoaderService_, _$timeout_, _$compile_, _$templateCache_, _$controller_){
        $state = _$state_;
        $rootScope = _$rootScope_;
        LoaderService = _LoaderService_;
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

        it('Deve chamar enable e disabled quando mudar para um state valido', inject(function(LoaderService){
            spyOn(LoaderService,"enable");
            spyOn(LoaderService,"disable");
            directive = compiledDirective(); 

            $state.transitionTo('app.tela1', {}, {});
            $rootScope.$digest();

            expect($state.current.name).toBe('app.tela1');
            expect(LoaderService.enable).toHaveBeenCalled();
            expect(LoaderService.disable).toHaveBeenCalled();  
        }));

        it('Deve chamar disabled quando mudar para um state invalido', inject(function(LoaderService){
            $state.transitionTo('app', {}, {});
            $rootScope.$digest();

            spyOn(LoaderService,"enable");
            spyOn(LoaderService,"disable");

            directive = compiledDirective(); 

            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
                event.preventDefault();
            });

            $state.transitionTo('app.nao-existe', {}, {});
            $rootScope.$digest(); 
            

            expect($state.current.name).toBe('app');
            expect(LoaderService.disable).toHaveBeenCalled();
            expect(LoaderService.isActive()).toBeFalse();
        }));

    });



    function compiledDirective(){
        $scope = $rootScope.$new();

        var element = angular.element('<da-loader></da-loader>');
        var compiledElement = $compile(element)($scope);

        $rootScope.$digest();
        return compiledElement;
    }
    */
})