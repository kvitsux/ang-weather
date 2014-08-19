angular.module('weather', [])

.controller('WeatherTodayCtrl', function($scope, $http){
	var apiurl = 'http://api.openweathermap.org/data/2.5/weather?q=Bratislava&callback=JSON_CALLBACK&units=metric';
	$http.jsonp(apiurl).success(function(data){
		$scope.data = data;
	});
})
.controller('WeatherForecastCtrl', function($scope, $http){
	var apiurl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Bratislava&mode=json&units=metric&cnt=4&callback=JSON_CALLBACK';
	$http.jsonp(apiurl).success(function(data){
		$scope.data = data;		
	});
})
// .controller('AnotherCtrl', function($scope, $http){
// 	$scope.q = city;
// 	var apiurl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+ q + '&mode=json&units=metric&cnt=4&callback=JSON_CALLBACK';
// 	$http.jsonp(apiurl).success(function(data){
// 		$scope.data = data;		
// 	});
// });
.controller('AnotherCtrl', function($scope, $http) {
	$scope.searchURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&cnt=4&callback=JSON_CALLBACK&q=';
	$scope.isLoading = false;
	$scope.weather = null;
	$scope.searchOptions = {
		query: ''
	};
	$scope.search = function() {		
		$scope.searchWeather($scope.searchOptions.page);
	};
	$scope.searchWeather = function() {
		$scope.isLoading = true;		
		url = $scope.searchURL + encodeURI($scope.searchOptions.query);
		$http.jsonp(url).success(function(data) {
			$scope.isLoading = false;
			$scope.weather = data;			
		});
	};
});