'use strict';

angular.module('myApp.formLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/formLogin', {
    templateUrl: 'formLogin/formLogin.html',
    controller: 'formLogin'
  });
}])
