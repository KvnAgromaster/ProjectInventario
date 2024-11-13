$(document).on("click", "#btnModalAgregarAlmacen", function(e){

    var almacen = $("#nuevoAlmacen").val();
    var direccion = $("#nuevaDireccion").val();

    var datos = {
        valor: almacen,
        direccion: direccion,
        status: 1,
        item: "almacen",
        item2: "direccion",
        tabla: "almacenes",

    }

    $.ajax({
        method: "POST",
        url: "ajax/almacenes.ajax.php",
        data: {"datos": JSON.stringify(datos), "AgregarAlmacen": 1},
        dataType: "json",
        success: function (respuesta) {

            console.log(respuesta);

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

                        $.ajax({
                            method: "POST",
                            url: "ajax/almacenes.ajax.php",
                            data: {"datosActivar": JSON.stringify(datos), "ActivarAlmacen": 1},
                            dataType: "json",
                            success: function(respuesta){
            
                                console.log(respuesta);
                                
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
                        window.location = "almacenes";
                    }
    
                });

            }
        },

        error: function (respuesta) {
            console.log("Error: " + respuesta);
        }
    });

})