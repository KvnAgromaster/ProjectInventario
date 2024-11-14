<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Inventario
        <small>Panel de Control</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">

      <div class="box-header with-border">
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarMovimiento">Agregar Nuevo Movimiento</button>
      </div>

      <!-- Default box -->
      <div class="box">
        <div class="box-body">
        <table class="table table-striped tablas">
          <thead>
            <th>#</th>
            <th>Almacen</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </thead>

        </table>
        </div>

      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

<div id="modalAgregarMovimiento" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">

      <form role="form" enctype="multipart/form-data">

        <!-- header modal -->

        <div class="modal-header" style="background: #3c8dbc; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Agregar Movimiento</h4>
        </div>

        <div class="modal-body">
          <div class="box-body">
            <!-- Input para el producto en movimiento -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-th"></i></span> 

                <select class="form-control input-lg" id="productoMov" name="productoMov" required>
                  <option value="" >Selecionar Producto</option>

                  <?php

                    $item = null;
                    $valor = null;

                    $json = array("tabla" => "productos",
                                      "item" => $item,
                                      "valor" => $valor);

                    $datos = json_encode($json);

                    $productos = ModeloProductos::mdlMostrarProductos($datos);

                    foreach ($productos as $key => $value) {
                      
                      echo '<option value="'.$value["producto"].'">'.$value["producto"].'</option>';
                    }

                  ?>

                </select>

              </div>
            </div>

            <!-- Input para el almacen en movimiento -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-th"></i></span> 

                <select class="form-control input-lg" id="almacenMov" name="almacenMov" required>
                  <option value="" >Selecionar Almacen</option>

                  <?php

                    $item = null;
                    $valor = null;

                    $json = array("tabla" => "almacenes",
                                      "item" => $item,
                                      "valor" => $valor);

                    $datos = json_encode($json);

                    $almacenes = ModeloAlmacenes::mdlMostrarAlmacenes($datos);

                    foreach ($almacenes as $key => $value) {
                      
                      echo '<option value="'.$value["almacen"].'">'.$value["almacen"].'</option>';
                    }

                  ?>

                </select>

              </div>
            </div>
            
            <!-- Input para la cantidad -->
            <div class="form-group row">
              <div class="col-xs-6">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
                  <input type="number" onkeydown="return event.keyCode !== 69" class="form-control input-lg" name="cantidadMov" id="cantidadMov" min="0" placeholder="Cantidad" required>
                </div>
              </div>

              <div class="col-xs-6"> 

                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-th"></i></span> 

                  <select class="form-control input-lg" id="tipoMov" name="tipoMov" required>
                    <option value="">Selecionar Movimiento</option>
                    <option value="1">Entrada</option>
                    <option value="0">Salida</option>

                  </select>

                </div>

              </div>

            </div>
          </div>
        </div>

        <!-- modal footer -->

        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
          <button type="button" id="btnModalAgregarMovimiento" class="btn btn-primary">Guardar</button>
        </div>

      </form>

    </div>

  </div>

</div>