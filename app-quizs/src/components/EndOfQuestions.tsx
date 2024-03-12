import React from "react";

const EndOfQuestions = ({ myScore, setNewQuiz }: any) => (
  <div className="box corsor" onClick={setNewQuiz}>
    For New Quiz Click
    <div className="score">Score: {myScore}</div>
  </div>
);

export default EndOfQuestions;
