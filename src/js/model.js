import { API_URL } from "./config";

export const state = {
    questions: [],
    categories: [],
    currQuestion: -1,
    highScorer: {},
    results: {},
}

export const getCategories = async function() {
    const res = await fetch(`${API_URL}/api_category.php`);
    const {trivia_categories} = await res.json();
    state.categories = trivia_categories;
}

export const getQuestions = async function(questions, category) {
    const res = await fetch(`${API_URL}/api.php?amount=${questions}&category=${category}&type=multiple`);
    const {results} = await res.json();
    const questionsArr = results.map(q => {
        const newOptions = q.incorrect_answers;
        newOptions.push(q.correct_answer);
        return {
            difficulty: q.difficulty,
            correctAns: q.correct_answer,
            options: newOptions,
            question: q.question,
        }
    })

    state.questions = questionsArr;
}