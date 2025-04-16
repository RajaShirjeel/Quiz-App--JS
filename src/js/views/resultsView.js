class ResultsView{
    #parentEl = document.querySelector('.card');

    render(data, totalQuestions) { 
        const markup = `
            <div class="results--container">
                <h1 class="results-heading">Results</h1>
                <div class="results--info--container">
                    <div class="results--info total-questions--container">
                        <p class="results-text total-question-text">Total Questions: </p>
                        <p class="results-value total-questions">${totalQuestions}</p>
                    </div>
                    <div class="results--info correct-answers--container">
                        <p class="results-text correct-answers-text">Correct Answers</p>
                        <p class="results-value correct-answers">${data.correctAnswers}</p>
                    </div>
                    <div class="results--info wrong-answers--container">
                        <p class="results-text wrong-answers-text">Wrong Answers</p>
                        <p class="results-value wrong-answers">${data.wrongAnswers}</p>
                    </div>
                    <div class="results--info skipped-questions--container">
                        <p class="results-text skipped-questions-text">Skipped Questions</p>
                        <p class="results-value skipped-questions">${data.skippedQuestions}</p>
                    </div>
                    <div class="total-score-container">
                        <h2 class="total-score-heading">Total Score:</h2>
                        <h3 class="total-score">${data.points}</h3>
                    </div>
                </div>
            </div>
        `
        this.#parentEl.innerHTML = '';
        this.#parentEl.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new ResultsView();