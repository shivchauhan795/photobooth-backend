import express from 'express';
import authRoutes from './routes/authRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import cors from 'cors';
import { configDotenv } from 'dotenv';
configDotenv();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.sendStatus(403);
})

app.use('/api/v1/api/auth', authRoutes);
app.use('/api/v1/api/media', mediaRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port ', process.env.PORT);
})
