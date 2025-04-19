class SetupView{
    #parentEl = document.querySelector('.card');
    #data;

    addFormHandler(handler) {
        const form = document.querySelector('.start-quiz--container');
        const nameInput = document.getElementById('name-input');
        const noOfQuestionsInput = document.getElementById('questions-input');
        const categoryInput = document.getElementById('question-category-input');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = nameInput.value;
            const questions = noOfQuestionsInput.value;
            const category = categoryInput.value;
            if (+questions < 0 || isNaN(questions)) return;
            handler(name, questions, category);
        })
    }

    renderLoader() {
        const markup = `
        <div class="loader-container">
            <span class="loader"></span>
        </div>
        `
        this.#parentEl.innerHTML = '';
        this.#parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    render(data) {
        this.#data = data;

        const markup = `
            <h1 class="heading-prim">Quiz App</h1>
            <div class="front-page--info">
                <p class="heading-sec">Highest Points Scored</p>
                <div class="high-scorer--container">
                <p class="high-scorer--name">${this.#data.highScorer.username}</p>
                <p class="high-scorer--score">${this.#data.highScorer.score}</p>
                </div>
                <form class="start-quiz--container">
                    <input type="text" placeholder="Name..." class="start-quiz--input" id="name-input" required>
                    <input type="text" placeholder="No of Questions..." class="start-quiz--input" id="questions-input" required>
                    <select id="question-category-input" name="category" class="question-category">
                    ${this.#data.categories.map((ob) => {
                        return `<option value="${ob.id}">${ob.name}</option>`
                    }).join('\n')}
                    </select>
                    <button class="start-quiz-btn" type="submit">Start Quiz</button>
                </form>
            </div>
        `
        this.#parentEl.innerHTML = '';
        this.#parentEl.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new SetupView();