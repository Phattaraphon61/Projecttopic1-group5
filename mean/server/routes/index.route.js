const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const studentRoutes = require('./student.route');
const wpmRoutes = require('./wpm.route')
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');



const router = express.Router();
router.use(cors({ origin: "*" }));
router.use(bodyParser.json()); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/student', studentRoutes);
router.use('/wpm', wpmRoutes);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null,'./src/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage });

//let upload = multer({ dest: 'uploads/' })

router.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center'>
          Wellcome to FunOfHeuristic
          <br><br>
          <b style="font-size: 182px;">😃👻</b>
      </h1>`
  );
});

router.post('/file', upload.single('file'), (req, res, next) => {
  console.log("ddddddddddd")
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file);
})
router.use('/image/:name', function (req, res) {
	res.sendFile(path.resolve(__dirname, `./uploads/${req.params.name}`));
})
router.post('/multipleFiles', upload.array('files'), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({ sttus: 'ok' });
})

module.exports = router;
