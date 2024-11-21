
let dataTable;
let dataTableIsInitialized = false;

window.addEventListener('load', async () => {

  let datosTablas = {
    datosMov: {
      url: "ajax/movimientos.ajax.php",
      identificador: "ConsultarMovimiento",
      item: null,
      tabla: "movimientos",
      status: 1,
      orderby: "id",
    },
    datosInv: {
      url: "ajax/movimientos.ajax.php",
      identificador: "ConsultarMovimiento",
      item: null,
      tabla: "inventario_view",
      orderby: "almacen",
    }
  }

  await initDataTable(datosTablas);    

});

const initDataTable = async (datosTablas) => {

  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  DibujarTablaMovimientos(datosTablas.datosMov);
  DibujarTablaInventarios(datosTablas.datosInv);
  
  dataTableIsInitialized = true;

};

function DibujarTablaMovimientos(datos) {

  // console.log(datos);
  
  MandarInfoAjax(datos, (respuesta) => {
    // console.log(respuesta);

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
          createdRow: function (row, data) {

              if (data[7] == "success") {

                  $(row).addClass('success');

              } else {

                  $(row).addClass('danger');

              }
              
          },
          language: {
              processing: 'Procesando...',
              lengthMenu: 'Mostrar _MENU_ registros',
              zeroRecords: 'No se encontraron resultados',
              emptyTable: 'Ningún dato disponible en esta tabla',
              infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
              infoFiltered: '(filtrado de un total de _MAX_ registros)',
              search: 'Buscar:',
              infoThousands: ',',
              loadingRecords: 'Cargando...',
              paginate: {
                first: 'Primero',
                last: 'Último',
                next: 'Siguiente',
                previous: 'Anterior',
              },
              aria: {
                sortAscending: ': Activar para ordenar la columna de manera ascendente',
                sortDescending: ': Activar para ordenar la columna de manera descendente',
              },
              buttons: {
                copy: 'Copiar',
                colvis: 'Visibilidad',
                collection: 'Colección',
                colvisRestore: 'Restaurar visibilidad',
                copyKeys:
                  'Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.',
                copySuccess: {
                  1: 'Copiada 1 fila al portapapeles',
                  _: 'Copiadas %ds fila al portapapeles',
                },
                copyTitle: 'Copiar al portapapeles',
                csv: 'CSV',
                excel: 'Excel',
                pageLength: {
                  '-1': 'Mostrar todas las filas',
                  _: 'Mostrar %d filas',
                },
                pdf: 'PDF',
                print: 'Imprimir',
                renameState: 'Cambiar nombre',
                updateState: 'Actualizar',
                createState: 'Crear Estado',
                removeAllStates: 'Remover Estados',
                removeState: 'Remover',
                savedStates: 'Estados Guardados',
                stateRestore: 'Estado %d',
              },
              autoFill: {
                cancel: 'Cancelar',
                fill: 'Rellene todas las celdas con <i>%d</i>',
                fillHorizontal: 'Rellenar celdas horizontalmente',
                fillVertical: 'Rellenar celdas verticalmentemente',
              },
              decimal: ',',
              searchBuilder: {
                add: 'Añadir condición',
                button: {
                  0: 'Constructor de búsqueda',
                  _: 'Constructor de búsqueda (%d)',
                },
                clearAll: 'Borrar todo',
                condition: 'Condición',
                conditions: {
                  date: {
                    after: 'Despues',
                    before: 'Antes',
                    between: 'Entre',
                    empty: 'Vacío',
                    equals: 'Igual a',
                    notBetween: 'No entre',
                    notEmpty: 'No Vacio',
                    not: 'Diferente de',
                  },
                  number: {
                    between: 'Entre',
                    empty: 'Vacio',
                    equals: 'Igual a',
                    gt: 'Mayor a',
                    gte: 'Mayor o igual a',
                    lt: 'Menor que',
                    lte: 'Menor o igual que',
                    notBetween: 'No entre',
                    notEmpty: 'No vacío',
                    not: 'Diferente de',
                  },
                  string: {
                    contains: 'Contiene',
                    empty: 'Vacío',
                    endsWith: 'Termina en',
                    equals: 'Igual a',
                    notEmpty: 'No Vacio',
                    startsWith: 'Empieza con',
                    not: 'Diferente de',
                    notContains: 'No Contiene',
                    notStartsWith: 'No empieza con',
                    notEndsWith: 'No termina con',
                  },
                  array: {
                    not: 'Diferente de',
                    equals: 'Igual',
                    empty: 'Vacío',
                    contains: 'Contiene',
                    notEmpty: 'No Vacío',
                    without: 'Sin',
                  },
                },
                data: 'Data',
                deleteTitle: 'Eliminar regla de filtrado',
                leftTitle: 'Criterios anulados',
                logicAnd: 'Y',
                logicOr: 'O',
                rightTitle: 'Criterios de sangría',
                title: {
                  0: 'Constructor de búsqueda',
                  _: 'Constructor de búsqueda (%d)',
                },
                value: 'Valor',
              },
              searchPanes: {
                clearMessage: 'Borrar todo',
                collapse: {
                  0: 'Paneles de búsqueda',
                  _: 'Paneles de búsqueda (%d)',
                },
                count: '{total}',
                countFiltered: '{shown} ({total})',
                emptyPanes: 'Sin paneles de búsqueda',
                loadMessage: 'Cargando paneles de búsqueda',
                title: 'Filtros Activos - %d',
                showMessage: 'Mostrar Todo',
                collapseMessage: 'Colapsar Todo',
              },
              select: {
                cells: {
                  1: '1 celda seleccionada',
                  _: '%d celdas seleccionadas',
                },
                columns: {
                  1: '1 columna seleccionada',
                  _: '%d columnas seleccionadas',
                },
                rows: {
                  1: '1 fila seleccionada',
                  _: '%d filas seleccionadas',
                },
              },
              thousands: '.',
              datetime: {
                previous: 'Anterior',
                next: 'Proximo',
                hours: 'Horas',
                minutes: 'Minutos',
                seconds: 'Segundos',
                unknown: '-',
                amPm: ['AM', 'PM'],
                months: {
                  0: 'Enero',
                  1: 'Febrero',
                  10: 'Noviembre',
                  11: 'Diciembre',
                  2: 'Marzo',
                  3: 'Abril',
                  4: 'Mayo',
                  5: 'Junio',
                  6: 'Julio',
                  7: 'Agosto',
                  8: 'Septiembre',
                  9: 'Octubre',
                },
                weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
              },
              editor: {
                close: 'Cerrar',
                create: {
                  button: 'Nuevo',
                  title: 'Crear Nuevo Registro',
                  submit: 'Crear',
                },
                edit: {
                  button: 'Editar',
                  title: 'Editar Registro',
                  submit: 'Actualizar',
                },
                remove: {
                  button: 'Eliminar',
                  title: 'Eliminar Registro',
                  submit: 'Eliminar',
                  confirm: {
                    _: '¿Está seguro que desea eliminar %d filas?',
                    1: '¿Está seguro que desea eliminar 1 fila?',
                  },
                },
                error: {
                  system:
                    'Ha ocurrido un error en el sistema (<a target="\\" rel="\\ nofollow" href="\\">Más información&lt;\\/a&gt;).</a>',
                },
                multi: {
                  title: 'Múltiples Valores',
                  info: 'Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.',
                  restore: 'Deshacer Cambios',
                  noMulti:
                    'Este registro puede ser editado individualmente, pero no como parte de un grupo.',
                },
              },
              info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
              stateRestore: {
                creationModal: {
                  button: 'Crear',
                  name: 'Nombre:',
                  order: 'Clasificación',
                  paging: 'Paginación',
                  search: 'Busqueda',
                  select: 'Seleccionar',
                  columns: {
                    search: 'Búsqueda de Columna',
                    visible: 'Visibilidad de Columna',
                  },
                  title: 'Crear Nuevo Estado',
                  toggleLabel: 'Incluir:',
                },
                emptyError: 'El nombre no puede estar vacio',
                removeConfirm: '¿Seguro que quiere eliminar este %s?',
                removeError: 'Error al eliminar el registro',
                removeJoiner: 'y',
                removeSubmit: 'Eliminar',
                renameButton: 'Cambiar Nombre',
                renameLabel: 'Nuevo nombre para %s',
                duplicateError: 'Ya existe un Estado con este nombre.',
                emptyStates: 'No hay Estados guardados',
                removeTitle: 'Remover Estado',
                renameTitle: 'Cambiar Nombre Estado',
              },
          },
      });

  })

}

function DibujarTablaInventarios(datos) {

  MandarInfoAjax(datos, (respuesta) => {

    console.log(respuesta);

    const dataSet = respuesta.map((element, index) => {
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

        const total_entradas = Math.round(element.total_entradas * 100) / 100;
        const total_salidas = Math.round(element.total_salidas * 100) / 100;
        const diferencia = Math.round(element.diferencia * 100) / 100;

        return [
            index + 1,
            element.almacen,
            element.producto,
            total_entradas,
            total_salidas,
            diferencia,
            acciones,

        ];
    });

    dataTable = $("#datatable_inventario").DataTable({
        destroy: true,
        responsive: true,
        autoWidth: false,
        data: dataSet,
        language: {
            processing: 'Procesando...',
            lengthMenu: 'Mostrar _MENU_ registros',
            zeroRecords: 'No se encontraron resultados',
            emptyTable: 'Ningún dato disponible en esta tabla',
            infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
            infoFiltered: '(filtrado de un total de _MAX_ registros)',
            search: 'Buscar:',
            infoThousands: ',',
            loadingRecords: 'Cargando...',
            paginate: {
              first: 'Primero',
              last: 'Último',
              next: 'Siguiente',
              previous: 'Anterior',
            },
            aria: {
              sortAscending: ': Activar para ordenar la columna de manera ascendente',
              sortDescending: ': Activar para ordenar la columna de manera descendente',
            },
            buttons: {
              copy: 'Copiar',
              colvis: 'Visibilidad',
              collection: 'Colección',
              colvisRestore: 'Restaurar visibilidad',
              copyKeys:
                'Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.',
              copySuccess: {
                1: 'Copiada 1 fila al portapapeles',
                _: 'Copiadas %ds fila al portapapeles',
              },
              copyTitle: 'Copiar al portapapeles',
              csv: 'CSV',
              excel: 'Excel',
              pageLength: {
                '-1': 'Mostrar todas las filas',
                _: 'Mostrar %d filas',
              },
              pdf: 'PDF',
              print: 'Imprimir',
              renameState: 'Cambiar nombre',
              updateState: 'Actualizar',
              createState: 'Crear Estado',
              removeAllStates: 'Remover Estados',
              removeState: 'Remover',
              savedStates: 'Estados Guardados',
              stateRestore: 'Estado %d',
            },
            autoFill: {
              cancel: 'Cancelar',
              fill: 'Rellene todas las celdas con <i>%d</i>',
              fillHorizontal: 'Rellenar celdas horizontalmente',
              fillVertical: 'Rellenar celdas verticalmentemente',
            },
            decimal: ',',
            searchBuilder: {
              add: 'Añadir condición',
              button: {
                0: 'Constructor de búsqueda',
                _: 'Constructor de búsqueda (%d)',
              },
              clearAll: 'Borrar todo',
              condition: 'Condición',
              conditions: {
                date: {
                  after: 'Despues',
                  before: 'Antes',
                  between: 'Entre',
                  empty: 'Vacío',
                  equals: 'Igual a',
                  notBetween: 'No entre',
                  notEmpty: 'No Vacio',
                  not: 'Diferente de',
                },
                number: {
                  between: 'Entre',
                  empty: 'Vacio',
                  equals: 'Igual a',
                  gt: 'Mayor a',
                  gte: 'Mayor o igual a',
                  lt: 'Menor que',
                  lte: 'Menor o igual que',
                  notBetween: 'No entre',
                  notEmpty: 'No vacío',
                  not: 'Diferente de',
                },
                string: {
                  contains: 'Contiene',
                  empty: 'Vacío',
                  endsWith: 'Termina en',
                  equals: 'Igual a',
                  notEmpty: 'No Vacio',
                  startsWith: 'Empieza con',
                  not: 'Diferente de',
                  notContains: 'No Contiene',
                  notStartsWith: 'No empieza con',
                  notEndsWith: 'No termina con',
                },
                array: {
                  not: 'Diferente de',
                  equals: 'Igual',
                  empty: 'Vacío',
                  contains: 'Contiene',
                  notEmpty: 'No Vacío',
                  without: 'Sin',
                },
              },
              data: 'Data',
              deleteTitle: 'Eliminar regla de filtrado',
              leftTitle: 'Criterios anulados',
              logicAnd: 'Y',
              logicOr: 'O',
              rightTitle: 'Criterios de sangría',
              title: {
                0: 'Constructor de búsqueda',
                _: 'Constructor de búsqueda (%d)',
              },
              value: 'Valor',
            },
            searchPanes: {
              clearMessage: 'Borrar todo',
              collapse: {
                0: 'Paneles de búsqueda',
                _: 'Paneles de búsqueda (%d)',
              },
              count: '{total}',
              countFiltered: '{shown} ({total})',
              emptyPanes: 'Sin paneles de búsqueda',
              loadMessage: 'Cargando paneles de búsqueda',
              title: 'Filtros Activos - %d',
              showMessage: 'Mostrar Todo',
              collapseMessage: 'Colapsar Todo',
            },
            select: {
              cells: {
                1: '1 celda seleccionada',
                _: '%d celdas seleccionadas',
              },
              columns: {
                1: '1 columna seleccionada',
                _: '%d columnas seleccionadas',
              },
              rows: {
                1: '1 fila seleccionada',
                _: '%d filas seleccionadas',
              },
            },
            thousands: '.',
            datetime: {
              previous: 'Anterior',
              next: 'Proximo',
              hours: 'Horas',
              minutes: 'Minutos',
              seconds: 'Segundos',
              unknown: '-',
              amPm: ['AM', 'PM'],
              months: {
                0: 'Enero',
                1: 'Febrero',
                10: 'Noviembre',
                11: 'Diciembre',
                2: 'Marzo',
                3: 'Abril',
                4: 'Mayo',
                5: 'Junio',
                6: 'Julio',
                7: 'Agosto',
                8: 'Septiembre',
                9: 'Octubre',
              },
              weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            },
            editor: {
              close: 'Cerrar',
              create: {
                button: 'Nuevo',
                title: 'Crear Nuevo Registro',
                submit: 'Crear',
              },
              edit: {
                button: 'Editar',
                title: 'Editar Registro',
                submit: 'Actualizar',
              },
              remove: {
                button: 'Eliminar',
                title: 'Eliminar Registro',
                submit: 'Eliminar',
                confirm: {
                  _: '¿Está seguro que desea eliminar %d filas?',
                  1: '¿Está seguro que desea eliminar 1 fila?',
                },
              },
              error: {
                system:
                  'Ha ocurrido un error en el sistema (<a target="\\" rel="\\ nofollow" href="\\">Más información&lt;\\/a&gt;).</a>',
              },
              multi: {
                title: 'Múltiples Valores',
                info: 'Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.',
                restore: 'Deshacer Cambios',
                noMulti:
                  'Este registro puede ser editado individualmente, pero no como parte de un grupo.',
              },
            },
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            stateRestore: {
              creationModal: {
                button: 'Crear',
                name: 'Nombre:',
                order: 'Clasificación',
                paging: 'Paginación',
                search: 'Busqueda',
                select: 'Seleccionar',
                columns: {
                  search: 'Búsqueda de Columna',
                  visible: 'Visibilidad de Columna',
                },
                title: 'Crear Nuevo Estado',
                toggleLabel: 'Incluir:',
              },
              emptyError: 'El nombre no puede estar vacio',
              removeConfirm: '¿Seguro que quiere eliminar este %s?',
              removeError: 'Error al eliminar el registro',
              removeJoiner: 'y',
              removeSubmit: 'Eliminar',
              renameButton: 'Cambiar Nombre',
              renameLabel: 'Nuevo nombre para %s',
              duplicateError: 'Ya existe un Estado con este nombre.',
              emptyStates: 'No hay Estados guardados',
              removeTitle: 'Remover Estado',
              renameTitle: 'Cambiar Nombre Estado',
            },
        },
    });

  })

}



$("#btnFiltro").on("click", async () => {

  filtroAlmacen = $("#filtroAlmacen").val();
  filtroProducto = $("#filtroProducto").val();
  filtroMovimientos = $("#filtroMov").val();

  let datos = {
    datosMov: {
      url: "ajax/movimientos.ajax.php",
      identificador: "ConsultarMovimiento",
      item: null,
      tabla: "movimientos",
      status: 1,
      orderby: "id",
      filtroAlmacen: filtroAlmacen,
      filtroProducto: filtroProducto,
      filtroMovimientos: filtroMovimientos
    },
    datosInv: {
      url: "ajax/movimientos.ajax.php",
      identificador: "ConsultarMovimiento",
      item: null,
      tabla: "inventario_view",
      orderby: "almacen",
      filtroAlmacen: filtroAlmacen,
      filtroProducto: filtroProducto,
    }
  }
  
  await initDataTable(datos);

})

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
        orderby: "id",
    }

    MandarInfoAjax(datos, (respuesta) => {

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