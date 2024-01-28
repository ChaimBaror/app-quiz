import { QuestionData } from "../services/quiz-service";

export const generateRandomQuiz = (data: QuestionData[]) => {
    let randomQuiz = [];
    for (let i = 0; i < 10; i++) {
        let randomQuestion = randomProperty(data);
        randomQuiz.push(randomQuestion);
    }
    console.log("newQuiz : ",randomQuiz);
    
    return randomQuiz;
}

const randomProperty = function (obj: any) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};