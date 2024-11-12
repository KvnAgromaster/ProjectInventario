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

    public function ajaxConsultarProducto() {

        $datos = $this -> producto;

        $respuesta = ModeloProductos::mdlMostrarProductos($datos);
        
        echo json_encode($respuesta);

    }

    public function ajaxEditarProducto() {

        $datos = $this -> producto;

        $respuesta = ModeloProductos::mdlMostrarProductos($datos);

        if ($respuesta) {

            if ($respuesta && $respuesta["status"] == 0) {

                echo json_encode("existe-desactivado");

            } else {

                echo json_encode("existe");

            }
            
        } else {

            $respuesta = ModeloProductos::mdlEditarProducto($datos);
            echo json_encode($respuesta);
        }

    }

    public $validacion;

    public function ajaxValidarInput() {

        $datos = $this -> validacion;
        $respuesta = ModeloProductos::mdlMostrarProductos($datos);
        
        
        if ($respuesta && $respuesta["status"] == 0) {

            echo json_encode("existe-desactivado");

        } else if ($respuesta) {
            
            echo json_encode("Si existe");
            
        } else {

            echo json_encode("no existe");

        }

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

if (isset($_POST["ConsultarProducto"])) {

    $consultarProducto = new AjaxProductos();
    $consultarProducto -> producto = $_POST["consultarDatos"];
    $consultarProducto -> ajaxConsultarProducto();

}

if (isset($_POST["EditarProducto"])) {

    $editarProducto = new AjaxProductos();
    $editarProducto -> producto = $_POST["editarDatos"];
    $editarProducto -> ajaxEditarProducto();

}

if (isset($_POST["ValidarProducto"])) {

    $validar = new AjaxProductos();
    $validar -> validacion = $_POST["datosValidar"];
    $validar -> ajaxValidarInput();

}
