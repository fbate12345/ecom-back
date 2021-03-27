import multer from 'multer';
import sharp from 'sharp';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });
const storage = multer.memoryStorage();

const upload = multer({ storage });
const resizeImage = (req, res, next) => {
 if(!req.file) return next();
 req.file.filename=`${Date.now()}.jpg`;
 sharp(req.file.buffer)
   .resize(500, 500)
   .toFormat('jpg')
   .jpg({quality:90})
   .toFile('uploads/');
   next();
}

// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });
uploadRouter.post('/', isAuth, upload.array('image', 20), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;