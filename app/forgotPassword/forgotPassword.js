'use strict';

angular.module('myApp.forgotPassword', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forgotPassword', {
    templateUrl: 'forgotPassword/forgotPassword.html',
    controller: 'forgotPassword'
  });
}])
