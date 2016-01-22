# da-loader

### Serviço

**LoaderService** [$state]

 * enable() -> Habilita o loader
 * disable() -> Desabilita o loader
 * toggle() -> Muda o status do loader
 * isActive() -> Retorna o estado atual do loader

### Views

O template utilizado para a renderização da diretiva é __da-loader/loader.html__

#### Variáveis do escopo do template

* $scope.display -> Booleano para o status do loader



## Como usar

````html
<da-loader [hooks="['Controlador1', 'Controlador2']"]></da-loader>
````

## Customizações

Para inserir funcionalidades adicionais, criar um controlador que implementa as seguintes funções:

````javascript
setUp() -> Executada na criação da diretiva
tearDown() -> Executada na destruição da diretiva
````

````javascript
<da-loader hooks="['LoaderRestangularController', 'LoaderUiRouterController']"></da-loader>
````

## Informações

### UI ROUTER
* Os eventos de notificações das transições do _$state_ são disparados ANTES de qualquer ação(evento -> resolve -> controller);
* O evento '$destroy' da diretiva é chamado _APÓS_ a finalização da mudança do _$state_

### RESTANGULAR
* Há a possibilidade de fazer requisições sem o loader, para isso:
  1) Configurar o modo de resposta como full:
````
Restangular.setFullResponse(true);
````
  2) Usar a configuração customizada para a requisição (cabeçario http 'da-loader' como false)
````
Restangular.one('exemplo/testelongsemloader').withHttpConfig({'da-loader':false, cache: false}).getList()
````
