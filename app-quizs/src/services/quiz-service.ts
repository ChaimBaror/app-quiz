
import { type } from "os";

export type QuestionData = {
    question: string;
    options: string[];
    answer: string;
  };
  
  export const getQuestionData = async (): Promise<QuestionData[]> => {
    try {
      const response = await fetch('http://localhost:8080/api/quiz');
  
      if (!response.ok) {
        // Handle error if the response status is not OK
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const questions = await response.json();
      console.log(" question api ",questions.questions);
  
      return questions.questions;
    } catch (error) {
      // Handle any errors that occurred during the fetch or JSON parsing
      console.error('Error fetching question data:', error);
      throw error; // Rethrow the error to be handled by the calling code
    }
  };
  