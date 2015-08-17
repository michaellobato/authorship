//put everything in this one file for simplicity
angular.module("lobato-authorship", ["ngRoute, ngDialog"]);

angular.module("lobato-authorship").config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        // when("/authorship", {
        //     template: ""
        // }).
        otherwise({
            templateUrl: "dualList/dualList.html"
        });
    }
]);