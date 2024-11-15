<?php

require_once "../modelos/movimientos.modelo.php";

class AjaxMovimientos {

    public $mov;

    public function ajaxCrearMovimiento() {

        $datos = $this -> mov;
        $respuesta = ModeloMovimientos::mdlIngresarMovimiento($datos);
        echo json_encode($respuesta);

    }

    public function ajaxEliminarMovimiento() {

        $datos = $this -> mov;
        $respuesta = ModeloMovimientos::mdlEliminarMovimiento($datos);
        echo json_encode($respuesta);

    }

    public function ajaxConsultarMovimiento() {

        $datos = $this -> mov;

        $respuesta = ModeloMovimientos::mdlMostrarMovimientos($datos);
        
        echo json_encode($respuesta);

    }

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "AgregarMovimiento") {

    $Movimiento = new AjaxMovimientos();
    $Movimiento -> mov = $_POST["datos"];
    $Movimiento -> ajaxCrearMovimiento();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "EliminarMovimiento") {

    $Movimiento = new AjaxMovimientos();
    $Movimiento -> mov = $_POST["datos"];
    $Movimiento -> ajaxEliminarMovimiento();

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "ConsultarMovimiento") {

    $Movimiento = new AjaxMovimientos();
    $Movimiento -> mov = $_POST["datos"];
    $Movimiento -> ajaxConsultarMovimiento();

}