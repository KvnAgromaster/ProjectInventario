<?php

require_once "../modelos/productos.modelo.php";

class AjaxProductos {

    public $producto;

    public function ajaxCrearProducto() {

        $tabla = "productos";

        $status = 1;

        $stock = 0;

        $item = "producto";

        $valor = $this -> producto;

        $respuesta = ModeloProductos::mdlMostrarProductos($tabla, $item, $valor);

        if (!$respuesta) {

            $datos = array("producto" => $valor,
                        "stock" => $stock,
                        "status" => $status);

            $respuesta = ModeloProductos::mdlIngresarProducto($tabla, $datos);
            echo json_encode($respuesta);

        } else if ($respuesta && $respuesta["status"] == 0) {

            echo "Validacion";


        } else {

            echo "ya-hay-registro";

        }

        

    }

    public $idProducto;

    public function ajaxEliminarProducto() {

        $datos = $this -> idProducto;

        $respuesta = ModeloProductos::mdlEliminarProducto("productos", $datos);

        echo json_encode($respuesta);

    }

    public $nombreProducto;

    public function ajaxActualizarProducto() {

        $datos = $this -> nombreProducto;

        $respuesta = ModeloProductos::mdlActualizarProducto("productos", $datos);

        echo json_encode("Hola123");

    }

}

if (isset($_POST["producto"])) {

    $Producto = new AjaxProductos();
    $Producto -> producto = $_POST["producto"];
    $Producto -> ajaxCrearProducto();

}

if (isset($_POST["idProducto"])) {

    $ID = new AjaxProductos();
    $ID -> idProducto = $_POST["idProducto"];
    $ID -> ajaxEliminarProducto();

}

if (isset($_POST["nombreProducto"])) {

    $Producto = new AjaxProductos();
    $Producto -> producto = $_POST["nombreProducto"];
    $Producto -> ajaxActualizarProducto();

}
