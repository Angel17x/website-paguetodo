(function(app) {
	app.TerminosComponent =
		ng.core.Component({
		selector: 'terminos-y-condiciones',
		templateUrl: 'views/terminos.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
					this.router=router;
					this.active=active;
        }]
		});
	app.TerminosComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		if ($('.modal-backdrop').is(':visible')) {
			$('body').removeClass('modal-open'); 
			$('.modal-backdrop').remove(); 
		  };
		this.mySwiper();
		// AOS.init();
	}
	app.TerminosComponent.prototype.navigate=function(){
	}
	app.TerminosComponent.prototype.mySwiper=function(){
		return swipper();
	}
	app.TerminosComponent.prototype.ngOnDestroy=function(){

	}
	app.TerminosComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));
