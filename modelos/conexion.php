<?php

class Conexion{

    public static function conectar() {
        $link = new PDO("sqlsrv:Server=localhost\SQLEXPRESS;Database=inventoryBD", "sa", "hola123");
        $link->exec("set names utf8");
        return $link;
    }
}