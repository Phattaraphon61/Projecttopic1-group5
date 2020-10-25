const Joi = require('joi');
const Wpm = require('../models/wpm.model');

const wpmSchema = Joi.object({
  ownerid:Joi.string().required(),
  fullname:Joi.string().required(),
  email:Joi.string().required(),
  wpm: Joi.number().required()
})


module.exports = {
  insert,
  // get,
  getAll,
  // search,
}

async function insert(wpm) {
  wpm = await Joi.validate(wpm, wpmSchema, { abortEarly: false });
  return await new Wpm(wpm).save();
}

/**
 * อ่านเพิ่มเติม https://mongoosejs.com/docs/api.html
 */
// async function get(id) {
//   return await Student.find({sid: sid});
// }

async function getAll() {
  return await Wpm.find().sort( { wpm: -1 } );
}

// async function search(key, value) {
//   let query = {};
//   query[key] = value;
//   return await Student.find(query);
// }
