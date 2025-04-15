import { getCategories, getQuestions } from "./model";
import { state } from "./model";
import setupView from "./views/setupView";
import quizView from "./views/quizView";

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
    state.currQuestion++;
    quizView.render(state.questions[state.currQuestion], state.questions.length, state.currQuestion);
    quizView.addHandlerChoose();
}

const init = async function() {
    await controlSetup();
    setupView.addFormHandler(controlStartQuiz);
}

init();

