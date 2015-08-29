(function() {
    "use strict";

    describe("book-list-directive-spec ::", function() {
        var $q;
        var $scope;
        var $compile;

        var MockNgDialog;
        var MockAuthorService;
        var MockBookService;

        beforeEach(function() {
            module("lobato-authorship");

            MockNgDialog = {
                open: jasmine.createSpy("ngDialog.open")
            };

            MockAuthorService = {
                def: null,
                getAuthors: jasmine.createSpy("AuthorService.getAuthors").and.callFake(function() {
                    this.def = $q.defer();
                    this.def.resolve();
                    return this.def.promise;
                }),
                removeBookFromAuthor: jasmine.createSpy("AuthorService.removeBookFromAuthor")
            };

            MockBookService = {
                getBooks: jasmine.createSpy("BookService.getBooks").and.callFake(function() {
                    var def = $q.defer();
                    def.resolve();
                    return def.promise;
                }),
                deleteBook: jasmine.createSpy("BookService.deleteBook")
            };

            module(function($provide) {
                $provide.factory("ngDialog", function() {
                    return MockNgDialog;
                });
                $provide.factory("AuthorService", function() {
                    return MockAuthorService;
                });
                $provide.factory("BookService", function() {
                    return MockBookService;
                });
            });

            inject(function(_$q_, $rootScope, _$compile_, $templateCache) {
                $q = _$q_;
                $scope = $rootScope.$new();
                $compile = _$compile_;
                $templateCache.put('app/bookList/bookList.html', '<div></div>');
            });
        });

        describe("initialization tests -->", function() {
            it("should initialize properly.", function() {
                $scope.testVariable = "testVariable";
                var bookListElement = angular.element('<book-list></book-list>');
                var compiledBookListElement = $compile(bookListElement)($scope);
                $scope.$digest();
                var newDirectiveScope = compiledBookListElement.isolateScope();

                expect(newDirectiveScope.testVariable).toBeUndefined();
                expect(MockBookService.getBooks).toHaveBeenCalled();
                expect(MockAuthorService.getAuthors).toHaveBeenCalled();
            });
        });

        describe("deleteBook() tests -->", function() {
            it("should properly delete a book.", function() {
                var bookListElement = angular.element('<book-list></book-list>');
                var compiledBookListElement = $compile(bookListElement)($scope);
                $scope.$digest();
                var newDirectiveScope = compiledBookListElement.isolateScope();

                newDirectiveScope.deleteBook({
                    id: "1",
                    name: "fakeBook",
                    authorId: "author1"
                });
                expect(MockBookService.deleteBook).toHaveBeenCalledWith({
                    id: "1",
                    name: "fakeBook",
                    authorId: "author1"
                });
                expect(MockAuthorService.removeBookFromAuthor).toHaveBeenCalledWith("author1", "1");
            });
        });

        describe("createBookDialog() tests -->", function() {
            it("should properly create the createBookDialog.", function() {
                var bookListElement = angular.element('<book-list></book-list>');
                var compiledBookListElement = $compile(bookListElement)($scope);
                $scope.$digest();
                var newDirectiveScope = compiledBookListElement.isolateScope();

                newDirectiveScope.createBookDialog();
                expect(MockNgDialog.open).toHaveBeenCalledWith({
                    template: 'app/bookList/createBook.html',
                    className: 'createBookModal',
                    controller: 'CreateBookController'
                });
            });
        });

        describe("getAuthorName() tests -->", function() {
            it("should properly getAuthorName.", function() {
                //For this test we need to have authors
                MockAuthorService.getAuthors = jasmine.createSpy("AuthorService.getAuthors").and.callFake(function() {
                    MockAuthorService.def = $q.defer();
                    MockAuthorService.def.resolve({
                        "1": {
                            id: "1",
                            name: "author1"
                        }
                    });
                    return MockAuthorService.def.promise;
                });

                var bookListElement = angular.element('<book-list></book-list>');
                var compiledBookListElement = $compile(bookListElement)($scope);
                $scope.$digest();
                var newDirectiveScope = compiledBookListElement.isolateScope();

                $scope.$apply();
                expect(newDirectiveScope.getAuthorName("1")).toEqual("author1");
            });
        });
    });
})();