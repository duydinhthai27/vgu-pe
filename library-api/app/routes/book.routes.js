const authorize = require("../middlewares/authorize.js");

module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const router = require("express").Router();

    // Create a new Book
    router.post("/", authorize("admin"), books.create);
    // Create multiple Books
    router.post("/multiple", authorize("admin"), books.createMultiple);
    // Retrieve all Books
    router.get("/", books.findAll);
    // Delete a Book by ID
    router.delete("/delete/:id", authorize("admin"), books.delete);
    // Delete all Books
    router.delete("/delete_all", authorize("admin"), books.deleteAll);
    // Update a Book by ID
    router.put("/update/:id", authorize("admin"), books.update);
    // Retrieve a single Book by ID
    router.get("/find/:id", books.findOne);
    // Retrieve all Books by a specific author
    router.post("/author", books.findByAuthor);
    // Retrieve all Books with a specific rating or higher
    router.post("/rating", books.findByMinRating);
    // find by title
    router.post("/title", books.findByTitle);
    // find by gerne
    router.post("/genre", books.findByGenre);
    // Retrieve all Genres of Books (unique genres only)
    router.get("/genres", books.findAllGenres);
    // retrieve all Authors
    router.get("/authors", books.findAllAuthors);
    // Retrieve all Book titles
    router.get("/titles", books.findAllTitles);
    // Retrieve all Book by rating
    router.get("/ratings", books.sortByRating);
    // Retrieve all Book by visited times
    router.get("/visited_times",  books.sortByVisitedTimes);
    // retrieve # of books
    router.get("/count",  books.count);
    // retrieve book by what user need (findBy)
    router.post("/findBy", books.findBy);
    // get findTop10
    router.get("/findTop10", books.findTop10);
    // retrieve # of books by gerne
    
    // Register the router with the app
    app.use('/api/books', router);
};
