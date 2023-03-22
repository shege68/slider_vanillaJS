// імпортуємо клас SwipeCarousel із файла carousel-constructor.js
import SwipeCarousel from './carousel-constructor.js'

const carousel = new SwipeCarousel({
  containerID: '#myslider',
  slideClass: '.item',
  interval: 2000,
  isPlaying: false
});

// точка входа
carousel.initApp();