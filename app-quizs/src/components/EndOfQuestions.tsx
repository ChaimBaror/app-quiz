import React from 'react';

const EndOfQuestions = ({ myScore, setNewQuiz, getLocal }: any) => (
    <div className='box'>
        <div className="score">Score: {myScore}</div>
        <div className='towButton'>
            <button onClick={getLocal}>New Quiz off-line</button>
        </div>
    </div>
);

export default EndOfQuestions;
