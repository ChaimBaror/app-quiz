import e from 'express';
import { readDB, writeDB } from './db.js';
export const addQuiz = async (quiz) => {
    const data = await readDB();
    data.push(quiz);
    await writeDB(data);
}

export const deleteQuiz = async (id) => {
    const data = await readDB();
    const newData = data.filter((quiz) => quiz.id !== id);
    await writeDB(newData);
}

export const updateQuiz = async (id, quiz) => {
    const data = await readDB();
    const index = data.findIndex((quiz) => quiz.id === id);
    data[index] = quiz;
    await writeDB(data);
}

export const getQuiz = async (id) => {
    const data = await readDB();
    return data.find((quiz) => quiz.id === id);
}

export const getQuizzes = async () => {
    const data = await readDB();
    const randomCategory = randomProperty(data.categories).questions;
    return { questions: generateQuestions(data[randomCategory]), categories: randomCategory };
}

export const getQuizzesByCategory = async (category = "A") => {
    const data = await readDB();

    const nameCategory = Object.values(data.categories).find(key => {
        return key.category === category;
    });

    const questions = nameCategory.questions;
    if (!data[questions]) {
        throw new Error('Category not found');
    }
    return { questions: generateQuestions(data[questions]), categories: questions };
}

export const getCategory = async () => {
    const data = await readDB();
    return data.categories;
}

const generateQuestions = (data) => {
    const questions = [];
    for (let index = 0; index < 10; index++) {
        const question = randomProperty(data);
        questions.push(question);

    }
    return questions;
}

const randomProperty = (obj) => {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};




