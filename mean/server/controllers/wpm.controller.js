const Joi = require('joi');
const Wpm = require('../models/wpm.model');
const Ranking = require("../models/ranking.model");
const { isValidObjectId } = require('mongoose');

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
  getAllranking,
  delhistory,
}

async function delhistory(_id){
   return await Wpm.deleteOne({_id:_id})
}

async function insert(wpm) {
  wpm = await Joi.validate(wpm, wpmSchema, { abortEarly: false });
  ranking =  await Ranking.find({ownerid: wpm.ownerid})
  if (ranking.length == 0){
    await new Ranking(wpm).save();

  }if(ranking.length !== 0){
    if(ranking[0].wpm <= wpm.wpm){
    await Ranking.update({_id: ranking[0]._id},{$set:{wpm:wpm.wpm}});
  }
  }
  return await new Wpm(wpm).save();

}

/**
 * อ่านเพิ่มเติม https://mongoosejs.com/docs/api.html
 */
// async function get(id) {
//   return await Student.find({sid: sid});
// }

async function getAll(ownerid) {
  data = await Wpm.find({ownerid: ownerid}).sort( { createdAt: -1 } );
  return data;
}

async function getAllranking() {
  return await Ranking.find().sort( { wpm: -1 } ).limit(10);
}

// async function search(key, value) {
//   let query = {};
//   query[key] = value;
//   return await Student.find(query);
// }
