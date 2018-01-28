'use strict';
 
angular.module('myApp').factory('RoomRequestService', ['$http', '$q','URL', function($http, $q,URL){
 
    
 
    var factory = {
        createRequest: createRequest,
		acceptRequest:  acceptRequest,
		rejectRequest: rejectRequest,
		getRequestByLocation: getRequestByLocation,
		getRequsetByUserId: getRequsetByUserId
    };
 
    return factory;
 
    
 
    function createRequest(request) {
        var deferred = $q.defer();
        $http.post(URL.path+'/request/', request)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while placing Request');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function acceptRequest(requestId) {
        var deferred = $q.defer();
        $http.put(URL.path+'/request/accept/'+requestId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while accepting request');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
	function rejectRequest(requestId) {
        var deferred = $q.defer();
        $http.put(URL.path+'/request/reject/'+requestId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while rejecting Request');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function getRequestByLocation(locationId) {
        var deferred = $q.defer();
        $http.get(URL.path+'/request/'+locationId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while retrieving Request Information ');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
	function getRequsetByUserId(userId) {
        var deferred = $q.defer();
        $http.get(URL.path+'/request/user/'+userId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while retrieving request information');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
 
}]);