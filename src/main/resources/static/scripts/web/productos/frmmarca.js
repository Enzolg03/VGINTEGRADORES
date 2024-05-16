$(document).ready(function() {
    //VALIDACIONES
    $("#marca_form").validate({
        rules: {
            txtdescripcion: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            txtdescripcion: {
                required: "Por favor, introduce una descripcion",
                minlength: "La descripcion debe tener al menos 2 caracteres"
            }
        }
    });
    //AGREGAR Y ACTUALIZAR
$(document).on('click','#btnnuevo', function(){
    $("#marca_form").validate().resetForm(),
    $("#marca_form").find('.error').removeClass('error'),
    $('#hddnidmarca').val('0'),
    $('#txtdescripcion').val(''),
    $('#modalmarca').modal('show')
})
$(document).on('click','.btnactualizar', function(){
    $("#marca_form").validate().resetForm(),
    $("#marca_form").find('.error').removeClass('error'),
    $('#hddnidmarca').val($(this).attr('data-idmarca')),
    $('#txtdescripcion').val($(this).attr('data-descmarca')),
    $('#modalmarca').modal('show')
})

$(document).on('click','#btnguardar', function(){
    if (!$("#marca_form").valid()) {
        return;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/productos/marca/registrar",
        data: JSON.stringify({
            idmarca: $('#hddnidmarca').val(),
            descmarca: $('#txtdescripcion').val(),
        }),
        success:function(resultado){
            if(resultado.respuesta){
                Notiflix.Notify.success(resultado.mensaje);
                listarmarcas();
            }else{
                Notiflix.Notify.failure(resultado.mensaje);
            }
            $('#modalmarca').modal('hide')
        }
    })
})

$(document).on('click','.btneliminar', function(){
    $('#lblmensajeeliminar').text("¿Seguro de eliminar la marca "
    + $(this).attr('data-descmarca') + "?")
    $('#hddnidmarcaeliminar').val($(this).attr('data-idmarca')),
    $('#modalmarcaeliminar').modal('show')
})
$(document).on('click','#btneliminar', function(){
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/productos/marca/eliminar",
        data: JSON.stringify({
            idmarca: $('#hddnidmarcaeliminar').val()
        }),
        success:function(resultado){
        if(resultado.respuesta){
            Notiflix.Notify.success(resultado.mensaje);
            listarmarcas();
        }else{
            Notiflix.Notify.failure(resultado.mensaje);
        }
            $('#modalmarcaeliminar').modal('hide')
        }
    })
})
function listarmarcas(){
    $.ajax({
        type: "GET",
        url: "/productos/marca/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblmarca > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblmarca > tbody").append("<tr>" +
                    "<td>"+value.idmarca+"</td>" +
                    "<td>"+value.descmarca+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idmarca='"+value.idmarca+"'"+
                    " data-descmarca='"+value.descmarca+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "<td>"+
                    "<button type='button' class='btn btn-danger btneliminar'"+
                    " data-idmarca='"+value.idmarca+"'"+
                    " data-descmarca='"+value.descmarca+"'>"+
                    "<i class='bi bi-trash'></i>"+
                    "</button></td></tr>");
            })
        }
    })
}
});