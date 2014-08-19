angular.module('weather', [])

.factory('openweather', function($http) {
	var runRequest = function(city) {
		return $http({
			method: 'JSONP',
			url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+ city + '&mode=json&units=metric&cnt=4&callback=JSON_CALLBACK'
		});
	};
	return {
		event: function(city) {
			return runRequest(city);
		}
	};
})

.controller('WeatherForecastCtrl', function($scope, $timeout, openweather){
	var timeout;		
	$scope.$watch('city', function(newCity) {
		if(newCity) {
			if(timeout) $timeout.cancel(timeout);
			timeout = $timeout(function() {
				openweather.event(newCity).success(function(data, status) {						
					$scope.loc = data;
					$scope.forecast = data.list;
				});
			}, 1000);
		}
	});
});