(function() {
    var addMenu = new Windows.UI.Popups.PopupMenu();
   
    var popups = function() {
        addMenu.commands.append(new Windows.UI.Popups.UICommand("Cliente", function(e) {
            var f = $("#addClienteFly").winControl;
            f.show($("#appbar"), "top", "right");

        }));
        addMenu.commands.append(new Windows.UI.Popups.UICommand("Proyecto"));
        addMenu.commands.append(new Windows.UI.Popups.UICommand("Tarea"));
        //  addMenu.commands.append(new Windows.UI.Popups.UICommandSeparator);

    };

    var eventos = function() {
        $("#btAdd").addEventListener("click", function(e) {
            var rect = helpers.getMousePosition(e);
            addMenu.showForSelectionAsync(rect);
        }, false);

        $("#btnAddCliClose").addEventListener("click", function(e) {

            $("#addClienteFly").winControl.hide();

        }, false);

        $("#btnAddCliOk").addEventListener("click", crearCliente, false);

        $("#btLogo").addEventListener("click", FileOpenPicker, false);

    };
    function tryUnsnap() {
        var currentState = Windows.UI.ViewManagement.ApplicationView.value;
        if (currentState === Windows.UI.ViewManagement.ApplicationViewState.snapped &&
            !Windows.UI.ViewManagement.ApplicationView.tryUnsnap()) {
            // Fail silently if we can't unsnap
            return;
        }
    }
    function FileOpenPicker() {
        tryUnsnap();
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        openPicker.fileTypeFilter.replaceAll([".png"]);

        openPicker.pickSingleFileAsync().then(function (file) {
            if (file) {
                var applicationData = Windows.Storage.ApplicationData.current;
                var localFolder = applicationData.localFolder;
                file.copyAsync(localFolder);
                var token= Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList.add(file);
                $("#logoCli").src=window.URL.createObjectURL(file, { oneTimeOnly: true });
                  
                
            } else {
            }
        });
    }

    var crearCliente = function() {


        var cl = new Modelo.Cliente(0, $("#txtNombreCliente").value, $("#txtNifCliente").value, $("#txtDescCliente").value, undefined, Global.Usuario.id);

        Azure.AltaCliente(cl, $("#addClienteFly").winControl);

    };


    var initappbar = function() {

        popups();
        eventos();

    };

    var authReq = [
        "/pages/Clientes/Clientes.html"
    ];
    
    WinJS.Namespace.define("Acciones", {
        AppBar: initappbar,
        AuthReq: authReq,
        InitPage:'/pages/home/home.html'

    });


})();