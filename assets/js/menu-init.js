/*
Default options:
$menuContainer: $('.site-header .row')
$siblingElm: false
$siteHeader: $('.site-header')
*/

jQuery(document).ready( function($) {
	
	// initiate responsive menu
	$('.main-nav').shiftResponsiveMenu({
		 $siblingElm: $('.site-title')
	});
		
  // event binding for menu toggle buttons
  $('#menu-toggle-wrap').on('click', function() {
	  $('body').toggleClass('is-visible-menu');
	  $(this).toggleClass('is-active');
		$('.menu--sub').removeClass('is-active-menu--sub');
  });
  
  // make escape key close menus
  $(document).on('keyup', function(e) {
	  if (e.keyCode == 27) {
		  $('body').removeClass('is-visible-menu');
			$('.menu--sub').removeClass('is-active-menu--sub');
			$('#menu-toggle-wrap').removeClass('is-active');
	  }
  });
	
		
	// when the viewport is resized
	var menuCheck = debounce( function() {
			$('body').removeClass('is-visible-menu');
			$('.menu--sub').removeClass('is-active-menu--sub');
			$('#menu-toggle-wrap').removeClass('is-active');				
			
			$('.main-nav').shiftResponsiveMenu({
			 $siblingElm: $('.site-title')
			});		
			
	}, 250);
	
	$(window).resize( menuCheck );
	
});