// самовикликаюча функція з 4-ма параметрами
(function (containerID = '#carousel', slideClass = '.slide', intervalTime, isPlayingFlag) {
  // обєкт для початкового налаштування слайдера
  const initConfig = {
    interval: intervalTime,
    isPlaying: isPlayingFlag,
    // отримуємо з html id carousel і записуємо в container
    container: document.querySelector(containerID),
    // отримуємо слайди
    slides: document.querySelectorAll(slideClass)
  }

  // константи
  // кількість слайдів
  const SLIDES_COUNT = initConfig.slides.length;
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
    initConfig.container.append(controls);
    pauseBtn = initConfig.container.querySelector('#pause-btn');
    prevBtn = initConfig.container.querySelector('#prev-btn');
    nextBtn = initConfig.container.querySelector('#next-btn');
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
    initConfig.container.append(indicators);
    indicatorsContainer = initConfig.container.querySelector('#indicators-container');
    indicatorItems = indicatorsContainer.querySelectorAll('.indicator');
  }

  function gotoNth(n) {
    //debugger;
    console.log(n);
    initConfig.slides[currentSlide].classList.toggle('active');
    indicatorItems[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    indicatorItems[currentSlide].classList.toggle('active');
    initConfig.slides[currentSlide].classList.toggle('active');
  }

  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }

  function gotoNext() {
    gotoNth(currentSlide + 1);
  }

  function tick(flag = true) {
    if (!flag) {
      pauseBtn.innerHTML = FA_PLAY;
      return;
    }

    if (timerID) return;
    // функція setInterval спрацьовує циклічно, через заданий інтервал і визиває функцію-колбек
    timerID = setInterval(gotoNext, initConfig.interval);
    console.log(timerID);
  }

  function playHandler() {
    pauseBtn.innerHTML = FA_PAUSE;
    initConfig.isPlaying = true;
    tick();
  }

  function pauseHandler() {
    clearInterval(timerID);
    pauseBtn.innerHTML = FA_PLAY;
    initConfig.isPlaying = false;
    timerID = null;
  }

  const pausePlay = () => initConfig.isPlaying ? pauseHandler() : playHandler();

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
    tick(initConfig.isPlaying);
  }

  // точка входа !!!
  initApp();

}('#myslider', '.item', 2000, false));