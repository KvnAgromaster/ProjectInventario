$("#cantidadMov").on("keyup", function() {
    let currentInputValue = parseFloat($("#cantidadMov").val());

    if (esUnNumero(currentInputValue)) {

        $("#btnModalAgregarMovimiento").prop("disabled", false);

    } else {

        $("#btnModalAgregarMovimiento").prop("disabled", true);

    }
});

$(document).on("click", "#btnModalAgregarMovimiento", function(e){

    let productoMov = $("#productoMov").val();
    let almacenMov = $("#almacenMov").val();
    let cantidad = $("#cantidadMov").val();
    let tipo_movimiento = $("#tipoMov").val();

    let listaValidacion = [productoMov, almacenMov, cantidad, tipo_movimiento];

    // REALIZAR VALIDACION

    if (!validarMov(listaValidacion)) {

        Swal.fire({
            icon: "error",
            title: "Ningun campo puede ir vacio",
            showConfirmButton: true,
            confirmButtonText: "Cerrar",
            closeOnConfirm: false

        });

    } else {

        let datos = {
            url: "ajax/movimientos.ajax.php",
            identificador: "AgregarMovimiento",
            tabla: "movimientos",
            producto: productoMov,
            almacen: almacenMov,
            cantidad: cantidad,
            tipoMov: tipo_movimiento,
            status: 1,
    
        }
    
        MandarInfoAjax(datos, (respuesta) => {
    
            Swal.fire({
                icon: "success",
                title: "El almacen se agrego correctamente!",
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
                closeOnConfirm: false
    
            }).then((result) => {
                if (result.value) {
                    window.location = "inventario";
                }
    
            });
    
        })

    }

})

$(document).on("click", ".btnEliminarMovimiento", function(){

    let id = $(this).attr("idMovimiento");

    Swal.fire({
        title: "Esta seguro de borrar el movimiento?",
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
                url: "ajax/movimientos.ajax.php",
                identificador: "EliminarMovimiento",
                tabla: "movimientos",
                item: "id",
                valor: id
            }

            MandarInfoAjax(datos, (respuesta) => { 

                console.log(respuesta);

                Swal.fire({
                    icon: "success",
                    title: "El registro ha sido borrado correctamente!",
                    showConfirmButton: true,
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false

                }).then((result) => {
                    if (result.value) {
                        window.location = "inventario";
                    }

                });

            })

        }

    });

})

$(document).on("click", ".btnEditarMovimiento", function(){

    let datos = {
        url: "ajax/movimientos.ajax.php",
        identificador: "ConsultarMovimiento",
        tabla: "movimientos",
        item: "id",
        valor: $(this).attr("idMovimiento"),

    }

    MandarInfoAjax(datos, (respuesta) => {
        $("#productoMovEditar").val(respuesta["producto"]);
        $("#productoMovEditar").html(respuesta["producto"]);

        $("#almacenMovEditar").val(respuesta["almacen"]);
        $("#almacenMovEditar").html(respuesta["almacen"]);

        if (respuesta["tipo_movimiento"] == 1) {

            $("#tipoMovEditar").html("Entrada");

        } else {

            $("#tipoMovEditar").html("Salida");

        } 
        
        $("#tipoMovEditar").val(respuesta["tipo_movimiento"]);

        $("#cantidadMovEditar").val(respuesta["cantidad"]);

    })

})