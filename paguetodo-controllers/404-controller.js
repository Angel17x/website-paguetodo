(function(app) {
	app.NotFoundComponent =
		ng.core.Component({
		selector: 'not-found',
		templateUrl: 'views/404.html',
	})
		.Class({
      constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
			
			this.router=router;
			this.active=active;
        }]
		});
	app.NotFoundComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		if ($('.modal-backdrop').is(':visible')) {
			$('body').removeClass('modal-open'); 
			$('.modal-backdrop').remove(); 
		  };
	}
	app.NotFoundComponent.prototype.ngOnDestroy=function(){

	}

})(window.app || (window.app = {}));
