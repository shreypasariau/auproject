'use strict';

angular.module('myApp.userMaster', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userMaster', {
    templateUrl: 'userMaster/userMaster.html',
    controller: 'userMaster'
  });
}])

