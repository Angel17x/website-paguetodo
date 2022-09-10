

(function(app) {
	app.PosComponent =
		ng.core.Component({
		selector: 'pos',
		templateUrl: 'views/pos.html',
	})
		.Class({
			constructor: [ng.router.Router,ng.router.ActivatedRoute,
        function(router,active) {
					this.router=router;
					this.active=active;
        }]
		});
	app.PosComponent.prototype.ngOnInit = function () {
		this.router.events.subscribe((evt) => {
			window.scrollTo(0, 0)
        });
		this.db = null
		this.dataSelected = null;
		this.interval=null;

		// AOS.init();

		fetch('assets/resources/db.json')
		.then(data => data.json())
		.then(data => this.db=data.puntos)
		.catch(err => console.log("problemas al obtener los dispositivos POS"));
	}
	app.PosComponent.prototype.pos = function() { 
		return this.db;
	}
	
	app.PosComponent.prototype.showPos = function(pos) {
		if(pos){
			let description = ``
			for(let desc in pos.details){
				description+=`<li class="text mt-1"><span class="text text-color text-bold text-capitalize">${desc=== "Descripcion"?"Descripción": desc}:</span> ${pos.details[desc]}</li>`
			}
			let templateImages = ``;
			pos.images.forEach((el,i) => templateImages+=`
			<div id="col-${i+1}" class="col-3 col-md-2 col-lg-2 border m-1 cursor-pointer parent">
				<img data-target="col-${i+1}" src="${el}" alt="image pos" class="img-fluid img-selected obj-fit w-100 h-100">
			</div>`)
			let template = `
				<div class="row d-flex flex-row justify-content-center">
					<div class="col-12 col-md-12 col-lg-6 pt-0">
						<div class="row d-flex flex-row d-flex justify-content-center align-items-stretch">
							<div class="col-12 text-center">
								<img src="${pos.images[0]}" alt="image pos" class="img-fluid h-manual obj-fit" id="imgView">
							</div>
							${templateImages}
						</div>
					</div>
					<div class="col-12 col-md-12 mt-md-4 col-lg-4 p-2 pt-0 text-sm-center text-md-start text-lg-start d-flex flex-column aling-items-center justify-content-start align-content-between">
						<div class="col-12 text-sm-center text-md-start text-lg-start mt-sm-5 mt-md-5 mt-lg-0">
							<h2 class="title-4 text-sm-center text-md-start text-lg-start">${pos.name}</h2>
							<label class="text"><span class="text text-color text-bold">Clasificación:</span> ${pos.type}</label>
							<ul class="text-sm-start text-md-start text-lg-start mt-2">
								${description}
							</ul>
							<p class="label text-sm-center text-md-start text-lg-start text text-bold"><span class="text-color">Precio:</span> ${pos.currency+pos.price}</p>
							<p class="text text-sm-center text-md-start text-lg-start"><span class="text text-color text-bold">Status:</span> ${pos.status}</p>
						</div>
					</div>
					<div class="col-12 text-sm-center text-md-start text-lg-start d-flex flex-row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end">
						<div class="row">
							<div class="btns col-12 col-md-6 col-lg-5 text-center d-flex flex-row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end">
								<button type="button" class="btn btn-primary text-center pt-2 pb-2 m-1" id="regresarPos" data-bs-dismiss="modal" aria-label="Close">Regresar</button>
							</div>
							<div class="btns col-12 col-md-6 col-lg-5 text-center d-flex flex-row justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end">
								<button type="button" class="btn btn-success text-center pt-2 pb-2 m-1" id="adquirirPos">Adquirir</button>
							</div>
						</div>
					</div>
				</div>
			`
			if(document.getElementById('container-pos')){
				document.getElementById('container-pos').innerHTML = template;
				let col = document.getElementById('col-1');
				col.classList.add('border-tab');
				document.querySelectorAll('.img-selected').forEach((el,i) => {
					el.onclick = (event) => this.selected(event, event.target.getAttribute('src'));
				})

				document.getElementById('adquirirPos').onclick = () => {
					$('#exampleModal').modal('hide');

					this.sendPos(pos)
				};
			}

		}
	}
	app.PosComponent.prototype.routerlink = function(route){
		$('#exampleModal').modal('hide');
		this.router.navigate([route]);
	}
	app.PosComponent.prototype.mouseOverFunction = function (target,images,value) {
		let cont = 0;
		if(value){
			this.interval = setInterval(() =>{
				cont++
	
				if(cont >= images.length){
					cont = 0;
				}
				target.setAttribute('src', images[cont])
			}, 500)
			return;
		}
		clearInterval(this.interval);
		target.setAttribute('src', images[0]);
		return;
	} 
	app.PosComponent.prototype.selected = function (event, url)  {
		let image = document.getElementById('imgView');
		image.setAttribute('src', url)
		let element = event.target.getAttribute('data-target');
		document.querySelectorAll('.parent').forEach(el => {
			if(el.getAttribute('id') === element){
				el.classList.add('border-tab')
			}
			if(el.getAttribute('id') != element){
				el.classList.remove('border-tab')
			}
		})
	}
	app.PosComponent.prototype.sendPos = function(pos){
		if(!(pos==null || pos==undefined || pos=="")){
			this.router.navigate(['/preafiliacion'], {queryParams:{ type: "pos", id: pos?.id, name: pos?.name, price: pos?.price }});
		}
	}
	

})(window.app || (window.app = {}));
