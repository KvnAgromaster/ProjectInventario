<?php

require_once "conexion.php";

class ModeloProductos {

	// Mostrar Productos
    static public function mdlMostrarProductos($datos) {

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

            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY producto");
            $stmt -> execute();

            return $stmt -> fetchAll();
        }

        $stmt -> close();
        $stmt = null;

        
    }

    // Ingresar Productos

    static public function mdlIngresarProducto($datos){

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];
		$item = $aux["item"];

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla($item, status) VALUES (:producto, :status)");

        $stmt->bindParam(":producto", $aux["valor"], PDO::PARAM_STR);
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

	static public function mdlActualizarProducto($datos) {

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


		} else if ($item == "producto") {

			$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET status = 1 WHERE $item = :producto");
			$stmt -> bindParam(":producto", $aux["valor"], PDO::PARAM_STR);

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

	static public function mdlEditarProducto($datos) {

		$aux = json_decode($datos, true);

		$tabla = $aux["tabla"];

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET producto = :producto, ultima_modificacion = :ultima_modificacion WHERE id = :id");
			$stmt -> bindParam(":producto", $aux["valor"], PDO::PARAM_STR);
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

