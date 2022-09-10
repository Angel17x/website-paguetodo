(function(app) {
	app.PoliticasComponent =
		ng.core.Component({
		selector: 'politicas-de-privacidad',
		templateUrl: 'views/politicas.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
					this.router=router;
					this.active=active;
        }]
		});
	app.PoliticasComponent.prototype.ngOnInit=function(){
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
	app.PoliticasComponent.prototype.navigate=function(){
	}
	app.PoliticasComponent.prototype.mySwiper=function(){
		return swipper();
	}
	app.PoliticasComponent.prototype.ngOnDestroy=function(){

	}
	app.PoliticasComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));
