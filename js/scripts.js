const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// perguntas

const questions = [
  {
    'question': 'PHP foi desenvolvido para qual fim?',
    'answers': [
      {
        'answer': 'back-end',
        'correct': true
      },
      {
        'answer': 'back-false',
        'correct': false
      },
      {
        'answer': 'Sistemas Operacional',
        'correct': false
      },
      {
        'answer': 'Banco de dados',
        'correct': false
      }
    ]
  },
  {
    'question': 'Qual a forma correta de criar um array contendo 3 strings em PHP?',
    'answers': [
      {
        'answer': '$estados = array["São Paulo", "Ceará", "Minas Gerais"];',
        'correct': false
      },
      {
        'answer': '$estados = "São Paulo", "Ceará", "Minas Gerais";',
        'correct': false
      },
      {
        'answer': '$estados = {"São Paulo", "Ceará", "Minas Gerais"};',
        'correct': false
      },
      {
        'answer': '$estados = array("São Paulo", "Ceará", "Minas Gerais");',
        'correct': true
      }
    ]
  },
  {
    'question': 'No PHP, caso a declaração require não puder acessar o arquivo indicado, o interpretador produz um',
    'answers': [
      {
        'answer': 'alerta e o programa continua sua execução sem carregar o arquivo.',
        'correct': false
      },
      {
        'answer': 'alerta e o programa é encerrado.',
        'correct': false
      },
      {
        'answer': 'erro fatal e o programa é encerrado.',
        'correct': true
      },
      {
        'answer': 'erro fatal e o programa entra em loop até conseguir carregar o arquivo.',
        'correct': false
      }
    ]
  },
  {
    'question': 'Em PHP, existem algumas variáveis chamadas de superglobais, variáveis nativas que estão disponíveis em qualquer escopo do código PHP. Dentre essas variáveis superglobais, qual que contém informações sobre cabeçalhos, caminhos e locais de script?',
    'answers': [
      {
        'answer': '$_SERVER',
        'correct': true
      },
      {
        'answer': ' $_REQUEST',
        'correct': false
      },
      {
        'answer': '$_GLOBALS',
        'correct': false
      },
      {
        'answer': '$_SESSION',
        'correct': false
      }
    ]
  },
  {
    'question': 'Para concatenar a string "TRF" com a variável reg que contém o valor inteiro 3, em Java e PHP, utilizam-se, respectivamente,',
    'answers': [
      {
        'answer': 'String("TRF")+reg e str("TRF").$reg',
        'correct': false
      },
      {
        'answer': ' "TRF",reg e Concat("TRF",$reg)',
        'correct': false
      },
      {
        'answer': '"TRF"+reg e "TRF".$reg',
        'correct': true
      },
      {
        'answer': 'String.Concat("TRF",reg) e "TRF"+$reg',
        'correct': false
      }
    ]
  }
];

// Substituição do quizz a primeira pergunta
function init() {
  console.log("iniciou");
  createQuestion(0);
}
// cria uma pergunta

function createQuestion(i) {
  // limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");
  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  // Alterar o texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere as alternativas
  questions[i].answers.forEach(function (answer, i) {
    // cria o template do botão do quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    // inserir um evento de click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // Incrementar o número da questão
  actualQuestion++;

}

// verificando resposta do usuário 
function checkAnswer(btn) {

  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function (button) {

    if (button.getAttribute("correct-answer") === 'true') {
      button.classList.add('correct-answer');
      // checa se o usuário acertou a pergunta
      if (btn === button) {
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });


  // exibir a próxima pergunta
  nextQuestion();
}

// exibi a próxima pergunta do quizz
function nextQuestion() {
  // time para usuário ver as respostas
  setTimeout(function () {
    if (actualQuestion >= questions.length) {
      // apresent a msg de sucesso
      shwoSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1500);
}

// exibe a tela final
function shwoSuccessMessage() {

  hideOrShowQuizz();

  // quizzContainer.classList.toggle('hide');
  // scoreContainer.classList.toggle('hide');

  // trocar dados da tela de sucesso;

  // calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');

  displayScore.textContent = score.toString();

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answer");
  correctAnswers.textContent = points;

  // altera o total de perguntas
  const totalQuestions = document.querySelector('#question-qty');
  totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reinicar o jogo

const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', function () {
  // zera o jogo 
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();