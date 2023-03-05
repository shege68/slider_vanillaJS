// carousel на прототипах
// прототип Carousel
// в параметри передаємо користувацькі класи та ID і даємо їм дефолтні імена
function Carousel(containerID = '#carousel', slideClass = '.slide', interval = 5000, isPlaying = true) {
  // создаємо властивості
  this.container = document.querySelector(containerID);
  this.slides = this.container.querySelectorAll(slideClass);
  this.interval = interval;
  this.isPlaying = isPlaying;
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0;

    this.SLIDES_COUNT = this.slides.length;
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';

    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i >';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i >';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  },

  // динамічна ініціалізація кнопок класа controls (порядок важливий !)
  _initControls() {
    // створюємо елемент div
    const controls = document.createElement('div');
    // виводимо кнопки в константи
    const PAUSE = `<div id="pause-btn" class="control control-pause">${this.FA_PAUSE}</div>`;
    const PREV = `<div id="prev-btn" class="control control-prev">${this.FA_PREV}</div>`;
    const NEXT = `<div id="next-btn" class="control control-next">${this.FA_NEXT}</div>`;
    // добавляємо діву id controls-container та клас controls
    controls.setAttribute('id', 'controls-container');
    controls.setAttribute('class', 'controls');
    // добавляємо в дів кнопки
    controls.innerHTML = PAUSE + PREV + NEXT;
    // добавляємо клас controls всередину container
    this.container.append(controls);
    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
  },

  // динамічна ініціалізація індикаторів класа indicators (порядок важливий !)
  _initIndicators() {
    // створюємо елемент div
    const indicators = document.createElement('div');

    indicators.setAttribute('id', 'indicators-container');
    indicators.setAttribute('class', 'indicators');

    // в циклі добавляємо дочірній клас indicator в indicators по кількості слайдів
    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      //indicator.setAttribute('data-slide-to', i);
      // або через обєкт dataset
      indicator.dataset.slideTo = `${i}`;
      indicator.innerHTML = `${i + 1}`;
      indicators.append(indicator);
    }
    // добавляємо сам клас indicators до батьківського container
    this.container.append(indicators);
    this.indicatorsContainer = this.container.querySelector('#indicators-container');
    this.indicatorItems = this.indicatorsContainer.querySelectorAll('.indicator');
    //console.log(this.indicatorItems);
  },

  // обробники подій
  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    // для клавіатури
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

  // з _ це приватні методи
  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.slides[this.currentSlide].classList.toggle('active');
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  },

  _tick(flag = true) {
    if (!flag) {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      return;
    }
    if (this.timerID) return;
    // функція setInterval спрацьовує циклічно, через this.interval і визиває функцію-колбек
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    console.log(this.timerID);
  },

  _play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this._tick();
  },

  _pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    clearInterval(this.timerID);
    console.log(this.timerID);
    this.timerID = null;
    console.log(this.timerID);
  },

  pausePlay() {
    return this.isPlaying
      ? this._pause()
      : this._play();
  },

  prev() {
    this._pause();
    this._gotoPrev();
  },

  next() {
    this._pause();
    this._gotoNext();
  },

  _indicate(e) {
    const target = e.target;
    console.log(target.innerHTML);

    if (target && target.classList.contains('indicator')) {
      this._pause();
      //_gotoNth(+target.getAttribute('data-slide-to'));
      //console.log(target.getAttribute('data-slide-to'));
      // або через .dataset і 'data-slide-to' ставиться як .slideTo
      this._gotoNth(+target.dataset.slideTo);
    }
  },

  _pressKey(e) {
    console.log(e);
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  // головна функція
  initApp() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  },
};

// конструктор
Carousel.prototype.constructor = Carousel;