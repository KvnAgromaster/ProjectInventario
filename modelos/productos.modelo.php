<?php

require_once "conexion.php";

class ModeloProductos {
	
	// Mostrar Productos
    static public function mdlMostrarProductos($tabla, $item, $valor) {

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

    static public function mdlIngresarProducto($tabla, $datos){

		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(producto, stock, status) VALUES (:producto, :stock, :status)");

        $stmt->bindParam(":producto", $datos["producto"], PDO::PARAM_STR);
		$stmt->bindParam(":stock", $datos["stock"], PDO::PARAM_INT);
        $stmt->bindParam(":status", $datos["status"], PDO::PARAM_INT);

		if($stmt->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

	}

	// ELIMINAR PRODUCTO

	static public function mdlEliminarProducto($tabla, $datos) {
		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET status = 0 WHERE id = :id");
        $stmt -> bindParam(":id", $datos, PDO::PARAM_INT);

        if($stmt->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

    }

	// ACTIVAR PRODUCTO

	static public function mdlActivarProducto($tabla, $datos) {
		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET status = 1 WHERE producto = :producto");
        $stmt -> bindParam(":producto", $datos, PDO::PARAM_INT);

        if($stmt->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

    }

}

