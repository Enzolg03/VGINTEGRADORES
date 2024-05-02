$(document).on('click', '#btnnuevo', function(){
    $('#hddnidrol').val("0"),
    $('#txtdescripcion').val(""),
    $('#modalrol').modal('show')
})
$(document).on('click', '.btnactualizar', function(){
    $('#hddnidrol').val($(this).attr('data-idrol')),
    $('#txtdescripcion').val($(this).attr('data-descrol')),
    $('#modalrol').modal('show')
})
$(document).on('click', '.btneliminar', function(){
    $('#lblmensajeeliminar').text('¿Seguro de eliminar el rol '
    + $(this).attr('data-descrol') + '?')
    $('#hddnidroleliminar').val($(this).attr('data-idrol')),
    $('#modalroleliminar').modal('show')
})

$(document).on('click', '#btnguardar', function(){
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/administracion/rol/registrar",
        data: JSON.stringify({
            idrol: $('#hddnidrol').val(),
            descrol: $('#txtdescripcion').val()
        }),
        success:function(resultado){
            if(resultado.respuesta){
                listarRoles();
            }
            alert(resultado.mensaje)
            $('#modalrol').modal('hide')
        }
    })
})
$(document).on('click', '#btneliminar', function(){
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/administracion/rol/eliminar",
        data: JSON.stringify({
            idrol: $('hddnidroleliminar').val(),
        }),
        success:function(resultado){
        if(resultado.respuesta){
            listarRoles();
        }
            alert(resultado.mensaje)
            $('#modalroleliminar').modal('hide')
        }
    })
})
function listarRoles(){
    $.ajax({
        type: "GET",
        url: "/administracion/rol/listar",
        dataType: "json",
        success:function(resultado){
            $('#tblrol > tbody').html(""),
            $.each(resultado, function(index,value){
                $("#tblrol > tbody").append("<tr>" +
                                    "<td>"+value.idrol+"</td>" +
                                    "<td>"+value.descrol+"</td>" +
                                    "<td>"+
                                    "<button type='button' class='btn btn-info btnactualizar'"+
                                    " data-idrol='"+value.idrol+"'"+
                                    " data-descrol='"+value.descrol+"'>"+
                                    "<i class='bi bi-pencil-square'></i>"+
                                    "</button></td>"+
                                    "<td>"+
                                    "<button type='button' class='btn btn-danger btneliminar'"+
                                    " data-idrol='"+value.idrol+"'"+
                                    " data-descrol='"+value.descrol+"'>"+
                                    "<i class='bi bi-trash'></i>"+
                                    "</button></td></tr>");
            })
        }
    })
}