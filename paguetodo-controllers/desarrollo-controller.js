(function(app) {
	app.DesarrolloComponent =
		ng.core.Component({
		selector: 'desarrollo',
		templateUrl: 'views/desarrollo.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
			
			this.router=router;
			this.active=active;
        }]
		});
	app.DesarrolloComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		// AOS.init();
	}
	app.DesarrolloComponent.prototype.navigate=function(){
		let object = listRequest2('development');
		let tipo = object.find(x => x.value === '44789ba0-fe01-11ec-b170-6de6c7a1e31e') || object[0];
		const { value } = tipo
		this.router.navigate(['/contact'], {queryParams:{ source_type: "DEVELOPMENT", type:"REQUEST", id: value}});
	}
	app.DesarrolloComponent.prototype.ngOnDestroy=function(){

	}

})(window.app || (window.app = {}));
