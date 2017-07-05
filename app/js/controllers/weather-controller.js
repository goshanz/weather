
function weatherCtrl(weatherService, weatherValues) {
    const jsDateFormat = 1000; // Difference between front and back
    var vm = this;

    function applyFilter(weatherCondition) {
        if (weatherCondition === weatherValues.allValues) {
            vm.weatherList = angular.copy(vm.weatherListSrv);
        }
        else {
            vm.weatherList = vm.weatherListSrv.filter(function (date) {
                return isThisWeatherCondition(date.weather, weatherCondition);
            });
        }
    };

    /**
     * true, when weather condition exist in this date
     * @param weatherList - list of weather objects in day
     * @param weatherCondition
     */
    function isThisWeatherCondition(weatherList, weatherCondition) {
        var values = weatherList.filter(function (item) {
            return item.main === weatherCondition;
        });
        return !!values.length;
    }

    function init() {
        vm.filter = {
            weatherConditions: weatherValues.weatherConditions,
            weatherCondition: weatherValues.allValues,
            apply: applyFilter
        }

        weatherService.getWeather().then(function (res) {
            if (res.data && res.data.list && res.data.list.length) {
                vm.weatherListSrv = res.data.list;
                vm.weatherListSrv.forEach(function (date) {
                    date.dt *= jsDateFormat; // for js Date format
                });
                vm.weatherList = angular.copy(vm.weatherListSrv);
            }
        });
    }

    init();
}

angular.module('weatherApp')
    .controller('weatherCtrl', ['weatherService', 'weatherValues', weatherCtrl])