'use strict';

angular.module('myApp.addRoom', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addRoom', {
    templateUrl: 'addRoom/addRoom.html',
    controller: 'addRoom'
  });
}])

