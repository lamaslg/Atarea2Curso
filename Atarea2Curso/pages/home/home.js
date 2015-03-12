(function () {
    "use strict";
    var destino = "/pages/Clientes/Clientes.html";
   
    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var face = document.getElementById("facebook");
            face.addEventListener("click", function () {
                Azure.login("facebook", destino);
            }, false);

            var tuit = document.getElementById("twitter");
            tuit.addEventListener("click", function () {
                Azure.login("twitter", destino);
            }, false);

            var google = document.getElementById("google");
            google.addEventListener("click", function () {
                Azure.login("google", destino);
            }, false);

            var micro = document.getElementById("microsoft");
            micro.addEventListener("click", function () {
                Azure.login("MicrosoftAccount", destino);
            }, false);

            var barra = document.getElementById("appbar").winControl;
           barra.showOnlyCommands([""]);

           
        },
       
        registerActions: function () {
         

        }
    });
})();
