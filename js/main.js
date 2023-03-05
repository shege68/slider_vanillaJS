// беремо конструктор
Carousel.prototype.costructor = Carousel;

// екземпляр прототипа з новим функціоналом (swipe, touch)
// в параметри передаємо новий ID, новий class, interval, isPlaying
const carousel = new SwipeCarousel('#myslider', '.item', 2000, false);

// точка входа
carousel.initApp();


