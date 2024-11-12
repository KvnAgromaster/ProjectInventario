<?php

require_once "conexion.php";

class ModeloAlmacenes {

    // Mostrar almacenes
    static public function mdlMostrarAlmacenes($datos) {

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];
		$item = $aux["item"];
		$valor = $aux["valor"];

		if ($item != null) {
            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE $item = :$item ORDER BY id DESC");
            $stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);
            $stmt -> execute();

            return $stmt -> fetch();

        } else {

            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla");
            $stmt -> execute();

            return $stmt -> fetchAll();
        }

        $stmt -> close();
        $stmt = null;

        
    }

}