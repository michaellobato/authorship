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
