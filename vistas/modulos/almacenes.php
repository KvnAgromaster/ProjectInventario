<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      Almacenes
      <small>Panel de Control</small>
    </h1>
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="box-header with-border">
      <div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarAlmacen">
          <i class="fa fa-plus"></i>
            Agregar
        </button>
      </div>
    </div>

    <!-- Default box -->
    <div class="box box-primary">
      <div class="box-body">
        <table class="table table-striped tablas">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Agregado</th>
              <th>Ultima Modificacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            
            <?php

              $item = null;
              $valor = null;

              // Creacion de JSON 

              $json = array("tabla" => "almacenes",
                              "item" => $item,
                              "valor" => $valor);

              $datos = json_encode($json);
                              

              $index = 0;

              $almacenes = ModeloAlmacenes::mdlMostrarAlmacenes($datos);

              foreach ($almacenes as $key => $value) {

                if ($value["status"] == 1) {

                  $index++; // Incremento

                  echo '<tr>
                  <td>'.$index.'</td>
                  <td>'.$value["almacen"].'</td>
                  <td>'.$value["direccion"].'</td>
                  <td>'.$value["fecha"].'</td>';

                  if ($value["ultima_modificacion"]) {

                    echo '<td>'.$value["ultima_modificacion"].'</td>';

                  } else {

                    echo '<td> - </td>';

                  }

                  echo '<td>
                          <div class="btn-group">
                            <button class="btn btn-warning btnEditarAlmacen" idAlmacen="'.$value["id"].'" data-toggle="modal" data-target="#modalEditarAlmacen"><i class="fa fa-pencil"></i></button>

                            <button class="btn btn-danger btnEliminarAlmacen" idAlmacen="'.$value["id"].'" ><i class="fa fa-times"></i></button>
                          </div>
                        </td>';
                }

              }

              ?>

          </tbody>

        </table>

      </div>
      
    </div>
    <!-- /.box -->

  </section>
  <!-- /.content -->
</div>
  <!-- /.content-wrapper -->

<div id="modalAgregarAlmacen" class="modal fade" role="dialog">

  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">

      <form role="form" enctype="multipart/form-data">

        <!-- header modal -->

        <div class="modal-header" style="background: #3c8dbc; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Agregar almacen</h4>
        </div>

        <div class="modal-body">
          <div class="box-body">
            <!-- Input para el nombre del almacen -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-code"></i></span>
                <input type="text" class="form-control input-lg" name="nuevoAlmacen" id="nuevoAlmacen" placeholder="Ingresar Almacen" required>
              </div>
            </div>
            
            <!-- Input para la direccion -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
                <input type="text" class="form-control input-lg" name="nuevaDireccion" id="nuevaDireccion" placeholder="Ingresar direccion" required>
              </div>
            </div>
          </div>
        </div>

        <!-- modal footer -->

        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
          <button type="button" id="btnModalAgregarAlmacen" class="btn btn-primary">Guardar</button>
        </div>

      </form>

    </div>

  </div>

</div>

<div id="modalEditarAlmacen" class="modal fade" role="dialog">

  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">

      <form role="form" enctype="multipart/form-data">

        <!-- header modal -->

        <div class="modal-header" style="background: #3c8dbc; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Editar almacen</h4>
        </div>

        <div class="modal-body">
          <div class="box-body">
            <!-- Input para el nombre del almacen -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-code"></i></span>
                <input type="text" class="form-control input-lg" name="editarAlmacen" id="editarAlmacen" placeholder="Ingresar Almacen" required>
                <input type="hidden" id="idAlmacenActual">
              </div>
            </div>
            
            <!-- Input para la direccion -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
                <input type="text" class="form-control input-lg" name="editarDireccion" id="editarDireccion" placeholder="Ingresar direccion" required>
              </div>
            </div>
          </div>
        </div>

        <!-- modal footer -->

        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
          <button type="button" id="btnModalEditarAlmacen" class="btn btn-primary">Modificar</button>
        </div>

      </form>

    </div>

  </div>

</div>