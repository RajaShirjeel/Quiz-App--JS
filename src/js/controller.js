import { getCategories, getQuestions, isValid, updateProgress } from "./model";
import { state } from "./model";
import setupView from "./views/setupView";
import quizView from "./views/quizView";
import resultsView from "./views/resultsView";

const controlSetup = async function() {
    setupView.renderLoader();
    await getCategories();
    setupView.render(state);
}

const controlStartQuiz = async function(name, questions, category) {
    quizView.renderLoader();
    await getQuestions(questions, category);
    controlDisplayQuestion();
}

const controlDisplayQuestion = function(){
    quizView.render(state.questions[state.currQuestion], state.questions.length, state.currQuestion);
    quizView.addHandlerChoose();
    quizView.addHandlerNext(controlDisplayNextQuestion);
}

const controlDisplayNextQuestion = function(action, answer){
    updateProgress(action, answer);
    if (!isValid()) {
        console.log('finish');
        resultsView.render(state.results, state.questions.length);
        return;
    };
    quizView.render(state.questions[state.currQuestion], state.questions.length, state.currQuestion);
    quizView.addHandlerChoose();
    quizView.addHandlerNext(controlDisplayNextQuestion);
}

const init = async function() {
    await controlSetup();
    setupView.addFormHandler(controlStartQuiz);
}

init();

