let currentQuestion = 1;
let answers = {};

function startQuiz() {
    document.getElementById('quiz').classList.add('active');
    document.body.classList.add('modal-open');
}

function closeQuiz() {
    document.getElementById('quiz').classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Reset quiz
    currentQuestion = 1;
    answers = {};
    
    // Reset all questions
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach((q, index) => {
        if (index === 0) {
            q.classList.add('active');
        } else {
            q.classList.remove('active');
        }
    });
    
    // Reset all options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.style.background = '#0a0a0a';
        opt.style.borderColor = '#333';
    });
    
    // Reset buttons and progress
    updateProgress();
    updateButtons();
    document.getElementById('nextBtn').textContent = 'Próxima →';
}

function selectAnswer(questionNum, answer) {
    answers[questionNum] = answer;
    
    // Update button state
    document.getElementById('nextBtn').disabled = false;
    
    // Visual feedback
    const options = document.querySelectorAll(`[data-question="${questionNum}"] .quiz-option`);
    options.forEach(opt => {
        opt.style.background = '#0a0a0a';
        opt.style.borderColor = '#333';
    });
    
    event.target.style.background = '#1a1a1a';
    event.target.style.borderColor = '#FF4500';
}

function nextQuestion() {
    if (!answers[currentQuestion]) return;
    
    const questions = document.querySelectorAll('.quiz-question');
    questions[currentQuestion - 1].classList.remove('active');
    
    currentQuestion++;
    
    if (currentQuestion <= 5) {
        questions[currentQuestion - 1].classList.add('active');
        updateProgress();
        updateButtons();
    } else {
        showResults();
    }
}

function previousQuestion() {
    const questions = document.querySelectorAll('.quiz-question');
    questions[currentQuestion - 1].classList.remove('active');
    
    currentQuestion--;
    
    questions[currentQuestion - 1].classList.add('active');
    updateProgress();
    updateButtons();
}

function updateProgress() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        if (index < currentQuestion) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateButtons() {
    document.getElementById('prevBtn').disabled = currentQuestion === 1;
    document.getElementById('nextBtn').disabled = !answers[currentQuestion];
    
    if (currentQuestion === 5 && answers[5]) {
        document.getElementById('nextBtn').textContent = 'Ver Resultados ✓';
    }
}

function showResults() {
    document.getElementById('quiz').classList.remove('active');
    document.body.classList.remove('modal-open');
    document.getElementById('results').classList.add('active');
    
    // Generate action plan based on answers
    const actionPlan = generateActionPlan();
    const listElement = document.getElementById('actionPlanList');
    listElement.innerHTML = '';
    
    actionPlan.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listElement.appendChild(li);
    });

    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function generateActionPlan() {
    const plans = [];
    
    // Based on question 1
    if (answers[1] === 'Não sei por onde começar' || answers[1] === 'Não, ainda estou procurando') {
        plans.push('Defina sua oferta usando nosso template "copia e cola" de produtos digitais validados');
    } else if (answers[1] === 'Tenho uma ideia, mas não estruturei') {
        plans.push('Estruture sua oferta em um formato de venda irresistível em menos de 1 hora');
    }
    
    // Based on question 2
    if (answers[2] === 'Praticamente ninguém' || answers[2] === 'Menos de 100 pessoas') {
        plans.push('Implemente nossa estratégia de tráfego orgânico que funciona em 7 dias');
    }
    
    // Based on question 3
    if (answers[3] === 'Menos de 30 minutos' || answers[3] === 'Entre 30 minutos e 2 horas') {
        plans.push('Use nosso sistema automatizado que trabalha por você 24/7');
    }
    
    // Based on question 4
    if (answers[4] === 'Excesso de informação, não sei o que fazer') {
        plans.push('Siga nosso checklist de 3 passos: escolha, configure, venda (sem firulas)');
    } else if (answers[4] === 'Não sei converter vendas') {
        plans.push('Implemente nossos scripts de vendas testados que convertem em 5 minutos');
    } else if (answers[4] === 'Falta de confiança no que estou oferecendo') {
        plans.push('Valide sua oferta com nossa técnica de pré-venda que garante demanda');
    }
    
    // Based on question 5
    if (answers[5] === 'Um sistema pronto que eu só preciso copiar') {
        plans.push('Acesse nosso kit completo: páginas de venda + emails + scripts prontos para usar');
    }
    
    // Always add final step
    plans.push('Faça sua primeira venda nos próximos 7 dias seguindo esse plano exato');
    
    return plans;
}

