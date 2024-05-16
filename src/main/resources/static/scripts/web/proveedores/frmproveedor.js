$(document).ready(function() {
$("#proveedor_form").validate({
        rules: {
            txtnomproveedor: {
                required: true,
                minlength: 2
            },
            cbopais: {
                required: true,
            },
            txtdireccion: {
                required: true,
                minlength: 2
            },
            txttelefono: {
                required: true,
                minlength: 2
            },
            txtcorreo: {
                required: true,
                minlength: 2
            },
            producto:{
                required: true
            }
        },
        messages: {
            txtnomproveedor: {
                required: "Por favor, introduce un nombre de proveedor",
                minlength: "El nombre de proveedor debe tener al menos 2 caracteres"
            },
            txtpais: {
                required: "Por favor, seleccione un país"
            },
            txttelefono: {
                required: "Por favor, introduce un teléfono",
                minlength: "La telefono debe tener al menos 2 caracteres"
            },
            txtdireccion: {
                required: "Por favor, introduce una ciudad",
                minlength: "La contraseña debe tener al menos 2 caracteres"
            },
            txtcorreo: {
                required: "Por favor, introduce los nombres",
                minlength: "Los nombres deben tener al menos 2 caracteres"
            },
            producto:{
               required: "Por favor, seleccione un producto"
            }
        }
    });

$(document).on('click','#btnnuevo', function(){
    $("#proveedor_form").validate().resetForm();
    $("#proveedor_form").find('.error').removeClass('error');
    $('#hddnidproveedor').val("0")
    $('#txtnomproveedor').val("");
    $('#txtdireccion').val("");
    $('#cbopais').empty();
    $('#txttelefono').val("");
    $('#producto').val("");
    $('#txtcorreo').val("");
    $.ajax({
                    type: "GET",
                    url: "/paises/listar",
                    dataType: "json",
                    success: function(resultado){
                        $.each(resultado, function(index, value){
                            $("#cbopais").append(
                            `<option value="${value.idpais}">${value.nompais}</option>`)
                        });
                    }
                });
    $('#modalproveedor').modal('show')
})

$(document).on('click','.btnactualizar', function(){
    $("#proveedor_form").validate().resetForm();
    $("#proveedor_form").find('.error').removeClass('error');
    $("#proveedor_form").validate().resetForm();
    $("#proveedor_form").find('.error').removeClass('error');
    $('#hddnidproveedor').val($(this).attr("data-idproveedor"));
    $('#txtnomproveedor').val($(this).attr("data-nomproveedor"));
    $('#cbopais').empty();
    $('#txtdireccion').val($(this).attr("data-direccion"));
    $('#txttelefono').val($(this).attr("data-telefono"));
    $('#txtcorreo').val($(this).attr("data-correo"));
    $("#producto").val($(this).attr("data-producto"));
    var idpais = $(this).attr("data-idpais");
    $.ajax({
                    type: "GET",
                    url: "/paises/listar",
                    dataType: "json",
                    success: function(resultado){
                        $.each(resultado, function(index, value){
                            $("#cbopais").append(
                            `<option value="${value.idpais}">${value.nompais}</option>`)
                        });
                        $("#cbopais").val(idpais);
                    }
                });
    $('#modalproveedor').modal('show')
})

$(document).on('click','#btnguardar', function(){
        if (!$("#proveedor_form").valid()) {
                return;
        }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/proveedores/registrar",
        data: JSON.stringify({
             idproveedor: $("#hddnidproveedor").val(),
             nomproveedor: $("#txtnomproveedor").val(),
             direccion: $("#txtdireccion").val(),
             idpais: $("#cbopais").val(),
             telefono: $("#txttelefono").val(),
             correo: $("#txtcorreo").val(),
             producto: $("#producto").val(),
        }),
        success:function(resultado){
            if(resultado.respuesta){
                listarProveedores();
                Notiflix.Notify.success(resultado.mensaje);
            }
            else{
                Notiflix.Notify.failure(resultado.mensaje);
            }
            $('#modalproveedor').modal('hide')
        }
    })
})
function listarProveedores(){
    $.ajax({
        type: "GET",
        url: "/proveedores/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblproveedor > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblproveedor > tbody").append("<tr>" +
                    "<td>"+value.idproveedor+"</td>" +
                    "<td>"+value.nomproveedor+"</td>" +
                    "<td>"+value.direccion+"</td>" +
                    "<td>"+value.pais.nompais+"</td>" +
                    "<td>"+value.telefono+"</td>" +
                    "<td>"+value.correo+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idproveedor='"+value.idproveedor+"'"+
                    " data-nomproveedor='"+value.nomproveedor+"'"+
                    " data-nompais='"+value.pais.nompais+"'"+
                    " data-direccion='"+value.direccion+"'"+
                    " data-telefono='"+value.telefono+"'"+
                    " data-correo='"+value.correo+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "</tr>");
            })
        }
    })
}
$(document).on('click', '.btn-ver-productos', function() {
        var idProveedor = $(this).data('idproveedor');
        $.ajax({
            type: "GET",
            url: "/proveedores/productos/" + idProveedor,
            dataType: "json",
            success: function(productos) {
                $('#modalProductos .modal-body').empty(); // Vacía el contenido previo del modal
                if (productos.length > 0) {
                    $('#modalProductos .modal-body').append('<h5>Productos del Proveedor</h5>');
                    $.each(productos, function(index, producto) {
                        $('#modalProductos .modal-body').append('<p>' + producto.nomproducto + '</p>'); // Agrega cada producto al modal
                    });
                } else {
                    $('#modalProductos .modal-body').append('<p>No hay productos asociados a este proveedor.</p>'); // Mensaje si no hay productos asociados
                }
                $('#modalProductos').modal('show'); // Muestra el modal
            },
            error: function() {
                alert('Error al cargar los productos del proveedor.'); // Manejo de errores
            }
        });
    });
});

