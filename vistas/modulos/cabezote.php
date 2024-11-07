<header class="main-header">
    <a href="inicio" class="logo">
        <!-- logo mini -->
        <span class="logo-mini" >
            <!-- <img src="vistas/img/plantilla/icono-blanco.png" class="img-responsive" style="padding: 10px;"> -->
            KVN
        </span>

        <!-- logo normal -->
        <span class="logo-lg">
            <!-- <img src="vistas/img/plantilla/logo-blanco-lineal.png" class="img-responsive" style="padding: 10px 0px;"> -->
            Kevin <strong> Inventarios</strong>
        </span>
    </a>

    <nav class="navbar navbar-static-top">
        <!-- boton de navegacion -->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>

        <!-- perfil de usuario -->
        
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <?php
                        echo '<img src="vistas/img/usuarios/default/anonymous.png" class="user-image">';
                    ?>
                        
                        <span class="hidden-xs">

                            Admin

                        </span>
                    </a>
    
                    <!-- dropdown-toggle -->

                    <ul class="dropdown-menu">
                        <li class="user-body">
                                <div>
                                    <a href="salir" class="btn btn-default btn-flat pull-right">
                                        <i class="fa fa-sign-out"></i>
                                        <span>Salir</span>
                                    </a>
                                </div>
                        </li> 
                    </ul>
                </li>


            </ul>
        </div>

    </nav>

</header>