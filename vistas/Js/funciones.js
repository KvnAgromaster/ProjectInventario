
function validarCampo(item) {
    // Valida que no este vacio
    if (!item  || item === "" ) {
        return false;
    }

    // Verifica caracteres permitidos
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(item)) {
        return false;
    }

    // Si todo esta bien
   return true;
}

// Obtener fecha y formatearla

function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yyyy: fecha.getFullYear()
    }
    return formato.replace(/yyyy|mm|dd/gi, matched => map[matched])
}

function MandarInfoAjax(datos, callback) {

    let identificador = datos.identificador;

    $.ajax({
        method: "POST",
        url: datos.url,
        data: {
            "datos": JSON.stringify(datos), 
            "identificador" : identificador
        },
        dataType: "json",
        success: function (respuesta) {
            callback(respuesta); // Ejecuta el callback pasando la respuesta
        },
        error: function (respuesta) {
            console.log("Error: " + respuesta);
        }
    });
}

