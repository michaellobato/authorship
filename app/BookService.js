angular.module("lobato-authorship").factory('BookService', ['$q',
    function($q){
        "use strict";

        var instance = {};
        var getBooksPromise;
        var books = {
            list: []
        };

        function getFakeISBN() {
            return (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString();
        }

        function getFakePages () {
            return Math.floor(Math.random() * (100000 - 100)) + 100;
        }

        instance.getBooks = function() {
            if(getBooksPromise) return getBooksPromise;
            var def = $q.defer();

            //TODO: get books from server
            var fakeBooks = [{
                id: "1",
                title: "Awesome Math Book",
                isbn: getFakeISBN(),
                pages: getFakePages(),
                authorId: "1"
            }, {
                id: "2",
                title: "Lord of the Rings",
                isbn: getFakeISBN(),
                pages: getFakePages(),
                authorId: "2"
            }, {
                id: "3",
                title: "Learn to Speak Spanish",
                isbn: getFakeISBN(),
                pages: getFakePages(),
                authorId: "3"
            }];

            // var fakeBooks = {
            //     "1": {
            //         id: "1",
            //         title: "Awesome Math Book",
            //         isbn: getFakeISBN(),
            //         pages: getFakePages(),
            //         authorId: "1"
            //     },
            //     "2": {
            //         id: "2",
            //         title: "Lord of the Rings",
            //         isbn: getFakeISBN(),
            //         pages: getFakePages(),
            //         authorId: "2"
            //     },
            //     "3": {
            //         id: "3",
            //         title: "Learn to Speak Spanish",
            //         isbn: getFakeISBN(),
            //         pages: getFakePages(),
            //         authorId: "3"
            //     }
            // };

            def.resolve(fakeBooks);
            getBooksPromise = def.promise.then(function(bookList) {
                books.list = bookList;
                return books;
            }, function(reason) {
                //TODO: handle errors
            });

            return getBooksPromise;
        };

        // instance.addBook = function(book) {
        //     books[book.id] = book;
        // }

        return instance;
    }
]);