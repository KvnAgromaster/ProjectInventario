<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Inicio
        <small>Panel de Control</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">

      <div class="box-header with-border">
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarProducto">Agregar</button>
      </div>

      <!-- Default box -->
      <div class="box box-primary">
        <div class="box-body">
            <table class="table table-bordered table-striped tablas" style="padding: 5px;">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Stock</th>
                  <th>Agregado</th>
                  <th>Ultima Modificacion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Papa</td>
                  <td>10</td>
                  <td>2024-10-31 08:30:32</td>
                  <td>2024-10-31 08:30:32</td>        
                  <td>
                      <div class="btn-group">
                        <button class="btn btn-warning"><i class="fa fa-pencil"></i></button>
                        <button class="btn btn-danger"><i class="fa fa-times"></i></button>
                      </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Zanahoria</td>
                  <td>10</td>
                  <td>2024-10-31 08:30:32</td>
                  <td>2024-10-31 08:30:32</td>        
                  <td>
                      <div class="btn-group">
                        <button class="btn btn-warning"><i class="fa fa-pencil"></i></button>
                        <button class="btn btn-danger"><i class="fa fa-times"></i></button>
                      </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
      </div>
      <!-- /.box -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

<!-- Modal -->
<div id="modalAgregarProducto" class="modal fade" role="dialog">

  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">

      <form role="form" enctype="multipart/form-data">

        <!-- header modal -->

        <div class="modal-header" style="background: #3c8dbc; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Agregar producto</h4>
        </div>

        <div class="modal-body">
          <div class="box-body">
            <!-- Input para el nombre del producto -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-code"></i></span>
                <input type="text" class="form-control input-lg" name="nuevoProducto" id="nuevoProducto" placeholder="Ingresar producto" required>
              </div>
            </div>

          </div>
        </div>

        <!-- modal footer -->

        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>

      </form>

      <?php
        // $crearProducto =  new ControladorProductos();
        // $crearProducto -> ctrCrearProducto();

      ?>

    </div>

  </div>

</div>