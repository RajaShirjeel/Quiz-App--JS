import { getCategories, getDifficulty, getHighScorer, getQuestions, isValid, saveHighScore, updateProgress } from "./model";
import { state } from "./model";
import setupView from "./views/setupView";
import quizView from "./views/quizView";
import resultsView from "./views/resultsView";
import { TIMER_VAL } from "./config";

const timeout = function(seconds) {
    const timeoutId = window.setTimeout(()=> {
        controlDisplayNextQuestion('skip');
    }, seconds * 1000);
    return timeoutId;
}

const controlSetup = async function() {
    setupView.renderLoader();
    getHighScorer();
    await getCategories();
    setupView.render(state);
}

const controlStartQuiz = async function(name, questions, category) {
    quizView.renderLoader();
    await getQuestions(questions, category, name);
    controlDisplayQuestion();
}

const controlDisplayQuestion = function(){
    const difficulty = getDifficulty().toUpperCase();
    const questionTime = TIMER_VAL[difficulty];
    console.log(questionTime);
    const timeoutId = timeout(questionTime);
    quizView.render(state.questions[state.currQuestion], state.questions.length, state.currQuestion);
    quizView.startCountdown(questionTime)
    quizView.addHandlerChoose();
    quizView.addHandlerNext((action, answer) => controlDisplayNextQuestion(action, answer, timeoutId));
}

const controlDisplayNextQuestion = function(action, answer, timeoutId){
    updateProgress(action, answer);
    if (!isValid()) {
        resultsView.render(state.results, state.questions.length);
        saveHighScore()
        return;
    };
    const difficulty = getDifficulty().toUpperCase();
    const questionTime = TIMER_VAL[difficulty];
    console.log(questionTime);
    window.clearTimeout(timeoutId);
    const timeoutId2 = timeout(questionTime);
    quizView.render(state.questions[state.currQuestion], state.questions.length, state.currQuestion);
    quizView.startCountdown(questionTime);
    quizView.addHandlerChoose();
    quizView.addHandlerNext((action, answer) => controlDisplayNextQuestion(action, answer, timeoutId2));
}

const init = async function() {
    await controlSetup();
    setupView.addFormHandler(controlStartQuiz);
}

init();

