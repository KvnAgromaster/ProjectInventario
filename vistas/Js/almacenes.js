$("#nuevoAlmacen2").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#nuevoAlmacen").val();
        ValidarAlmacen(currentInputValue, "#btnModalAgregarAlmacen", "#nuevoAlmacen");
    }, 800);
});

$("#nuevoAlmacen").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#nuevoAlmacen").val();
        ValidarAlmacen(currentInputValue, "#btnModalAgregarAlmacen", "#nuevoAlmacen");
    }, 800);
});

$("#editarAlmacen").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#editarAlmacen").val();
        ValidarAlmacen(currentInputValue, "#btnModalEditarAlmacen", "#editarAlmacen");
    }, 800);
});

function ValidarAlmacen(inputValue, btn, input) {

    if (!validarCampo(inputValue)) {

        $(".alert").remove();

        $(input).parent().after('<div class="alert alert-warning">El almacen no puede contener caracteres especiales o ir vacio</div>');

        $(btn).prop("disabled", true);

    } else {

        $(".alert").remove();
        $(btn).prop("disabled", false);

        var dato = {
            url: "ajax/almacenes.ajax.php",
            identificador: "ValidarAlmacen",
            tabla: "almacenes",
            item: "almacen",
            valor: inputValue
        };

        MandarInfoAjax(dato, (respuesta) => {
            if (respuesta == "Si existe") {
                    
                $(input).parent().after('<div class="alert alert-warning">El almacen ya existe</div>');
        
                $(btn).prop("disabled", true);
        
            } else if (respuesta == "existe-desactivado") {
        
                $(input).parent().after('<div class="alert alert-warning">El almacen esta desactivado</div>');
        
            }
        });

    }

}

$(document).on("click", "#btnModalAgregarAlmacen", function(e){

    var almacen = $("#nuevoAlmacen").val();
    var direccion = $("#nuevaDireccion").val();

    var datos = {
        url: "ajax/almacenes.ajax.php",
        identificador: "AgregarAlmacen",
        valor: almacen,
        direccion: direccion,
        status: 1,
        item: "almacen",
        item2: "direccion",
        tabla: "almacenes",

    }

    MandarInfoAjax(datos, (respuesta) => {
        if (respuesta == "ya-hay-registro") {

            Swal.fire({
                icon: "warning",
                title: "El almacen ya existe",
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
                closeOnConfirm: false

            });

        } else if (respuesta == "Validacion") {

            Swal.fire({
                title: "El almacen ya existe, pero esta deshabilitado",
                text: "Desea habilitarlo?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Si'
        
            }).then((result)=> {
        
                if (result.value) {

                    datos.identificador = "ActivarAlmacen";

                    MandarInfoAjax(datos, (respuesta) => {
                            
                        Swal.fire({
                            icon: "success",
                            title: "El almacen se agrego correctamente!",
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar",
                            closeOnConfirm: false
            
                        }).then((result) => {
                            if (result.value) {
                                window.location = "almacenes";
                            }
            
                        });

                    })

                }
        
            });

        } else {

            Swal.fire({
                icon: "success",
                title: "El almacen se agrego correctamente!",
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
                closeOnConfirm: false

            }).then((result) => {
                if (result.value) {
                    window.location = "almacenes";
                }

            });

        }
    });

})

$(document).on("click", ".btnEliminarAlmacen", function(){

    var id = $(this).attr("idAlmacen");

    Swal.fire({
        title: "Esta seguro de borrar el almacen?",
        text: "Si no lo esta puede cancelar la accion!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borralo 😈!'

    }).then((result)=> {

        if (result.value) {

            var datos = {
                url: "ajax/almacenes.ajax.php",
                identificador: "EliminarAlmacen",
                tabla: "almacenes",
                item: "id",
                valor: id
            }

            MandarInfoAjax(datos, (respuesta) => { 

                Swal.fire({
                    icon: "success",
                    title: "El producto ha sido borrado correctamente!",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false

                }).then((result) => {
                    if (result.value) {
                        window.location = "almacenes";
                    }

                });

            })

        }

    });

});

$(document).on("click", "#btnModalEditarAlmacen", function(e){

    const fecha = new Date();

    // Obtener Hora actual
    const hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()+ "." + fecha.getMilliseconds();

    // Obtener fecha y hora
    const fechaHora = formatoFecha(fecha, 'yyyy/mm/dd') + " " + hora;
    
    let datos = {
        url: "ajax/almacenes.ajax.php",
        identificador: "EditarAlmacen",
        tabla: "almacenes",
        item: "almacen",
        valor: $("#editarAlmacen").val(),
        direccion: $("#editarDireccion").val(),
        id: $("#idAlmacenActual").val(),
        fecha: fechaHora, 

    }

    MandarInfoAjax(datos, (respuesta) => {

        console.log(respuesta);
                            
        if (respuesta == "existe") {

            Swal.fire({
                icon: "warning",
                title: "El almacen ya existe",
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
                closeOnConfirm: false

            });

            

        } else if (respuesta == "existe-desactivado"){

            Swal.fire({
                icon: "warning",
                title: "El almacen ya existe, pero esta eliminado",
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
                closeOnConfirm: false

            });


        } else {

            Swal.fire({
                icon: "success",
                title: "El almacen se ha editado correctamente!",
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
                closeOnConfirm: false

            }).then((result) => {
                if (result.value) {
                    window.location = "almacenes";
                }

            });

        }

    })

})


// Traer el valor del almacen y direccion, y mostrarlo en el input

$(document).on("click", ".btnEditarAlmacen", function(){

    let datos = {
        url: "ajax/almacenes.ajax.php",
        identificador: "ConsultarAlmacen",
        tabla: "almacenes",
        item: "id",
        valor: $(this).attr("idAlmacen"),

    }

    MandarInfoAjax(datos, (respuesta) => {
                            
        $("#editarAlmacen").val(respuesta["almacen"]);
        $("#editarDireccion").val(respuesta["direccion"]);
        $("#idAlmacenActual").val(respuesta["id"]);

    })

})