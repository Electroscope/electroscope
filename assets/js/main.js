/* Common JS */
jQuery(function(){

	$('.button-collapse').click(function(){
		var sidenav = $('.side-nav');
		sidenav.removeClass('menu-collapse');
		sidenav.addClass('menu-expand');
		sidenav.removeClass('.enable-collapse');
		$('.menu-collapse .nav-menu-title').show();
	});

	$(".button-collapse").sideNav();

	$('.side-nav.enable-collapse').hover(function(){
		$(this).toggleClass('menu-collapse');
		$(this).toggleClass('menu-expand');
	});

});