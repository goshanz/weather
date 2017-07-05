function weatherService($http, weatherConst) {
    return {
        getWeather: getWeather
    };

    function getWeather() {
        return $http.get(
            `${weatherConst.weatherUrl}`
        );
    }
}

angular
    .module('weatherApp')
    .service('weatherService', ['$http', 'weatherConst', weatherService]);