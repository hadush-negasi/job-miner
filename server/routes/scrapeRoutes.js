import express from 'express';
import { scrapeRemoteJobs } from '../controllers/scrapeController.js';
import { getCareerjetJobs } from '../controllers/jobController.js';
const router = express.Router();

router.get('/remoteok', scrapeRemoteJobs);
router.get('/careerjet', getCareerjetJobs);

export default router;
