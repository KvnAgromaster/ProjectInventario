<?php

class ControladorUsuarios { 

    // Ingreso Usuario

    public function ctrIngresoUsuario() {
        if (isset($_POST["ingUsuario"])) {
            if (preg_match('/^[a-zA-Z0-9]+$/', $_POST["ingUsuario"]) && preg_match('/^[a-zA-Z0-9]+$/', $_POST["ingPassword"])) {
                
                $tabla = "usuarios";
                $item = "usuario";
                $valor = $_POST["ingUsuario"];

                $respuesta = ModeloUsuarios::mdlMostrarUsuarios($tabla, $item, $valor);

                if ($respuesta["usuario"] == $_POST["ingUsuario"] && $respuesta["password"] == $_POST["ingPassword"]) {

                    if($respuesta["status"] == 1) {

                        echo '<br><div class="alert alert-success">Bienvenido al sistema</div>';

                        $_SESSION["iniciarSesion"] = "ok";
                        $_SESSION["id"] = $respuesta["id"];
                        $_SESSION["nombre"] = $respuesta["nombre"];
                        $_SESSION["usuario"] = $respuesta["usuario"];
                        $_SESSION["foto"] = $respuesta["foto"];
                        $_SESSION["perfil"] = $respuesta["perfil"];


                        // Registrar fecha

                        date_default_timezone_set('America/Mazatlan');

                        $fecha = date('Y-m-d');
                        $hora = date('H:i:s');

                        $fechaActual = $fecha.' '.$hora;

                        $item1 = "ultimo_login";
                        $valor1 = $fechaActual;

                        $item2 = "id";
                        $valor2 = $respuesta["id"];

                        $ultimoLogin = ModeloUsuarios::mdlActualizarUsuario($tabla, $item1, $valor1, $item2, $valor2);

                        if($ultimoLogin == "ok") {
                            echo '<script>window.location = "inicio"</script>';
                        }
                        

                    } else {
                        echo '<br><div class="alert alert-danger">El usuario esta desactivado</div>';
                    }

                } else {
                    echo '<br><div class="alert alert-danger">Error al ingresar, vuelve a intentarlo</div>';
                }

            }
        }
    }

}