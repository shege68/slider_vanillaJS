// беремо конструктор
Carousel.prototype.costructor = Carousel;

// екземпляр прототипа
// в параметри передаємо новий ID, новий class, interval, isPlaying
const carousel = new Carousel('#myslider', '.item', 2000, false);

// точка входа
carousel.initApp();