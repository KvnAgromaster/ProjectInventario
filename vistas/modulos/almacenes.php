<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Almacenes
        <small>Panel de Control</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Examples</a></li>
        <li class="active">Blank page</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

        <div class="box-header with-border">
          <button class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarAlmacen">Agregar</button>
        </div>

      <!-- Default box -->
      <div class="box">
        <div class="box-body">
          <table class="table table-bordered table-striped tablas" style="padding: 5px;">

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
              <tr>
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

                    $index += 1; // Incremento

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

                ?>

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