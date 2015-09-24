/* Common JS */
jQuery(function(){

	$(".button-collapse").sideNav();

	$('.side-nav').hover(function(){
		$(this).toggleClass('menu-collapse');
		$(this).toggleClass('menu-expand');
	});

});