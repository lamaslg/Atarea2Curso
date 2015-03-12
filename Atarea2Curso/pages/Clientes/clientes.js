// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var pr = "{73BCAB5A-EC04-480B-A5A8-AAB1C0BA3762}";
  var itemList = new WinJS.Binding.List(Datos.Clientes);

            // Create a namespace to make the data publicly
            // accessible. 
            var publicMembers =
                {
                    itemList: itemList
                };
            WinJS.Namespace.define("DataExample", publicMembers);
 
  
    WinJS.UI.Pages.define("/pages/Clientes/clientes.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            Azure.GetClientes();
            
            $("#appbar").winControl.showOnlyCommands(["btAdd"]);
            var applicationData = Windows.Storage.ApplicationData.current;
            var localFolder = applicationData.localFolder;
            localFolder.getFileAsync("captura.png").then(function (file) {
              //  var file = _file;
                $("#imp").src = window.URL.createObjectURL(file, { oneTimeOnly: true });

            });
                
            //Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList.getFileAsync(pr)
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });

    function bindingClientes() {
         itemList = new WinJS.Binding.List(Datos.Clientes);

        // Create a namespace to make the data publicly
        // accessible. 
         publicMembers =
            {
                itemList: itemList
            };
         WinJS.Namespace.define("DataExample", publicMembers);

    }

  //  WinJS.Namespace.define("Clientes", bindingClientes);
})();
