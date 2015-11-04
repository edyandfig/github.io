jQuery(function() {
  FastClick.attach(document.body);
});


jQuery(document).ready( function($) {
	
	// make the heights of grided rows consistent
	equalizer( $(".story-summary"), 600);
	
	// registration form select box
	$(".sign-up__select").selectbox({
		speed: 200,
		effect: "fade"
	});
	
	$("#carousel--home").owlCarousel({
    animateOut: 'fadeOut',
    items:1,
    autoplay:true,
    autoplayTimeout:4000,
    mouseDrag: false,
    touchDrag: false,
    dots: false
  })
  
	 var $carouselCategories =  $(".carousel--category-badges").owlCarousel({
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    autoWidth: true
  });
  
  // set up custom controls for Owl Carousel
  
	// Go to the next item
	$('.carousel-nav__right').click(function() {
	  $carouselCategories.trigger('next.owl.carousel');
	});
	// Go to the previous item
	$('.carousel-nav__left').click(function() {
	  $carouselCategories.trigger('prev.owl.carousel');
	});
	
	$('.carousel--story').owlCarousel({
		animateOut: 'fadeOut',
    items:1,
    mouseDrag: false,
    touchDrag: false,
    dots: false,
    nav: true
   })
	  
});

jQuery(window).resize( function() {
	debounce( equalizer( jQuery(".story--summary"), 600), 250)	
});