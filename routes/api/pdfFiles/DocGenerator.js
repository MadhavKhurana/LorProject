const fs = require("fs");
// const PDFDocument = require("pdfkit");

function generateHeader(doc) {
  doc
    .image("./logoCropped.jpeg", (doc.page.width - 312) / 2, 0, {
      fit: [350, 250]
    })
    .moveDown()
    .font("Times-Bold")
    .fontSize(15)

    .text("Dehmi Kalan, Near GVK Toll Plaza, Jaipur, Rajasthan, 303007", {
      align: "center"
    })
    // .lineGap(0.05)
    .text("Department Of Computer Science & Engineering", {
      align: "center"
    });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke()
    .moveDown();
}
function generateSubHeader(doc) {
  doc
    .font("Times-Bold")
    .fontSize(15)
    .text("Letter Of Recommendation", { align: "center", underline: "true" })
    .moveDown();
}

function generatePara(doc, content) {
  doc
    .font("Times-Roman")
    .fontSize(15)
    .text(content)
    .moveDown();
}
function generateFooter(doc, teacherName) {
  doc
    .font("Times-Roman")
    .fontSize(15)
    .text(teacherName, { align: "right" })
    .text("Assistant Professor", {
      align: "right"
    })
    .text("Computer Science and Engineering", {
      align: "right"
    })
    .text("Manipal University Jaipur", {
      align: "right"
    })
    .moveDown();
}

module.exports = {
  createLOR: function(doc, studentName, content, teacherName) {
    // let doc = new PDFDocument();
    generateHeader(doc);
    generateHr(doc, 127);
    generateSubHeader(doc);
    generatePara(doc, content);
    generateFooter(doc, teacherName);
    // doc.end();
    return doc;
    //doc.pipe(fs.createWriteStream("output.pdf"));
  }
};
