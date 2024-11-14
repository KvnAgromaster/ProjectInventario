<?php

require_once "conexion.php";

class ModeloMovimientos {

    // Mostrar Movimientos
    static public function mdlMostrarMovimientos($datos) {

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

            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY id DESC");
            $stmt -> execute();

            return $stmt -> fetchAll();
        }

        $stmt -> close();
        $stmt = null;

        
    }

    // Ingresar Movimiento

    static public function mdlIngresarMovimiento($datos){

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(almacen, producto, cantidad, tipo_movimiento, status) VALUES (:almacen, :producto, :cantidad, :tipo_mov, :status)");

        $stmt->bindParam(":producto", $aux["producto"], PDO::PARAM_STR);
        $stmt->bindParam(":almacen", $aux["almacen"], PDO::PARAM_STR);
        $stmt->bindParam(":cantidad", $aux["cantidad"], PDO::PARAM_STR);
        $stmt->bindParam(":tipo_mov", $aux["tipoMov"], PDO::PARAM_INT);
        $stmt->bindParam(":status", $aux["status"], PDO::PARAM_STR);

		if($stmt->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

	}

}