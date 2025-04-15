import { getCategories } from "./model";
import { state } from "./model";
import setupView from "./views/setupView";
import quizView from "./views/quizView";

const controlSetup = async function() {
    setupView.renderLoader();
    await getCategories();
    setupView.render(state);
}

const controlStartQuiz = async function(name, questions, category) {
    console.log(name, questions, category);
}


const init = async function() {
    await controlSetup();
    setupView.addFormHandler(controlStartQuiz);
}

init()



// const func = async function() {
//     // const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);
//     // const {results} = await res.json();
//     // console.log(results)
//     console.log(state.categories)
// }