// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";
    var sampleTitle = "Application Settings";

    var scenarios = [
        { url: "/html/Deafult.html", title: "Default behavior" },
        { url: "/html/HelpUI.html", title: "Add Help Settings flyout linked to the settings charm" },
    ];

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    

    Windows.ApplicationModel.Search.SearchPane.getForCurrentView().onsuggestionsrequested = function (eventObject) {
        var queryText = eventObject.queryText;
        var query = queryText.toLowerCase();
        var deferral = eventObject.request.getDeferral();
        var suggestions = eventObject.request.searchSuggestionCollection;
        Azure.BuscarC(query, "",eventObject).done(
                       function (res) {
                             
                           for (var i = 0; i < res.length; i++) {
                               if(res[i].Nombre.toLowerCase().indexOf(query)>=0)
                                   suggestions.appendQuerySuggestion(res[i].Nombre);
                             }
                            deferral.complete();
                         });
       

     
    };
    function initializeSettings() {
        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = {
                "legalNotices": {
                    title: "Legal notices",
                    href: "LegalNoticesUI.html"
                }
            };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
        // Make sure the following is called after the DOM has initialized. 
        // Typically this would be part of app initialization
        WinJS.Application.start();
    }
    function shareTextHandler(e) {
        //var request = e.request;
        //var tx = JSON.stringify(e.request);
        //request.data.properties.title = "Share Text Example";
        //request.data.properties.description = "Demonstrates how to share.";
        //request.data.setText("Hello World!");
        
        var localImage = "ms-appx:///images/logo.png";
        var htmlExample = "<p>Here is a local image: <img src=\"" + localImage + "\">.</p>";
        var request = e.request;
        request.data.properties.title = "Share Html Example";
        request.data.properties.description = "Demonstrates how to share an HTML fragment with a local image.";
        var htmlFormat = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(htmlExample);
        request.data.setHtmlFormat(htmlFormat);
        var streamRef = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri(localImage));
        request.data.resourceMap[localImage] = streamRef;
    }
    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
                dataTransferManager.addEventListener("datarequested", shareTextHandler);
                WinJS.Application.onsettings = function (e) {
                    e.detail.applicationcommands = { "help": { title: "Help", href: "/ayuda.html" } };
                    WinJS.UI.SettingsFlyout.populateSettings(e);
                };

            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));

          

        }
        recuperarDatos();
    });
    var recuperarDatos = function() {
        var applicationData = Windows.Storage.ApplicationData.current;

        var localSettings = applicationData.localSettings;

        var usu = localSettings.values["usuario"];

        if (usu == undefined)
            Global.usuario = null;
        else {
         //   Global.Usuario = JSON.parse(usu);
         //   nav.navigate("/pages/Clientes/Clientes.html");
        }

    };
    app.onready = function(args) {
        Acciones.AppBar();
    };
    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
        
        var applicationData = Windows.Storage.ApplicationData.current;

        var localSettings = applicationData.localSettings;

        localSettings.values["usuario"] = JSON.stringify( Global.Usuario);
    };

    WinJS.Navigation.addEventListener("navigated", function (eventObject) {
        var url = eventObject.detail.location;
        //var host = document.getElementById("contentHost");
        //// Call unload method on current scenario, if there is one 
        //host.winControl && host.winControl.unload && host.winControl.unload();
        //WinJS.Utilities.empty(host);
        //eventObject.detail.setPromise(WinJS.UI.Pages.render(url, host, eventObject.detail.state).then(function () {
        //    WinJS.Application.sessionState.lastUrl = url;
        //}));
    });
    WinJS.Navigation.addEventListener("beforenavigate", function (evt) {
        var wrap = false;


        if (evt.detail.location == Acciones.InitPage && Global.Usuario != null) {
            wrap = true;
        } else {
            for (var i = 0; i < Acciones.AuthReq.length; i++) {
                if (evt.detail.location == Acciones.AuthReq[i]) {
                    if (Global.Usuario == null)
                        wrap = true;

                    break;
                }
            }
        }
        evt.detail.setPromise(WinJS.Promise.wrap(wrap));


    });
    WinJS.Namespace.define("Global", {
        Usuario: null,
    });
    WinJS.Namespace.define("SdkSample", {
        sampleTitle: sampleTitle,
        scenarios: scenarios
    });

    app.start();
})();
