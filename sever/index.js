import express from 'express';
import cors from 'cors';
import { getQuizzes } from './src/quiz-service.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/quiz', async (req, res) => {
  console.log('GET request for /api/quiz');
  try {
    const quizzes = await getQuizzes();
    console.log(quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error.message);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
