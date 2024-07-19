// book.model.js

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authors: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        edition: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        format: {
            type: DataTypes.STRING
        },
        num_pages: {
            type: DataTypes.INTEGER
        },
        rating: {
            type: DataTypes.FLOAT
        },
        rating_count: {
            type: DataTypes.INTEGER
        },
        review_count: {
            type: DataTypes.INTEGER
        },
        genres: {
            type: DataTypes.STRING
        },
        genre_list: {
            type: DataTypes.STRING
        },
        image_url: {
            type: DataTypes.STRING
        },
        Quote1: {
            type: DataTypes.TEXT
        },
        Quote2: {
            type: DataTypes.TEXT
        },
        Quote3: {
            type: DataTypes.TEXT
        },
        // visited times init are 0 for all book
        visited_times: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        // location of the book, default is "Main Hall"
        location: {
            type: DataTypes.STRING,
            defaultValue: "Main Hall"
        },
        // amount of the book in the library, default is 100
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
    }, {
        tableName: 'Books',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });

    return Book;
};
