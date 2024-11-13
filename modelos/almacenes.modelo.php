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

    // Ingresar Productos

    static public function mdlIngresarAlmacen($datos){

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];
		$item = $aux["item"];
        $item2 = $aux["item2"];

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla($item, $item2, status) VALUES (:almacen, :direccion, :status)");

        $stmt->bindParam(":almacen", $aux["valor"], PDO::PARAM_STR);
        $stmt->bindParam(":direccion", $aux["direccion"], PDO::PARAM_STR);
        $stmt->bindParam(":status", $aux["status"], PDO::PARAM_INT);

		if($stmt->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

	}

    // ACTUALIZAR PRODUCTO

	static public function mdlActualizarAlmacen($datos) {

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];
		$item = $aux["item"];

		if ($item == "id") {

			$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET status = 0 WHERE $item = :id");
			$stmt -> bindParam(":id", $aux["valor"], PDO::PARAM_INT);

			if($stmt->execute()){

				return "ok";

			}else{

				return "error";
			
			}


		} else if ($item == "almacen") {

			$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET status = 1 WHERE $item = :almacen");
			$stmt -> bindParam(":almacen", $aux["valor"], PDO::PARAM_STR);

			if($stmt->execute()){

				return "ok";

			}else{

				return "error";
			
			}

		}

		// $stmt->close();
		// $stmt = null;
    }

	// EDITAR PRODUCTO

	static public function mdlEditarAlmacen($datos) {

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET almacen = :almacen, direccion = :direccion, ultima_modificacion = :ultima_modificacion WHERE id = :id");
			$stmt -> bindParam(":almacen", $aux["valor"], PDO::PARAM_STR);
			$stmt -> bindParam(":direccion", $aux["direccion"], PDO::PARAM_STR);
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