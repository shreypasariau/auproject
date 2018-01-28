'use strict';

angular.module('myApp.addLocation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addLocation', {
    templateUrl: 'addLocation/addLocation.html',
    controller: 'addLocation'
  });
}])
