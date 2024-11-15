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

    // ACTUALIZAR PRODUCTO

	static public function mdlEliminarMovimiento($datos) {

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];
		$item = $aux["item"];

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET status = 0 WHERE $item = :id");
		$stmt -> bindParam(":id", $aux["valor"], PDO::PARAM_INT);

        if($stmt->execute()){

            return "ok";

        }else{

            return "error";
        
        }

		$stmt->close();
		$stmt = null;

    }

    // EDITAR MOVIMIENTO

	static public function mdlEditarMovimiento($datos) {

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET almacen = :almacen, producto = :producto, cantidad = :cantidad, tipo_movimiento = :tipo_movimiento, ultima_modificacion = :ultima_modificacion WHERE id = :id");
			$stmt -> bindParam(":producto", $aux["producto"], PDO::PARAM_STR);
            $stmt -> bindParam(":almacen", $aux["almacen"], PDO::PARAM_STR);
            $stmt -> bindParam(":cantidad", $aux["cantidad"], PDO::PARAM_STR);
            $stmt -> bindParam(":tipo_movimiento", $aux["tipoMov"], PDO::PARAM_INT);
			$stmt -> bindParam(":ultima_modificacion", $aux["fecha"], PDO::PARAM_STR);
			$stmt -> bindParam(":id", $aux["id"], PDO::PARAM_INT);

			if($stmt->execute()){

				return "ok";

			}else{

				return "error";
			
			}

		$stmt->close();
		$stmt = null;

	}

}