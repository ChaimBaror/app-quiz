import express from 'express';
import cors from 'cors';
import router from '../src/Routes/quiz.routes.js';


const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/quiz', router);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;

