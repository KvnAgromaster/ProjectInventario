$(document).on("click", "#btnModalAgregarProducto", function(e){

    var producto = $("#nuevoProducto").val();

    var datos = new FormData();
    datos.append("producto", producto);

    $.ajax({
        url: "ajax/productos.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "text",
        success: function(respuesta){

            console.log(respuesta);

            if (respuesta == "ya-hay-registro") {

                Swal.fire({
                    icon: "error",
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
                        var datosActivar = new FormData();
                        datosActivar.append("nombreProducto", producto);

                        $.ajax({
                            url: "ajax/productos.ajax.php",
                            method: "POST",
                            data: datosActivar,
                            cache: false,
                            contentType: false,
                            processData: false,
                            dataType: "text",
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
            
        }
    })

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

            var datos = new FormData();
            datos.append("idProducto", id);

            $.ajax({
                url: "ajax/productos.ajax.php",
                method: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
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
            })

        }

    });

});