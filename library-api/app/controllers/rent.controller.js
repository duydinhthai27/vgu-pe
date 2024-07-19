const db = require("../models");
const Rent = db.rent;
const Book = db.books;
const User = db.users;
const response = require('./response');
const { v4: uuidv4 } = require('uuid');

// getDataBorrow controller
exports.getDataBorrow = (rq, rs) => {
  const ID_User = rq.query.ID_User; // Retrieve ID_User from query parameters

  if (!ID_User) {
    response.response(rs, "ID_User parameter is required", 400);
    return;
  }

  Rent.findAll({
    where: { ID_User: ID_User },
    include: [{
      model: Book,
      as: 'Book', // Ensure this matches the alias used in the association in your Rent model
      attributes: { exclude: ['ID_User'] } // Exclude ID_User from Book model attributes
    }],
    attributes: { exclude: ['ID_User'] } // Exclude ID_User from Rent model attributes
  })
    .then(rents => {
      if (rents.length > 0) {
        response.response(rs, "Success", 200, rents);
      } else {
        response.response(rs, "No rentals found for this user", 404);
      }
    })
    .catch(err => {
      console.error(err);
      response.response(rs, "An error occurred", 500);
    });
};

// getBorrowbyId controller
exports.getBorrowbyId = (rq, rs) => {
  const ID_Book = rq.params.ID_Book; // Assuming ID_Book is passed as a parameter

  Rent.findOne({
    where: { ID_Book: ID_Book }, // Look for Rent where ID_Book matches
    include: [{
      model: Book,
      as: 'Book', // Assuming 'Book' is the alias used in the association
      attributes: { exclude: ['ID_User'] } // Exclude ID_User from Book model attributes
    }],
    attributes: { exclude: ['ID_User'] } // Exclude ID_User from Rent model attributes
  })
    .then(rent => {
      if (rent) {
        response.response(rs, "Success", 200, rent);
      } else {
        response.response(rs, "Rent not found", 404);
      }
    })
    .catch(err => {
      console.error(err);
      response.response(rs, "An error occurred", 500);
    });
};

// insertBorrow controller
exports.insertBorrow = (rq, rs) => {
  const { books } = rq.body;
  const ID_User = rq.user.id;

  if (!books || !Array.isArray(books) || books.length === 0) {
    return response.response(rs, "No books to borrow provided", 400);
  }

  // Generate a unique ID_Rent for this transaction
  const ID_Rent = 0;

  const borrowPromises = books.map(bookData => {
    let findBookPromise;

    if (bookData.id_book) {
      findBookPromise = Book.findByPk(bookData.id_book);
    } else if (bookData.title) {
      findBookPromise = Book.findOne({ where: { title: bookData.title } });
    } else {
      return response.response(rs, "Each book must have ID_Book or title specified", 400);
    }

    return findBookPromise.then(book => {
      if (!book) {
        return response.response(rs, `Book not found for ${bookData.id_book || bookData.title}`, 404);
      }

      const Return_Date = bookData.Return_Date || null;
      const Issue_Date = new Date();

      // Check if the user has already borrowed this specific book
      return Rent.findOne({
        where: { ID_User: ID_User, ID_Book: book.id, status: 'borrowed' }
      }).then(existingRent => {
        if (existingRent) {
          return response.response(rs, `You have already borrowed ${book.title}`, 409);
        }

        // Check if the book is available to borrow
        if (book.amount > 0) {
          // Create a new rent record with the same ID_Rent for all books
          return Rent.create({
            ID_Rent: uuidv4(),
            ID_Book: book.id,
            Issue_Date,
            Return_Date,
            ID_User,
            status: 'borrowed'
          }).then(rent => {
            // Decrease the book amount and save
            book.amount -= 1;
            return book.save().then(() => rent);
          });
        } else {
          return response.response(rs, `Book ${book.title} is not available`, 410);
        }
      });
    });
  });

  // Execute all promises and respond once all operations are completed
  Promise.all(borrowPromises)
    .then(() => {
      response.response(rs, { message: "Books Successfully Borrowed" }, 200);
    })
    .catch(err => {
      console.error(err);
      response.response(rs, "An error occurred", 500);
    });
};

// returnBook controller to handle returning a single book or all books
exports.returnBook = (rq, rs) => {
  const { ID_Books } = rq.body; // Assuming ID_Books is an array of ID_Book values
  const ID_User = rq.user.id;
  const today = new Date();

  if (ID_Books && Array.isArray(ID_Books) && ID_Books.length > 0) {
    const returnPromises = ID_Books.map(ID_Book => {
      return Rent.findOne({ where: { ID_Book, ID_User, status: 'borrowed' } }) // Assuming status 'borrowed' means the book is borrowed
        .then(rent => {
          if (rent) {
            const Return_Date = new Date(rent.Return_Date);
            const lateFeePerDay = 5000; // Define the late fee per day
            let late_fee = 0;

            if (today > Return_Date) {
              const lateDays = Math.ceil((today - Return_Date) / (1000 * 60 * 60 * 24));
              late_fee = lateDays * lateFeePerDay;
            }

            return Rent.update({ Return_Date: today, late_fee, status: 'returned' }, { where: { ID_Rent: rent.ID_Rent } })
              .then(() => {
                // Update the book's amount
                return Book.findByPk(ID_Book)
                  .then(book => {
                    if (book) {
                      book.amount += 1;
                      return book.save();
                    } else {
                      return Promise.reject(`Book with ID ${ID_Book} not found`);
                    }
                  });
              });
          } else {
            return response.response(rs, `No active rent found for book with ID ${ID_Book}`, 404);
          }
        });
    });

    // Execute all promises and respond once all operations are completed
    Promise.all(returnPromises)
      .then(() => {
        response.response(rs, "Books Successfully Returned", 200);
      })
      .catch(err => {
        console.error(err);
        response.response(rs, "An error occurred", 500);
      });
  } else {
    // If no ID_Books is provided, return all borrowed books
    Rent.findAll({
      where: { ID_User: ID_User, status: 'borrowed' },
      include: [{
        model: Book,
        as: 'Book'
      }]
    })
      .then(rents => {
        if (!rents || rents.length === 0) {
          return response.response(rs, "No books to return", 404);
        }

        const returnPromises = rents.map(rent => {
          const Return_Date = new Date(rent.Return_Date);
          const lateFeePerDay = 5000; // Define the late fee per day
          let late_fee = 0;

          if (today > Return_Date) {
            const lateDays = Math.ceil((today - Return_Date) / (1000 * 60 * 60 * 24));
            late_fee = lateDays * lateFeePerDay;
          }

          return Rent.update({ Return_Date: today, late_fee, status: 'returned' }, { where: { ID_Rent: rent.ID_Rent } })
            .then(() => {
              rent.Book.amount += 1;
              return rent.Book.save();
            });
        });

        Promise.all(returnPromises)
          .then(() => {
            response.response(rs, "All books successfully returned", 200);
          })
          .catch(err => {
            console.error(err);
            response.response(rs, "An error occurred", 500);
          });
      })
      .catch(err => {
        console.error(err);
        response.response(rs, "An error occurred", 500);
      });
  }
};

// deleteRental controller for admin
exports.deleteRental = (rq, rs) => {
  const { ID_Books } = rq.body; // Assuming ID_Books is an array of ID_Book values
  const ID_User = rq.query.ID_User; // Retrieve ID_User from query parameters

  if (!ID_User) {
    return response.response(rs, "ID_User parameter is required", 400);
  }

  if (ID_Books && Array.isArray(ID_Books) && ID_Books.length > 0) {
    const deletePromises = ID_Books.map(ID_Book => {
      return Rent.findOne({
        where: { ID_Book: ID_Book, ID_User: ID_User, status: 'returned' } // Ensure the book has been returned
      })
        .then(rent => {
          if (!rent) {
            return response.response(rs, `No returned rental information found for book with ID ${ID_Book} and user with ID ${ID_User}`, 404);
          }

          return Rent.destroy({
            where: { ID_Book: ID_Book, ID_User: ID_User, status: 'returned' }
          });
        });
    });

    // Execute all promises and respond once all operations are completed
    Promise.all(deletePromises)
      .then(() => {
        response.response(rs, "Rental information successfully deleted", 200);
      })
      .catch(err => {
        console.error(err);
        response.response(rs, "An error occurred", 500);
      });
  } else {
    // If no ID_Books is provided, delete all rental information for the user
    Rent.findAll({
      where: { ID_User: ID_User, status: 'returned' }
    })
      .then(rents => {
        if (!rents || rents.length === 0) {
          return response.response(rs, "No returned rental information found for this user", 404);
        }

        const deletePromises = rents.map(rent => {
          return Rent.destroy({
            where: { ID_Rent: rent.ID_Rent }
          });
        });

        Promise.all(deletePromises)
          .then(() => {
            response.response(rs, "All rental information successfully deleted", 200);
          })
          .catch(err => {
            console.error(err);
            response.response(rs, "An error occurred", 500);
          });
      })
      .catch(err => {
        console.error(err);
        response.response(rs, "An error occurred", 500);
      });
  }
};


