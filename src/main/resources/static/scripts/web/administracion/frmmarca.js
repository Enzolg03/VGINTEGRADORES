$(document).on('click','#btnnuevo', function(){
    $('#hddnidmarca').val('0'),
    $('#txtdescripcion').val(''),
    $('#modalmarca').modal('show')
})
$(document).on('click','.btnactualizar', function(){
    $('#hddnidmarca').val($(this).attr('data-idmarca')),
    $('#txtdescripcion').val($(this).attr('data-descmarca')),
    $('#modalmarca').modal('show')
})
$(document).on('click','.btneliminar', function(){
    $('#lblmensajeeliminar').text("¿Seguro de eliminar la marca "
    + $(this).attr('data-descmarca') + "?")
    $('#hddnidmarcaeliminar').val($(this).attr('data-idmarca')),
    $('#modalmarcaeliminar').modal('show')
})
$(document).on('click','#btnguardar', function(){
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/productos/marca/registrar",
        data: JSON.stringify({
            id_marca: $('#hddnidmarca').val(),
            descmarca: $('#txtdescripcion').val(),
        }),
        success:function(resultado){
            if(resultado.respuesta){
                listarmarcas();
            }
            alert(resultado.mensaje),
            $('#modalmarca').modal('hide')
        }
    })
})
$(document).on('click','#btneliminar', function(){
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/productos/marca/eliminar",
        data: JSON.stringify({
            id_marca: $('#hddnidmarcaeliminar').val()
        }),
        success:function(resultado){
        if(resultado.respuesta){
            listarmarcas();
        }
            alert(resultado.mensaje),
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
                    "<td>"+value.id_marca+"</td>" +
                    "<td>"+value.descmarca+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idmarca='"+value.id_marca+"'"+
                    " data-descmarca='"+value.desc_marca+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "<td>"+
                    "<button type='button' class='btn btn-danger btneliminar'"+
                    " data-idmarca='"+value.id_marca+"'"+
                    " data-descmarca='"+value.descmarca+"'>"+
                    "<i class='bi bi-trash'></i>"+
                    "</button></td></tr>");
            })
        }
    })
}