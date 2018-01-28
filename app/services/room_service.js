
'use strict';
 
angular.module('myApp').factory('RoomService', ['$http', '$q', 'URL',function($http, $q,URL){
 
    
 
    var factory = {
        createRoom: createRoom,
		deleteRoom: deleteRoom,
		getRoomByLocation: getRoomByLocation,
		getRoomById : getRoomById
    };
 
    return factory;
 
    
	 function getRoomById(rId) {
        var deferred = $q.defer();
        $http.get(URL.path+'/room/roomId/'+ rId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while adding Room');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createRoom(room) {
        var deferred = $q.defer();
        $http.post(URL.path+'/room/', room)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while adding Room');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function deleteRoom(roomId) {
        var deferred = $q.defer();
        $http.delete(URL.path+'/room/'+roomId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting Room');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

	function getRoomByLocation(locationId) {
        var deferred = $q.defer();
        $http.get(URL.path+'/room/'+locationId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while retreiving room information');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    
 
}]);