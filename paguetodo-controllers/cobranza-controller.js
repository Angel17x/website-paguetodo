(function(app) {
	app.CobranzaComponent =
		ng.core.Component({
		selector: 'cobranza',
		templateUrl: 'views/cobranza.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
			
			this.router=router;
			this.active=active;
        }]
		});
	app.CobranzaComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		this.listModels = [
			{
				tipo: "DÍAS DE MORA",
				preventiva: "0-30",
				administrativa: "31-60",
				extraJudicial: "61-180",
				judicial: "MAYOR A 181"
			},
			{
				tipo: "DEFINICIÓN",
				preventiva: "Recordatorios de Emisión de Facturas",
				administrativa: "Seguimiento y Control",
				extraJudicial: "Estrategias de Negociación, Cobro por Gastos de Cobranza/ Intereses.",
				judicial: "Legal - Demanda"
			},
			{
				tipo: "CANALES DE GESTIÓN",
				preventiva: "IVS/SMS/ Correo Electrónico",
				administrativa: "IVRS/SMS/ Centros de Gestión/ Correo Electrónico.",
				extraJudicial: "Agencia de Cobranza.",
				judicial: "Legal - Demanda"
			}
		]
		// AOS.init();
	}
	app.CobranzaComponent.prototype.navigate=function(){
		let object = listRequest2('cashing');
		tipo = object.find(x => x.value === '6d08bb20-0c27-11ed-bc0b-7f7c84d99b81') || object[0];
		const { value } = tipo
		this.router.navigate(['/contact'], {queryParams:{ source_type: "CASHING", type: "REQUEST", id: value }});
	}
	app.CobranzaComponent.prototype.ngOnDestroy=function(){

	}

})(window.app || (window.app = {}));
