import { API_URL } from "./config";

export const state = {
    questions: [],
    categories: [],
    currQuestion: 0,
    highScorer: {},
    results: {
        points: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        skippedQuestions: 0,
    },
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

export const updateProgress = function(action, answer) {
    if (action == 'skip'){
        state.currQuestion++;
        state.results.skippedQuestions++;
        console.log(state.results)
        return;
    }
    if (answer === state.questions[state.currQuestion].correctAns){
        state.results.points += 4;
        state.results.correctAnswers++;
    }
    else {
        state.results.points -= 1;
        state.results.wrongAnswers++;
    }
    state.currQuestion++;
    console.log(state.results)
    return;
}

export const isValid = function() {
    console.log(state.currQuestion)
    return state.currQuestion <= state.questions.length-1;
}
