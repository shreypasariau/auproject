'use strict';

angular.module('myApp.editProfile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editProfile', {
    templateUrl: 'editProfile/editProfile.html',
    controller: 'editProfile'
  });
}])


