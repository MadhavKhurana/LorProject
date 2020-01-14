const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users.js");
const pdf = require("./routes/api/pdf.js");
const admin = require("./routes/api/admin.js");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const path = require("path");
const AWS = require("aws-sdk");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(cors());

app.use(fileUpload());

//Db Config

const d = require("./config/keys.js").mongoURI;

mongoose
  .connect(d)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//Use Routes

app.use("/api/users", users);
app.use("/api/pdf", pdf);
app.use("/api/admin", admin);
// var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
const port = process.env.PORT || 2000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => console.log(`Running on port ${port} `));
