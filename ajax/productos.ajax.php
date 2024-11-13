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

if (isset($_POST["identificador"]) && $_POST["identificador"] == "AgregarProducto") {
    $Producto = new AjaxProductos();
    $Producto -> producto = $_POST["datos"];
    $Producto -> ajaxCrearProducto();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "EliminarProducto") {

    $ID = new AjaxProductos();
    $ID -> producto = $_POST["datos"];
    $ID -> ajaxActualizarProducto();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "ActivarProducto") {

    $activarProducto = new AjaxProductos();
    $activarProducto -> producto = $_POST["datos"];
    $activarProducto -> ajaxActualizarProducto();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "ConsultarProducto") {

    $consultarProducto = new AjaxProductos();
    $consultarProducto -> producto = $_POST["datos"];
    $consultarProducto -> ajaxConsultarProducto();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "EditarProducto") {

    $editarProducto = new AjaxProductos();
    $editarProducto -> producto = $_POST["datos"];
    $editarProducto -> ajaxEditarProducto();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "ValidarProducto") {

    $validar = new AjaxProductos();
    $validar -> validacion = $_POST["datos"];
    $validar -> ajaxValidarInput();

}
