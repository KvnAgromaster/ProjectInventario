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
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarMovimiento">Nuevo Movimiento</button>
      </div>

      <!-- Default box -->
      <div class="box">
        <div class="box-body">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">

              <li>
                <a href="#tab_1" data-toggle="tab"><Strong>Inventarios</Strong></a>
              </li>

              <li class="active">
                <a href="#tab_2" data-toggle="tab"><strong>Movimientos</strong></a>
              </li>

            </ul>
            <div class="tab-content">

              <div class="tab-pane" id="tab_1">
                Hola
              </div>

              <div class="tab-pane active" id="tab_2">
                <table class="table table-striped table-condensed tablas">
                  <thead>
                    <th>#</th>
                    <th>Almacen</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Ultima Modificacion</th>
                    <th>Acciones</th>
                  </thead>
                  <tbody>
                    <?php 

                      $item = null;
                      $valor = null;

                      // Creacion de JSON 

                      $json = array("tabla" => "movimientos",
                                      "item" => $item,
                                      "valor" => $valor);

                      $datos = json_encode($json);
                                      
                      $index = 0;

                      $movimientos = ModeloMovimientos::mdlMostrarMovimientos($datos);

                      foreach ($movimientos as $key => $value) {

                        if ($value["status"] == 1) {

                          $index++;  // Incremento

                          if ($value["tipo_movimiento"] == 1) { //ENTRADA

                            echo '<tr class="success">';

                          } else {

                            echo '<tr class="danger">';

                          }

                          echo '<td>'.$index.'</td>
                              <td>'.$value["almacen"].'</td>
                              <td>'.$value["producto"].'</td>
                              
                              <td>'.round($value["cantidad"], 2).'</td>
                              <td>'.$value["fecha"].'</td>';

                          if ($value["ultima_modificacion"]) {

                            echo '<td>'.$value["ultima_modificacion"].'</td>';
    
                          } else {
    
                            echo '<td> - </td>';
                          
                          }
        

                          echo '<td>
                                    <div class="btn-group">
                                      <button class="btn btn-xs btn-warning btnEditarMovimiento" idMovimiento="'.$value["id"].'" data-toggle="modal" data-target="#modalEditarMovimiento"><i class="fa fa-pencil"></i></button>
                                      <button class="btn btn-xs btn-danger btnEliminarMovimiento" idMovimiento="'.$value["id"].'" ><i class="fa fa-times"></i></button>
                                    </div>
                                  </td>';

                        }

                      }

                    ?>
                  </tbody>
                </table>
              </div>
            </div>     
          </div>
      
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

<div id="modalEditarMovimiento" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">

      <form role="form" enctype="multipart/form-data">

        <!-- header modal -->

        <div class="modal-header" style="background: #3c8dbc; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Editar Movimiento</h4>
        </div>

        <div class="modal-body">
          <div class="box-body">
            <!-- Input para el producto en movimiento -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-th"></i></span> 

                <select class="form-control input-lg" id="_productoMovEditar" name="_productoMovEditar" required>
                  <option value="" id="productoMovEditar"></option>

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

                <select class="form-control input-lg" id="_almacenMovEditar" name="_almacenMovEditar" required>
                  <option value="" id="almacenMovEditar"></option>

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
                  <input type="number" onkeydown="return event.keyCode !== 69" class="form-control input-lg" name="cantidadMovEditar" id="cantidadMovEditar" min="0" placeholder="Cantidad" required>
                  <input type="hidden" id="idMovActual">
                </div>
              </div>

              <div class="col-xs-6"> 

                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-th"></i></span> 

                  <select class="form-control input-lg" id="_tipoMovEditar" name="_tipoMovEditar" required>
                    <option value="" id="tipoMovEditar"></option>
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
          <button type="button" id="btnModalEditarMovimiento" class="btn btn-primary">Modificar</button>
        </div>

      </form>

    </div>

  </div>

</div>
