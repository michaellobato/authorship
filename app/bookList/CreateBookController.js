angular.module("lobato-authorship").controller('CreateBookController', ['$scope', 'BookService', 'AuthorService',
    function($scope, BookService, AuthorService) {
        'use strict';

        AuthorService.getAuthors().then(function(authors) {
            $scope.authors = authors;
        });

        $scope.createBook = function() {
            var newBook = BookService.createBook($scope.title, $scope.isbn, $scope.pages, $scope.authorId);
            AuthorService.addBookToAuthor($scope.authorId, newBook.id);
            $scope.closeThisDialog();
        };
    }
]);