angular.module("lobato-authorship").factory('AuthorService', ['$q',
    function($q){
        "use strict";

        var instance = {};
        var getAuthorsPromise;
        var authors;
        var fakeIdCount;

        function getRandomBirthdate() {
            var start = new Date(1900, 0, 1);
            var end = new Date();
            return new Date(Math.random() * (end.getTime() - start.getTime()) + start.getTime());
        }

        instance.getAuthors = function() {
            if(getAuthorsPromise) return getAuthorsPromise;
            var def = $q.defer();

            //TODO: get authors from server
            var fakeAuthors = {
                "1": {
                    id: "1",
                    name: "Mathy McSmarty",
                    bio: "He is super math smart.",
                    birthdate: getRandomBirthdate(),
                    books: ["1"]
                },
                "2": {
                    id: "2",
                    name: "John Ronald Reuel Tolkien",
                    bio: "Writes cool Books",
                    birthdate: new Date(1892, 0, 3),
                    books: ["2"]
                },
                "3": {
                    id: "3",
                    name: "Mario Lopez",
                    bio: "Pretty cool guy.",
                    birthdate: getRandomBirthdate(),
                    books: ["3"]
                },
                "4": {
                    id: "4",
                    name: "Deletable Dude",
                    bio: "Go ahead.. Make his day! He also has a really really really really really really really really really really long bio.",
                    birthdate: getRandomBirthdate(),
                    books: []
                }
            };

            def.resolve(fakeAuthors);
            getAuthorsPromise = def.promise.then(function(serverAuthors) {
                //if authorList were an arry, turn it into a map
                authors = serverAuthors;
                fakeIdCount = _.size(authors) + 1;

                return authors;
            }, function(reason) {
                //TODO: handle errors
            });

            return getAuthorsPromise;
        };

        instance.addBookToAuthor = function(authorId, bookId) {
            authors[authorId].books.push(bookId);
            console.log(authors[authorId]);
        };

        instance.createAuthor = function(name, bio, birthdate, bookIds) {
            //TODO: send this to the server and create the object in the success of the call.
            var newFakeId = fakeIdCount++;
            authors[newFakeId] = {
                id: newFakeId,
                name: name,
                bio: bio,
                birthdate: birthdate,
                books: bookIds
            };
        };

        instance.removeBookFromAuthor = function(authorId, bookId) {
            authors[authorId].books = _.without(authors[authorId].books, bookId);
        };

        instance.deleteAuthor = function(authorId) {
            //TODO: send this to the server and create the object in the success of the call.
            delete authors[authorId];
        };

        return instance;
    }
]);