function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}; 
};

// bp is optional. It turns the function on or off below the width you pass into the function.
function equalizer($elm, bp) {
	if ( bp !== undefined && $(window).width() < bp  ) {
		$elm.height('');
		return
	}
	var maxHeight = 0;
				
	$elm.each(function(){
		$(this).css('height', '');
	  if ($(this).height() > maxHeight) { 
	   	maxHeight = $(this).height();
	  }
	});
	
	$elm.height(maxHeight);		
};

// extend jquery with menu function
$.fn.shiftResponsiveMenu = function( options ) {
  var settings = $.extend({
      $menuContainer: $('.site-header .row'),
      $siblingElm: false,
      $siteHeader: $('.site-header')
  }, options );
  
	var width =	Math.floor( settings.$menuContainer.width() ); // get the row width
			if (settings.$siblingElm) {
				var titleWidth = Math.ceil( settings.$siblingElm.outerWidth(true) ); // get the logo width
			};
			var navWidth = Math.ceil( this.outerWidth(true) ); // get the nav width in margin
			var availableSpace;
			settings.$siblingElm ? ( availableSpace = width - titleWidth ) : availableSpace = width; // set the available space for the nav
	// set a class to turn the menu on and off 	
	if ( navWidth >= availableSpace ) {
		$('body').addClass('is-active-menu');
	} else {
		$('body').removeClass('is-active-menu');
	}
	
	return this;
};

/**
 * Validate email function with regular expression
 */
function validateEmail(email) {
	var emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var valid = emailReg.test(email);
    
   return valid ? true : false;
}

/**
 * Validation messages
 */
function valMessage(message, field) {
	fieldClass = "message--"+field.attr("class"),
	errorMessage = '<p class="message message--error '+fieldClass+'">'+message+'</p>';
	return errorMessage;
}

function removeValMessage(field) {
	field.on("change focus", function() {
		$(".message--"+field.attr("class")).fadeOut(300, function() {
			$(this).remove();
		});
	});
}