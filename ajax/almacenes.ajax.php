<?php

require_once "../modelos/almacenes.modelo.php";

class AjaxAlmacenes {

    public $almacen;

    public function ajaxCrearAlmacen() {

        $datos = $this -> almacen;

        $respuesta = ModeloAlmacenes::mdlMostrarAlmacenes($datos);

        if (!$respuesta) {

            $respuesta = ModeloAlmacenes::mdlIngresarAlmacen($datos);

            echo json_encode($respuesta);


        } else if ($respuesta && $respuesta["status"] == 0) {

            echo json_encode("Validacion");


        } else {

            echo json_encode("ya-hay-registro");

        }  

    }

    public $idAlmacen;

    public function ajaxActualizarAlmacen() {

        $datos = $this -> almacen;

        $respuesta = ModeloAlmacenes::mdlActualizarAlmacen($datos);

        echo json_encode($respuesta);

    }

}

if (isset($_POST["AgregarAlmacen"])) {
    $Almacen  = new AjaxAlmacenes();
    $Almacen -> almacen = $_POST["datos"];
    $Almacen -> ajaxCrearAlmacen();

}

if (isset($_POST["ActivarAlmacen"])) {

    $Almacen = new AjaxAlmacenes();
    $Almacen -> almacen = $_POST["datosActivar"];
    $Almacen -> ajaxActualizarAlmacen();

}