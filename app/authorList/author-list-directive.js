angular.module('lobato-authorship').directive('authorList', ["$location", "AuthorService",
    function($location, AuthorService){
        return {
            scope: {},
            restrict: 'E',
            templateUrl: "authorList/authorList.html",
            link: function($scope, iElm, iAttrs) {
                AuthorService.getAuthors().then(function(authors) {
                    $scope.authors = authors;
                });

                $scope.deleteAuthor = function(author) {
                    AuthorService.deleteAuthor(author.id);
                };
            }
        };
    }
]);