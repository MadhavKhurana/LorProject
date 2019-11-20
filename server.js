const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users.js");
const pdf = require("./routes/api/pdf.js");
const admin = require("./routes/api/admin.js");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(fileUpload());

//Db Config

const db = require("./config/keys.js").mongoURI;

//connect to mongodb

mongoose
  .connect(db)
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT;

app.listen(port, () => console.log(`Running on port ${port}`));
