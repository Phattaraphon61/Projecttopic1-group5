const mongoose = require('mongoose');

/**
 * อ่านเพิ่มเติม https://mongoosejs.com/docs/guide.html
 */
const WpmSchema = new mongoose.Schema(

  {
    ownerid: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    wpm: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);


module.exports = mongoose.model('wpm', WpmSchema);
