const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;
const fs = require('fs').promises;

exports.createBooksFromJSON = async (filePath) => {
    try {
        const count = await Book.count();
        if (count > 0) {
            console.log("Books in json have been added to the database before.");
            return;
        }
        // Read and parse the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        const books = JSON.parse(data);

        // Map the book data to match the Book model fields
        const bookData = books.map(book => ({
            title: book.title,
            authors: book.authors,
            description: book.description || "",
            edition: book.edition || "",
            format: book.format || "",
            num_pages: book.num_pages || 0,
            rating: book.rating || 0,
            rating_count: book.rating_count || 0,
            review_count: book.review_count || 0,
            genres: book.genres || "",
            genre_list: book.genre_list || "",
            image_url: book.image_url || "",
            Quote1: book.Quote1 || "",
            Quote2: book.Quote2 || "",
            Quote3: book.Quote3 || ""
        }));

        // if the book data is already in db, do not add
        

        // Bulk create books in the database

        await Book.bulkCreate(bookData);
        console.log("Books have been successfully added to the database.");
    } catch (error) {
        console.error("Error reading or saving book data: ", error);
    }
};

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.authors) {
        res.status(400).send({
            message: "Title and Authors are required!"
        });
        return;
    }

    // Create a Book
    const book = {
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description || "",
        edition: req.body.edition || "",
        format: req.body.format || "",
        num_pages: req.body.num_pages || 0,
        rating: req.body.rating || 0,
        rating_count: req.body.rating_count || 0,
        review_count: req.body.review_count || 0,
        genres: req.body.genres || "",
        genre_list: req.body.genre_list || "",
        image_url: req.body.image_url || "",
        Quote1: req.body.Quote1 || "",
        Quote2: req.body.Quote2 || "",
        Quote3: req.body.Quote3 || "",
        //visited_times default to 0
        visited_times: req.body.visited_times || 0
    };

    // Save Book in the database
    Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};

// Create and Save multiple Books
exports.createMultiple = (req, res) => {
    // Validate request
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).send({
            message: "Array of books is required!"
        });
    }

    // Map each book in the request body
    const books = req.body.map(book => ({
        title: book.title,
        authors: book.authors,
        description: book.description || "",
        edition: book.edition || "",
        format: book.format || "",
        num_pages: book.num_pages || 0,
        rating: book.rating || 0,
        rating_count: book.rating_count || 0,
        review_count: book.review_count || 0,
        genres: book.genres || "",
        genre_list: book.genre_list || "",
        image_url: book.image_url || "",
        Quote1: book.Quote1 || "",
        Quote2: book.Quote2 || "",
        Quote3: book.Quote3 || ""
    }));

    // Bulk create books in the database
    Book.bulkCreate(books)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Books."
            });
        });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
};

// Find a single Book by ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    // visited times ++
    Book.increment('visited_times', { where: { id: id } });
    Book.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Book with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Book with id=" + id
            });
        });
};

//return top 10 visitied times books
exports.findTop10 = (req, res) => {
    Book.findAll({ order: [['rating_count', 'DESC']], limit: 10 })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving top 10 books."
            });
        });
};


// Update a Book by the ID in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Book.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

// Delete a Book with the specified ID in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Book.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
    Book.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Books were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all books."
            });
        });
};

// Retrieve all Books by a specific author
exports.findByAuthor = (req, res) => {
    const author = req.body.authors;

    Book.findAll({ where: { authors: { [Op.like]: `%${author}%` } } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books by author."
            });
        });
};

// Retrieve all Books with a specific rating or higher
exports.findByMinRating = (req, res) => {
    const minRating = req.body.rating;

    Book.findAll({ where: { rating: { [Op.gte]: minRating } } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books with a minimum rating."
            });
        });
};
// search by title
exports.findByTitle = (req, res) => {
    const title = req.body.title;

    Book.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books by title."
            });
        });
};
// search by genre
exports.findByGenre = (req, res) => {
    const genre = req.body.genres;
    //book has many genre: like a, b, c, d, e
    //user can only search a or c or e to find it
    //like check if contain
    Book.findAll({ where: { genres: { [Op.like]: `%${genre}%` } } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books by genre."
            });
        });
};
// Retrieve list of Genres of Books (unique genres only), 1 gerne only appear once for combo box like this
// Genres v
// a
// b
// c
// d
// return 1 array of Genres
exports.findAllGenres = (req, res) => {
    Book.findAll({ attributes: ['genres'] })
        .then(data => {
            let genres = [];
            data.forEach(book => {
                const bookGenres = book.genres.split(', ');
                bookGenres.forEach(genre => {
                    if (!genres.includes(genre)) {
                        genres.push(genre);
                    }
                });
            });
            res.send(genres);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving book genres."
            });
        });

}
// fill all authors
exports.findAllAuthors = (req, res) => {
    Book.findAll({ attributes: ['authors'] })
        .then(data => {
            let authors = [];
            data.forEach(book => {
                const bookAuthors = book.authors.split(', ');
                bookAuthors.forEach(author => {
                    if (!authors.includes(author)) {
                        authors.push(author);
                    }
                });
            });
            res.send(authors);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving book authors."
            });
        });
}

// Retrieve all Book titles
exports.findAllTitles = (req, res) => {
    Book.findAll({ attributes: ['title'] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving book titles."
            });
        });
};

// sort by rating
exports.sortByRating = (req, res) => {
    Book.findAll({ order: [['rating', 'DESC']] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while sorting books by rating."
            });
        });
};

//  sort by visited times
exports.sortByVisitedTimes = (req, res) => {
    Book.findAll({ order: [['visited_times', 'DESC']] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while sorting books by visited times."
            });
        });
}
//retrive # of books in db
exports.count = (req, res) => {
    Book.count()
        .then(count => {
            res.send({ count: count });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while counting books."
            });
        });
};
//retrive based on what users need
exports.findBy = (req, res) => {
    const title = req.body.title;
    const authors = req.body.authors;
    const genres = req.body.genres;
    const rating = req.body.rating;
    const visited_times = req.body.visited_times;
    const query = {
        where: {}
    };

    if (title) {
        query.where.title = { [Op.like]: `%${title}%` };
    }
    if (authors) {
        query.where.authors = { [Op.like]: `%${authors}%` };
    }
    if (genres) {
        query.where.genres = { [Op.like]: `%${genres}%` };
    }
    if (rating) {
        query.where.rating = { [Op.gte]: rating };
    }
    if (visited_times) {
        query.where.visited_times = { [Op.gte]: visited_times };
    }

    Book.findAll(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
};