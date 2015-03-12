(function () {
    var clientes = [];
    var listado = new WinJS.Binding.List(clientes);

    WinJS.Namespace.define("Datos", {
        Clientes:listado

    });
})();