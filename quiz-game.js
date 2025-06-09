const questions = [
    {
        question: "ما هي عاصمة فلسطين؟",
        options: ["رام الله", "غزة", "القدس", "نابلس"],
        correct: 2
    },
    {
        question: "في أي عام وقعت نكبة فلسطين؟",
        options: ["1917", "1948", "1967", "1973"],
        correct: 1
    },
    {
        question: "ما اسم العملة التي كانت تُستخدم في فلسطين قبل الاحتلال البريطاني؟",
        options: ["الشيكل", "الجنيه الفلسطيني", "الدينار", "الريال"],
        correct: 1
    },
    {
        question: "ما هو المفتاح الذي يحمله الفلسطينيون رمزًا للعودة؟",
        options: ["مفتاح البيت المهدم", "مفتاح السيارة", "مفتاح المسجد", "مفتاح المدرسة"],
        correct: 0
    },
    {
        question: "ما اسم البحر الذي تطل عليه مدينة غزة؟",
        options: ["البحر الأحمر", "البحر الأسود", "البحر الأبيض المتوسط", "بحر قزوين"],
        correct: 2
    },
    {
        question: "كم عدد المخيمات الفلسطينية في الضفة الغربية؟",
        options: ["5", "10", "19", "25"],
        correct: 2
    },
    {
        question: "ما اسم الأكلة الفلسطينية المشهورة المصنوعة من الخبز والدجاج والبصل؟",
        options: ["المنسف", "المجدرة", "المقلوبة", "المسخن"],
        correct: 3
    },
    {
        question: "في أي مدينة تقع قبة الصخرة المشرفة؟",
        options: ["الخليل", "القدس", "نابلس", "بيت لحم"],
        correct: 1
    },
    {
        question: "من هو الشاعر الفلسطيني الذي كتب \"سجل أنا عربي\"؟",
        options: ["محمود درويش", "سميح القاسم", "تميم البرغوثي", "معين بسيسو"],
        correct: 0
    },
    {
        question: "ما اسم أعلى قمة جبلية في فلسطين؟",
        options: ["جبل الكرمل", "جبل الشيخ", "جبل جرزيم", "جبل عيبال"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let isAnswered = false;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
const currentQuestionElement = document.getElementById('current-question');
const resultElement = document.getElementById('result');

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
    
    isAnswered = false;
    nextButton.classList.add('hide');
    currentQuestionElement.textContent = currentQuestion + 1;
}

function selectOption(index) {
    if (isAnswered) return;
    
    isAnswered = true;
    const options = optionsElement.children;
    const correctIndex = questions[currentQuestion].correct;
    
    for (let option of options) {
        option.classList.add('disabled');
    }
    
    if (index === correctIndex) {
        options[index].classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        options[index].classList.add('wrong');
        options[correctIndex].classList.add('correct');
    }
    
    if (currentQuestion < questions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.classList.add('hide');
    optionsElement.classList.add('hide');
    nextButton.classList.add('hide');
    restartButton.classList.remove('hide');
    resultElement.classList.remove('hide');
    
    const percentage = (score / questions.length) * 100;
    let message = `لقد أجبت على ${score} من ${questions.length} أسئلة بشكل صحيح (${percentage}%)`;
    
    if (percentage === 100) {
        message += "\nأحسنت! إجابات صحيحة بالكامل!";
        resultElement.classList.add('success');
    } else if (percentage >= 70) {
        message += "\nنتيجة جيدة! حاول مرة أخرى للحصول على العلامة الكاملة!";
    } else {
        message += "\nحاول مرة أخرى لتحسين نتيجتك!";
    }
    
    resultElement.textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = '0';
    questionElement.classList.remove('hide');
    optionsElement.classList.remove('hide');
    resultElement.classList.remove('hide', 'success');
    restartButton.classList.add('hide');
    showQuestion();
}

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Start the quiz
showQuestion(); 