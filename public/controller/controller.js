var app = angular.module("meanApp",[]);
	
	app.controller("serviceController",function($scope,$http)
	{
		$scope.message="Welcome";
	
		
		$scope.create = function(){
	
		$http.post("/info",$scope.serviceClient).success(function(response){
	
		$scope.all();
		
		});
		}	
	$scope.renderServiceClients = function(response){
		
		$scope.serviceClients = response;
	}
	
	$scope.remove=function(id){
	
		$http.delete("/info/"+id).success(function(response){
	
		$scope.all();
		
		});
				
	}
	$scope.update=function(serviceClient)
	{
		$http.put("/info/"+$scope.serviceClient._id,$scope.serviceClient).success(function(response){
	
		$scope.all();
		
		});
		
	}
	$scope.select=function(id){
		console.log("in select");
		$http.get("/info/"+id).success(function(response){
	
		$scope.serviceClient=response;
		
		});
				
	}
	//getAll
	$scope.all=function(){
	
	$http.get("/info").success($scope.renderServiceClients);
	
	}
	$scope.all();
	
});

   
  

