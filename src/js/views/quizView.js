class QuizView{
    #parentEl = document.querySelector('.card');
    #colors = {
        easy: '#6FCF97',
        medium: '#F2C94C',
        hard: '#EB5757'
    }
    #countdownInterval;

    renderLoader() {
        const markup = `
        <div class="loader-container">
            <span class="loader"></span>
        </div>
        `
        this.#parentEl.innerHTML = '';
        this.#parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerNext(handler){
        const nextBtn = document.querySelector('.next-btn');
        const skipBtn = document.querySelector('.skip-btn');
        const options = document.querySelectorAll('.option');
        let answer;
        nextBtn.addEventListener('click', (e) => {
            options.forEach(op => {
                if (op.classList.contains('active')){
                    answer = op.querySelector('.option-text').textContent;
                }
            })
            if (!answer) return;
            handler('next', answer);
        })
        skipBtn.addEventListener('click', (e) => {
            handler('skip');
        })
    }

    addHandlerChoose(){
        const optionsContainer = document.querySelector('.options-container');
        const options = document.querySelectorAll('.option');
        optionsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.option');
            if (!option) return;
            options.forEach(op => {
                op.classList.remove('active');
                op.querySelector('.option-input').removeAttribute('checked');
            })
            option.classList.add('active');
            option.querySelector('.option-input').setAttribute('checked', '')
        })
    }

    startCountdown(seconds) {
        clearInterval(this.#countdownInterval);
        const timerEl = document.querySelector('.question-timer');
        let timeLeft = seconds;
        timerEl.textContent = timeLeft;

        this.#countdownInterval = setInterval(() => {
            if (seconds == 60) {
                if (timeLeft == 30) timerEl.style.color = '#F2C94C';
                else if (timeLeft == 15) timerEl.style.color = '#800000'
            }
            else if (seconds == 30) {
                if (timeLeft == 20) timerEl.style.color = '#F2C94C';
                else if (timeLeft == 10) timerEl.style.color = '#800000';
            }
            else {
                if (timeLeft == 10) timerEl.style.color = '#F2C94C';
                else if (timeLeft == 5) timerEl.style.color = '#800000';
            }
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) clearInterval(this.#countdownInterval);
        }, 1000);
    
    }

    render(data, totalQuestions, currQuestion){
        const markup = `
            <div class="question-card--container">
                <div class="question-progress--container">
                    <p class="question-progress">Question ${currQuestion+1} of ${totalQuestions}</p>
                </div>
                <div class="question-info--container">
                    <div class="question-difficulty--container" style="background-color:${this.#colors[data.difficulty]}">
                        <p class="question-difficulty">${data.difficulty}</p> 
                    </div>
                    <div class="question-timer--container">
                        <ion-icon name="alarm-outline" class="timer-icon"></ion-icon>
                        <p class="question-timer">10</p>
                    </div>
                </div>
                <div class="question-container" inert>
                    <p class="question-text">${data.question}</p>
                </div>
                <div class="options-container">
                    ${data.options.map(o => {
                        return `
                        <div class="option">
                            <p class="option-text">${o}</p>
                            <input type="checkbox" class="option-input">
                        </div>
                        `
                    }).join('\n')}
                </div>
                <div class="questions-btn--container">
                    <button class="question-submit-btn skip-btn">Skip</button>
                    <button class="question-submit-btn next-btn">Next</button>
                </div>
            </div>
        `
        this.#parentEl.innerHTML = '';
        this.#parentEl.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new QuizView();