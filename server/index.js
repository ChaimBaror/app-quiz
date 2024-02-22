import express from 'express';
import cors from 'cors';
import { getQuizzes, getQuizzesByCategory, getCategory } from './src/quiz-service.js';
import e from 'express';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/quiz', async (req, res) => {
  const { category } = req.query;
  if (category) {
    console.log(`GET request for /api/quiz?category=${category}`);
  }
  try {
    if (category) {
      const quizzes = await getQuizzesByCategory(category);
      res.json(quizzes);
    }
    else {
      const quizzes = await getQuizzes();
      res.json(quizzes);
    }
  } catch (error) {
    console.error('Error fetching quizzes:', error.message);
    res.status(500).send('Internal server error');
  }
});

app.get('/api/quiz/categories', async (req, res) => {
  console.log('GET request for /api/quiz/categories');
  try {
    const categories = await getCategory();
    res.json(categories);
  }
  catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).send('Internal server error');
  }
}
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
