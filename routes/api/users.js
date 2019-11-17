const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// const LORController = require("./pdfFiles/DocGenerator");
const smtpTransport = require("./pdfFiles/smtpTransport").smtpTransport;
const Admin = require("../../models/adminModel");
const fs = require("fs");
const fileUpload = require("express-fileupload");

router.get("/test", (req, res) => res.json({ msg: "User Works" }));

router.post("/register-user", (req, res) => {
  //    const {errors,isValid}=validateRegisterInput(req.body)
  //
  //    if(!isValid){
  //        return res.status(400).json(errors)
  //    }
  if (!req.body.name || req.body.name.length < 3 || req.body.name > 30) {
    res.status(400).json({
      msg: "Name must be betwwen 2 and 30 characters"
    });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already Exist" });
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
});

router.post("/login-user", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
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
        return res.status(400).json({ passowrd: "Password incorrect" });
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
  //    const {errors,isValid}=validateRegisterInput(req.body)
  //
  //    if(!isValid){
  //        return res.status(400).json(errors)
  //    }
  if (!req.body.name || req.body.name.length < 3 || req.body.name > 30) {
    res.status(400).json({
      msg: "Name must be betwwen 2 and 30 characters"
    });
  }

  Admin.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already Exist" });
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
});

router.post("/login-admin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
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
        return res.status(400).json({ passowrd: "Password incorrect" });
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
        admins.filter(admin => {
          if (admin.department !== "" && admin.designation !== "") {
            return admin;
          }
        });
        res.json(admins);
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/uploadSignature",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const Fields = {
      signature: fs.readFileSync(req.files.userPhoto.path)
    };
    Admin.findOneAndUpdate(
      { email: req.user.email },
      { $set: Fields },
      { new: true }
    )
      .then(admin => {
        res.json(admin);
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
    const file = req.files.file;

    file.mv(`client/public/uploads/${file.name}`, err => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      fs.rename(
        `client/public/uploads/${file.name}`,
        `client/public/uploads/${req.user.id}`,
        function(err) {
          if (err) console.log("ERROR: " + err);
        }
      );
      const Fields = {
        signature: {
          fileName: req.user.id,
          filePath: `/uploads/${req.user.id}`
        }
      };
      Admin.findOneAndUpdate(
        { email: req.user.email },
        { $set: Fields },
        { new: true }
      )
        .then(admin => {
          res.json({
            fileName: req.user.id,
            filePath: `/uploads/${req.user.id}`
          });
        })
        .catch(err => console.log(err));
    });
  }
);

router.get(
  "/getSignature",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Admin.findOne({ _id: req.user.id })
      .then(admin => {
        res.json(admin.signature);
      })
      .catch(err => console.log(err));
  }
);

// router.get("/lor", ensureAuthenticated, LORController.getLORForm);
// router.post("/lor", ensureAuthenticated, LORController.postLORForm);

module.exports = router;
