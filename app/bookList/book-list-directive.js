angular.module("lobato-authorship").directive('bookList', ["$location", "ngDialog", "BookService", "AuthorService",
    function($location, ngDialog, BookService, AuthorService){
        "use strict";

        return {
            scope: {},
            restrict: 'E',
            templateUrl: "bookList/bookList.html",
            link: function($scope, iElm, iAttrs, controller) {
                var authors = {};
                //TODO: obviously there are lots of things to consider here like loading spinners and searching functionality.
                BookService.getBooks().then(function (books) {
                    $scope.books = books;
                });

                AuthorService.getAuthors().then(function(serviceAuthors) {
                    authors = serviceAuthors;
                });

                $scope.createBookDialog = function() {
                    ngDialog.open({
                        template: 'bookList/createBook.html',
                        className: 'createBookModal',
                        controller: 'CreateBookController'
                    });
                };

                $scope.getAuthorName = function(authorId) {
                    //TODO: this shouldn't happen until getAuthors returns..
                    return authors[authorId].name;
                };
            }
        };
    }
]);