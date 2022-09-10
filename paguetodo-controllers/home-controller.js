(function(app) {
	app.HomeComponent =
		ng.core.Component({
		selector: 'home',
		templateUrl: 'views/home.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
			
			this.router=router;
			this.active=active;
        }]
		});
	app.HomeComponent.prototype.ngOnInit=function(){
		this.interval = null;
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		// // AOS.init();
		this.intervaloBeneficios();
	}
	app.HomeComponent.prototype.intervaloBeneficios=function(){
		let tabs = document.querySelectorAll(".nav-link");
		let cont = 0;
		this.interval = setInterval(() => {
		tabs.forEach((x,i) => {
			
			x.onclick = () => cont = i;

			if(cont === i){
				x.classList.add("active");
				let id = x.getAttribute("aria-controls");
				if(id!=null){
					let image = document.getElementById(id);
					image.classList.add("active");
					image.classList.add("show");
				}
			}else{
				x.classList.remove("active");
				let id = x.getAttribute("aria-controls");
				if(id!=null){
					let image = document.getElementById(id);
					image.classList.remove("active");
					image.classList.remove("show");
				}
			}
		})
		cont++
		if(cont>=tabs.length){
			cont=0;
		}

		}, 7000);
	}
	app.HomeComponent.prototype.clearInterval = function(interval){
		clearInterval(interval);
	}
	app.HomeComponent.prototype.ngOnDestroy=function(){
		this.clearInterval(this.interval)
	}

})(window.app || (window.app = {}));
