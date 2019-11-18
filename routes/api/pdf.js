const express = require("express");
const router = express.Router();
const createLOR = require("./pdfFiles/DocGenerator").createLOR;
const smtpTransport = require("./pdfFiles/smtpTransport").smtpTransport;
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const AllPdf = require("../../models/pdfModel.js");
const PdfSubmit = require("../../models/pdfSubmitModel.js");
const passport = require("passport");
const PDFParser = require("pdf2json");

router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

router.post(
  "/generate-pdfsxsx-of-lor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      studentName,
      content,
      teacherName,
      facultyDesignation,
      facultyDepartment
    } = req.body;

    // if (!fs.existsSync(`routes/api/pdfFiles/${studentName}`)) {
    //   fs.mkdirSync(`routes/api/pdfFiles/${studentName}`);
    // }

    // if (!fs.existsSync(`client/public/pdfFiles/${studentName}`)) {
    //   fs.mkdirSync(`client/public/pdfFiles/${studentName}`);
    // }

    let filename =
      encodeURIComponent(studentName.replace(" ", "-")) +
      "-" +
      encodeURIComponent(teacherName.replace(" ", "-")) +
      "-lor.pdf";

    // const changeName = name => {
    //   try {
    //     if (fs.existsSync(`client/public/${name}`)) {
    //       name = `x.${name}`;
    //       changeName(name);
    //     } else {
    //       return name;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    for (let i = 0; i < 10; i++) {
      try {
        if (fs.existsSync(`client/public/${filename}`)) {
          filename = `x.${filename}`;
        } else {
          filename = filename;
        }
      } catch (err) {
        console.log(err);
      }
    }

    // filename = changeName(filename);
    console.log("NAME----------------" + filename);

    // try {
    //   if (fs.existsSync(`client/public/${filename}`)) {
    //     filename = `x.${filename}`;
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

    AllPdf.findOne({ user: req.user.id })
      .then(pdf => {
        if (pdf) {
          pdf.LorSubmitted.unshift({
            name: studentName,
            pdfName: filename,
            location: `routes/api/pdfFiles/${studentName}`,
            to: req.body.temail,
            isSubmitted: false,
            content: content
          });

          pdf
            .save()
            .then(pdf => res.json(pdf))
            .catch(err => console.log(err));
        } else {
          const newPdf = new AllPdf({
            user: req.user.id,
            LorSubmitted: [
              {
                name: studentName,
                pdfName: filename,
                location: `routes/api/pdfFiles/${studentName}`,
                isSubmitted: false,
                to: req.body.temail,
                content: content
              }
            ]
          });
          newPdf
            .save()
            .then(pdf => res.json(pdf))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));

    // add to content to document
    // const doc = createLOR(new PDFDocument(), studentName, content, teacherName);

    var doc = new PDFDocument();

    var pdfFile2 = path.join(`client/public`, filename);
    var pdfStream2 = fs.createWriteStream(pdfFile2);
    doc
      .image("./logoCropped.jpeg", (doc.page.width - 312) / 2, 0, {
        fit: [350, 250]
      })
      .moveDown()
      .font("Times-Bold")
      .fontSize(15)

      .text("Dehmi Kalan, Near GVK Toll Plaza, Jaipur, Rajasthan, 303007", {
        align: "center"
      });
    // .lineGap(0.05)
    // .text("Department Of Computer Science & Engineering", {
    //   align: "center"
    // });
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      // .moveTo(50, y)
      // .lineTo(550, y)
      .stroke()
      .moveDown();
    doc
      .font("Times-Bold")
      .fontSize(15)
      .text("Letter Of Recommendation", { align: "center", underline: "true" })
      .moveDown();
    doc
      .font("Times-Roman")
      .fontSize(15)
      .text(content)
      .moveDown();
    doc
      .font("Times-Roman")
      .fontSize(15)
      .text(teacherName, { align: "right" })
      .text(`${facultyDesignation}`, {
        align: "right"
      })
      .text(`${facultyDepartment}`, {
        align: "right"
      })
      .text("Manipal University Jaipur", {
        align: "right"
      })
      .moveDown();

    doc.pipe(pdfStream2);
    doc.end();

    // res.setHeader(
    //   "Content-disposition",
    //   'attachment; filename="' + filename + '"'
    // );

    // res.setHeader("Content-type", "application/pdf");

    // const mailOptions = {
    //   to: req.body.email,
    //   from: "madhavkhurana086@gmail.com",
    //   subject: "Sample LOR generated",
    //   text: "Please find your LOR attached below",
    //   attachments: [
    //     {
    //       filename: filename,
    //       path:''

    //     }
    //   ]
    // };

    // smtpTransport.sendMail(mailOptions);
  }
);

router.get(
  "/submLorss",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    AllPdf.findOne({ user: req.user.id })
      .then(pdf => {
        if (!pdf) {
          res.json([{ pdfName: "No LOR(s) found. Please create one..." }]);
        }

        res.json(pdf.LorSubmitted);
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/prevPDF",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filePath = req.body.location;
    // res.json({ msg: __dirname + filePath });
    // console.log(__dirname + filePath);

    fs.readFile(__dirname + filePath, function(err, data) {
      res.contentType("application/pdf");
      res.json(JSON.stringify(data));
    });
  }
);

router.post(
  "/submitPdf",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    AllPdf.findOne({ user: req.user.id })

      // .populate("user")
      .then(pdf => {
        let a;
        pdf.LorSubmitted.find(lor => {
          if (lor.pdfName === req.body.pdf) {
            lor.isSubmitted = true;
            a = lor.content;
          }
        });
        pdf
          .save()
          .then(data => {
            const Submission = new PdfSubmit({
              to: req.body.to,
              from: req.body.from,
              isApproved: false,
              pdf: req.body.pdf,
              content: a
            });

            Submission.save()
              .then(data => {
                AllPdf.findOne({ user: req.user.id })
                  .then(data => {
                    // console.log(data);
                    res.json(data.LorSubmitted);
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      });
  }
);

router.get(
  "/getSubmitedPdf",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PdfSubmit.find({ to: req.user.email, isApproved: "false" })
      .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/getApprovedPdf",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PdfSubmit.find({ to: req.user.email, isApproved: "true" })
      .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/getsApprovedPdf",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PdfSubmit.find({ from: req.user.email })
      .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/ApproveLor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      studentName,
      content,
      teacherName,
      facultyDesignation,
      facultyDepartment,
      filename,
      sign
    } = req.body;

    PdfSubmit.findOne({ pdf: filename }).then(pdfs => {
      pdfs.isApproved = true;

      pdfs.save().then(data => {
        var doc = new PDFDocument();
        var pdfFile2 = path.join(`client/public`, filename);
        var pdfStream2 = fs.createWriteStream(pdfFile2);
        doc
          .image("./logoCropped.jpeg", (doc.page.width - 312) / 2, 0, {
            fit: [350, 250]
          })
          .moveDown()
          .font("Times-Bold")
          .fontSize(15)

          .text("Dehmi Kalan, Near GVK Toll Plaza, Jaipur, Rajasthan, 303007", {
            align: "center"
          });
        // .lineGap(0.05)
        // .text("Department Of Computer Science & Engineering", {
        //   align: "center"
        // });
        doc
          .strokeColor("#aaaaaa")
          .lineWidth(1)
          // .moveTo(50, y)
          // .lineTo(550, y)
          .stroke()
          .moveDown();
        doc
          .font("Times-Bold")
          .fontSize(15)
          .text("Letter Of Recommendation", {
            align: "center",
            underline: "true"
          })
          .moveDown();
        doc
          .font("Times-Roman")
          .fontSize(15)
          .text(content)
          .moveDown()
          .image(`client/public/uploads/${sign}`, 430, 580, {
            fit: [100, 100]
          });
        doc.moveDown();

        doc
          .font("Times-Roman")
          .fontSize(15)
          .text(teacherName, 430, 640)
          .text(`${facultyDesignation}`, 480, 660)
          .text(`${facultyDepartment}`, 350, 680)
          .text("Manipal University Jaipur", 380, 700)
          .moveDown()
          .moveDown()
          .moveDown()
          .moveDown()
          .moveDown();

        doc.pipe(pdfStream2);
        doc.end();
        res.json(data);
      });
    });
  }
);

module.exports = router;
