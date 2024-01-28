import React, { useEffect, useState } from 'react';
import { getQuestionData, QuestionData } from '../services/quiz-service';
import './quiz-style.css';
import { question } from '../data/quiz.js';
import { generateRandomQuiz } from '../utils/utlis';

const Quiz = () => {
    const [listquestion, setListQuestion] = useState<QuestionData[]>(question);
    const [quiz, setQuiz] = useState<QuestionData | null>(null);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isDisplay, setDisplay] = useState(false);
    const [myScore, setScore] = useState(0);
    const [clicked, setClicked] = useState<any[]>([])
    const [newQuiz, setNewQuiz] = useState(false);

    useEffect(() => {
        setQuiz(listquestion[indexQuestion]);
        setClicked([]);
    }, [indexQuestion]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getQuestionData();
                setListQuestion(data);
                setIndexQuestion(0)
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchData();
    }, [newQuiz]);

    const getLocal = () => {
        const quizlocal = generateRandomQuiz(question)
        setListQuestion(quizlocal);
        setIndexQuestion(0)
    }

    const handleNext = () => {
        if (indexQuestion === listquestion.length - 1) {
            console.log('End of questions');
        } else {
            setIndexQuestion((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (indexQuestion === 0) {
            console.log('Already at the first question');
        } else {
            setIndexQuestion((prevIndex) => prevIndex - 1);
        }
    }

    const clickAnswers = (answer: string, answerIndex: number) => {
        setClicked([...clicked, answerIndex]);
        const isCorrect = answer === quiz?.answer;
        setIsCorrect(isCorrect);
        setDisplay(true);
        setScore((prevScore) => (isCorrect ? prevScore + 10 : prevScore - 2));
        isCorrect && setTimeout(handleNext, 1000);
    };
    

    useEffect(() => {
        if (isDisplay) {
            const timeoutId = setTimeout(() => {
                setDisplay(false);
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [isDisplay]);

    return (
        <div className="quiz">
            <div className="title">Quiz</div>
            <div className="lengthQuestion">Question {indexQuestion + 1} / {listquestion.length}</div>
            {indexQuestion === listquestion.length - 1 && (
                <div className='box'>
                    <div className="score">Score: {myScore}</div>
                    <div className='towButton'>
                        <button onClick={() => setNewQuiz(!newQuiz)}>New Quiz AI</button>
                        <button onClick={getLocal}>New Quiz off-line</button>
                    </div>
                </div>
            )}
            <div className="towButton">
                <button disabled={indexQuestion === 0} className="buttonNext" onClick={handlePrev}>
                    Prev
                </button>
                <button
                    disabled={indexQuestion === listquestion.length - 1}
                    className="buttonNext"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
            <div>
                <div className="box question">{quiz?.question}</div>
                <div>
                    {quiz?.options.map((answer, index) => (
                        <div key={index} >
                            {index + 1}.
                            <button
                                disabled={clicked.includes(index)}
                                key={index}
                                className={`buttonQuiz`}
                                onClick={() => clickAnswers(answer, index)}
                            >
                                {answer}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {isDisplay && (
                <div className={`isCorrect box ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                </div>
            )}
        </div>
    );
};

export default Quiz;
