import express from 'express';
import dotenv from 'dotenv';
import scrapeRoutes from './routes/scrapeRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/scrape', scrapeRoutes);

app.get('/', (req, res)=>{
    res.send("server is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
