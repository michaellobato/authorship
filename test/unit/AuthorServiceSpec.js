(function() {
    "use strict";

    describe("AuthorServiceSpec ::", function() {
        var AuthorService;
        var $q;
        var $rootScope;

        beforeEach(function() {
            module("lobato-authorship");

            inject(function($injector, _$q_, _$rootScope_) {
                $q = _$q_;
                $rootScope = _$rootScope_;
                AuthorService = $injector.get('AuthorService');
            });
        });

        describe("getAuthors() tests -->", function() {
            it("Should return the authors once retrieved.", function() {
                var authors;
                AuthorService.getAuthors().then(function(retrievedAuthors) {
                    authors = retrievedAuthors;
                });

                $rootScope.$apply();//triger digest for defer
                expect(_.size(authors)).toEqual(4);
            });
        });

        describe("addBookToAuthor() tests -->", function() {
            it("Should throw an error if addBookToAuthor is called before getAuthors.", function() {
                expect(function() {
                    AuthorService.addBookToAuthor("1", "2");
                }).toThrow();
            });

            it("Should add the book to the author.", function() {
                var authors;
                AuthorService.getAuthors().then(function(retrievedAuthors) {
                    authors = retrievedAuthors;
                });

                $rootScope.$apply();
                expect(authors["1"].books.length).toEqual(1);

                AuthorService.addBookToAuthor("1", "2");
                expect(authors["1"].books.length).toEqual(2);
            });
        });

        describe("createAuthor() tests -->", function() {
            it("Should throw an error if createAuthor is called before getAuthors.", function() {
                expect(function() {
                    AuthorService.createAuthor("new Author", "new bio", new Date(), []);
                }).toThrow();
            });

            it("Should create the author properly.", function() {
                var authors;
                AuthorService.getAuthors().then(function(retrievedAuthors) {
                    authors = retrievedAuthors;
                });

                $rootScope.$apply();
                expect(_.size(authors)).toEqual(4);

                var birthdate = new Date();
                AuthorService.createAuthor("new Author", "new bio", birthdate, []);
                expect(authors[5]).toEqual({
                    id: 5,
                    name: "new Author",
                    bio: "new bio",
                    birthdate: birthdate,
                    books: []
                });
            });
        });

        describe("removeBookFromAuthor() tests -->", function() {
            it("Should throw an error if removeBookFromAuthor is called before getAuthors.", function() {
                expect(function() {
                    AuthorService.removeBookFromAuthor("1", "1");
                }).toThrow();
            });

            it("Should remove the book from the author properly.", function() {
                var authors;
                AuthorService.getAuthors().then(function(retrievedAuthors) {
                    authors = retrievedAuthors;
                });

                $rootScope.$apply();
                expect(_.size(authors)).toEqual(4);

                var birthdate = new Date();
                expect(authors["1"].books.length).toEqual(1);

                AuthorService.removeBookFromAuthor("1", "1");
                expect(authors["1"].books.length).toEqual(0);
            });
        });

        describe("deleteAuthor() tests -->", function() {
            it("Should throw an error if deleteAuthor is called before getAuthors.", function() {
                expect(function() {
                    AuthorService.deleteAuthor();
                }).toThrow();
            });

            it("Should delete the author properly.", function() {
                var authors;
                AuthorService.getAuthors().then(function(retrievedAuthors) {
                    authors = retrievedAuthors;
                });

                $rootScope.$apply();
                expect(_.size(authors)).toEqual(4);

                var birthdate = new Date();
                expect(_.size(authors)).toEqual(4);

                AuthorService.deleteAuthor("1");
                expect(_.size(authors)).toEqual(3);
            });
        });
    });
}());
