<?php

require_once "conexion.php";

class ModeloMovimientos {

    // Ingresar Movimiento

    static public function mdlIngresarMovimiento($datos){

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(almacen, producto, cantidad, tipo_movimiento) VALUES (:almacen, :producto, :cantidad, :tipo_mov)");

        $stmt->bindParam(":producto", $aux["producto"], PDO::PARAM_STR);
        $stmt->bindParam(":almacen", $aux["almacen"], PDO::PARAM_STR);
        $stmt->bindParam(":cantidad", $aux["cantidad"], PDO::PARAM_STR);
        $stmt->bindParam(":tipo_mov", $aux["tipoMov"], PDO::PARAM_INT);

		if($stmt->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

	}

}