

// ========================================
//  BANNER IMAGE SLIDER
// ========================================


var homeCarousel          = $('#banner-carousel'),
    carouselContainer     = $('.banner--carousel, .banner__slide'),
    activeSlide           = $('.owl-item.active > .banner__slide'),
    transitionSpeed       = 1250;

homeCarousel.owlCarousel({
  items:1,
  loop:true,
  animateOut:'fadeOut',
  autoHeight:true,
  autoplay:true,
  autoplayTimeout:8000,
  dots:false,
  nav:false,
  navSpeed: transitionSpeed,
  smartSpeed: transitionSpeed,
  touchDrag: false,
  mouseDrag: false,
  callbacks:true
});



// keyboard nav for the active carousel
$(document.documentElement).keyup(function (event) {
  if (event.keyCode == 37) {  // left key press
    homeCarousel.trigger('prev.owl.carousel');
  } else if (event.keyCode == 39) {  // right key press
    homeCarousel.trigger('next.owl.carousel');
  }
});

// custom nav
$("#owl-carousel-prev").click(function(){
  homeCarousel.trigger('prev.owl.carousel')
});
$("#owl-carousel-next").click(function(){
  homeCarousel.trigger('next.owl.carousel')
});
