'use strict';
 
angular.module('myApp').factory('UserDataService', ['$http', '$q', function($http, $q){
 
    var userData;
 
    var factory = {
        setuserData:setuserData,
		getUserData:getUserData
    };
 
    return factory;
 
    function setuserData(Data){
		userData = Data;
	}
 
	 function getUserData(){
		return userData;
	}
 
    
 
}]);