
import { getQuizzesByCategory, getQuizzes, getCategory } from '../Modules/quiz-module.js';

export const getQuizzesController = async (req, res) => {

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
};
export const getCategoryController = async (req, res) => {
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
