
(function(app) {
  app.routing = ng.router.RouterModule.forRoot([
		{path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component:app.HomeComponent},
    {path: 'pos', component:app.PosComponent},
    {path: 'recaudacion', component:app.RecaudacionComponent},
    {path: 'contact', component:app.ContactComponent},
    {path: 'preafiliacion', component:app.PreafiliacionComponent},
    {path: 'soluciones', component:app.SolucionesComponent},
    {path: 'nosotros', component:app.NosotrosComponent},
    {path: 'cobranza', component:app.CobranzaComponent},
    {path: 'desarrollo', component:app.DesarrolloComponent},
    {path: 'ticket', component:app.TicketComponent},
    {path: 'consult', component:app.TicketComponent},
    {path: 'politicas-de-privacidad', component:app.PoliticasComponent},
    {path: 'terminos-y-condiciones', component:app.TerminosComponent},
    {path: 'not-found', component:app.NotFoundComponent},
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
  ],{useHash: true});
})(window.app || (window.app = {}));