let timeoutId;

$("#nuevoProducto").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#nuevoProducto").val();
        ValidarEnTiempoReal(currentInputValue, "#btnModalAgregarProducto", "#nuevoProducto");
    }, 800);
});

$("#editarProducto").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#editarProducto").val();
        ValidarEnTiempoReal(currentInputValue, "#btnModalEditarProducto", "#editarProducto");
    }, 800);
});

function ValidarEnTiempoReal(inputValue, btn, input) {

    if (!validarProducto(inputValue)) {

        $(".alert").remove();

        $(input).parent().after('<div class="alert alert-warning">El producto no puede contener caracteres especiales o ir vacio</div>');

        $(btn).prop("disabled", true);

    } else {

        $(".alert").remove();
        $(btn).prop("disabled", false);

        var dato = {
            tabla: "productos",
            item: "producto",
            valor: inputValue
        };

        $.ajax({
            method: "POST",
            url: "ajax/productos.ajax.php",
            data: {"datosValidar": JSON.stringify(dato), "ValidarProducto": 1},
            dataType: "json",
            success: function (respuesta) {
                console.log(respuesta);
                if (respuesta == "Si existe") {
                    
                    $(input).parent().after('<div class="alert alert-warning">El producto ya existe</div>');

                    $(btn).prop("disabled", true);

                } else if (respuesta == "existe-desactivado") {

                    $(input).parent().after('<div class="alert alert-warning">El producto esta desactivado</div>');

                }
                
            },

            error: function (respuesta) {
                console.log("Error: " + respuesta);
            }
        });

    }

}

function validarProducto(producto) {
    // Valida que no este vacio
    if (!producto  || producto === "" ) {
        return false;
    }

    // Verifica caracteres permitidos
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(producto)) {
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

$(document).on("click", "#btnModalAgregarProducto", function(e){

    var producto = $("#nuevoProducto").val();

    var datos = {
        valor: producto,
        status: 1,
        item: "producto",
        stock: 0,
        tabla: "productos",

    }

    $.ajax({
        method: "POST",
        url: "ajax/productos.ajax.php",
        data: {"datos": JSON.stringify(datos), "AgregarProducto": 1},
        dataType: "json",
        success: function (respuesta) {

            if (respuesta == "ya-hay-registro") {

                Swal.fire({
                    icon: "warning",
                    title: "El producto ya existe",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false

                });

            } else if (respuesta == "Validacion") {

                Swal.fire({
                    title: "El producto ya existe, pero esta deshabilitado",
                    text: "Desea habilitarlo?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Si'
            
                }).then((result)=> {
            
                    if (result.value) {

                        var datos = {
                            tabla: "productos",
                            item: "producto",
                            valor: producto
                        }

                        $.ajax({
                            method: "POST",
                            url: "ajax/productos.ajax.php",
                            data: {"datosActivar": JSON.stringify(datos), "ActivarProducto": 1},
                            dataType: "json",
                            success: function(respuesta){
            
                                console.log(respuesta);
                                
                                Swal.fire({
                                    icon: "success",
                                    title: "El producto se agrego correctamente!",
                                    showConfirmButton: true,
                                    confirmButtonText: "Cerrar",
                                    closeOnConfirm: false
                    
                                }).then((result) => {
                                    if (result.value) {
                                        window.location = "productos";
                                    }
                    
                                });
                                
                            },
                            error: function (respuesta) {
                                console.log("Error: " + respuesta);
                            }
                        })
                    }

                    
            
                });

            } else {

                Swal.fire({
                    icon: "success",
                    title: "El producto se agrego correctamente!",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false
    
                }).then((result) => {
                    if (result.value) {
                        window.location = "productos";
                    }
    
                });

            }
        },

        error: function (respuesta) {
            console.log("Error: " + respuesta);
        }
    });

})

$(document).on("click", ".btnEliminarProducto", function(){

    var id = $(this).attr("idProducto");

    Swal.fire({
        title: "Esta seguro de borrar el producto?",
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
                tabla: "productos",
                item: "id",
                valor: id
            }

            $.ajax({
                method: "POST",
                url: "ajax/productos.ajax.php",
                data: {"datosEliminar": JSON.stringify(datos), "EliminarProducto": 1},
                dataType: "json",
                success: function(respuesta){

                    console.log(respuesta);
                    
                    Swal.fire({
                        icon: "success",
                        title: "El producto ha sido borrado correctamente!",
                        showConfirmButton: true,
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: false

                    }).then((result) => {
                        if (result.value) {
                            window.location = "productos";
                        }

                    });
                    
                },
                error: function (respuesta) {
                    console.log("Error: " + respuesta);
                }
            })

        }

    });

});

// Editar Producto

$(document).on("click", "#btnModalEditarProducto", function(e){

    const fecha = new Date();

    // Obtener Hora actual
    const hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()+ "." + fecha.getMilliseconds();

    // Obtener fecha y hora
    const fechaHora = formatoFecha(fecha, 'yyyy/mm/dd') + " " + hora;
    
    let datos = {
        tabla: "productos",
        item: "producto",
        valor: $("#editarProducto").val(),
        id: $("#idProductoActual").val(),
        fecha: fechaHora, 

    }

    $.ajax({
        method: "POST",
        url: "ajax/productos.ajax.php",
        data: {"editarDatos": JSON.stringify(datos), "EditarProducto": 1},
        dataType: "json",
        success: function(respuesta){

            if (respuesta == "existe") {

                Swal.fire({
                    icon: "warning",
                    title: "El producto ya existe",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false

                });

                

            } else if (respuesta == "existe-desactivado"){

                Swal.fire({
                    icon: "warning",
                    title: "El producto ya existe, pero esta eliminado",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false

                });


            } else {

                Swal.fire({
                    icon: "success",
                    title: "El producto se ha editado correctamente!",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false
    
                }).then((result) => {
                    if (result.value) {
                        window.location = "productos";
                    }
    
                });

            }
 
        },
        error: function (respuesta) {

            console.log("Error: " + respuesta);
        }
    })


})

// Traer el valor del producto y mostrarlo en el input

$(document).on("click", ".btnEditarProducto", function(){

    let data = {
        tabla: "productos",
        item: "id",
        valor: $(this).attr("idProducto"),

    }

    $.ajax({
        method: "POST",
        url: "ajax/productos.ajax.php",
        data: {"consultarDatos": JSON.stringify(data), "ConsultarProducto": 1},
        dataType: "json",
        success: function(respuesta){
            $("#editarProducto").val(respuesta["producto"]);
            $("#idProductoActual").val(respuesta["id"]);
 
        },
        error: function (respuesta) {

            console.log("Error: " + respuesta);
        }
    })

    // console.log(mandar_info_ajax(data));

})
