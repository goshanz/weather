'use strict';

angular.module('weatherApp', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/weather', {
        templateUrl: 'views/weather.html'
    }).otherwise({
        redirectTo: '/weather'
    });
}]);
'use strict';

angular.module('weatherApp').constant('weatherConst', {
    weatherUrl: 'http://openweathermap.org/data/2.5/forecast/daily?id=524901&lang=ru&appid=b1b15e88fa797225412429c1c50c122a1'
});
'use strict';

function weatherCtrl(weatherService, weatherValues) {
    var jsDateFormat = 1000;
    var vm = this;

    function applyFilter(weatherCondition) {
        if (weatherCondition === weatherValues.allValues) {
            vm.weatherList = angular.copy(vm.weatherListSrv);
        } else {
            vm.weatherList = vm.weatherListSrv.filter(function (item) {
                return isThisWeatherCondition(item.weather, weatherCondition);
            });
        }
    };

    function isThisWeatherCondition(weather, weatherCondition) {
        var values = weather.filter(function (item) {
            return item.main === weatherCondition;
        });
        return !!values.length;
    }

    function init() {
        vm.filter = {
            weatherConditions: weatherValues.weatherConditions,
            weatherCondition: weatherValues.allValues,
            apply: applyFilter
        };

        weatherService.getWeather().then(function (res) {
            if (res.data && res.data.list && res.data.list.length) {
                vm.weatherListSrv = res.data.list;
                vm.weatherListSrv.forEach(function (item) {
                    item.dt *= jsDateFormat; // for js Date format
                });
                vm.weatherList = angular.copy(vm.weatherListSrv);
            }
        });
    }

    init();
}

angular.module('weatherApp').controller('weatherCtrl', ['weatherService', 'weatherValues', weatherCtrl]);
'use strict';

function weatherService($http, weatherConst) {
    return {
        getWeather: getWeather
    };

    function getWeather() {
        return $http.get('' + weatherConst.weatherUrl);
    }
}

angular.module('weatherApp').service('weatherService', ['$http', 'weatherConst', weatherService]);
'use strict';

var allValues = 'All';
var values = {
    allValues: allValues,
    weatherConditions: [allValues, 'Clear', 'Clouds', 'Rain', 'Snow']
};

angular.module('weatherApp').value('weatherValues', values);