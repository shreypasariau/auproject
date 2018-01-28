'use strict';
 
angular.module('myApp').factory('UserService', ['$http', '$q','URL', function($http,$q,URL){
 
    

    var factory = {
        createUser: createUser,
		login:login,
		updateUser:updateUser,
		deleteUser:deleteUser,
		getUserByuserId:getUserByuserId,
		getUserByLocation:getUserByLocation,
		changeUserType:changeUserType
    };
 
    return factory;
 
    
 
    function createUser(user) {
        var deferred = $q.defer();
        $http.post(URL.path+'/user', user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function login(user) {
        var deferred = $q.defer();
        $http.post(URL.path+'/login', user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while logging in');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
	function updateUser(user) {
        var deferred = $q.defer();
        $http.put(URL.path+'/user/'+user.userId, user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
	function deleteUser(userId) {
        var deferred = $q.defer();
        $http.delete(URL.path+'/user'+userId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
	function getUserByuserId(userId) {
        var deferred = $q.defer();
        $http.get(URL.path+'/user/'+userId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while retreiving User by ID');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
	function getUserByLocation(locationId) {
        var deferred = $q.defer();
		var config  ={};
        $http.get(URL.path+'/users/'+locationId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function changeUserType(userId) {
        var deferred = $q.defer();
        $http.put(URL.path+'/'+userId)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	
	
}]);