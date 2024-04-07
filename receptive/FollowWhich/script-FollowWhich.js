var cardCount = parseInt(localStorage.getItem('cardCount')) || 2;
var heartsCount = parseInt(localStorage.getItem('heartsCount')) || 3;
var correctScore = parseInt(localStorage.getItem('correctScore')) || 0;
var wrongScore = parseInt(localStorage.getItem('wrongScore')) || 0;
var flag = 0;

window.addEventListener('beforeunload', function () {
  localStorage.setItem('cardCount', cardCount.toString());
  localStorage.setItem('heartsCount', heartsCount.toString());
  localStorage.setItem('correctScore', correctScore.toString());
  localStorage.setItem('wrongScore', wrongScore.toString());
});


function audios() {
  var pauseAudio = document.getElementById("pause");
  var pauseIcon = document.getElementById("pauseIcon");
  var homeAudio = document.getElementById("home");
  var homeButton = document.getElementById("homeButton");
  var resumeAudio = document.getElementById("resumeAudio");
  var resumeButton = document.getElementById('resumeButton');
  var restartAudio = document.getElementById("restartAudio");
  var restartButton = document.getElementById('restartButton');

  pauseIcon.addEventListener("click", function () {
    pauseAudio.play();
  });
  homeButton.addEventListener("mouseenter", function () {
    homeAudio.play();
  });
  resumeButton.addEventListener("click", function () {
    resumeAudio.play();
  });
  restartButton.addEventListener("click", function () {
    restartAudio.play();
  });
}

function pauseClicked() {
  var button = document.querySelector('.pause_button');
  var icon = button.querySelector('i');

  // Toggle between pause and play icon
  if (icon.classList.contains('bi-pause-fill')) {
    icon.classList.remove('bi-pause-fill');
    icon.classList.add('bi-caret-right-fill');
  } else {
    icon.classList.remove('bi-caret-right-fill');
    icon.classList.add('bi-pause-fill');
  }
}

const fruits = [
  { name: 'apple', color: 'red', image: 'apple.jpg' },
  { name: 'banana', color: 'yellow', image: 'banana.jpg' },
  { name: 'orange', color: 'orange', image: 'orange.jpg' },
  { name: 'mango', color: 'yellow', image: 'mango.jpg' },
  { name: 'pomegranate', color: 'red', image: 'pomegranate.jpg' },
  { name: 'dragon', color: 'pink', image: 'dragon.jpg' },
  { name: 'guava', color: 'green', image: 'guava.jpg' },
];


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const followWhich = document.getElementById('followWhich')
const end = document.getElementById('end')

function counters() {
  flag = 0;
  cardCount = 2;
  heartsCount = 3;
  correctScore = 0;
  wrongScore = 0;
  generateHearts();
  pauseClicked();
}
function home() {
  counters();
}

function restart() {
  if (heartsCount == 0 || flag == 5) {
    end.classList.add('d-none');
    followWhich.classList.remove('d-none');
    counters();
    return;
  }
  counters();
}

function generateHearts() {
  const hearts = document.getElementById('hearts');
  hearts.innerHTML = '';
  for (let i = 0; i < heartsCount; i++) {
    const heartDiv = document.createElement('div');
    const oneHeart = `<i class="bi bi-heart-fill fs-2 me-1 text-danger"></i>`;
    heartDiv.innerHTML = oneHeart;
    hearts.appendChild(heartDiv);
  }
}


function win() {
  if (heartsCount == 3 && flag == 5) {
    const winAudio = document.getElementById('winAudio');
    winAudio.play();
  }
}
function gameComplete() {
  win();
  followWhich.classList.add('d-none');
  end.classList.remove('d-none');
}
function generateCards() {
  flag++;
  if (flag == 5) {
    gameComplete();
  }
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = '';
  const shuffledFruits = shuffleArray(fruits);
  if (heartsCount === 0) {
    followWhich.classList.add('d-none');
    end.classList.remove('d-none');
  }
  for (let i = 0; i < cardCount; i++) {
    const questionColor = document.getElementById('questionColor');
    questionColor.innerHTML = shuffledFruits[i].color
    const card = document.createElement('div');
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2');
    const cardContent = `
    <div class="card rounded-4 p-3 mb-3" id="${shuffledFruits[i].name}" onclick="selectFruit('${shuffledFruits[i].color}','${shuffledFruits[i].name}')">
    <img src="./images/${shuffledFruits[i].image}" alt="${shuffledFruits[i].image}" class="w-100 rounded-4">
  </div>

    `;
    card.innerHTML = cardContent;
    cardsContainer.appendChild(card);
  }

}

const correctCount = document.getElementById('correctCount');
const wrongCount = document.getElementById('wrongCount');

const tryAgain = document.getElementById('tryAgain');
const next = document.getElementById('next');

const correctAudio = document.getElementById('correctAudio');
const tryAgainAudio = document.getElementById('tryAgainAudio');


function correct(correctCard) {
  console.log(correctCount);
  correctAudio.play();
  correctCard = document.getElementById(`${correctCard}`)
  correctCard.classList.add('border');
  correctCard.classList.add('border-2');
  correctCard.classList.add('border-success')
  correctCount.innerHTML = `${++correctScore}`;
  next.classList.remove('d-none');

}
function wrong(wrongCard) {
  if (heartsCount == 1 || flag == 5) {
    gameComplete();
    return;
  }
  tryAgainAudio.play();
  wrongCard = document.getElementById(`${wrongCard}`)
  wrongCard.classList.add('border');
  wrongCard.classList.add('border-2');
  wrongCard.classList.add('border-danger')
  wrongCount.innerHTML = `${++wrongScore}`;
  tryAgain.classList.remove('d-none');
}

function selectFruit(fruitColor, fruitName) {
  if (heartsCount > 0) {
    if (questionColor.innerHTML === fruitColor) {
      correct(fruitName);
    } else {
      wrong(fruitName);
    }
  }
}

function nextButton() {
  if (!tryAgain.classList.contains('d-none')) {
    tryAgain.classList.add('d-none');
  }
  cardCount++;
  next.classList.add('d-none');
  generateCards();
}

function tryAgainButton() {
  const heartDeductedAudio = document.getElementById('heartDeductedAudio');
  if (heartsCount > 1) {
    heartDeductedAudio.play();

  }
  heartsCount--;
  tryAgain.classList.add('d-none');
  next.classList.add('d-none');

  generateHearts();
  generateCards();
}

generateHearts();
generateCards();
audios();