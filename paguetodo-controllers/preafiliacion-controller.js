
(function(app) {
	app.PreafiliacionComponent =
		ng.core.Component({
		selector: 'preafiliacion',
		templateUrl: 'views/preafiliacion.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,app.AppCallService,
        function(router,active,ser) {
          this.router=router;
          this.active=active;
					this.ser=ser;
					}]
		});
	app.PreafiliacionComponent.prototype.ngOnInit = function() {
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		this.venezuela = null;
		fetch('assets/resources/db.json')
		.then(data => data.json())
		.then(data => this.venezuela = data.venezuela);

		this.form1=true;
		this.form2=false;
		this.form3=false;
		this.form4=false;
		this.form5=false;
		
		document.addEventListener('DOMContentLoaded', function () {window.setTimeout(document.querySelector('svg').classList.add('animated'),1000);})

		this.class1 = this.form1 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class2 = this.form2 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class3 = this.form3 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class4 = this.form4 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class5 = this.form5 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'

		this.userNameClient = null;
		this.type = null;
		this.channel = "WEB";
		this.weight = 3;
		this.typeRif = "V";
		this.rifClient = null;
		this.typeTelefonoClient="414";
		this.telefonoClient = null;
		this.emailClient = null;
		this.retiroOficina=true;
		this.programmer=false;
		this.count = 1;

		this.nombreNegocio=null;
		this.typeRifNegocio="J";
		this.rifNegocio=null;
		this.emailCompany=null;
		this.actividadNegocio="SELECCIONE UNA ACTIVIDAD ECONÓMICA...";
		this.actividadOtros = null;
		this.actividadOtrosBoolean = false;

		this.addressNegocio=null;
		this.addressNegocio2=null;
		this.addressNegocio3=null;
		this.addressNegocio4=null;
		this.estado=null;
		this.estadoSelected="Estado...";
		this.ciudad=null;	
		this.ciudadSelected="Ciudad...";	
		this.municipio=null;		
		this.municipioSelected="Municipio...";		
		this.typeTelefonoNegocio2="414";
		this.telefonoNegocio2=null;
		this.typeTelefonoNegocio3="212";
		this.telefonoNegocio3=null;
		this.zonaPostalNegocio=null;
		this.tipoLineaNegocio="SELECCIONE LINEA DE TELEFONIA CELULAR...";
		this.codigoVendedor=null;

		this.rifNegocioPdf=null;
		this.cedula=null;
		this.registroMercantil=null;
		this.contratoServicio=null;
		this.refBancaria=null;
		this.refPersonal=null;
		this.conditions=false;
		this.conditions2=false;
		this.logoEmpresa=null;
		this.contribuyenteEspecial=false;
		this.issue_template_id = this.type === 'recaudacion' ? this.request_id("service_pay"): this.request_id("pos");
		this.listServices = listServices();
		this.servicesSelected = [];
		this.json={};
		this.data = [];
		this.pos = {};

		this.responseData = null;

		this.getData();
		
		this.FORMDATA = new FormData();

		$("#telefonoClient").mask('000-0000');
		$("#telefonoNegocio2").mask('000-0000');
		$("#telefonoNegocio3").mask('000-0000');
		$("#rifClient").mask('000000000');
		$("#rifNegocio").mask('000000000');
		$("#zonaPostalNegocio").mask('000000000');

		// $("#rifClient").mask('C-SSSSSSSSS',{translation:{'C':{pattern: /[J|V|E|P|G]/ig},'S':{pattern: /[0-9]/}}});
		// $("#rifNegocio").mask('C-SSSSSSSSS',{translation:{'C':{pattern: /[J|V|E|P|G]/ig},'S':{pattern: /[0-9]/}}});
	}
	app.PreafiliacionComponent.prototype.getData = function(){
		
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null || this.active.queryParams!=undefined){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null || this.active!=undefined){
						if(this.active.queryParams._value.hasOwnProperty('type')){
							if(this.active.queryParams._value.type!=null || this.active.queryParams._value.type!=undefined){
								this.type = this.active.queryParams._value.type;
							}
						}
						if(this.type === "pos"){
							this.pos = {};
							if(this.active.queryParams._value.hasOwnProperty('id')){
								if(this.active.queryParams._value.id!=null || this.active.queryParams._value.id!=undefined){
									this.pos.id = this.active.queryParams._value.id;
								}
							}
							if(this.active.queryParams._value.hasOwnProperty('name')){
								if(this.active.queryParams._value.name!=null || this.active.queryParams._value.name!=undefined){
									this.pos.product = this.active.queryParams._value.name;
								}
							}
							if(this.active.queryParams._value.hasOwnProperty('price')){
								if(this.active.queryParams._value.price!=null || this.active.queryParams._value.price!=undefined){
									this.pos.price = parseFloat(this.active.queryParams._value.price);
								}
							}
						}
						
					}
				}
			}
		}
	}
	app.PreafiliacionComponent.prototype.changeCount = function(value){
		if(this.count<=1){
			if(value==1){
				this.count++
				return
			}else{
				this.count=1;
				return
			}
		}
		if(this.count>=10){
			if(value==0){
				this.count--
				return
			}else{
				this.count=10;
				return
			}
		}
		if(value==0){
			this.count--
			return
		}
		if(value==1){
			this.count++
			return
		}
		
	}
	app.PreafiliacionComponent.prototype.descargarContrato=function(){
		if(this.type==='pos'){
			return downloadFile('assets/resources/pos.pdf', 'Contrato POS 2022', 'pdf');
		}
		if(this.type==='recaudacion'){
			return downloadFile('assets/resources/recaudacion.pdf', 'Contrato Recaudación 2022', 'pdf');
		}
	}
	app.PreafiliacionComponent.prototype.venezuelaData = function(){
		return this.venezuela;
	}
	
	app.PreafiliacionComponent.prototype.estadoSelectedFunction = function(state){
		this.estado = this.venezuela.filter(st => st.estado === state ? st : false)[0];
		this.ciudad=null;
		this.ciudadSelected="Ciudad...";
		this.municipio=null;
		this.municipioSelected="Municipio...";
		if(!(this.estado==null || this.estado=='Estado...' || this.estado=='null')){
			document.getElementById('estado').classList.remove('is-invalid');
			document.getElementById('estado').classList.add('is-valid');
			this.ciudad = state === 'Distrito Capital' ? [this.estado.capital] : this.estado.ciudades;
			if(this.ciudad[0] === 'CARACAS' || this.ciudad.length==1){
				this.ciudadSelectedFunction(this.ciudad[0]);
			}
		}
	}
	app.PreafiliacionComponent.prototype.ciudadSelectedFunction = function(city){
		this.municipio=null;
		this.municipioSelected="Municipio...";

		if(!(city==null || city=='Ciudad...' || city=='null')){
			document.getElementById('ciudadSelected').classList.remove('is-invalid');
			document.getElementById('ciudadSelected').classList.add('is-valid');
			this.ciudadSelected = city;
			this.municipio = this.estado.municipios.filter(mun => city === mun.capital ? mun : city === 'Caracas' ? mun : false);
		}
	}
	app.PreafiliacionComponent.prototype.municipioSelectedFunction = function(mun){
		if(!(mun==null || mun=="Municipio..." || mun==null)){
			document.getElementById('municipioSelected').classList.remove('is-invalid');
			document.getElementById('municipioSelected').classList.add('is-valid');
			this.municipioSelected = mun;
		}
	}
	app.PreafiliacionComponent.prototype.keypressValidateInput = function(element, prop=null, length=null, regex=null){
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
					element.value = element.value.match(/[0-9]/g).join("");
					if(!/(^[0-9]{4,9}$)/.test(element.value)){
						element.classList.add('is-invalid');
						return
					}
				}
			}
			
			element.classList.remove('is-invalid');
			element.classList.add('is-valid');
			
		}
	}

	app.PreafiliacionComponent.prototype.validateInput = function(element, prop=null, length=null, regex=null){
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
					if(!(/^[V|J|C|E|G|P|R|F|I][0-9]{4,9}$/.test(result))){
						return false
					}
				}
			}
			return true
		}
	}
	
	app.PreafiliacionComponent.prototype.checked = function(element){
		element.classList.remove('is-invalid');
		element.classList.add('is-valid');
		this.retiroOficina=true;
	}
	// app.PreafiliacionComponent.prototype.openModalConditions = function(){
	// 	if(this.type==="recaudacion"){
	// 		if(!this.conditions){
	// 			this.conditions2 = false;
	// 			$("#modalConditions").modal("show");
	// 		}
	// 	}
	// }
	app.PreafiliacionComponent.prototype.changeConditions = function(){
		if(this.type==="recaudacion"){
			this.conditions = false;
		}
	}
	app.PreafiliacionComponent.prototype.acceptConditions = function(){
		if(this.conditions2){
			$("#modalConditions").modal("hide");
		}else{
			document.getElementById("conditions2").classList.add("is-invalid");
		}
	}
app.PreafiliacionComponent.prototype.tipoLineaNegocioFunction = function(element){
	if(element!=null){
		element.classList.remove('is-invalid');
		element.classList.add('is-valid');
	}
}
app.PreafiliacionComponent.prototype.actividadNegocioFunction = function(element){
	if(element!=null && element!="seleccione una actividad económica..."){
		element.classList.remove('is-invalid');
		element.classList.add('is-valid');
	}else{
		element.classList.add('is-invalid');
	}
	if(element.value==="OTROS"){
		this.actividadOtrosBoolean=true;
		return
	}
	this.actividadOtrosBoolean=false;
}
	app.PreafiliacionComponent.prototype.formClient = function() {
		this.json={};
		this.json.app_id = this.ser.appId;
		if(this.userNameClient===null || this.userNameClient===undefined || this.userNameClient===""){
			document.getElementById('userNameClient2').innerText = 'Por favor ingrese tu nombre y apellido';
			document.getElementById('userNameClient').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.userNameClient, 'string', 4, null)){
				document.getElementById('userNameClient2').innerText = 'Por favor ingrese tu nombre y apellido válido';
				document.getElementById('userNameClient').classList.add('is-invalid');
				return;
			}
		}
		this.json.client_business_name=this.userNameClient.toUpperCase().trim();
		this.json.client_name=this.userNameClient.toUpperCase().trim();

		if(this.rifClient===null || this.rifClient===undefined || this.rifClient===""){
			document.getElementById('rifClient2').innerText = 'Por favor ingrese un rif/ci válido ejemplo: 12345678';
			document.getElementById('rifClient').classList.add('is-invalid');
			return;
		}else{
			if(!/^[V|J|C|E|G|P|R|F|I][0-9]{4,9}$/ig.test(this.rifClient)){
				document.getElementById('rifClient2').innerText = 'Por favor ingrese un rif válido ejemplo: 12345678';
				document.getElementById('rifClient').classList.add('is-invalid');
				return;
			}
		}
		this.json.client_id_doc_type = this.typeRif.trim();
		this.json.client_id_doc=this.typeRif+(this.rifClient.padStart(9,0)).trim();

		let phone;

		if(this.telefonoClient===null || this.telefonoClient===undefined || this.telefonoClient===""){
			document.getElementById('telefonoClient2').innerText = 'Por favor ingrese un número de teléfono válido';
			document.getElementById('telefonoClient').classList.add('is-invalid');
			return;
		}else{
			if(this.telefonoClient.length>7){
				this.telefonoClient = this.telefonoClient.match(/[0-9]+/g).join("");
			}
			phone = (this.typeTelefonoClient+this.telefonoClient).match(/[0-9]{10}/g).join("");
			
			if((!this.validateInput(phone, 'string', null, 'phone'))){
				document.getElementById('telefonoClient2').innerText = 'Por favor ingrese un número de teléfono válido';
				document.getElementById('telefonoClient').classList.add('is-invalid');
				return;
			}
		}
		this.json.client_phone=phone;

		if(this.emailClient===null || this.emailClient===undefined || this.emailClient===""){
			document.getElementById('emailClient2').innerText = 'Por favor ingrese un correo electrónico válido';
			document.getElementById('emailClient').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.emailClient, 'string', null, 'email')){
				document.getElementById('emailClient2').innerText = 'Por favor ingrese un correo electrónico válido';
				document.getElementById('emailClient').classList.add('is-invalid');
				return;
			}
		}
		this.json.client_email=this.emailClient;
		if(this.type === 'pay-button'){
			this.json.programmer = this.programmer;
		}
		if(this.type === "recaudacion"){
			if(this.servicesSelected==null || this.servicesSelected == undefined || this.servicesSelected.length == 0){
				this.listServices.filter((item,i) => {
					document.getElementById('item_'+(i+1)).classList.add('is-invalid');
				})
				return;
			}else{
				this.listServices.filter((item,i) => {
					if(this.servicesSelected.length!=0){
						document.getElementById('item_'+(i+1)).classList.remove('is-invalid');
					}
				})
				this.json.service = this.servicesSelected;
			}	
		}
		if(this.type==="pos"){
			this.json.retiroOficina=this.retiroOficina;
		}
		this.form1=false;
		this.form2=true;
		this.class1 = this.form1 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class2 = this.form2 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
	}


	app.PreafiliacionComponent.prototype.formNegocio = function(param){
		if(param){
			if(param === 'regresar'){
				this.form2=false;
				this.form1=true;
				this.class2 = this.form2 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				this.class1 = this.form1 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				return
			}
		}
		if(this.nombreNegocio===null || this.nombreNegocio===undefined || this.nombreNegocio===""){
			document.getElementById('nombreNegocio2').innerText = 'Por favor ingrese el nombre del negocio';
			document.getElementById('nombreNegocio').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.nombreNegocio, 'string', 4, null)){
				document.getElementById('nombreNegocio2').innerText = 'Por favor ingrese un nombre de negocio válido';
				document.getElementById('nombreNegocio').classList.add('is-invalid');
				return;
			}
		}
		this.json.company_name=this.nombreNegocio.toUpperCase().trim();

		if(this.rifNegocio===null || this.rifNegocio===undefined || this.rifNegocio===""){
			document.getElementById('rifNegocio2').innerText = 'Por favor ingrese un rif/ci válido ejemplo: 12345678';
			document.getElementById('rifNegocio').classList.add('is-invalid');
			return;
		}else{
			if(!/^[V|J|C|E|G|P|R|F|I][0-9]{4,9}$/ig.test(this.rifNegocio)){
				document.getElementById('rifNegocio2').innerText = 'Por favor ingrese un rif/ci válido ejemplo: 12345678';
				document.getElementById('rifNegocio').classList.add('is-invalid');
				return;
			}
		}
		this.json.company_id_doc_type=this.typeRifNegocio.trim();
		this.json.company_id_doc=this.typeRifNegocio+(this.rifNegocio.padStart(9,0)).trim();

		if(this.actividadNegocio===null || this.actividadNegocio===undefined || this.actividadNegocio==="" || this.actividadNegocio==="SELECCIONE UNA ACTIVIDAD ECONÓMICA..."){
			document.getElementById('actividadNegocio2').innerText = 'Por favor selecciona una actividad económica';
			document.getElementById('actividadNegocio').classList.add('is-invalid');
			return;
		}else{
			if(this.actividadOtrosBoolean){
				if(this.actividadOtros===null || this.actividadOtros===undefined || this.actividadOtros==="" || this.actividadOtros==="SELECCIONE UNA ACTIVIDAD ECONÓMICA..."){
					document.getElementById('actividadOtros2').innerText = 'Por favor ingrese una actividad económica';
					document.getElementById('actividadOtros').classList.add('is-invalid');
					return;
				}
				this.json.company_activity=this.actividadOtros.toUpperCase().trim();
			}else{
				this.json.company_activity=this.actividadNegocio.toUpperCase().trim();
			}
		}
		if(this.emailCompany===null || this.emailCompany===undefined || this.emailCompany===""){
			document.getElementById('emailCompany2').innerText = 'Por favor ingrese un correo electrónico válido';
			document.getElementById('emailCompany').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.emailCompany, 'string', null, 'email')){
				document.getElementById('emailCompany2').innerText = 'Por favor ingrese un correo electrónico válido';
				document.getElementById('emailCompany').classList.add('is-invalid');
				return;
			}
		}
		this.json.company_email=this.emailCompany.trim();
		
		this.form2=false;
		this.form3=true;
		this.class2 = this.form2 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class3 = this.form3 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		
	}


	app.PreafiliacionComponent.prototype.formNegocioDireccion = function(param){
		this.json.store_address = {};
		this.json.store_name = this.json.company_name;
		this.json.store_address.name = this.json.company_name;
		
		if(param){
			if(param === 'regresar'){
				this.form3=false;
				this.form2=true;
				this.class3 = this.form3 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				this.class2 = this.form2 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				return
			}
		}
		if(this.addressNegocio===null || this.addressNegocio===undefined || this.addressNegocio===""){
			document.getElementById('addressNegocio2-1').innerText = 'Por favor ingrese la dirección del negocio';
			document.getElementById('addressNegocio').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.addressNegocio, 'string', 4, null)){
				document.getElementById('addressNegocio2-1').innerText = 'Por favor ingrese la dirección del negocio';
				document.getElementById('addressNegocio').classList.add('is-invalid');
				return;
			}
		}
		this.json.store_address.sub_locality1=this.addressNegocio.toUpperCase();
		this.json.sub_locality1=this.addressNegocio.toUpperCase().trim();
		
		if(this.addressNegocio2===null || this.addressNegocio2===undefined || this.addressNegocio2===""){
			document.getElementById('addressNegocio2-2').innerText = 'Por favor ingrese la dirección del negocio';
			document.getElementById('addressNegocio2').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.addressNegocio2, 'string', 4, null)){
				document.getElementById('addressNegocio2-2').innerText = 'Por favor ingrese la dirección del negocio';
				document.getElementById('addressNegocio2').classList.add('is-invalid');
				return;
			}
		}
		this.json.store_address.sub_locality2=this.addressNegocio2.toUpperCase();
		this.json.sub_locality2=this.addressNegocio2.toUpperCase().trim();

		if(this.addressNegocio3===null || this.addressNegocio3===undefined || this.addressNegocio3===""){
			document.getElementById('addressNegocio3-1').innerText = 'Por favor ingrese la dirección del negocio';
			document.getElementById('addressNegocio3').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.addressNegocio3, 'string', 2, null)){
				document.getElementById('addressNegocio3-1').innerText = 'Por favor ingrese la dirección del negocio';
				document.getElementById('addressNegocio3').classList.add('is-invalid');
				return;
			}
		}
		this.json.store_address.sub_locality3=this.addressNegocio3.toUpperCase().trim();
		this.json.sub_locality3=this.addressNegocio3.toUpperCase().trim();
		
		if(this.addressNegocio4===null || this.addressNegocio4===undefined || this.addressNegocio4===""){
			document.getElementById('addressNegocio4-1').innerText = 'Por favor ingrese la dirección del negocio';
			document.getElementById('addressNegocio4').classList.add('is-invalid');
			return;
		}else{
			if(!this.validateInput(this.addressNegocio4, 'string', 4, null)){
				document.getElementById('addressNegocio4-1').innerText = 'Por favor ingrese la dirección del negocio';
				document.getElementById('addressNegocio4').classList.add('is-invalid');
				return;
			}
		}
		this.json.store_address.sub_locality4=this.addressNegocio4.toUpperCase();
		this.json.sub_locality4=this.addressNegocio4.toUpperCase().trim();

		if(this.estadoSelected===null || this.estadoSelected===undefined || this.estadoSelected==="null" || this.estadoSelected==="Estado..."){
			document.getElementById('estado2').innerText = 'Por favor ingrese el estado del negocio';
			document.getElementById('estado').classList.add('is-invalid');
			return;
		}
		this.json.state=this.estadoSelected.toUpperCase().trim();		
		this.json.store_address.state=this.estadoSelected.toUpperCase().trim();

		if(this.ciudadSelected===null || this.ciudadSelected===undefined || this.ciudadSelected==="null" || this.ciudadSelected==="Ciudad..."){
			document.getElementById('ciudadSelected2').innerText = 'Por favor ingrese la ciudad del negocio';
			document.getElementById('ciudadSelected').classList.add('is-invalid');
			return;
		}

		this.json.city=this.ciudadSelected.toUpperCase().trim();	
		this.json.store_address.city=this.ciudadSelected.toUpperCase().trim();

		if(!(this.municipioSelected===null || this.municipioSelected===undefined || this.municipioSelected==="null" || this.municipioSelected==="Municipio...")){
			this.json.store_address.locality=this.municipioSelected.toUpperCase();
			this.json.locality=this.municipioSelected.toUpperCase();
		}else{
			this.json.locality="";
		}
		let phone
		if(this.telefonoNegocio2===null || this.telefonoNegocio2===undefined || this.telefonoNegocio2===""){
			document.getElementById('telefonoNegocio2-1').innerText = 'Por favor ingrese el teléfono del negocio';
			document.getElementById('telefonoNegocio2').classList.add('is-invalid');
			return;
		}else{
			
			if(this.telefonoNegocio2.length>7){
				this.telefonoNegocio2 = this.telefonoNegocio2.match(/[0-9]+/g).join("");
			}
			phone = (this.typeTelefonoNegocio2+this.telefonoNegocio2).match(/[0-9]{10}/g).join("");
			
			if(!this.validateInput(phone, 'string', null, 'phone')){
				document.getElementById('telefonoNegocio2-1').innerText = 'Por favor ingrese el teléfono del negocio';
				document.getElementById('telefonoNegocio2').classList.add('is-invalid');
				return;
			}
		}
		this.json.company_phone=phone;

		if(!(this.telefonoNegocio3===null || this.telefonoNegocio3===undefined || this.telefonoNegocio3==="")){
			if(this.telefonoNegocio3.length>7){
				this.telefonoNegocio3 = this.telefonoNegocio3.match(/[0-9]+/g).join("");
			}
			let phone = (this.typeTelefonoNegocio3+this.telefonoNegocio3).match(/[0-9]{10}/g).join("");

			if(!this.validateInput(phone, 'string', null, 'phone')){
				document.getElementById('telefonoNegocio3-1').innerText = 'Por favor ingrese el teléfono del negocio';
				document.getElementById('telefonoNegocio3').classList.add('is-invalid');
				return;
			}
			
			this.json.company_phone_2=phone;
		}else{
			document.getElementById('telefonoNegocio3').classList.remove('is-invalid');
			document.getElementById('telefonoNegocio3').classList.remove('is-valid');
		}
		
		if(!(this.zonaPostalNegocio===null || this.zonaPostalNegocio===undefined || this.zonaPostalNegocio==="")){
			this.json.company_postal_zone=this.zonaPostalNegocio.trim();
			this.json.store_address.postal_code=this.zonaPostalNegocio.trim();
		}

		if(this.type != "recaudacion"){
			if(this.tipoLineaNegocio===null || this.tipoLineaNegocio===undefined || this.tipoLineaNegocio==="" || this.tipoLineaNegocio==="SELECCIONE LINEA DE TELEFONIA CELULAR..."){
				document.getElementById('tipoLineaNegocio2').innerText = 'Por favor selecciona el tipo de linea';
				document.getElementById('tipoLineaNegocio').classList.add('is-invalid');
				return;
			}
			this.json.company_line_type=this.tipoLineaNegocio.toUpperCase().trim();
		}

		this.form3=false;
		this.form4=true;

		this.class3 = this.form3 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class4 = this.form4 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'

	}
	
	app.PreafiliacionComponent.prototype.finally = function(param){
		this.FORMDATA = new FormData();

		if(param){
			if(param === 'regresar'){
				this.form4=false;
				this.form3=true;
				this.class4 = this.form4 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				this.class3 = this.form3 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				return
			}
		}
		if(this.rifNegocioPdf===null || this.rifNegocioPdf===undefined || this.rifNegocioPdf===""){
			document.getElementById('rifNegocioPdf').classList.add('is-invalid');
			return;
		}
		this.json.rifNegocioPdf=(document.getElementById('rifNegocioPdf').files[0].name);
		this.FORMDATA.append('filename', document.getElementById('rifNegocioPdf').files[0]);


		if(this.cedula===null || this.cedula===undefined || this.cedula===""){
			document.getElementById('cedula').classList.add('is-invalid');
			return;
		}
		this.json.cedula=(document.getElementById('cedula').files[0].name);
		this.FORMDATA.append('filename2', document.getElementById('cedula').files[0]);

		if(this.registroMercantil===null || this.registroMercantil===undefined || this.registroMercantil===""){
			document.getElementById('registroMercantil').classList.add('is-invalid');
			return;
		}
		this.json.registroMercantil=(document.getElementById('registroMercantil').files[0].name);
		this.FORMDATA.append('filename3', document.getElementById('registroMercantil').files[0]);

		if(this.type=='pos' || this.type=='recaudacion'){
			// if(this.contratoServicio===null || this.contratoServicio===undefined || this.contratoServicio===""){
			// 	document.getElementById('contratoServicio').classList.add('is-invalid');
			// 	return;
			// }
			// this.json.contratoServicio=(document.getElementById('contratoServicio').files[0].name);
			// this.FORMDATA.append('filename4', document.getElementById('contratoServicio').files[0]);
		if(this.type==='pos'){
			if(this.refBancaria===null || this.refBancaria===undefined || this.refBancaria===""){
				document.getElementById('refBancaria').classList.add('is-invalid');
				return;
			}
			this.json.refBancaria=(document.getElementById('refBancaria').files[0].name);
			this.FORMDATA.append('filename5', document.getElementById('refBancaria').files[0]);

			if(this.refPersonal===null || this.refPersonal===undefined || this.refPersonal===""){
				document.getElementById('refPersonal').classList.add('is-invalid');
				return;
			}
			this.json.refPersonal=(document.getElementById('refPersonal').files[0].name);
			this.FORMDATA.append('filename5', document.getElementById('refPersonal').files[0]);
		}
			
		}
		if(!(this.logoEmpresa == null || this.logoEmpresa == undefined || this.logoEmpresa == "")){
			this.json.logoEmpresa=(document.getElementById('logoEmpresa').files[0].name);
			this.FORMDATA.append('filename5', document.getElementById('logoEmpresa').files[0]);
		}

		if(this.contribuyenteEspecial===null || this.contribuyenteEspecial===undefined || this.contribuyenteEspecial==="" || this.contribuyenteEspecial===false){
			this.contribuyenteEspecial=false;
		}
		this.json.contribuyenteEspecial=this.contribuyenteEspecial;

		this.form4=false;
		this.form5=true;

		this.class4 = this.form4 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
		this.class5 = this.form5 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'

		let json2 = {};
		
		json2.app_id = this.ser.appId;
		json2.type = this.type === "pos" ? "POS": "SERVICE_PAY";
		

		json2.client_id_doc_type = "CI"
		json2.client_id_doc = this.json.client_id_doc;
		json2.store_name = this.json.store_name;
		json2.client_business_name = this.json.client_business_name.toUpperCase();
		json2.client_name = this.json.client_name.toUpperCase();
		json2.client_email = this.json.client_email;
		json2.client_phone = this.json.client_phone.length > 10 ? this.json.client_phone.match(/[0-9]{10}/g).join("") : this.json.client_phone;

		json2.company_name = this.json.company_name;
		json2.company_id_doc_type = "RIF"
		json2.company_id_doc = this.json.company_id_doc;
		json2.company_email = this.emailCompany;
		json2.company_phone = this.json.company_phone.length > 10 ? this.json.company_phone.match(/[0-9]{10}/g).join("") : this.json.company_phone;
		json2.company_activity = this.json.company_activity;
		json2.special_taxpayer = this.contribuyenteEspecial;

		json2.store_address = this.json.store_address;
		if(this.type=="pos"){
			if(!(this.pos==null || this.pos==undefined || this.pos=="null")){
				this.pos.count = this.count;
				json2.pos_body=this.pos;
			}
		}
		if(this.type=="recaudacion"){
			if(this.json.service!=undefined || this.json.service!=null){
				json2.service_pay_body = {};
				json2.service_pay_body.services = this.json.service.map(x => x.value);
			}
		}
		this.FORMDATA.append('user_petition', JSON.stringify(json2));

		let json3 = {};

		json3.weight = 1;
		json3.channel = "WEB";
		json3.title = "CONTACTAR CON UN ASESOR DEL AREA";
		json3.source_type = this.type === 'recaudacion' ? "SERVICE_PAY": "POS";
		json3.client_id_doc = this.json.client_id_doc;
		json3.client_business_name = this.json.client_business_name.toUpperCase();
		json3.client_name = this.json.client_name.toUpperCase();
		json3.client_email = this.json.client_email;
		json3.client_phone = this.json.client_phone.length > 10 ? this.json.client_phone.match(/[0-9]{10}/g).join("") : this.json.client_phone;
		json3.company_id_doc = this.json.company_id_doc;
		json3.company_email = this.emailCompany;
		json3.company_name = this.json.company_name;
		json3.company_phone = this.json.company_phone.length > 10 ? this.json.company_phone.match(/[0-9]{10}/g).join("") : this.json.company_phone;
		json3.company_activity = this.json.company_activity;
		json3.issue_template_id = this.type === 'recaudacion' ? this.request_id("service_pay"): this.request_id("pos");
		
		json3.estimated_time_resolution=1;
		json3.time_unit="DAYS";
		json3.description_markdown="PREAFILIACION NUEVO CLIENTE";
		// json3.description_html="PREAFILIACION NUEVO CLIENTE";
		if(json3.issue_template_id==null || json3.issue_template_id==undefined || json3.issue_template_id==""){
			$("#modalFailed").modal("show");
			return;
		}
		this.FORMDATA.append('issue', JSON.stringify(json3));
		
	}
	app.PreafiliacionComponent.prototype.regresarFinally=function(param){
		if(param){
			if(param === 'regresar'){
				this.form5=false;
				this.form4=true;
				this.class5 = this.form5 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				this.class4 = this.form4 ? 'container-fluid p-5 position-relative top-0 left-0 transition-all visible' : 'container-fluid  p-5 position-absolute top-0 left-0 transition-all invisible transform-left'
				return
			}
		}
	}
	app.PreafiliacionComponent.prototype.request_id = function(value){
		return id_user_petition(value)
	}
	app.PreafiliacionComponent.prototype.sendData=function(){
		let headers = {"X-paguetodo-id": this.ser.paguetodoId3,"app-id": this.ser.appId};
		let type = this.type === 'recaudacion' ? "SERVICE_PAY": "POS";
		let querys = `?issue_template_id=${this.issue_template_id}&type=${type}`;
		// if(!this.conditions){
		// 	document.getElementById('conditions').classList.add('is-invalid');
		// 	return;
		// }
		
		let mensajeAll = "No se pudo procesar la preafiliación";
		$("#pleaseWait").modal("show");

		let request = this.ser.callServicesHttp("ticket-post", querys, this.FORMDATA, headers);
		request.subscribe(data => {
			if (data == null || data == undefined || data == "") {
				$("#pleaseWait").modal("hide");
				$("#modalFailed").modal("show");
			} else {
				if (data.status_http == 200) {
					this.responseData = data;
					$("#pleaseWait").modal("hide");
					
					this.router.navigate(['/ticket'], {queryParams: this.formattedDataSend(data) });
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
	app.PreafiliacionComponent.prototype.formattedDataSend=function(data){
		if(data == null || data == undefined || data == ''){
			$("#pleaseWait").modal("hide");
			$("#modalFailed").modal("show");
			return;
		}
		const obj = {};

		if(data.hasOwnProperty('external_id')){
			if(data.external_id!=null || data.external_id!=undefined){
				obj.external_id = data.external_id;
			}
		}
		if(data.hasOwnProperty('type')){
			if(data.type!=null || data.type!=undefined){
				obj.type = data.type;
			}
		}
		if(data.hasOwnProperty('status')){
			if(data.status!=null || data.status!=undefined){
				obj.status = data.status;
			}
		}
		if(data.hasOwnProperty('title')){
			if(data.title!=null || data.title!=undefined){
				obj.title = data.title;
			}
		}
		if(data.hasOwnProperty('type')){
			if(data.type!=null || data.type!=undefined){
				obj.type = data.type;
			}
		}
		if(data.hasOwnProperty('client_id_doc')){
			if(data.client_id_doc!=null || data.client_id_doc!=undefined){
				obj.client_id_doc = data.client_id_doc;
			}
		}
		if(data.hasOwnProperty('client_business_name')){
			if(data.client_business_name!=null || data.client_business_name!=undefined){
				obj.client_business_name = data.client_business_name;
			}
		}
		if(data.hasOwnProperty('client_phone')){
			if(data.client_phone!=null || data.client_phone!=undefined){
				obj.client_phone = data.client_phone;
			}
		}
		if(data.hasOwnProperty('client_email')){
			if(data.client_email!=null || data.client_email!=undefined){
				obj.client_email = data.client_email;
			}
		}
		if(data.hasOwnProperty('service_pay_body')){
			if(data.service_pay_body!=null || data.service_pay_body!=undefined){
				if(data.service_pay_body.services!=null || data.service_pay_body.services!=undefined){
					obj.service_pay_body = JSON.stringify(data.service_pay_body.services);
				}
			}
		}
		if(data.hasOwnProperty('pos_body')){
			if(data.pos_body!=null || data.pos_body!=undefined){
				if(data.pos_body.product!=null || data.pos_body.product!=undefined){
					obj.product = data.pos_body.product;
				}
				if(data.pos_body.price!=null || data.pos_body.price!=undefined){
					obj.price = data.pos_body.price;
				}
				if(data.pos_body.count!=null || data.pos_body.count!=undefined){
					obj.count = data.pos_body.count;
				}
			}
		}
		return obj;
	}
	app.PreafiliacionComponent.prototype.checkFile = function(element) { 
		if(element!=null || element!=undefined){
			if(element.files[0]!=null || element.files.length>0 || element.files[0]!=undefined){
				var validExts = ["application/pdf"]; 
				var fileExt = element.files[0].type; 
				if (validExts.indexOf(fileExt) < 0) { 
					element.value='';
					element.classList.remove('is-valid');
					element.classList.add('is-invalid');
					return false; 
				} else {
					element.classList.remove('is-invalid');
					element.classList.add('is-valid');
					return true; 
				}
			}else{
				element.classList.add('is-invalid');
			}
		}
	}
	app.PreafiliacionComponent.prototype.clean=function(param){
		if(param === "form1"){
			this.userNameClient = null;
			this.typeRif = "V";
			this.rifClient = null;
			this.typeTelefonoClient="414";
			this.telefonoClient = null;
			this.emailClient = null;
			this.retiroOficina=true;
			this.servicesSelected=[];
			document.getElementById('userNameClient').classList.add('is-invalid');
			document.getElementById('rifClient').classList.add('is-invalid');
			document.getElementById('telefonoClient').classList.add('is-invalid');
			document.getElementById('emailClient').classList.add('is-invalid');
			if(this.type==="pos"){
				this.count=1;
			}
			if(this.type==="recaudacion"){
				this.listServices.filter((item,i) => {
					document.getElementById('item_'+(i+1)).checked = false;
				})
			}
		}
		if(param === "form2"){
			this.nombreNegocio=null;
			this.typeRifNegocio="J";
			this.rifNegocio=null;
			this.actividadNegocio="SELECCIONE UNA ACTIVIDAD ECONÓMICA...";
			this.actividadOtrosBoolean=false;
			this.emailCompany=null;
			document.getElementById('nombreNegocio').classList.add('is-invalid');
			document.getElementById('rifNegocio').classList.add('is-invalid');
			document.getElementById('actividadNegocio').classList.add('is-invalid');
			document.getElementById('actividadOtros').classList.add('is-invalid');
			document.getElementById('emailCompany').classList.add('is-invalid');

		}
		if(param === "form3"){
			this.addressNegocio=null;
			this.addressNegocio2=null;
			this.addressNegocio3=null;
			this.addressNegocio4=null;
			this.estado=null;
			this.estadoSelected="estado...";
			this.ciudad=null;	
			this.ciudadSelected="ciudad...";	
			this.municipio=null;		
			this.municipioSelected="municipio...";		
			this.typeTelefonoNegocio2="0414";
			this.telefonoNegocio2=null;
			this.typeTelefonoNegocio3="0212";
			this.telefonoNegocio3=null;
			this.zonaPostalNegocio=null;
			this.tipoLineaNegocio="SELECCIONE LINEA DE TELEFONIA CELULAR...";
			this.codigoVendedor=null;

			document.getElementById('addressNegocio').classList.add('is-invalid');
			document.getElementById('addressNegocio2').classList.add('is-invalid');
			document.getElementById('addressNegocio3').classList.add('is-invalid');
			document.getElementById('addressNegocio4').classList.add('is-invalid');
			document.getElementById('estado').classList.add('is-invalid');
			document.getElementById('ciudadSelected').classList.add('is-invalid');
			document.getElementById('telefonoNegocio2').classList.add('is-invalid');
			document.getElementById('tipoLineaNegocio').classList.add('is-invalid');


		}
		if(param === "form4"){
			this.rifNegocioPdf=null;
			this.cedula=null;
			this.registroMercantil=null;
			this.contratoServicio=null;
			this.refBancaria=null;
			this.refPersonal=null;
			this.logoEmpresa=null;
			this.contribuyenteEspecial=false;
			this.checkFile(document.getElementById('rifNegocioPdf'))
			this.checkFile(document.getElementById('cedula'))
			this.checkFile(document.getElementById('registroMercantil'))
			this.checkFile(document.getElementById('contratoServicio'))
			this.checkFile(document.getElementById('refBancaria'))
			this.checkFile(document.getElementById('refPersonal'))
			
		}
	}
	
	app.PreafiliacionComponent.prototype.callServiceFile=function(formData){
		var request=this.ser.callServicesHttp('ticket-adjuntar',null,formData);
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					delete data['status_http'];
					this.sendService(parametros);
				}else{
					this.mensaje=this.ser.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.PreafiliacionComponent.prototype.sendService=function(parametros){
		let request=null;
		let mensajeAll="Error al guardar ticket"
		request=this.ser.callServicesHttp('ticket-post',null,parametros);
		
		request.subscribe(data => {
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					if(this.save){
						this.mensaje="Ticket guardado con éxito";
					}else{
						this.mensaje="Ticket actualizado con éxito";
					}
					this.msg.info();
				}else{
					this.mensaje=this.ser.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		},err => {
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.PreafiliacionComponent.prototype.addDataServices = function(data){
		if(!(data==null || data==undefined || data=="")){
			this.listServices.filter((x,i) => document.getElementById('item_'+(i+1)).classList.remove('is-invalid'))
			
			let service = this.servicesSelected.find(x => x.value === data.value);
			if(service==null || service==undefined){
				this.servicesSelected.push(data)
			}else{
				this.servicesSelected = this.servicesSelected.flatMap(x => x.value === data.value ? [] : x);
			}
		}
	}
	app.PreafiliacionComponent.prototype.ngOnDestroy = () => {

	}
	app.PreafiliacionComponent.prototype.back=function(){
		window.history.back();
	}

})(window.app || (window.app = {}));
