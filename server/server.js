import express from 'express';
import dotenv from 'dotenv';
import scrapeRoutes from './routes/scrapeRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Enable CORS
app.use(cors({
  origin: ['https://job-miner.netlify.app','http://localhost:3000'], // Your React app's URL
  credentials: true
}));
app.use(express.json());

app.use('/api/scrape', scrapeRoutes);

app.get('/', (req, res)=>{
    res.send("server is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
