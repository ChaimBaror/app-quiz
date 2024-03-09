
import exp from "constants";
import { type } from "os";
import { apiUrl } from "./apiUrl";

export type QuestionData = {
  question: string;
  options: string[];
  answer: string;
};

export const getQuestionData = async ({ amount = 10, category = 'A', difficulty = 'easy', type = 'multiple' }): Promise<QuestionData[]> => {


  try {
    const response = await fetch(`${apiUrl}/quiz?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);

    if (!response.ok) {
      // Handle error if the response status is not OK
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const questions = await response.json();
    console.log(" question api ", questions.questions);

    return questions.questions;
  } catch (error) {
    // Handle any errors that occurred during the fetch or JSON parsing
    console.error('Error fetching question data:', error);
    throw error; // Rethrow the error to be handled by the calling code
  }
};

export const getCategoryList = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${apiUrl}/quiz/categories`);
    if (!response.ok) {
      // Handle error if the response status is not OK
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const categories = await response.json();
    console.log(" categories api ", categories);
    return categories;
  } catch (error) {
    // Handle any errors that occurred during the fetch or JSON parsing
    console.error('Error fetching category list:', error);
    throw error; // Rethrow the error to be handled by the calling code
  }
}
