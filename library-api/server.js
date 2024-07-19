const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require('./init_db');

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to library application." });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/turorial.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/roombooking.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/rent.routes")(app);

// setup swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.3', // Specify the OpenAPI version
        info: {
            title: 'Library API System',
            version: '1.0.0',
            description: 'Api for the Library Online Management System',
        },
        components: {
          securitySchemes: {
              xAccessToken: { // Arbitrary name for the scheme
                  type: 'apiKey',
                  in: 'header',
                  name: 'x-access-token',
                  description: 'Your API access token',
              }
          }
        },
    },
    security: [
      {
        xAccessToken: []
      }
    ],
    apis: ['./app/routes/*.js'], // Path to your API routes (replace with your actual path)
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
