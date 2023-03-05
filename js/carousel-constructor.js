// прототип SwipeCarousel з розширеним функціоналом
function SwipeCarousel() {
  // добавляємо контекст і аргументи основної каруселі
  Carousel.apply(this, arguments);
  this.slidesContainer = this.container.querySelector('.slides');
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

// обробники подій
SwipeCarousel.prototype._initListeners = function () {
  // обробник основної каруселі
  Carousel.prototype._initListeners.apply(this);
  // для мобільних пристроїв
  this.slidesContainer.addEventListener('touchstart', this._swipeStart.bind(this));
  this.slidesContainer.addEventListener('touchend', this._swipeEnd.bind(this));
  // для миші
  this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this));
  this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
};

SwipeCarousel.prototype._swipeStart = function (e) {
  console.log(e instanceof TouchEvent);
  this.startPosX = e instanceof MouseEvent
    ? e.pageX // якщо instanceof MouseEvent поверне true
    : e.changedTouches[0].pageX; // якщо instanceof MouseEvent поверне false
  //console.log(e.changedTouches[0].pageX);
};

SwipeCarousel.prototype._swipeEnd = function (e) {
  //console.log(e.changedTouches[0].pageX);
  this.endPosX = e instanceof MouseEvent
    ? e.pageX // якщо instanceof MouseEvent поверне true то у нас подія миші
    : e.changedTouches[0].pageX; // якщо instanceof MouseEvent поверне false то у нас подія дотику
  // console.log(endPosX - startPosX);
  if (this.endPosX - this.startPosX > 100) this.prev();
  if (this.endPosX - this.startPosX < -100) this.next();
};
