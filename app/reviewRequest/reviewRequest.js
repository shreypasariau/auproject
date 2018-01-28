'use strict';

angular.module('myApp.reviewRequest', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reviewRequest', {
    templateUrl: 'reviewRequest/reviewRequest.html',
    controller: 'reviewRequest'
  });
}])

