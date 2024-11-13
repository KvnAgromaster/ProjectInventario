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

    public $validacion;

    public function ajaxValidarInput() {

        $datos = $this -> validacion;
        $respuesta = ModeloAlmacenes::mdlMostrarAlmacenes($datos);


        if ($respuesta && $respuesta["status"] == 0) {

            echo json_encode("existe-desactivado");

        } else if ($respuesta) {

            echo json_encode("Si existe");

        } else {

            echo json_encode("no existe");

        }

    }

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "AgregarAlmacen") {
    $Almacen  = new AjaxAlmacenes();
    $Almacen -> almacen = $_POST["datos"];
    $Almacen -> ajaxCrearAlmacen();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "ActivarAlmacen") {

    $activarAlmacen = new AjaxAlmacenes();
    $activarAlmacen -> almacen = $_POST["datos"];
    $activarAlmacen -> ajaxActualizarAlmacen();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "ValidarAlmacen") {

    $validar = new AjaxAlmacenes();
    $validar -> validacion = $_POST["datos"];
    $validar -> ajaxValidarInput();

}