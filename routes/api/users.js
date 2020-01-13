const express = require("express");
const AWS = require("aws-sdk");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const smtpTransport = require("./pdfFiles/smtpTransport").smtpTransport;
const Admin = require("../../models/adminModel");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const validateRegisterInput = require("./validation/register.js");
const validateLoginInput = require("./validation/login.js");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const ID = "AKIAJZ3HAXQOJT6PCFOQ";
const SECRET = "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";
const BUCKET_NAME = "alllor";
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const a = require("../../config/keys").mongoURI;

const conn = mongoose.createConnection(a);

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: conn,
  file: (req, res) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString("hex") + path.extname(file.orignalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

router.post("/register-user", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ RegisterUserEmailErr: "Email already Exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
  // }
});

router.post("/login-user", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ LoginUserEmailErr: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched

        const payload = {
          id: user.id,
          name: user.name,
          regno: user.regno,
          isAdmin: user.isAdmin,
          email: user.email
        };

        //Sign Token
        jwt.sign(payload, "secret", { expiresIn: 3000000000 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res
          .status(400)
          .json({ LoginUserPasswordErr: "Password incorrect" });
      }
    });
  });
});

///ADMIN STUFFF

router.post(
  "/setAdminInfo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const Fields = {
      designation: req.body.des,
      department: req.body.dep
    };
    Admin.findOneAndUpdate(
      { email: req.user.email },
      { $set: Fields },
      { new: true }
    ).then(admin => {
      res.json(admin);
    });
  }
);

router.post("/register-admin", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if (!ValidateEmail(req.body.email)) {
  //   res
  //     .status(400)
  //     .json({ RegisterAdminEmailErr: "Please enter valid Email Address!!" });
  // }

  // if (!req.body.name || req.body.name.length < 3 || req.body.name > 30) {
  //   res.status(400).json({
  //     RegisterAdminNameErr: "Name must be betwwen 2 and 30 characters"
  //   });
  // }

  // if (req.body.password.length < 8) {
  //   res.status(400).json({
  //     RegisterAdminPasswordErr: "Password should be of atleast 8 characters!!"
  //   });
  // }

  // if (req.body.password !== req.body.cpassword) {
  //   res
  //     .status(400)
  //     .json({ RegisterAdminCPasswordErr: "Password does not Match" });
  // }

  // if (
  //   req.body.password !== req.body.cpassword ||
  //   req.body.password.length < 8 ||
  //   !req.body.name ||
  //   req.body.name.length < 3 ||
  //   req.body.name > 30 ||
  //   !ValidateEmail(req.body.email)
  // ) {
  //   console.log("error");
  // } else {
  Admin.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ RegisterAdminEmailErr: "Email already Exist" });
    } else {
      const newUser = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
        department: "",
        designation: ""
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
  // }
});

router.post("/login-admin", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ LoginAdminEmailErr: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched

        const payload = {
          id: user.id,
          name: user.name,
          regno: user.regno,
          isAdmin: user.isAdmin,
          email: user.email,
          designation: user.designation,
          department: user.department
        };

        //Sign Token
        jwt.sign(payload, "secret", { expiresIn: 3000000000 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res
          .status(400)
          .json({ LoginAdminPasswordErr: "Password incorrect" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

router.get(
  "/getFaculty",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Admin.find({})
      .then(admins => {
        let x = [];
        admins.filter(admin => {
          // console.log(admin.department.length);

          if (admin.department !== "" && admin.designation !== "") {
            x.push(admin);
            return admin;
          }
        });
        // console.log(x);

        res.json(x);
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.files == null) {
      return res.status(400).json({ msg: "No File Uploaded" });
    }
    let file = req.files.file;
    // console.log(file);
    const uploadFile = fileName => {
      // const fileContent = fs.readFileSync(file);

      const params = {
        Bucket: "alllor",
        Key: req.user.id,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read"
      };
      s3.upload(params, function(err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        res.json({ uploaded: true });
        // res.redirect(req.get("referer"));
      });
    };
    uploadFile();

    // Admin.findOneAndUpdate(
    //   { email: req.user.email },
    //   { $set: Fields },
    //   { new: true }
    // )
    //   .then(admin => {
    //     console.log("done");

    //     // res.json({
    //     //   fileName: req.user.id,
    //     //   filePath: `/uploads/${req.user.id}`
    //     // });
    //   })
    //   .catch(err => console.log(err));
    // });
  }
);

router.get(
  "/getSignature",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Admin.findOne({ _id: req.user.id })
      .then(admin => {
        let files = admin.img;
        // files = JSON.parse(files);
        // console.log(files);

        res.json(files);
      })
      .catch(err => console.log(err));
  }
);

// router.get("/lor", ensureAuthenticated, LORController.getLORForm);
// router.post("/lor", ensureAuthenticated, LORController.postLORForm);

module.exports = router;
