
$("#nuevoAlmacen").on("keyup", function() {
    clearTimeout(timeoutId);    // Evita acumulaciones

    timeoutId = setTimeout(function() {
        let currentInputValue = $("#nuevoAlmacen").val();
        ValidarEnTiempoReal(currentInputValue, "#btnModalAgregarAlmacen", "#nuevoAlmacen");
    }, 800);
});

function ValidarEnTiempoReal(inputValue, btn, input) {

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
    });

})