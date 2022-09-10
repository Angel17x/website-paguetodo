(function (app) {
    'use strict';
    app.LoadingServiceComponent = ng.core
        .Component({
            selector: 'loading-service',
			templateUrl: `views/loading.html`
        })
        .Class({
           constructor: [
                function () {
                  
                }            
            ]
        });
    app.LoadingServiceComponent.prototype.showPleaseWait=function(){
        $("#pleaseWaitDialog").modal('show');
    }  
    app.LoadingServiceComponent.prototype.hidePleaseWait=function () {
        $("#pleaseWaitDialog").modal('hide');
    }
})(window.app || (window.app = {}));
