window.addEventListener('load', async () => {

    await initDataTable();    

});

let dataTable;
let dataTableIsInitialized = false;

const initDataTable = async () => {

    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    DibujarTabla();
    
    dataTableIsInitialized = true;

};

function DibujarTabla() {

    let datos = {

        url: "ajax/movimientos.ajax.php",
        identificador: "ConsultarMovimiento",
        item: null,
        tabla: "movimientos",
        status: 1,

    }

    MandarInfoAjax(datos, (respuesta) => {

        const dataSet = respuesta.map((element, index) => {
            const tipoMovimientoClase = element.tipo_movimiento == 1 ? "success" : "danger";
            const ultimaModificacion = element.ultima_modificacion || "-";
            const acciones = `
                <div class="btn-group">
                    <button class="btn btn-xs btn-warning btnEditarMovimiento" idMovimiento="${element.id}" data-toggle="modal" data-target="#modalEditarMovimiento">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-xs btn-danger btnEliminarMovimiento" idMovimiento="${element.id}">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            `;

            const cantidad = Math.round(element.cantidad * 100) / 100;
    
            return [
                index + 1,
                element.almacen,
                element.producto,
                cantidad,
                element.fecha,
                ultimaModificacion,
                acciones,
                tipoMovimientoClase,

            ];
        });

        dataTable = $("#datatable_movimientos").DataTable({
            destroy: true,
            responsive: true,
            autoWidth: false,
            data: dataSet, 
            createdRow: function (row, data, index) {

                if (data[7] == "success") {

                    $(row).addClass('success');

                } else {

                    $(row).addClass('danger');

                }
                
            }
        });

    })

}

$("#cantidadMov").on("keyup", function() {
    let currentInputValue = parseFloat($("#cantidadMov").val());

    if (esUnNumero(currentInputValue)) {

        $("#btnModalAgregarMovimiento").prop("disabled", false);

    } else {

        $("#btnModalAgregarMovimiento").prop("disabled", true);

    }
});

$("#cantidadMovEditar").on("keyup", function() {
    let currentInputValue = parseFloat($("#cantidadMovEditar").val());

    if (esUnNumero(currentInputValue)) {

        $("#btnModalEditarMovimiento").prop("disabled", false);

    } else {

        $("#btnModalEditarMovimiento").prop("disabled", true);

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

$(document).on("click", "#btnModalEditarMovimiento", function () {

    let productoMov = $("#_productoMovEditar").val();
    let almacenMov = $("#_almacenMovEditar").val();
    let cantidad = $("#cantidadMovEditar").val();
    let tipo_movimiento = $("#_tipoMovEditar").val();

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

        const fecha = new Date();

        // Obtener Hora actual
        const hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()+ "." + fecha.getMilliseconds();

        // Obtener fecha y hora
        const fechaHora = formatoFecha(fecha, 'yyyy/mm/dd') + " " + hora;
        
        let datos = {
            url: "ajax/movimientos.ajax.php",
            identificador: "EditarMovimiento",
            tabla: "movimientos",
            producto: $("#_productoMovEditar").val(),
            almacen: $("#_almacenMovEditar").val(),
            cantidad: $("#cantidadMovEditar").val(),
            tipoMov: $("#_tipoMovEditar").val(),
            id: $("#idMovActual").val(),
            fecha: fechaHora,
        }

        MandarInfoAjax(datos, (respuesta) => {

            Swal.fire({
                icon: "success",
                title: "El registro se ha editado correctamente!",
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

$(document).on("click", ".btnEditarMovimiento", function(){

    let datos = {
        url: "ajax/movimientos.ajax.php",
        identificador: "ConsultarMovimiento",
        tabla: "movimientos",
        item: "id",
        valor: $(this).attr("idMovimiento"),

    }

    MandarInfoAjax(datos, (respuesta) => {
        console.log(respuesta[0].almacen);

        $("#productoMovEditar").val(respuesta[0].producto);
        $("#productoMovEditar").html(respuesta[0].producto);

        $("#almacenMovEditar").val(respuesta[0].almacen);
        $("#almacenMovEditar").html(respuesta[0].almacen);

        if (respuesta[0].tipo_movimiento == 1) {

            $("#tipoMovEditar").html("Entrada");

        } else {

            $("#tipoMovEditar").html("Salida");

        } 
        
        $("#tipoMovEditar").val(respuesta[0].tipo_movimiento);

        $("#cantidadMovEditar").val(Math.round(respuesta[0].cantidad * 100) / 100); //REDONDEA A DOS DECIMALES

        if ($("#cantidadMovEditar").val() == "0.0" || $("#cantidadMovEditar").val() == "0" ) {

            $("#btnModalEditarMovimiento").prop("disabled", true);

        }

        $("#idMovActual").val(respuesta[0].id);

    })

})