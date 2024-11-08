<?php

require_once "conexion.php";

class ModeloProductos { 

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

}

