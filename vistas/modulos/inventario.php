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

    <div class="actionContainer">
      <div class="box-header with-border">
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarMovimiento">
          <i class="fa fa-plus"></i>
          Nuevo Movimiento
        </button>
      </div>

      <div class = "filter-container">

        <div class="col-xs-6">
          <select class="form-control" id="filtroAlmacen" name="filtroAlmacen" required>
            <option value="">Todos Almacenes</option>

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

        <div class="col-xs-6">
          <select class="form-control" id="filtroProducto" name="filtroProducto" required>
            <option value="">Todos Productos</option>

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

        <div class="box-header with-border">

          <button class="btn btn-primary" id="btnFiltro">
            <i class="fa fa-filter"></i>
            FILTRAR
          </button>
        </div>

      </div>
    </div>

   

    <!-- Default box -->
    <div class="box">
      <div class="box-body">
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li>
              <a href="#tab_1" data-toggle="tab"><i class="fa fa-th-list"></i><strong> INVENTARIOS</strong></a>
            </li>

            <li class="active">
              <a href="#tab_2" data-toggle="tab"><i class="fa fa-exchange"></i><strong> MOVIMIENTOS</strong></a>
            </li>

          </ul>
          <div class="tab-content">

            <div class="tab-pane" id="tab_1">
              <table class="table table-striped table-condensed" id="datatable_inventario">
                <thead>
                  <th>#</th>
                  <th>Almacen</th>
                  <th>Producto</th>
                  <th>Total Entradas</th>
                  <th>Total Salidas</th>
                  <th>Diferencia</th>
                  <th>Acciones</th>
                </thead>
                <tbody>
                  
                </tbody> 
              </table>
            </div>

            <div class="tab-pane active" id="tab_2">

              <div class="filterMovContainer">
                <div class="col-xs-2 filterMov">
                  <select class="form-control" id="filtroMov" name="filtroMov" required>
                    <option value="">Todos Movimientos</option>
                    <option value="1">Entrada</option>
                    <option value="0">Salida</option>

                  </select>

                </div>
              </div>
              
              <div class="table-container">
                <table class="table table-condensed" id="datatable_movimientos">
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
                    
                  </tbody> 
                </table>
              </div>
              
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
                </div>
                <input type="hidden" id="idMovActual">
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
