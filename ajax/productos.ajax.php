<?php

require_once "../modelos/productos.modelo.php";

class AjaxProductos {

    public $producto;

    public function ajaxCrearProducto() {

        $tabla = "productos";

        $status = 1;

        $stock = 0;

        $valor = $this -> producto;

        $datos = array("producto" => $valor,
                        "stock" => $stock,
                        "status" => $status);

        $respuesta = ModeloProductos::mdlIngresarProducto($tabla, $datos);

    }

}

if (isset($_POST["producto"])) {

    $Producto = new AjaxProductos();
    $Producto -> producto = $_POST["producto"];
    $Producto -> ajaxCrearProducto();

}
