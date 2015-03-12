(function () {
    

    var navegar = function (url) {
        if (Global.Usuario != null) {
            WinJS.Navigation.navigate(url, WinJS.Navigation.state);
        }
        else {
            inicio();
        }
    };
    var inicio = function () {

        WinJS.Navigation.navigate("/pages/home/home.html", WinJS.Navigation.state);

    };

    WinJS.Namespace.define("Funciones", {
        navegar: navegar,
        inicio:inicio,


    });
})();