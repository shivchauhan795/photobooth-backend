import express from 'express';
import authRoutes from './routes/authRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import { configDotenv } from 'dotenv';
configDotenv();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(403);
})

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/media', mediaRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port ', process.env.PORT);
})