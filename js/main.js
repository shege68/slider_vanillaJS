// отримуємо з html id carousel і записуємо в container
const container = document.querySelector('#carousel');
// отримуємо слайди
const slides = container.querySelectorAll('.slide');

// константи
// кількість слайдів
const SLIDES_COUNT = slides.length;
// коди клавіатури
const CODE_ARROW_LEFT = 'ArrowLeft';
const CODE_ARROW_RIGHT = 'ArrowRight';
const CODE_SPACE = 'Space';
// класи fontawesome
const FA_PAUSE = '<i class="fas fa-pause-circle"></i >';
const FA_PLAY = '<i class="fas fa-play-circle"></i >';
const FA_PREV = '<i class="fas fa-angle-left"></i>';
const FA_NEXT = '<i class="fas fa-angle-right"></i>';

// змінні
let currentSlide = 0;
let timerID = null;
let isPlaying = true;
let interval = 2000;

// динамічна ініціалізація кнопок класа controls (порядок важливий !)
function initControls() {
  // створюємо елемент div
  const controls = document.createElement('div');
  // виводимо кнопки в константи
  const PAUSE = `<div id="pause-btn" class="control control-pause">${FA_PAUSE}</div>`;
  const PREV = `<div id="prev-btn" class="control control-prev">${FA_PREV}</div>`;
  const NEXT = `<div id="next-btn" class="control control-next">${FA_NEXT}</div>`;
  // добавляємо діву id controls-container та клас controls
  controls.setAttribute('id', 'controls-container');
  controls.setAttribute('class', 'controls');
  // добавляємо в дів кнопки
  controls.innerHTML = PAUSE + PREV + NEXT;
  // добавляємо клас controls всередину container
  container.append(controls);
  pauseBtn = container.querySelector('#pause-btn');
  prevBtn = container.querySelector('#prev-btn');
  nextBtn = container.querySelector('#next-btn');
}

// динамічна ініціалізація індикаторів класа indicators (порядок важливий !)
function initIndicators() {
  // створюємо елемент div
  const indicators = document.createElement('div');

  indicators.setAttribute('id', 'indicators-container');
  indicators.setAttribute('class', 'indicators');

  // в циклі добавляємо дочірній клас indicator в indicators по кількості слайдів
  for (let i = 0; i < SLIDES_COUNT; i++) {
    const indicator = document.createElement('div');
    indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
    //indicator.setAttribute('data-slide-to', i);
    // або через обєкт dataset
    indicator.dataset.slideTo = `${i}`;
    indicator.innerHTML = `${i + 1}`;
    indicators.append(indicator);
  }
  // добавляємо сам клас indicators до батьківського container
  container.append(indicators);
  indicatorsContainer = container.querySelector('#indicators-container');
  indicatorItems = indicatorsContainer.querySelectorAll('.indicator');
}

function gotoNth(n) {
  //debugger;
  console.log(n);
  slides[currentSlide].classList.toggle('active');
  indicatorItems[currentSlide].classList.toggle('active');
  currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
  indicatorItems[currentSlide].classList.toggle('active');
  slides[currentSlide].classList.toggle('active');
}

function gotoPrev() {
  gotoNth(currentSlide - 1);
}

function gotoNext() {
  gotoNth(currentSlide + 1);
}

function tick() {
  // функція setInterval спрацьовує циклічно, через 2 сек. і визиває функцію-колбек
  timerID = setInterval(gotoNext, interval);
}

function playHandler() {
  pauseBtn.innerHTML = FA_PAUSE;
  isPlaying = true;
  tick();
}

function pauseHandler() {
  clearInterval(timerID);
  pauseBtn.innerHTML = FA_PLAY;
  isPlaying = false;
}

const pausePlay = () => isPlaying ? pauseHandler() : playHandler();

function prev() {
  pauseHandler();
  gotoPrev();
}

function next() {
  pauseHandler();
  gotoNext();
}

// функція обробник індикаторів
function indicate(e) {
  const target = e.target;

  if (target && target.classList.contains('indicator')) {
    pauseHandler();
    //gotoNth(+target.getAttribute('data-slide-to'));
    //console.log(target.getAttribute('data-slide-to'));
    // або через .dataset і 'data-slide-to' ставиться як .slideTo
    gotoNth(+target.dataset.slideTo);
  }
}

// функція обробник кодів клавіатури
function pressKey(e) {
  console.log(e);
  if (e.code === CODE_ARROW_LEFT) prev();
  if (e.code === CODE_ARROW_RIGHT) next();
  if (e.code === CODE_SPACE) pausePlay();
}

// обробники подій
function initListener() {
  pauseBtn.addEventListener('click', pausePlay);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  indicatorsContainer.addEventListener('click', indicate);
  // для клавіатури
  document.addEventListener('keydown', pressKey);
}

// головна функція
function initApp() {
  initControls();
  initIndicators();
  initListener();
  tick();
}

// точка входа !!!
initApp();