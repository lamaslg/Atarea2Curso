(function() {
    var client = new WindowsAzure.MobileServiceClient(
              "https://atarea2.azure-mobile.net/",
              "PVcmZyCDiKjkXNeDKOAjobSeugnVhr76"
          );

    function login(tipo, url) {

        return new WinJS.Promise(function(complete) {
            client.login(tipo).done(function (res) {
               
              
                var uid = res.userId.split(':');
                selectInsertUsuario(uid[0], uid[1],url);
                
            },
           function (error) {
               Global.userId = null;
               var dialog = new Windows.UI.Popups
                   .MessageDialog("Login incompleto", "Login Obligatorio "+error);
               dialog.showAsync().done(complete);
           }
       );


        });

       

    }

    function busqueda(texto) {
        var usu = client.getTable('Clientes');
        
        var busca = texto;
        var cons = usu.where({ id_usuario: Global.Usuario.id });
        return cons.read();
    }

    function selectInsertUsuario(servicio, id,url) {

        var usuario = new Modelo.Usuario(0, servicio, id);
        var usu = client.getTable('Usuario');
        usu.where({ servicio: servicio, userId: id })
                         .read()
                         .done(function (results) {
                           
                             if (results.length == 0) {
                                 
                                 var datos = {
                                     servicio: servicio,
                                     userId: id
                                 };
                                 usu.insert(datos).done(function (data) {
                                     usuario.id = data.id;
                                 });


                             }
                             else {

                                usuario.id = results[0].id;

                             }

                             Global.Usuario = usuario;
                             Funciones.navegar(url);
                         });




    }

    function selectAllClientes() {

        var tabla = client.getTable("Clientes");


       
              tabla.where({id_usuario:Global.Usuario.id}).read().done(function(res) {

                  for (var i = 0; i < res.length; i++) {
                      var c = new Modelo.Cliente(res[i].id, res[i].Nombre, res[i].NIF, res[i].descripcion, res[i].Logotipo, res[i].id_usuario);
                      Datos.Clientes.push(c);
                  }

              });

     
      


    }

    function addCliente(cliente,fl) {

        var datos = cliente.toInsert();

        var cl = client.getTable("Clientes");
        cl.insert(datos).done(function (res) {
            cliente.id = res.id;
            Datos.Clientes.push(cliente);
            var dialog = new Windows.UI.Popups
                .MessageDialog("Cliente dado de alta", "El cliente se ha insertado correctamente ");
            dialog.showAsync().done(function() {
                fl.hide();
            });

        },
            function (err) {
               
            }
        );
    }

    WinJS.Namespace.define("Azure", {
        login: login,
        AltaCliente: addCliente,
        GetClientes: selectAllClientes,
        BuscarC:busqueda
    });
})();