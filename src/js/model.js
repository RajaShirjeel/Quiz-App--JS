import { API_URL } from "./config";

export const state = {
    username: '',
    questions: [],
    categories: [],
    currQuestion: 0,
    highScorer: {
        username: '',
        score: 0,
    },
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

export const getQuestions = async function(questions, category, name) {
    state.username = name;
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
    console.log(action)
    if (action === 'skip'){
        state.currQuestion++;
        state.results.skippedQuestions++;
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
    return;
}

export const isValid = function() {
    return state.currQuestion <= state.questions.length-1;
}

export const getDifficulty = function() {
    return state.questions[state.currQuestion].difficulty;
}

export const saveHighScore = function() {
    const score = state.results.points;
    state.highScorer.score = score;
    state.highScorer.username = state.username;
    console.log(localStorage.getItem('highScorer'))
    const oldHighScorer = JSON.parse(localStorage.getItem('highScorer'));
    if (!oldHighScorer || oldHighScorer.score < score) {
        localStorage.setItem('highScorer', JSON.stringify(state.highScorer));
    }
}

export const getHighScorer = function() {
    const highScorer = JSON.parse(localStorage.getItem('highScorer'));
    state.highScorer = highScorer;
}