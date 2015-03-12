(function() {


    var usuario = function(id, servicio, userId) {

        this.id = id;
        this.servicio = servicio;
        this.userId = userId;
    };

    usuario.prototype.toInsert = function() {
        var ret = {
            servicio: this.servicio,
            userId: this.userId
        };

        return ret;
    };
    //falta la foto
    var cliente = function(id,nombre,nif, descripcion, logotipo,idUsuario) {
        this.id = id;
        this.id_usuario = idUsuario;
        this.Nombre = nombre;
        this.NIF = nif;
        this.descripcion = descripcion;
        if (logotipo == null || logotipo == "default")
            this.logotipo = "/images/default-logo.png";
        else
            this.Logotipo = logotipo;
    };

    cliente.prototype.toInsert = function() {
        var ret = {
            Nombre: this.Nombre,
            descripcion: this.descripcion,
            NIF: this.NIF,
            Logotipo: this.Logotipo==undefined?null:this.logotipo,
            id_usuario:this.id_usuario
        };

        return ret;
    };

    WinJS.Namespace.define("Modelo", {
        Usuario: usuario,
        Cliente: cliente
    });
    
})();