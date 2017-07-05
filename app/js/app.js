angular.module('weatherApp', [
    'ngRoute'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/weather', {
                templateUrl: 'views/weather.html'
            })
            .otherwise({
                redirectTo: '/weather'
            });
    }]);