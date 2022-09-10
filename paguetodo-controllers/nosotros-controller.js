(function(app) {
	app.NosotrosComponent = 
		ng.core.Component({
		selector: 'nosotros',
		templateUrl: 'views/nosotros.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
			
			this.router=router;
			this.active=active;
        }]
		});
	app.NosotrosComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		// AOS.init();
	}
	
	app.NosotrosComponent.prototype.ngOnDestroy=function(){
	}

})(window.app || (window.app = {}));
