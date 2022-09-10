(function(app) {
	app.NavbarComponent =
		ng.core.Component({
		selector: 'navbar',
		templateUrl: 'views/navbar.html',
		inputs:["className"],
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        	function(router,active) {
					this.router=router;
					this.active=active;
        	}]
		});
	app.NavbarComponent.prototype.ngOnInit=function(){
		this.valueNav = false;
		this.toggleBar();
		$('body').removeClass('modal-open');
		$('body').addClass('no-backdrop');
		$('.modal-backdrop').remove();
		document.getElementById('menuBar').style.margin='-60%';
		document.getElementById('menuBar').style.visibility='hidden';
		document.getElementById('background').style.visibility='hidden';
		document.getElementById('background').style.opacity=0;
		document.getElementById('menuBar').style.opacity=0;
		document.getElementById('menu-container').style.visibility='hidden';
	}
	
	app.NavbarComponent.prototype.menuToggle = (value) => {
			if(value){
				document.getElementById('menu-container').style.visibility='visible';
				document.getElementById('background').style.visibility='visible';
				document.getElementById('background').style.opacity=1;
				document.getElementById('menuBar').style.visibility='visible';
				document.getElementById('menuBar').style.opacity=1;
				document.getElementById('menuBar').style.margin='0';
				return;
			}
			document.getElementById('menuBar').style.margin='-60%';
			document.getElementById('menuBar').style.visibility='hidden';
			document.getElementById('background').style.visibility='hidden';
			document.getElementById('background').style.opacity=0;
			document.getElementById('menuBar').style.opacity=0;
			document.getElementById('menu-container').style.visibility='hidden';
			return;
	}
	app.NavbarComponent.prototype.toggleBar = function(){
		// this.classNav = this.className === "home" ? "p-2 nav navbar top-0 bg-gradient-2 mt-0 shadow-none transition-all": this.className === "other" ? "p-2 nav navbar top-0 bg-transparent mt-0 shadow-none" : "p-2 nav navbar bg-white top-0 mt-0 box-shadow"
		// this.mt5 = this.className === "home" ? "ptt-5 mb-2": this.className === "other" ? "ptt-5 mb-2" :"ptt-0 ";
		// this.logoEmpresa = this.className === "home" ? "logo-paguetodo-blanco.png": this.className === "other" ? "logo-paguetodo.png": "logo-paguetodo.png";
		// this.textDark = this.className === "home" ? "text-white": "text-dark";
		// this.bar = this.className === "home" ? 'bar text-white h3' :'bar text-color h3'
		
		this.classNav = "p-2 nav navbar top-0 bg-transparent mt-0 shadow-none";
		this.mt5 = "ptt-5";
		this.logoEmpresa = "logo-paguetodo.png";
		this.textDark = "text-dark";
		this.bar = "bar text-dark h3";

		window.addEventListener('scroll', ()=>{

			if(this.className === "home"){
				// if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
				// 	this.classNav = "nav navbar bg-white top-0 mt-0 fixed-top box-shadow p-2"
				// 	this.mt5 = "ptt-0";
				// 	this.logoEmpresa = "logo-paguetodo.png";
				// 	this.textDark = "text-dark";
				// 	this.bar = "bar text-color h3";
				// }else{
				// 	this.classNav = "p-2 nav navbar top-0 bg-gradient-2 mt-0 shadow-none";
				// 	this.mt5 = "ptt-5";
				// 	this.logoEmpresa = "logo-paguetodo-blanco.png";
				// 	this.textDark = "text-white";
				// 	this.bar = "bar text-white h3";
				// }
				if(document.body.scrollTop>140 || document.documentElement.scrollTop>140){
					this.classNav = "nav navbar bg-white top-0 mt-0 fixed-top box-shadow p-2 fixed-top"
					this.mt5 = "ptt-0";
					this.logoEmpresa = "logo-paguetodo.png";
					this.textDark = "text-dark";
					this.bar = "bar text-color h3";
				}else{
					this.classNav = "p-2 nav navbar top-0 bg-transparent mt-0 shadow-none";
					this.mt5 = "ptt-5";
					this.logoEmpresa = "logo-paguetodo.png";
					this.textDark = "text-dark";
					this.bar = "bar text-dark h3";
				}
			}else{
				if(document.body.scrollTop>140 || document.documentElement.scrollTop>140){
					this.classNav = "nav navbar bg-white top-0 mt-0 fixed-top box-shadow p-2 fixed-top"
					this.mt5 = "ptt-0";
					this.logoEmpresa = "logo-paguetodo.png";
					this.textDark = "text-dark";
					this.bar = "bar text-color h3";
				}else{
					this.classNav = "p-2 nav navbar top-0 bg-transparent mt-0 shadow-none";
					this.mt5 = "ptt-5";
					this.logoEmpresa = "logo-paguetodo.png";
					this.textDark = "text-dark";
					this.bar = "bar text-dark h3";
				}
			}
		});
	}
	
})(window.app || (window.app = {}));
