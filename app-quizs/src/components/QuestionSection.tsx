import React from 'react';
import { QuestionData } from '../services/quiz-service';

type Props = {
    quiz: QuestionData | null
    clicked: number[]
    clickAnswers: (answer: string, answerIndex: number) => void
    isDisplay: boolean
    isCorrect: boolean
}


const QuestionSection = ({ quiz, clicked, clickAnswers, isDisplay, isCorrect }: Props) => (
    <div>
        <div className="box question">{quiz?.question}</div>
        <div className="lengthQuestion">
            {quiz?.options.map((answer, index) => (
                <div key={index} >
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
        {isDisplay && (
            <div className={`isCorrect box ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? 'Correct' : 'Incorrect'}
            </div>
        )}
    </div>
);

export default QuestionSection;
