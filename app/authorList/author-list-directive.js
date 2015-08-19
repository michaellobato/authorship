angular.module('lobato-authorship').directive('authorList', ["ngDialog", "AuthorService",
    function(ngDialog, AuthorService){
        "use strict";

        return {
            scope: {},
            restrict: 'E',
            templateUrl: "app/authorList/authorList.html",
            link: function($scope, iElm, iAttrs) {
                AuthorService.getAuthors().then(function(authors) {
                    $scope.authors = authors;
                });

                $scope.deleteAuthor = function(author) {
                    AuthorService.deleteAuthor(author.id);
                };

                $scope.createAuthorDialog = function() {
                    ngDialog.open({
                        template: 'app/authorList/createAuthor.html',
                        className: 'createAuthorModal',
                        controller: 'CreateAuthorController'
                    });
                };
            }
        };
    }
]);