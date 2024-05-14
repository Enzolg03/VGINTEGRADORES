$(document).on('click','#btnnuevo', function(){
    $("#proveedor_form").validate().resetForm();
    $("#proveedor_form").find('.error').removeClass('error');
    $('#hddnidproveedor').val("0")
    $('#txtnomproveedor').val("");
    $('#txtdireccion').val("");
    $('#cbopais').empty();
    $('#txttelefono').val("");
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
    $('#hddnidproveedor').val($(this).attr("data-idproveedor"));
    $('#txtnomproveedor').val($(this).attr("data-nomproveedor"));
    $('#cbopais').empty();
    $('#txtdireccion').val($(this).attr("data-direccion"));
    $('#txttelefono').val($(this).attr("data-telefono"));
    $('#txtcorreo').val($(this).attr("data-correo"));
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
                        $("#cbocategoria").val(idcategoria);
                    }
                });
    $('#modalproveedor').modal('show')
})

$(document).on('click','#btnguardar', function(){
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
             correo: $("#txtcorreo").val()
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