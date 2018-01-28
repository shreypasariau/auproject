'use strict';

angular.module('myApp.formRegister', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/formRegister', {
    templateUrl: 'formRegister/formRegister.html',
    controller: 'formRegister'
  });
}])
