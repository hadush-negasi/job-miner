import express from 'express';
import { scrapeRemoteJobs } from '../controllers/scrapeController.js';

const router = express.Router();

router.get('/remoteok', scrapeRemoteJobs);

export default router;
