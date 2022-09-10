(function(app) {
	app.ContactComponent =
		ng.core.Component({
		selector: 'contact',
		templateUrl: 'views/contact.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,app.LoadingServiceComponent,
        function(router,active, service,loading) {
			this.service = service;
			this.router=router;
			this.active=active;
			this.loading=loading;
        }]
		});
	app.ContactComponent.prototype.ngOnInit=function(){
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		this.mensaje = "Éxito al enviar el correo";
		this.nameRoute = this.active?.snapshot?.url[0]?.path;
		this.typeButton = this.nameRoute === "contact" ? "text btn btn-white text-bold": "text btn btn-danger text-bold";
		this.typeRif="V";
		this.rif=null;
		this.name = null;
		this.email = null;
		this.asunto = null;
		this.typeClaim = null;
		this.typeRequest = null;
		this.typeArea = null;
		this.typePhone = "414";
		this.phone = null;
		this.message = null;
		this.listRequest = listRequest();
		this.listArea = listArea();
		this.complain = null;
		this.listSelected = [];
		this.type = null;
		this.json = {};
		this.formData = new FormData();
		this.getData();
		$("#phone").mask('000-0000');

	}
	app.ContactComponent.prototype.getData = function(){
		
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null || this.active.queryParams!=undefined){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null || this.active!=undefined){
						let data = this.active.queryParams._value;
						if(data.hasOwnProperty('source_type')){
							if(data.source_type!=null || data.source_type!=undefined){
							this.typeArea=data.source_type;
							}
						}
						if(data.hasOwnProperty('type')){
							if(data.type!=null || data.type!=undefined){
								 this.changeRequest(data.type);
							}
						}
						if(data.hasOwnProperty('id')){
							if(data.id!=null || data.id!=undefined){
								this.asunto = data.id;
							}
						}
					}
				}
			}
		}
	}
	app.ContactComponent.prototype.keypressNumber=function(event){
		return keypressNumbersInteger(event)
	}
	app.ContactComponent.prototype.keypressValidateInput = function(element, prop=null, length=null, regex=null){
		if(element){
			if(prop!=null){
				if(typeof element.value != prop){
					element.classList.add('is-invalid');
					return
				}
			}
			if(length!=null){
				if(element.value.length < length){
					element.classList.add('is-invalid');
					return
				}
			}
			if(element.value.trim() == ""){
				element.classList.add('is-invalid');
				return
			}
			if(regex!=null){
				if(regex === 'email'){
					if(!validarEmail2(element.value)){
						element.classList.add('is-invalid');
						return
					}
				}
				if(regex === 'phone'){
					if(element.value.split('').flatMap(el => el==="(" ? [] : el===")" ? [] : el===" " ? [] : el==="-" ? []  : el==="+" ? [] : el).join("").length != 7){
						element.classList.add('is-invalid');
					return
					}
				}
				if(regex === 'rif'){
					let { value } = element;
					if(!/(^[0-9]{4,9}$)/.test(value)){
						element.classList.add('is-invalid');
						return
					}
					
				}
			}
			
			element.classList.remove('is-invalid');
			element.classList.add('is-valid');
			
		}
	}
	app.ContactComponent.prototype.changeArea = function(element){
		this.typeArea = element.value;
		if(this.typeArea==null || this.typeArea=="null" || this.typeArea==undefined){
			this.typeRequest=null;
			this.listSelected = [];
			this.asunto=null;
			element.classList.add('is-invalid');
			return;
		}else{
			this.typeRequest=null;
			this.listSelected = [];
			this.asunto=null;
			element.classList.remove('is-invalid');
			return;
		}
	}
	app.ContactComponent.prototype.changeRequest = function(element){
		this.typeRequest = element.value || element;
		this.listSelected=[];
		this.asunto=null;

		if(this.typeArea==null || this.typeArea=="null" || this.typeArea==undefined){
			this.typeRequest=null;
			this.listSelected = [];
			this.asunto=null;
			document.getElementById('typeArea').classList.add('is-invalid');
			return;
		}
		if(this.typeRequest==null || this.typeRequest=="null" || this.typeRequest==undefined){
			this.typeRequest=null;
			this.listSelected = [];
			this.asunto=null;
			element.classList.add('is-invalid');
			return;
		}else{
			if(typeof element !== "string"){
				element.classList.remove('is-invalid');
			}
			if(!(this.typeRequest==null || this.typeRequest=="null" || this.typeRequest==undefined)){
				if(this.typeRequest==="SUGGESTION"){
					this.listSelected = listSuggestions(this.typeArea.toLowerCase());
					if(this.listSelected.length==0){
						$("#modalErrorTypeRequest").modal("show");
						return
					}
				}
				if(this.typeRequest==="CLAIM"){
					this.listSelected = listClaim(this.typeArea.toLowerCase());
					if(this.listSelected.length==0){
						$("#modalErrorTypeRequest").modal("show");
						return
					}
				}
				if(this.typeRequest==="COMPLAIN"){
					this.listSelected = listComplain(this.typeArea.toLowerCase());
					if(this.listSelected.length==0){
						$("#modalErrorTypeRequest").modal("show");
						return
					}
				}
				if(this.typeRequest==="REQUEST"){
					this.listSelected = listRequest2(this.typeArea.toLowerCase());
					if(this.listSelected.length==0){
						$("#modalErrorTypeRequest").modal("show");
						return
					}
				}
			}
		}
	}
	app.ContactComponent.prototype.restoreValues = function(){
		this.typeRequest = null;
		this.listSelected = [];
		this.asunto=null;
	}
	app.ContactComponent.prototype.changeInputSelect = function(element){
		if(element.value==null || element.value=="null" || element==undefined){
			element.classList.add('is-invalid');
			return;
		}else{
			element.classList.remove('is-invalid');
			return;
		}
	}
	app.ContactComponent.prototype.validateInput = function(element, prop=null, length=null, regex=null){
		if(element){
			element = element.replace(/\s+/g, ' ');
			if(prop!=null){
				if(typeof element != prop){
					return false
				}
			}
			if(length!=null){
				if(element.length < length){
					return false
				}
			}
			if(element.trim() == ""){
				element = element.replace(/\s+/g, ' ');
				return false;
			}
			if(regex!=null){
				if(regex === 'email'){
					if(!validarEmail2(element)){
						return false
					}
				}
				if(regex === 'phone'){
					if(element.split('').flatMap(el => el==="(" ? [] : el===")" ? [] : el===" " ? [] : el==="-" ? []  : el==="+" ? [] : el).join("").length!=10){
						return false
					}
				}
				if(regex === 'rif'){
					let result;
					let type = element.match(/[A-Za-z]/gi);
					let number = element.match(/[0-9]/g);
					if(type!=null && number!=null){
						result = type[0]+number.join("");
					}
					if(!(/^([VEJPG]{1})([0-9]{4,9}$)/.test(result))){
						return false
					}
				}
			}
			return true
		}
	}
	app.ContactComponent.prototype.sendForm = function(){
		this.json.weight=0;
		this.json.channel='WEB';
		if(this.typeRif==null || this.typeRif==undefined){
			document.getElementById('typeRif').classList.add('is-invalid');
			return;
		}else{
			document.getElementById('typeRif').classList.remove('is-invalid');
		}
		if(this.rif==null || this.rif==undefined || this.rif.trim()==""){
			document.getElementById('rif').classList.add('is-invalid');
			return;
		}else{
			if(!/^[0-9]{4,9}$/g.test(this.rif)){
				document.getElementById('rif').classList.add('is-invalid');
				return;
			}
			document.getElementById('rif').classList.remove('is-invalid');
			this.json.client_id_doc = this.typeRif+this.rif.trim();
		}
		
		if(this.name==null || this.name==undefined || this.name.trim()==""){
			document.getElementById('name').classList.add('is-invalid');
			return;
		}else{
			document.getElementById('name').classList.remove('is-invalid');
			this.json.client_business_name=this.name.trim()
		}

		if(this.email==null || this.email==undefined || this.email.trim()==""){
			document.getElementById('email').classList.add('is-invalid');
			return;
		}else{
			if(!validarEmail2(this.email)){
				document.getElementById('email').classList.add('is-invalid');
				return;
			}
			document.getElementById('email').classList.remove('is-invalid');
			this.json.client_email=this.email.trim()
		}
		if(this.typePhone==null || this.typePhone==undefined){
			document.getElementById('typePhone').classList.add('is-invalid');
			return;
		}
		if(this.phone==null || this.phone==undefined || this.phone.trim()==""){
			document.getElementById('phone').classList.add('is-invalid');
			return;
		}else{
			if(this.phone.length>7){
				this.phone = this.phone.match(/[0-9]+/g).join("");
			}
			phone = (this.typePhone+this.phone).match(/[0-9]{10}/g).join("");
			if(!this.validateInput(phone, 'string', null, 'phone')){
				document.getElementById('phone').classList.add('is-invalid');
				return;
			}else{
				this.json.client_phone=phone.trim();
			}
		}
		if(this.typeArea==null || this.typeArea==undefined || this.typeArea == "null"){
			document.getElementById('typeArea').classList.add('is-invalid');
			return;
		}else{
			this.json.source_type=this.typeArea.trim();
			document.getElementById('typeArea').classList.remove('is-invalid');
		}
		if(this.typeRequest==null || this.typeRequest==undefined || this.typeRequest == "null"){
			document.getElementById('typeRequest').classList.add('is-invalid');
			return;
		}else{
			this.json.type=this.typeRequest.trim();
			document.getElementById('typeRequest').classList.remove('is-invalid');
		}
		if(this.asunto==null || this.asunto==undefined || this.asunto == "null" || this.asunto.trim()==""){
			document.getElementById('asunto').classList.add('is-invalid');
			return;
		}
		// this.json.template_id=this.asunto;
		
		if(this.message==null || this.message==undefined || this.message.trim()==""){
			document.getElementById('message').classList.add('is-invalid');
			return;
		}else{
			// this.json.description_html=this.message;
			this.json.description_markdown=this.message.trim();
			document.getElementById('message').classList.remove('is-invalid');
		}
		this.callService();
	}
	app.ContactComponent.prototype.callService=function(){
		this.formData = new FormData();
		let querys = `?template_id=${this.asunto}`;
		this.formData.append('issue', JSON.stringify(this.json));
		let headers = {"X-paguetodo-id": this.service.paguetodoId,"app-id": this.service.appId};
		let request = null;

		$("#pleaseWait").modal("show");
		if(this.json!=null || this.json!=undefined || this.json!=""){
			request = this.service.callServicesHttp('website-request', querys, this.formData, headers);
			request.subscribe(data => {
				if (data == null || data == undefined || data == "") {
					$("#pleaseWait").modal("hide");
					$("#modalFailed").modal("show");
				} else {
					if (data.status_http == 200) {
						$("#pleaseWait").modal("hide");
						$("#modalSuccess").modal("show");
						delete data['status_http'];
					} else {
						$("#pleaseWait").modal("hide");
						$("#modalFailed").modal("show");
					}
				}
			}, err => {
				$("#pleaseWait").modal("hide");
				$("#modalFailed").modal("show");
			});
		}
	}
	app.ContactComponent.prototype.translate2=function(value){
		return translate(value);
	}
	app.ContactComponent.prototype.ngOnDestroy=function(){

	}

})(window.app || (window.app = {}));
