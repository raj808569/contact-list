var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',
function($scope,$http){
	console.log("hi from controller");
	var refresh=function(){
	$http.get('/contactlist').then(function(response){
		$scope.contacts=response.data;
		console.log(response.data);
		$scope.contact.name="";$scope.contact.email="";$scope.contact.number="";
	});
};
refresh();
$scope.addContact=function(){
	console.log($scope.contact);
	$http.post('/contactlist',$scope.contact).then(function(response){
		console.log(response.data);
		refresh();
	});
};

$scope.remove= function(id){
	console.log(id);
	$http.delete('/contactlist/'+ id).then(function(response){
		refresh();
	});
};

$scope.edit=function(id){
	$http.get('/contactlist/' + id).then(function(response){
		console.log(response.data);
		$scope.contact=response.data;
	});
};

$scope.update=function(){
	console.log($scope.contact._id);
	$http.put('/contactlist/'+ $scope.contact._id,$scope.contact).then(function(response){
		refresh();
	});
};

}]);
