/*! authorship 2015-08-18 */
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
        };

        instance.createAuthor = function(name, bio, birthdate, bookIds) {
            //TODO: send this to the server and create the object in the success of the call.
            var newFakeId = fakeIdCount++;
            authors[newFakeId] = {
                id: newFakeId,
                name: name,
                bio: bio,
                birthdate: birthdate,
                books: bookIds || []
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
            return Math.floor(Math.random() * (10000 - 100)) + 100;
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

        instance.createBook = function(title, isbn, pages, authorId) {
            var book = {};
            var newFakeId = _.size(books.list);
            book.id = newFakeId;
            book.title = title;
            book.isbn = isbn;
            book.pages = pages;
            book.authorId = authorId;

            books.list.push(book);
            return book;
        };

        instance.deleteBook = function(book) {
            books.list = _.without(books.list, book);
        };

        return instance;
    }
]);
angular.module("lobato-authorship").controller('CreateAuthorController', ['$scope', 'AuthorService',
    function($scope, AuthorService) {
        'use strict';

        $scope.createAuthor = function() {
            AuthorService.createAuthor($scope.name, $scope.bio, $scope.birthdate);
            $scope.closeThisDialog();
        };
    }
]);
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
angular.module("lobato-authorship").directive('bookList', ["ngDialog", "BookService", "AuthorService",
    function(ngDialog, BookService, AuthorService){
        "use strict";

        return {
            scope: {},
            restrict: 'E',
            templateUrl: "app/bookList/bookList.html",
            link: function($scope, iElm, iAttrs, controller) {
                var authors = {};
                //TODO: obviously there are lots of things to consider here like loading spinners and searching functionality.
                BookService.getBooks().then(function (books) {
                    $scope.books = books;
                });

                AuthorService.getAuthors().then(function(serviceAuthors) {
                    authors = serviceAuthors;
                });

                $scope.deleteBook = function(book) {
                    BookService.deleteBook(book);
                    AuthorService.removeBookFromAuthor(book.authorId, book.id);
                };

                $scope.createBookDialog = function() {
                    ngDialog.open({
                        template: 'app/bookList/createBook.html',
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
angular.module('lobato-authorship').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/authorList/authorList.html',
    "<div class='authorListContainer grid'>\r" +
    "\n" +
    "    <div class='page-header'>\r" +
    "\n" +
    "        <h2>Authors</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\"><button type='button' class='btn btn-primary' ng-click='createAuthorDialog()'>Create Author</button></div>\r" +
    "\n" +
    "    <div class='row'>\r" +
    "\n" +
    "        <table class='table'>\r" +
    "\n" +
    "            <thead>\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <th>Name</th>\r" +
    "\n" +
    "                    <th>Birth Date</th>\r" +
    "\n" +
    "                    <th>Bio</th>\r" +
    "\n" +
    "                    <th></th>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </thead>\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr ng-repeat='author in authors' class='author trst-group-item'>\r" +
    "\n" +
    "                <td class='name'>{{author.name}}</td>\r" +
    "\n" +
    "                <td class='birthdate'>{{author.birthdate | date : format : longDate}}</td>\r" +
    "\n" +
    "                <td class='bio'>{{author.bio}}</td>\r" +
    "\n" +
    "                <td class='delete'><button type='button' class='btn btn-xs btn-warning' ng-disabled=\"author.books.length\" ng-click=\"deleteAuthor(author)\">Delete</button></td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\"><button type='button' class='btn btn-primary' ng-click='createAuthorDialog()'>Create Author</button></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/authorList/createAuthor.html',
    "<div>\r" +
    "\n" +
    "    <h2 class=\"title\">Enter Author Information</h2>\r" +
    "\n" +
    "    <form class=\"grid\" ng-submit='createAuthor()'>\r" +
    "\n" +
    "        <label class=\"row\">Name<input type=\"text\" max=\"250\" ng-model=\"name\" required</input></label>\r" +
    "\n" +
    "        <label class=\"row\">Bio<textarea type=\"string\" max=\"250\" ng-model=\"bio\"></textarea></label>\r" +
    "\n" +
    "        <label class=\"row\">Birth Date<input type=\"date\" ng-model=\"birthdate\" required></input></label>\r" +
    "\n" +
    "        <p><button class='btn btn-primary create row' type='submit'>Create</button></p>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/bookList/bookList.html',
    "<div class='bookListContainer grid'>\r" +
    "\n" +
    "    <div class='page-header'>\r" +
    "\n" +
    "        <h2>Books</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\"><button type='button' class='btn btn-primary' ng-click='createBookDialog()'>Create Book</button></div>\r" +
    "\n" +
    "    <div class='row'>\r" +
    "\n" +
    "        <table class='table'>\r" +
    "\n" +
    "            <thead>\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <th>Title</th>\r" +
    "\n" +
    "                    <th>ISBN</th>\r" +
    "\n" +
    "                    <th>Pages</th>\r" +
    "\n" +
    "                    <th>Author</th>\r" +
    "\n" +
    "                    <th></th>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </thead>\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr ng-repeat='book in books.list' class='book trst-group-item'>\r" +
    "\n" +
    "                <td class='title'>{{book.title}}</td>\r" +
    "\n" +
    "                <td class='isbn'>{{book.isbn}}</td>\r" +
    "\n" +
    "                <td class='pages'>{{book.pages}}</td>\r" +
    "\n" +
    "                <td class='author'>{{::getAuthorName(book.authorId)}}</td>\r" +
    "\n" +
    "                <td class='delete'><button type='button' class='btn btn-xs btn-warning' ng-click=\"deleteBook(book)\">Delete</button></td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\"><button type='button' class='btn btn-primary' ng-click='createBookDialog()'>Create Book</button></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/bookList/createBook.html',
    "<div>\r" +
    "\n" +
    "    <h2 class=\"title\">Enter Book Information</h2>\r" +
    "\n" +
    "    <form class=\"grid\" ng-submit='createBook()'>\r" +
    "\n" +
    "        <label class=\"row\">Title<input type=\"text\" ng-model=\"title\" required</input></label>\r" +
    "\n" +
    "        <label class=\"row\">ISBN<input type=\"number\" min=\"1000000000\" max=\"9999999999\" ng-model=\"isbn\" required></input></label>\r" +
    "\n" +
    "        <label class=\"row\">Pages<input type=\"number\" min=\"1\" max=\"100000\" ng-model=\"pages\" required></input></label>\r" +
    "\n" +
    "        <label class=\"row\">Author<select ng-options=\"author.id as author.name for (id, author) in authors\" ng-model=\"authorId\"></select></label>\r" +
    "\n" +
    "        <p><button class='btn btn-primary create row' type='submit'>Create</button></p>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/dualList/dualList.html',
    "<div class=\"dualListContainer grid\">\r" +
    "\n" +
    "    <book-list class=\"col-md-5\"></book-list>\r" +
    "\n" +
    "    <author-list class=\"col-md-5 col-md-offset-1\"></author-list>\r" +
    "\n" +
    "</div>"
  );

}]);
