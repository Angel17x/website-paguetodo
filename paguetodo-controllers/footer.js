(function(app) {
	app.FooterComponent =
		ng.core.Component({
		selector: 'footer-web',
		templateUrl: 'views/footer.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
			function(router,active) {
				this.router=router;
				this.active=active;
			}]
		});
	app.FooterComponent.prototype.ngOnInit=function(){
		
	}
	

})(window.app || (window.app = {}));
