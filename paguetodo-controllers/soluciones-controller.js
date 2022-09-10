(function(app) {
	app.SolucionesComponent =
		ng.core.Component({
		selector: 'soluciones',
		templateUrl: 'views/soluciones.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
			
			this.router=router;
			this.active=active;
        }]
		});
	app.SolucionesComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		this.timelineEffect();
		// AOS.init();
	}
	
	app.SolucionesComponent.prototype.timelineEffect=function(){
		var timelineBlocks = $('.timeline-item'),
		offset = 0.8;

		this.hideBlocks(timelineBlocks, offset);

		$(window).on('scroll',()=>{
			(!window.requestAnimationFrame) 
				? setTimeout(()=>{ this.showBlocks(timelineBlocks, offset); }, 100)
				: window.requestAnimationFrame(()=>{ this.showBlocks(timelineBlocks, offset); });
		});

		
	}
	app.SolucionesComponent.prototype.showBlocks = function(blocks, offset){
		blocks.each(function(){
			($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.timeline-icon').hasClass('is-hidden')) && $(this).find('.timeline-icon, .timeline-content').removeClass('is-hidden').addClass('animate-it');
		});
	}
	app.SolucionesComponent.prototype.hideBlocks = function(blocks, offset){
		blocks.each(function(){
			($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.timeline-icon, .timeline-content').addClass('is-hidden');
		});
	}
	app.SolucionesComponent.prototype.navigate = function(param){
		let object = listRequest2('payment_solutions')
		let tipo;
		if(param === "pay-button"){
			tipo = object.find(x => x.value === '84a23270-0c2c-11ed-bc0b-7f7c84d99b81') || object[0];
			const { value } = tipo
			this.router.navigate(['/contact'], {queryParams:{ source_type: "PAYMENT_SOLUTIONS", type: "REQUEST", id: value }});
		}
		if(param === "pay-link"){
			tipo = object.find(x => x.value === '93792d80-0c2c-11ed-bc0b-7f7c84d99b81') || object[0];
			const { value } = tipo
			this.router.navigate(['/contact'], {queryParams:{ source_type: "PAYMENT_SOLUTIONS", type: "REQUEST", id: value }});
		}
	}
	app.SolucionesComponent.prototype.ngOnDestroy=function(){

	}

})(window.app || (window.app = {}));
