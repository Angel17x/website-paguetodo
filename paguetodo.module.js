
(function(app) {
  app.AppModule =
    ng.core.NgModule({
		imports: [
			ng.platformBrowser.BrowserModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.http.HttpModule,
			app.routing	
		],
		declarations: [
			app.NavbarComponent,
			app.LoadingServiceComponent,
			app.FooterComponent,
			app.HomeComponent,
			app.PosComponent,
			app.RecaudacionComponent,
			app.ContactComponent,
			app.NotFoundComponent,
			app.PreafiliacionComponent,
			app.SolucionesComponent,
			app.NosotrosComponent,
			app.CobranzaComponent,
			app.DesarrolloComponent,
			app.TicketComponent,
			app.PoliticasComponent,
			app.TerminosComponent,
			app.AppComponent,
		],
		providers: [
			app.AppCallService,
			app.LoadingServiceComponent
		],
		bootstrap: [app.AppComponent]
   }).Class({
      constructor: function() {}
   });
})(window.app || (window.app = {}));