// імпортуємо клас Carousel із файла сarousel.js
import Carousel from './carousel.js'
// class SwipeCarousel
class SwipeCarousel extends Carousel {
  // аргументи отримуємо через спрід-оператор
  constructor(...args) {
    super(...args);
    // взяли первий елемент і піднялись вище до батька
    this.slidesContainer = this.slideItems[0].parentElement;
    console.log(this.slidesContainer);
  }

  // обробники подій
  _initListeners() {
    // обробник основної каруселі
    super._initListeners();
    // для мобільних пристроїв
    this.slidesContainer.addEventListener('touchstart', this._swipeStart.bind(this));
    this.slidesContainer.addEventListener('touchend', this._swipeEnd.bind(this));
    // для миші
    this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this));
    this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
  }

  _swipeStart(e) {
    console.log(e instanceof TouchEvent);
    this.startPosX = e instanceof MouseEvent
      ? e.pageX // якщо instanceof MouseEvent поверне true
      : e.changedTouches[0].pageX; // якщо instanceof MouseEvent поверне false
    //console.log(e.changedTouches[0].pageX);
  }

  _swipeEnd(e) {
    //console.log(e.changedTouches[0].pageX);
    this.endPosX = e instanceof MouseEvent
      ? e.pageX // якщо instanceof MouseEvent поверне true то у нас подія миші
      : e.changedTouches[0].pageX; // якщо instanceof MouseEvent поверне false то у нас подія дотику
    // console.log(endPosX - startPosX);
    if (this.endPosX - this.startPosX > 100) this.prev();
    if (this.endPosX - this.startPosX < -100) this.next();
  }
}

// експортуємо клас SwipeCarousel
export default SwipeCarousel;
