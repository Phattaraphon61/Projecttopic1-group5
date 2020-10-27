const express = require('express');
const asyncHandler = require('express-async-handler');
const wpmCtrl = require('../controllers/wpm.controller');

const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', { session: false }))

router.route('/insert').post(asyncHandler(insert));
router.route('/del/:_id').get(asyncHandler(delhistory));
// router.route('/get/:sid(\d+)').get(asyncHandler(get));
router.route('/all/:ownerid').get(asyncHandler(getAll));
router.route('/getAllranking').get(asyncHandler(getAllranking));
// router.route('/search').get(asyncHandler(search));

async function delhistory(req,res){
  let all_students = await wpmCtrl.delhistory(req.params['_id']);
  res.json(all_students);
}

async function getAllranking(req, res){
  let all_students = await wpmCtrl.getAllranking();
  res.json(all_students);
}

async function insert(req, res) {
  let student = await wpmCtrl.insert(req.body);
  res.json(student);
}

// async function get(req, res) {
//   let all_students = await wpmCtrl.get(req.params['sid']);
//   res.json(all_students);
// }

async function getAll(req, res) {
  let all_students = await wpmCtrl.getAll(req.params['ownerid']);
  res.json(all_students);
}

// async function search(req, res) {
//   let result = await wpmCtrl.search(req.params['key'], req.params['value']);
//   res.json(result);
// }
