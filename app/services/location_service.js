'use strict';
 
angular.module('myApp').factory('LocationService', ['$http', '$q','URL', function($http, $q,URL){
 
    

    var factory = {
        addLocation: addLocation,
		deleteLocation: deleteLocation,
		getAllLocations: getAllLocations
    };
 
    return factory;
 
    
 
    function addLocation(location) {
        var deferred = $q.defer();
        $http.post(URL.path+'/location/', location)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while adding location');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function deleteLocation(locationId) {
        var deferred = $q.defer();
        $http.delete(URL.path+'/location/'+locationId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting location');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
	function getAllLocations( ) {
        var deferred = $q.defer();
        $http.get(URL.path+'/location/all')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while retreiving location information');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

	
	
	
}]);