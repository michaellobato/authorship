//put everything in this one file for simplicity
angular.module("lobato-authorship", ["ngRoute", "ngDialog"]);

angular.module("lobato-authorship").config(['$routeProvider',
    function($routeProvider) {
        "use strict";

        $routeProvider.
        // when("/authorship", {
        //     template: ""
        // }).
        otherwise({
            templateUrl: "app/dualList/dualList.html"
        });
    }
]);