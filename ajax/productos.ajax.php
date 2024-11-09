<?php

require_once "../modelos/productos.modelo.php";

class AjaxProductos {

    public $producto;

    public function ajaxCrearProducto() {

        $datos = $this -> producto;

        $respuesta = ModeloProductos::mdlMostrarProductos($datos);

        if (!$respuesta) {

            $respuesta = ModeloProductos::mdlIngresarProducto($datos);

            echo json_encode($respuesta);

        } else if ($respuesta && $respuesta["status"] == 0) {

            echo json_encode("Validacion");


        } else {

            echo json_encode("ya-hay-registro");

        }  

    }

    public $idProducto;

    public function ajaxActualizarProducto() {

        $datos = $this -> producto;

        $respuesta = ModeloProductos::mdlActualizarProducto($datos);

        echo json_encode($respuesta);

    }

}

if (isset($_POST["AgregarProducto"])) {
    $Producto = new AjaxProductos();
    $Producto -> producto = $_POST["datos"];
    $Producto -> ajaxCrearProducto();

}

if (isset($_POST["EliminarProducto"])) {

    $ID = new AjaxProductos();
    $ID -> producto = $_POST["datosEliminar"];
    $ID -> ajaxActualizarProducto();

}

if (isset($_POST["ActivarProducto"])) {

    $Producto = new AjaxProductos();
    $Producto -> producto = $_POST["datosActivar"];
    $Producto -> ajaxActualizarProducto();

}
