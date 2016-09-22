'use strict';

/* Controllers */

angular.module('myApp.controllers', []);
app.controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });


		
  }).
  controller('HeaderController',function HeaderController($scope, $location) 
		{ 
			//alert( $location.path());
			$scope.isActive = function (viewLocation) { 
				return viewLocation === $location.path();
			};
		}
  ).	
  controller('HomeCtrl', function ($scope,$http) {
    // write Ctrl here
	$scope.message="Hello this is home page";	
	
	var url = "api/userslist";		
	$http.post(url, {"hello":"Masood"} ,{
		headers: {'Content-Type': undefined}}).success(function(data, status, headers, config){
		if(data.msg){
			$scope.msg = data.msg;
			$scope.users=data.rows;
			//alert(data.rows);
		}else{
			alert("Failed");
		}
	}); 

  }).
  controller('AboutCtrl', function ($scope) {
    // write Ctrl here
	$scope.message="Hello this is about us page";
	

  }).
  controller('RegCtrl', function ($scope,$http) {
    // write Ctrl here
	$scope.message="Hello this is registration page";
	$scope.active_nav='registration';
	$scope.MsgSuccess=false;
	$scope.MsgError=false;
	
		$scope.RegisterUser = function(){
			var data = $scope.User;			
			var url =  "/api/register";		
			$http.post(url, data).success(function(response){
				if(response.success){
					$scope.MsgSuccess=true;					
					$scope.User={};
					
				}else{
					$scope.MsgError=true;
				}
			});

		};

  }).
  controller('EditUsrCtrl', function ($scope,$window,$location,$http,$routeParams) {
    $scope.message="Hello this is edit user page";
	
	var data = {id:$routeParams.id};			
	var url =  "/api/userdetail";		
	$http.post(url, data).success(function(response){
		if(response.success){
			//alert();
			$scope.User=response.rows;
		}else{
			$scope.MsgError=true;
		}
	});
	
	$scope.MsgSuccess=false;
	$scope.MsgError=false;
	$scope.UpdateUser = function(){
			var data = $scope.User;			
			var url =  "/api/edit_user";		
			$http.post(url, data).success(function(response){
				if(response.success){
					$scope.MsgSuccess=true;					
					//$scope.User={};
					 $location.path('/home');
					
				}else{
					$scope.MsgError=true;
				}
			});

		};


		
  });
