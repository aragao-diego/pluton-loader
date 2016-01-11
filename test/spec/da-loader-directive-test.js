describe('Diretiva do loader', function() {
    'use strict';

    var LoaderService;
    var $rootScope;
    var $state;
    var $templateCache;
    var $timeout;
    var $compile;
    var directive;
    var $scope;
    var $controller;
    var controlador;
    var $parse;

    beforeEach( function(){
        module('ui.router');
        module('oc.lazyLoad');
        module('da-loader.services');
        module('da-loader.directives');
        module('da-loader.controllers');
    });

    angular
        .module('da-loader.directives')
        .controller('TestController', function($scope){
            $scope.info = 'From controller';
            $scope.loaded = false;

            this.setUp = function(){
                $scope.loaded = true;
            };
            this.tearDown = function(){
                console.log('tearDown()!');
            };
        })
        .controller('TestController2', function(){
            this.setUp = function(){
                console.log('TestController2->setUp');
            };
            this.tearDown = function(){
                console.log('TestController2->tearDown');
            };
        })
        .controller('TestBadController', function($scope){
            $scope.info = 'Bad controller';
        });


    beforeEach( inject(function(_$state_, _$rootScope_, _LoaderService_, _$timeout_, _$compile_, _$templateCache_, _$controller_, _$parse_){
        $state = _$state_;
        $rootScope = _$rootScope_;
        LoaderService = _LoaderService_;
        $timeout = _$timeout_;
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $controller = _$controller_;
        $parse = _$parse_;

    }));

    describe('Compilação simples da diretiva', function(){
        beforeEach( function(){
            $scope = $rootScope.$new();
            $scope.info = '';
            $scope.loaded = false;
        });

        it('Conteúdo da diretiva deve ser o esperado de acordo com o template informado',function(){
            $scope.info = 'From controller';
            $templateCache.put('da-loader/loader.html','<div class="da-loader">loading {{info}}</div>');
            directive = compiledDirective('TestController');

            expect(directive.html()).toBe('loading From controller');
        });

        it('Deve colocar um hook do attrs no escopo(declarado como array)', function(){
            $templateCache.put('da-loader/loader.html','<div class="da-loader"></div>');
            directive = compiledDirective('[\'TestController\']');

            expect(directive.scope().hooks).toBeArray();
            expect(directive.scope().hooks.length).toBe(1);
        });

        it('Deve colocar dois hooks do attrs no escopo', function(){
            $templateCache.put('da-loader/loader.html','<div class="da-loader"></div>');
            directive = compiledDirective('[\'TestController\', \'TestController2\']');

            expect(directive.scope().hooks).toBeArray();
            expect(directive.scope().hooks.length).toBe(2);
        });

        it('Deve chamar o tearDown depois que a diretiva for removida', function(){
            $templateCache.put('da-loader/loader.html','<div class="da-loader"></div>');
            directive = compiledDirective('[\'TestController\']');

            directive.remove();
            $rootScope.$digest();

        });
    });

    function compiledDirective(hooks){
        var element = angular.element('<da-loader hooks="'+hooks+'">{{}}</da-loader>');
        var compiledElement = $compile(element)($scope);

        $rootScope.$digest();
        return compiledElement;
    }
});
