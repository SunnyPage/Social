import express from 'express';
import multer from 'multer';
const upload = multer();

const router = express.Router();

import { uploadImage } from '../controllers/upload';

router.post('/', upload.single('file'), uploadImage);

export default router;