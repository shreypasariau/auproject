'use strict';

angular.module('myApp.bookRoom', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bookRoom', {
    templateUrl: 'bookRoom/bookRoom.html',
    controller: 'bookRoom'
  });
}])
