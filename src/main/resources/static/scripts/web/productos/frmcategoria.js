$(document).on('click','#btnnuevo', function(){
    $('#hddnidcategoria').val('0'),
    $('#txtdescripcion').val(''),
    $('#modalcategoria').modal('show')
})
$(document).on('click','.btnactualizar', function(){
    $('#hddnidcategoria').val($(this).attr('data-idcategoria')),
    $('#txtdescripcion').val($(this).attr('data-desccategoria')),
    $('#modalcategoria').modal('show')
})
$(document).on('click','.btneliminar', function(){
    $('#lblmensajeeliminar').text("¿Seguro de eliminar la categoria "
    + $(this).attr('data-desccategoria') + "?")
    $('#hddnidcategoriaeliminar').val($(this).attr('data-idcategoria')),
    $('#modalcategoriaeliminar').modal('show')
})
$(document).on('click','#btnguardar', function(){
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/productos/categoria/registrar",
        data: JSON.stringify({
            idcategoria: $('#hddnidcategoria').val(),
            desccategoria: $('#txtdescripcion').val(),
        }),
        success:function(resultado){
            if(resultado.respuesta){
                listarcategorias();
            }
            alert(resultado.mensaje),
            $('#modalcategoria').modal('hide')
        }
    })
})
$(document).on('click','#btneliminar', function(){
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/productos/categoria/eliminar",
        data: JSON.stringify({
            idcategoria: $('#hddnidcategoriaeliminar').val()
        }),
        success:function(resultado){
        if(resultado.respuesta){
            listarcategorias();
        }
            alert(resultado.mensaje),
            $('#modalcategoriaeliminar').modal('hide')
        }
    })
})
function listarcategorias(){
    $.ajax({
        type: "GET",
        url: "/productos/categoria/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblcategoria > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblcategoria > tbody").append("<tr>" +
                    "<td>"+value.idcategoria+"</td>" +
                    "<td>"+value.desccategoria+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idcategoria='"+value.idcategoria+"'"+
                    " data-desccategoria='"+value.desccategoria+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "<td>"+
                    "<button type='button' class='btn btn-danger btneliminar'"+
                    " data-idcategoria='"+value.idcategoria+"'"+
                    " data-desccategoria='"+value.desccategoria+"'>"+
                    "<i class='bi bi-trash'></i>"+
                    "</button></td></tr>");
            })
        }
    })
}