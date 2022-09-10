(function(app) {
	app.RecaudacionComponent =
		ng.core.Component({
		selector: 'recaudacion',
		templateUrl: 'views/recaudacion.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
					this.router=router;
					this.active=active;
        }]
		});
	app.RecaudacionComponent.prototype.ngOnInit=function(){
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
	app.RecaudacionComponent.prototype.navigate=function(){
		this.router.navigate(['/preafiliacion'], {queryParams:{ type: "recaudacion" }});
	}
	app.RecaudacionComponent.prototype.mySwiper=function(){
		return swipper();
	}
	app.RecaudacionComponent.prototype.ngOnDestroy=function(){

	}
	app.RecaudacionComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));
