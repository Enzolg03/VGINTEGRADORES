$(document).on('click','#btnnuevo', function(){
    $('#hddnidestado').val('0'),
    $('#txtdescripcion').val(''),
    $('#modalestado').modal('show')
})
$(document).on('click','.btnactualizar', function(){
    $('#hddnidestado').val($(this).attr('data-idestado')),
    $('#txtdescripcion').val($(this).attr('data-descestado')),
    $('#modalestado').modal('show')
})
$(document).on('click','.btneliminar', function(){
    $('#txtdescripcion').text("¿Seguro de eliminar el estado "
    + $(this).attr('data-descestado') + "?")
    $('#hddnidestadoeliminar').val($(this).attr('data-idestado')),
    $('#modalestadoeliminar').modal('show')
})
$(document).on('click','#btnguardar', function(){
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/administracion/estado/registrar",
        data: JSON.stringify({
            idestado: $('#hddnidestado').val(),
            descestado: $('#txtdescripcion').val(),
        }),
        success:function(resultado){
            if(resultado.respuesta){
                listarEstados();
            }
            alert(resultado.mensaje),
            $('#modalestado').modal('hide')
        }
    })
})
$(document).on('click','#btneliminar', function(){
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/administracion/estado/eliminar",
        data: JSON.stringify({
            idestado: $('#hddnidestadoeliminar').val()
        }),
        success:function(resultado){
        if(resultado.respuesta){
            listarEstados();
        }
            alert(resultado.mensaje),
            $('#modalestadoeliminar').modal('hide')
        }
    })
})
function listarEstados(){
    $.ajax({
        type: "GET",
        url: "/administracion/estado/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblestado > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblestado > tbody").append("<tr>" +
                    "<td>"+value.idestado+"</td>" +
                    "<td>"+value.descestado+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idestado='"+value.idestado+"'"+
                    " data-descestado='"+value.descestado+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "<td>"+
                    "<button type='button' class='btn btn-danger btneliminar'"+
                    " data-idestado='"+value.idestado+"'"+
                    " data-descestado='"+value.descestado+"'>"+
                    "<i class='bi bi-trash'></i>"+
                    "</button></td></tr>");
            })
        }
    })
}