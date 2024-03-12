import React, { useEffect, useState } from "react";
import { getQuestionData, QuestionData } from "../services/quiz-service";
import { question } from "../data/quiz";
import QuizCategory from "./Quiz_Category";
import EndOfQuestions from "./EndOfQuestions";
import QuestionSection from "./QuestionSection";
import NavigationButtons from "./NavigationButtons";
import { generateRandomQuiz } from "../utils/utlis";
import "../css/quiz-style.css";

const Quiz = () => {
  const [listquestion, setListQuestion] = useState<QuestionData[]>([]);
  const [quiz, setQuiz] = useState<QuestionData | null>(null);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const [myScore, setScore] = useState(0);
  const [clicked, setClicked] = useState<number[]>([]);
  const [newQuiz, setNewQuiz] = useState(false);
  const [category, setCategory] = useState("A");
  const [endOfQuestions, setEndOfQuestions] = useState(false);

  // Load initial quiz questions
  useEffect(() => {
    setListQuestion(question.slice(0, 10));
  }, []);

  // Fetch quiz data when category or newQuiz changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestionData({ category });
        setListQuestion(data);
      } catch (error) {
        getLocal();
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchData();
    setIndexQuestion(0);
    setScore(0);
    setEndOfQuestions(false);
  }, [category, newQuiz]);

  // Update quiz question when indexQuestion or category changes
  useEffect(() => {
    setQuiz(listquestion[indexQuestion]);
    setClicked([]);
    setIsCorrect(false);
  }, [indexQuestion, category, listquestion]);

  // Check if answer is correct and update score
  const clickAnswers = (answer: string, answerIndex: number) => {
    setClicked([...clicked, answerIndex]);
    const isCorrect = answer === quiz?.answer;
    setIsCorrect(isCorrect);
    setDisplay(true);
    setScore((prevScore) => (isCorrect ? prevScore + 10 : prevScore - 2));
    isCorrect && setTimeout(handleNext, 1000);
  };

  // Handle moving to the next question
  const handleNext = () => {
    if (indexQuestion === listquestion.length - 1) {
      setEndOfQuestions(true);
      console.log("End of questions");
    } else {
      setIndexQuestion((prevIndex) => prevIndex + 1);
    }
  };

  // Handle moving to the previous question
  const handlePrev = () => {
    if (indexQuestion === 0) {
      console.log("Already at the first question");
    } else {
      setIndexQuestion((prevIndex) => prevIndex - 1);
    }
  };

  // Reset display state after 3 seconds
  useEffect(() => {
    if (isDisplay) {
      const timeoutId = setTimeout(() => {
        setDisplay(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isDisplay]);

  // Generate a new quiz with random questions
  const getLocal = () => {
    const quizLocal = generateRandomQuiz(question);
    setListQuestion(quizLocal.slice(0, 10));
  };

  return (
    <>
      <QuizCategory setCategory={setCategory} category={category} />
      <div className="quiz">
        <div className="title"> Quiz {category}</div>
        {endOfQuestions ? (
          <EndOfQuestions myScore={myScore} setNewQuiz={setNewQuiz} />
        ) : (
          <>
            <div className="lengthQuestion">
              Question {indexQuestion + 1} / {listquestion.length}
            </div>
            <NavigationButtons
              indexQuestion={indexQuestion}
              totalQuestions={listquestion.length}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
            <QuestionSection
              quiz={quiz}
              clicked={clicked}
              clickAnswers={clickAnswers}
              isDisplay={isDisplay}
              isCorrect={isCorrect}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
