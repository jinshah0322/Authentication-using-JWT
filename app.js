require('dotenv').config();
require('express-async-errors');

const express = require('express');
const mainRouter = require("./routes/main")

const app = express();

const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found")
const authMiddleware = require("./middleware/authentication")

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use("/api/v1",mainRouter)

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();