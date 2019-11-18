const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PdfModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // regno: {
  //   type: Number
  // },
  LorSubmitted: [
    {
      name: {
        type: String,
        required: true
      },
      pdfName: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      },
      isSubmitted: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = AllPdf = mongoose.model("allpdf", PdfModel);
