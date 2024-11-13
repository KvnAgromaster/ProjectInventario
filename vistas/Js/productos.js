let timeoutId;

$("#nuevoProducto").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#nuevoProducto").val();
        ValidarProducto(currentInputValue, "#btnModalAgregarProducto", "#nuevoProducto");
    }, 800);
});

$("#editarProducto").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#editarProducto").val();
        ValidarProducto(currentInputValue, "#btnModalEditarProducto", "#editarProducto");
    }, 800);
});

function ValidarProducto(inputValue, btn, input) {

    if (!validarCampo(inputValue)) {

        $(".alert").remove();

        $(input).parent().after('<div class="alert alert-warning">El producto no puede contener caracteres especiales o ir vacio</div>');

        $(btn).prop("disabled", true);

    } else {

        $(".alert").remove();
        $(btn).prop("disabled", false);

        var datos = {
            url: "ajax/productos.ajax.php",
            identificador: "ValidarProducto",
            tabla: "productos",
            item: "producto",
            valor: inputValue
        };

        MandarInfoAjax(datos, (respuesta) => { 
            if (respuesta == "Si existe") {
                    
                $(input).parent().after('<div class="alert alert-warning">El producto ya existe</div>');
    
                $(btn).prop("disabled", true);
    
            } else if (respuesta == "existe-desactivado") {
    
                $(input).parent().after('<div class="alert alert-warning">El producto esta desactivado</div>');
    
            }

        })

    }

}

$(document).on("click", "#btnModalAgregarProducto", function(e){

    var producto = $("#nuevoProducto").val();

    var datos = {
        url: "ajax/productos.ajax.php",
        identificador: "AgregarProducto",
        valor: producto,
        status: 1,
        item: "producto",
        stock: 0,
        tabla: "productos",

    }

    MandarInfoAjax(datos, (respuesta) => {
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

                    datos.identificador = "ActivarProducto";

                    MandarInfoAjax(datos, (respuesta) => {
                            
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
                url: "ajax/productos.ajax.php",
                identificador: "EliminarProducto",
                tabla: "productos",
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
                        window.location = "productos";
                    }

                });

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
        url: "ajax/productos.ajax.php",
        identificador: "EditarProducto",
        tabla: "productos",
        item: "producto",
        valor: $("#editarProducto").val(),
        id: $("#idProductoActual").val(),
        fecha: fechaHora, 

    }

    MandarInfoAjax(datos, (respuesta) => {
                            
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

    })

})

// Traer el valor del producto y mostrarlo en el input

$(document).on("click", ".btnEditarProducto", function(){

    let datos = {
        url: "ajax/productos.ajax.php",
        identificador: "ConsultarProducto",
        tabla: "productos",
        item: "id",
        valor: $(this).attr("idProducto"),

    }

    MandarInfoAjax(datos, (respuesta) => {
                            
        $("#editarProducto").val(respuesta["producto"]);
        $("#idProductoActual").val(respuesta["id"]);

    })

})
