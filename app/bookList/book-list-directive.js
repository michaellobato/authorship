angular.module("lobato-authorship").directive('bookList', ["$location", "BookService",
    function($location, BookService){
        return {
            scope: {},
            restrict: 'E',
            templateUrl: "bookList/bookList.html",
            link: function($scope, iElm, iAttrs, controller) {
                //TODO: obviously there are lots of things to consider here like loading spinners and searching functionality.
                BookService.getBooks().then(function (books) {
                    $scope.books = books;
                });
                $scope.createBook = function() {
                }
            }
        };
    }
]);