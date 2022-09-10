(function(app) {
	app.TicketComponent =
		ng.core.Component({
		selector: 'ticket',
		templateUrl: 'views/ticket.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,
        function(router,active, service) {
			this.router=router;
			this.active=active;
			this.service = service;
        }]
		});
	app.TicketComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0);
        });
        this.external_id = null;
        this.type = null;
        this.status = null;
        this.title = null;
        this.client_id_doc = null;
        this.client_phone = null;
        this.client_email = null;
		this.route = this.active.url._value[0].path;
		this.mensaje = "ingrese un número de ticket válido";
		this.nro = null;
		this.service_pay = [];
		this.pos = {};
        this.getData();
		this.create_at = null;
		// AOS.init();
	}
	app.TicketComponent.prototype.translate2=function(value){
		return translate(value)
	}
    app.TicketComponent.prototype.getData=function(){
		if(this.route === "consult"){

		}else{
			if(this.active.hasOwnProperty('queryParams')){
				if(this.active.queryParams!=null || this.active.queryParams!=undefined){
					if(this.active.queryParams.hasOwnProperty('_value')){
						if(this.active.queryParams._value!=null || this.active.queryParams._value!=undefined){
							if(Object.entries(this.active.queryParams._value).length != 0){
								if(this.active.queryParams._value.hasOwnProperty('external_id')){
									if(this.active.queryParams._value.external_id!=null || this.active.queryParams._value.external_id!=undefined){
										this.external_id = this.active.queryParams._value.external_id;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty('type')){
									if(this.active.queryParams._value.type!=null || this.active.queryParams._value.type!=undefined){
										this.type = this.active.queryParams._value.type;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty('status')){
									if(this.active.queryParams._value.status!=null || this.active.queryParams._value.status!=undefined){
										this.status = this.active.queryParams._value.status;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty('title')){
									if(this.active.queryParams._value.title!=null || this.active.queryParams._value.title!=undefined){
										this.title = this.active.queryParams._value.title;
									}
								}
								
								if(this.active.queryParams._value.hasOwnProperty('client_id_doc')){
									if(this.active.queryParams._value.client_id_doc!=null || this.active.queryParams._value.client_id_doc!=undefined){
										this.client_id_doc = this.active.queryParams._value.client_id_doc;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty('client_business_name')){
									if(this.active.queryParams._value.client_business_name!=null || this.active.queryParams._value.client_business_name!=undefined){
										this.client_name = this.active.queryParams._value.client_business_name;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty('client_phone')){
									if(this.active.queryParams._value.client_phone!=null || this.active.queryParams._value.client_phone!=undefined){
										this.client_phone = this.active.queryParams._value.client_phone;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty('client_email')){
									if(this.active.queryParams._value.client_email!=null || this.active.queryParams._value.client_email!=undefined){
										this.client_email = this.active.queryParams._value.client_email;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty("product")){
									if(this.active.queryParams._value.product!=null || this.active.queryParams._value.product!=undefined){
										this.pos.product = {};
										this.pos.product = this.active.queryParams._value.product;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty("price")){
									if(this.active.queryParams._value.price!=null || this.active.queryParams._value.price!=undefined){
										this.pos.price = {};
										this.pos.price = this.active.queryParams._value.price;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty("count")){
									if(this.active.queryParams._value.count!=null || this.active.queryParams._value.count!=undefined){
										this.pos.count = {};
										this.pos.count = this.active.queryParams._value.count;
									}
								}
								if(this.active.queryParams._value.hasOwnProperty('service_pay_body')){
									if(this.active.queryParams._value.service_pay_body!=null || this.active.queryParams._value.service_pay_body!=undefined){
										this.service_pay = JSON.parse(this.active.queryParams._value.service_pay_body).flatMap(x => ({ value: x, name: this.translate_service(x) }));
									}
								}
							}else{
								this.router.navigate(['/home']);
							}
						}else{
							if(this.active.queryParams._value)
							this.router.navigate(['/home']);
						}
					}else{
						if(this.active.queryParams._value)
						this.router.navigate(['/home']);
					}
				}else{
					this.router.navigate(['/home']);
				}
			}else{
				this.router.navigate(['/home']);
			}
		}
    }
	app.TicketComponent.prototype.translate_service=function(value){
		let obj = {
			MOVILNET_PREPAY: "MOVILNET RECARGA - (PREPAGO)",
			MOVILNET_POSTPAID: "MOVILNET POSPAGO",
			MOVISTAR_POSTPAID: "RECAUDACIÓN MOVISTAR - (POSPAGO)",
			CANTV_POSTPAID: "CANTV POSPAGO",
			CANTV_INTERNET: "CANTV INTERNET - (POSPAGO)",
			CANTV: "CANTV POSPAGO"
		}
		return obj[value] || null;
	}
	app.TicketComponent.prototype.search=function(){
		if(this.nro==null || this.nro==undefined || this.nro=="null"){
			this.mensaje = "Ingrese un número de ticket válido"
			$('#modalFailed').modal("show");
			return;
		}
		$("#pleaseWait").modal("show");
		this.nro=this.nro.trim();
		const headers = {"x-paguetodo-id": this.service.paguetodoId3,"app-id": this.service.appId};
		this.service.fetchConsult(this.nro, headers)
		.then(res => res.json())
		.then(data => {
			this.clean();
			if (data == null || data == undefined || data == "") {
					$("#pleaseWait").modal("hide");
					$("#modalFailed").modal("show");
					this.mensaje = "Error al procesar la solicitud";
			} else {
				if(data.hasOwnProperty("code")){
					if(data.code == 202){
						if(data.message == "CLIENT_NOT_FOUND"){
							this.mensaje = "Número de ticket inválido";
							$("#pleaseWait").modal("hide");
							$("#modalNotFound").modal("show");
							return;
						}
						if(data.message == "USER_PETITION_NOT_FOUND"){
							this.mensaje = "Número de ticket inválido";
							$("#pleaseWait").modal("hide");
							$("#modalNotFound").modal("show");
							return;
						}
					}else{
						this.mensaje = "Error al procesar la solicitud";
						$("#pleaseWait").modal("hide");
						$("#modalFailed").modal("show");
						return;
					}
				}else{
					$("#pleaseWait").modal("hide");
					this.formattedData(data);
				}
			}
		}).catch(err => {
			$("#pleaseWait").modal("hide");
			console.log(err)
		})
		
	}
	app.TicketComponent.prototype.keypressEvent=function(e){
		if (e.which == 32)
            	return false;
	}
	app.TicketComponent.prototype.onPaste=function(value){
		value = value.trim()
	}
	app.TicketComponent.prototype.keyupsearch=function(event){
		try{
			
			if (event.keyCode == 13) {
				 this.search();
			}
		   }catch(err){
			   
		   }
	}
	app.TicketComponent.prototype.formattedData=function(data){
		if (data == null || data == undefined || data == "") {
			$("#modalFailed").modal("show");
			this.mensaje = "Error al procesar la solicitud";
			return;
		}else{
			this.external_id=null;
			if(data.hasOwnProperty('external_id')){
				if(data.external_id!=null || data.external_id!=undefined){
					this.external_id = data.external_id;
				}
			}
			this.type=null;
			if(data.hasOwnProperty('type')){
				if(data.type!=null || data.type!=undefined){
					this.type = data.type;
				}
			}
			this.status=null;
			if(data.hasOwnProperty('status')){
				if(data.status!=null || data.status!=undefined){
					this.status = data.status;
				}
			}
			this.title=null;
			if(data.hasOwnProperty('title')){
				if(data.title!=null || data.title!=undefined){
					this.title = data.title;
				}
			}
			this.type=null;
			if(data.hasOwnProperty('type')){
				if(data.type!=null || data.type!=undefined){
					this.type = data.type;
				}
			}
			this.client_name=null;
			if(data.hasOwnProperty('client_business_name')){
				if(data.client_business_name!=null || data.client_business_name!=undefined){
					this.client_name = data.client_business_name;
				}
			}
			this.client_id_doc=null;
			if(data.hasOwnProperty('client_id_doc')){
				if(data.client_id_doc!=null || data.client_id_doc!=undefined){
					this.client_id_doc = data.client_id_doc;
				}
			}
			this.client_phone=null;
			if(data.hasOwnProperty('client_phone')){
				if(data.client_phone!=null || data.client_phone!=undefined){
					this.client_phone = data.client_phone;
				}
			}
			this.client_email=null;
			if(data.hasOwnProperty('client_email')){
				if(data.client_email!=null || data.client_email!=undefined){
					this.client_email = data.client_email;
				}
			}
			this.pos = {}
			if(data.hasOwnProperty('pos_body')){
				if(data.pos_body!=null || data.pos_body!=undefined){
					this.pos = data.pos_body;
				}
			}
			this.service_pay = [];
			if(data.hasOwnProperty('service_pay_body')){
				if(data.service_pay_body!=null || data.service_pay_body!=undefined){
					if(data.service_pay_body.hasOwnProperty('services')){
						if(data.service_pay_body.services!=null || data.service_pay_body.services!=undefined){
							let { services } = data.service_pay_body
							this.service_pay = services.flatMap(x => ({ value: x, name: this.translate_service(x) }));
						}
					}
				}
			}
		}
	}
	app.TicketComponent.prototype.clean=function(){
		this.external_id = null;
        this.type = null;
        this.status = null;
        this.title = null;
		this.client_name = null; 
        this.client_id_doc = null;
        this.client_phone = null;
        this.client_email = null;
		this.nro = null;
		this.service_pay = [];
		this.pos = {};
		this.create_at = null;

	}
	app.TicketComponent.prototype.ngOnDestroy=function(){
		
	}

})(window.app || (window.app = {}));
