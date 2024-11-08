$(document).on("submit", "#modalAgregarProducto", function(){

    var producto = $("#nuevoProducto").val();

    var datos = new FormData();
    datos.append("producto", producto);

    alert(producto); 

    $.ajax({
        url: "ajax/productos.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta){

            console.log(respuesta);
        }

    })

})