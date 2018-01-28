var app2 = angular.module('myApp', ['ui.router']);

        app2.config(function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/formLogin');

          var view1State = {
            name: 'formLogin',
            url: '/formLogin',
            templateUrl:`/formLogin/formLogin.html`
			
          }

          var view2State = {
            name: 'formRegister',
            url: '/formRegister',
            templateUrl:`/formRegister/formRegister.html`
			//template:`hello`
          }
         
		   var view3State = {
            name: 'reviewRequest',
            url: '/reviewRequest',
            templateUrl:`/reviewRequest/reviewRequest.html`,
			params:{
				'user':'user'
			}
          }
		  
		  var view4State = {
            name: 'addRoom',
            url: '/addRoom',
            templateUrl:`/addRoom/addRoom.html`
           }
		   
		   var view5State = {
            name: 'addLocation',
            url: '/addLocation',
            templateUrl:`/addLocation/addLocation.html`
          }
		  var view6State = {
            name: 'bookRoom',
            url: '/bookRoom',
            templateUrl:`/bookRoom/bookRoom.html`
          }

          var view7State = {
            name: 'userMaster',
            url: '/userMaster',
            templateUrl:`/userMaster/userMaster.html`
                    }
          
		  var view8State = {
            name: 'editProfile',
            url: '/editProfile',
            templateUrl:`/editProfile/editProfile.html`
          }

		  var view9State = {
            name: 'forgotPassword',
            url: '/forgotPassword',
            templateUrl:`/forgotPassword/forgotPassword.html`
          }
          

          $stateProvider.state(view1State);
          $stateProvider.state(view2State);
          $stateProvider.state(view3State);
		  $stateProvider.state(view4State);
		  $stateProvider.state(view5State);
          $stateProvider.state(view6State);
          $stateProvider.state(view7State);
		  $stateProvider.state(view8State);
		  $stateProvider.state(view9State);
          
        });

		app2.controller('forgotPassword',['$scope','userData_service',function($scope,userData_service) {
			$scope.forgotPass=function(){
			console.log('inside Forgot Password');
		}
		}]);
		
app2.controller('formLogin',['$scope','$state','UserService', 'UserDataService',function($scope,$state,UserService,UserDataService) {
	
	$scope.lg={};
	var flag=1;
    $scope.login=function(){
	if($scope.lg['userName']==='' || $scope.lg['userName']==undefined)
	{
		flag=0;
	}
	if($scope.lg['password']==='' || $scope.lg['password']==undefined)
	{
		flag=0;
	}
	
	if(flag===0)
	{
		alert('Enter all the fields!!');
		flag=1;
	}
	else
	{
		//console.log('test');
		//$state.go('reviewRequest');
		
		UserService.login($scope.lg).then(function(data){
			
			alert('Login Successful');
			UserDataService.setuserData(data);
			$state.go('reviewRequest');
   //use data for frontend
   },
    function(errResponse){
                alert('Error in logging in. Please check the username and password');
            
  });
  
		/* var view2State = {
            name: 'formRegister',
            url: '/formRegister',
            templateUrl:`/formRegister/formRegister.html`
			//template:`hello`
          }
		  $stateProvider.state(view2State);
		 */
		/* //send request to server
		UserService.login($scope.lg).then(function(data){
			//use data for frontend
		}); */
		
		
	}

	}
	
	
}]);



app2.controller('formRegister',['$scope','UserService','LocationService','$state', function($scope,UserService,LocationService,$state) {
	
	$scope.locations = [];
	function getAllLocations(){
		LocationService.getAllLocations().then(function(response){
			if(response!=''){
			 $scope.locations = response;
		}},
		function(errResponse){
                console.error('Error while creating User');
            
  });}
	$scope.init =function(){
		getAllLocations();
	};
	
	$scope.init(); 
	
 
	$scope.reg={};
	var alertUser='';
	 var date=new Date();
	var flag=1;
	
	$scope.register=function(){
	if($scope.reg['userName']==='' || $scope.reg['userName']==undefined)
		flag=0;
	
	if($scope.reg['password']==='' || $scope.reg['password']==undefined)
		flag=0;
	
	if($scope.reg['fName']==='' || $scope.reg['fName']==undefined)
		flag=0;
	
	if($scope.reg['lName']==='' || $scope.reg['lName']==undefined)
		flag=0;
	
	if($scope.reg['dob']==='' || $scope.reg['dob']==undefined)
		flag=0;
	
	if($scope.reg['contact']==='' || $scope.reg['contact']==undefined)
		flag=0;
	
	if($scope.reg['address']==='' || $scope.reg['address']==undefined)
		flag=0;
	
	if($scope.reg['location']==='' || $scope.reg['location']==undefined)
		flag=0;
	
	if($scope.reg['gender']==='' || $scope.reg['gender']==undefined)
		flag=0;
	
	if($scope.reg['dob']>=date)
 {
  alertUser='Date of birth cannot be greater than current date';
 }
  
 if(flag===0)
 {
  if(alertUser!='')
   alert(alertUser);
  else
   alert('Enter all the fields!!');
  flag=1;
  alertUser='';
 }
 else
	{
		UserService.createUser($scope.reg).then(function(data){
			console.error('User Created');
			$state.go('formLogin');
		},
		function(errResponse){
			console.error('Error while creating User');
		});
	}
  }
}]);

app2.controller('reviewRequest',['$scope','UserDataService','RoomService','UserService','RoomRequestService','$state', function($scope,UserDataService,RoomService,UserService,RoomRequestService,$state) {
	$scope.user = UserDataService.getUserData();
	$scope.userType= $scope.user.type;
	var locationId = '';
	
	if( $scope.user.location.lId!=undefined)
	{
		locationId = $scope.user.location.lId;
	}
	else {
		locationId = $scope.user.location;
	}
	
	var init = function(){
		
	
	if($scope.userType == 'ADMIN'){
		RoomRequestService.getRequestByLocation(locationId)
		.then(
		function(response){
			$scope.userRequests=[];
			//var i=0;
			//$scope.username = [];
			$scope.userRequests=response;
			//$scope.temp = $scope.userRequests;
			angular.forEach($scope.userRequests, function(value, key){
				//console.log(key + ': ' + value.userId);
				
				//value.dateOfBooking=new Date(value.dateOfBooking * 1000);
				
				UserService.getUserByuserId(value.userId).then(
				function(response){
					//alert(value.userId);
					value.userId=response.userName;
					
					console.log(value.userId);
				},function(error){
					
				})
				
				RoomService.getRoomById(value.rId).then(
				function(response){
					//alert(value.userId);
					value.rId=response.rName;
					
					//console.log(value.userId);
				},function(error){
					
				})
			});
			/* $scope.dateofBooking = new Date($scope.userRequests.dateofBooking);
			$scope.startTime = new Date($scope.userRequests.startTime);
			$scope.endTime = new Date($scope.userRequests.endTime); */
			console.log('Got all requests');
		},function(error){
			console.log('Error in getting all requests');
		});
	}
	else
	{
		
		RoomRequestService.getRequsetByUserId($scope.user.userId)
		.then(
		function(response){
			$scope.userRequests=[];
			$scope.userRequests=response;
			angular.forEach($scope.userRequests, function(value, key){
				
				UserService.getUserByuserId(value.userId).then(
				function(response){
					value.userId=response.userName;
					
					console.log(value.userId);
				},function(error){
					
				})
				
				RoomService.getRoomById(value.rId).then(
				function(response){
					value.rId=response.rName;
					
				},function(error){
					
				})
			});
		},function(error){
			console.log('Error in getting all requests');
		});
		
	}
	};
	init();
	
	$scope.accept=function(id){
		
		RoomRequestService.acceptRequest(id).then(
		function(response){
			console.log('accept');
			alert('Request Accepted');
			init();
		},function(error){
			console.log('Error in getting all requests');
		});
		
	}

	$scope.reject=function(id){
		RoomRequestService.rejectRequest(id).then(
		function(response){
			console.log('reject');
			alert('Request Rejectted');
			init();
		},function(error){
			console.log('Error in getting all requests');
		});
		
	}

}]);
	
app2.controller('addRoom',['$scope','RoomService','LocationService','UserDataService',function($scope,RoomService,LocationService,UserDataService){
	$scope.locations = [];
	$scope.rooms = [];
	$scope.user = UserDataService.getUserData();
	
	var locationId = '';
	
	if( $scope.user.location.lId!=undefined)
	{
		locationId = $scope.user.location.lId;
	}
	else {
		locationId = $scope.user.location;
	}
	function getAllRooms(){
		RoomService.getRoomByLocation(locationId).then(function(response){
			if(response!=''){
			 $scope.rooms = response;
		}},
		function(errResponse){
                console.error('Error while getting rooms');
        });
	}

	$scope.init =function(){
		
		getAllRooms();
	};
	
	$scope.init(); 
	$scope.addroom={};
	var flag=1;
	$scope.addRoom=function(){
		
		if($scope.addroom['rName']==='' || $scope.addroom['rName']==undefined)
			flag=0;
		
		
		if(flag===0)
		{
			alert('Enter all the fields!!');
			flag=1;
		}
		else
		{
			//send request to server
			RoomService.createRoom($scope.addroom).then(function(data){
    //use data for frontend
				alert('New Room Request Generated');
				$scope.addroom['rName']="";
				$scope.addroom['lId']="";
				$scope.init();
			},
		function(errResponse){
                console.error('Error while adding location');
		});
		}
	}
}]);

app2.controller('addLocation',['$scope','LocationService',function($scope,LocationService){
	$scope.addloc={};
	$scope.locations = [];
	function getAllLocations(){
		LocationService.getAllLocations().then(function(response){
			if(response!=''){
			 $scope.locations = response;
		}},
		function(errResponse){
                console.error('Error while creating User');
            
  });}
	$scope.init =function(){
		getAllLocations();
	};
	
	$scope.init(); 
	var flag=1;
	$scope.addLocation=function(){
		if($scope.addloc['locationName']==='' || $scope.addloc['locationName']==undefined)
			flag=0;
		
		if($scope.addloc['roomName']==='' || $scope.addloc['roomName']==undefined)
			flag=0;
		
		if($scope.addloc['userName']==='' || $scope.addloc['userName']==undefined)
			flag=0;
	
		if($scope.addloc['password']==='' || $scope.addloc['password']==undefined)
			flag=0;
		
		if($scope.addloc['fName']==='' || $scope.addloc['fName']==undefined)
			flag=0;
		
		if($scope.addloc['lName']==='' || $scope.addloc['lName']==undefined)
			flag=0;
		
		if($scope.addloc['dob']==='' || $scope.addloc['dob']==undefined)
			flag=0;
		
		if($scope.addloc['contact']==='' || $scope.addloc['contact']==undefined)
			flag=0;
		
		if($scope.addloc['address']==='' || $scope.addloc['address']==undefined)
			flag=0;
		
		if($scope.addloc['gender']==='' || $scope.addloc['gender']==undefined)
			flag=0;
		
		if(flag===0)
		{
			alert('Enter all the fields!!');
			flag=1;
		}
		else
		{
			//send request to server
			LocationService.addLocation($scope.addloc).then(function(data){
			//use data for frontend
		   alert('New Location Created');
		   },
			function(errResponse){
                console.error('Error while adding location');
            });
		}
	}
}]);

app2.controller('bookRoom',['$scope','RoomRequestService','RoomService','UserDataService','$state',function($scope,RoomRequestService,RoomService,UserDataService,$state){
	$scope.bookroom = {};
	var flag=1;
	
	$scope.rooms = [];
	var locationId = '';
	$scope.user = UserDataService.getUserData();
	$scope.userType = $scope.user.type;
	$scope.bookroom.lId = $scope.user.location;
	$scope.bookroom.userId = $scope.user.userId;
	if( $scope.user.location.lId!=undefined)
	{
		locationId = $scope.user.location.lId;
	}
	else {
		locationId = $scope.user.location;
	}
	function getAllRooms(){
		RoomService.getRoomByLocation(locationId).then(function(response){
			if(response!=''){
			 $scope.rooms = response;
		}},
		function(errResponse){
                console.error('Error while getting rooms');
        });
	}

	$scope.init =function(){
		getAllRooms();
	};
	
	$scope.init(); 
	
	var date=new Date();
	var alertUser = '';
	$scope.bookRoom=function(){
		if($scope.bookroom['rId']==='' || $scope.bookroom['rId']==undefined)
			flag=0;
		
		if($scope.bookroom['dateOfBooking']==='' || $scope.bookroom['dateOfBooking']==undefined)
			flag=0;
		
		if($scope.bookroom['startTime']==='' || $scope.bookroom['startTime']==undefined)
			flag=0;
		
		if($scope.bookroom['endTime']==='' || $scope.bookroom['endTime']==undefined)
			flag=0;
		
		if($scope.bookroom['purposeOfBooking']==='' || $scope.bookroom['purposeOfBooking']==undefined)
			flag=0;
		
		if($scope.bookroom['startTime']>$scope.bookroom['endTime'])
	  {
	   flag=0;
	   alertUser='start time cannot be greater than end time';
   
	  }
  
	
	  if($scope.bookroom['dateOfBooking']<date)
	  {
	   flag=0;
		alertUser='Cannot make a booking for previous dates';
   
	  }
  
   
	  if(flag===0)
	  {
	   if(alertUser!='')
		alert(alertUser);
	   else
		alert('Enter all the fields!!');
	   flag=1;
	   alertUser='';
	  }
	  else
		{
			RoomRequestService.createRequest($scope.bookroom).then(function(response){
				alert('New Room Request Generated');
				$state.go('reviewRequest');
			},
			function(errResponse){
                alert('This time slot is already booked.Please try a new one.');
			});
		}
	}
}]);

app2.controller('userMaster',['$scope','UserService','UserDataService',function($scope,UserService,UserDataService){
	console.log('user master');
	$scope.user = UserDataService.getUserData();
	if( $scope.user.location.lId!=undefined)
	{
		locationId = $scope.user.location.lId;
	}
	else {
		locationId = $scope.user.location;
	}
	var init = function(){
	$scope.userList = {};
	UserService.getUserByLocation(locationId)
	.then(function(response){
		$scope.userList=response;
		console.log("User List Generated");
	},function (errResponse){
		console.log("Error in getting user list");
	});
	}
	init();
	$scope.makeAdmin = function(id){
		UserService.changeUserType(id).then(
		function(response){
			console.log('accept');
			alert('User type changed to Admin');
			init();
		},function(error){
			console.log('Error in getting all requests');
		});
	}
}]);

app2.controller('editProfile',['$scope','UserDataService','UserService','LocationService','$state',function($scope,UserDataService,UserService,LocationService,$state){
	$scope.reg={};
	var alertUser='';
 	var flag=1;
	var date=new Date();

	$scope.reg = UserDataService.getUserData();
	$scope.reg.dob=new Date($scope.reg.dob);
	$scope.userType = $scope.reg.type;
	
	
	$scope.update=function(){
		if($scope.reg['userName']==='' || $scope.reg['userName']==undefined)
		flag=0;
	
		if($scope.reg['password']==='' || $scope.reg['password']==undefined)
			flag=0;
		
		if($scope.reg['fName']==='' || $scope.reg['fName']==undefined)
			flag=0;
		
		if($scope.reg['lName']==='' || $scope.reg['lName']==undefined)
			flag=0;
		
		if($scope.reg['dob']==='' || $scope.reg['dob']==undefined)
			flag=0;
		
		if($scope.reg['contact']==='' || $scope.reg['contact']==undefined)
			flag=0;
		
		if($scope.reg['address']==='' || $scope.reg['address']==undefined)
			flag=0;
		

		if($scope.reg['gender']==='' || $scope.reg['gender']==undefined)
			flag=0;
		
		if($scope.reg['dob']>=date)
 {
  alertUser='Date of birth cannot be greater than current date';
 }
  
 if(flag===0)
 {
  if(alertUser!='')
   alert(alertUser);
  else
   alert('Enter all the fields!!');
  flag=1;
  alertUser='';
 }
		else
		{
			UserService.updateUser($scope.reg).then(function(data){
			alert('User Updated');
			$state.go('reviewRequest');
		},
		function(errResponse){
			alert('Error while updating User');
		});
		}
	}
}]);
	
		
		


