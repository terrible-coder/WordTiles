const express = require("express");
const lib = require("./library");
require("dotenv").config();

/**
 * The port number at which the server is listening at.
 */
const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, () => console.log(`Server listening at port ${PORT}...`));
app.use(express.static("public"));

lib.check();