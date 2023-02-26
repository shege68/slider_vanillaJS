// паттерн модуль - самовикликаєма функція з замиканням
(function () {
  // carousel
  const carousel = document.querySelector('#carousel');
  // отримуємо слайди
  const slides = carousel.querySelectorAll('.slide');
  const indicatorsContainer = carousel.querySelector('#indicators-container');
  // отримуємо індикатори (через делегування)
  const indicatorItems = indicatorsContainer.querySelectorAll('.indicator');
  //console.log(indicatorItems);
  const controls = carousel.querySelector('.controls');
  // отримуємо кнопки у батьківського елемента
  const pauseBtn = controls.querySelector('#pause-btn');
  const prevBtn = controls.querySelector('#prev-btn');
  const nextBtn = controls.querySelector('#next-btn');
  // константи
  const SLIDES_COUNT = slides.length;
  const CODE_ARROW_LEFT = 'ArrowLeft';
  const CODE_ARROW_RIGHT = 'ArrowRight';
  const CODE_SPACE = 'Space';
  const FA_PAUSE = '<i class="fas fa-pause-circle"></i >';
  const FA_PLAY = '<i class="fas fa-play-circle"></i >';

  let currentSlide = 0;
  let timerID = null;
  let isPlaying = true;
  let interval = 2000;

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
    initListener();
    tick();
  }

  // точка входа !!!
  initApp();

}());