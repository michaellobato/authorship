angular.module("lobato-authorship").controller('CreateAuthorController', ['$scope', 'AuthorService',
    function($scope, AuthorService) {
        'use strict';

        $scope.createAuthor = function() {
            AuthorService.createAuthor($scope.name, $scope.bio, $scope.birthdate);
            $scope.closeThisDialog();
        };
    }
]);