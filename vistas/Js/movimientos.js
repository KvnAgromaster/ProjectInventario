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
            tipoMov: tipo_movimiento
    
        }
    
        console.log(datos);
    
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