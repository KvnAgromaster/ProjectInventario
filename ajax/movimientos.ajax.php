<?php

require_once "../modelos/movimientos.modelo.php";

class AjaxMovimientos {

    public $mov;

    public function ajaxCrearMovimiento() {

        $datos = $this -> mov;
        $respuesta = ModeloMovimientos::mdlIngresarMovimiento($datos);
        echo json_encode($respuesta);

    }

}

if (isset($_POST["identificador"]) && $_POST["identificador"] == "AgregarMovimiento") {

    $Movimiento = new AjaxMovimientos();
    $Movimiento -> mov = $_POST["datos"];
    $Movimiento -> ajaxCrearMovimiento();

}