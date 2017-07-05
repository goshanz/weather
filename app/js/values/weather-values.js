

const allValues = 'All';
var values = {
    allValues: allValues,
    weatherConditions: [allValues, 'Clear', 'Clouds', 'Rain', 'Snow']
}

angular
    .module('weatherApp')
    .value('weatherValues', values);