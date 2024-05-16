$(document).ready(function() {
//VALIDACIONES
    $("#categoria_form").validate({
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
    $("#categoria_form").validate().resetForm(),
    $("#categoria_form").find('.error').removeClass('error'),
    $('#hddnidcategoria').val('0'),
    $('#txtdescripcion').val(''),
    $('#modalcategoria').modal('show')
})
$(document).on('click','.btnactualizar', function(){
    $("#categoria_form").validate().resetForm(),
    $("#categoria_form").find('.error').removeClass('error'),
    $('#hddnidcategoria').val($(this).attr('data-idcategoria')),
    $('#txtdescripcion').val($(this).attr('data-desccategoria')),
    $('#modalcategoria').modal('show')
})
//AGREGAR Y ACTUALIZAR
$(document).on('click','#btnguardar', function(){
if (!$("#categoria_form").valid()) {
        return;
    }
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
                Notiflix.Notify.success(resultado.mensaje);
            }else{
                Notiflix.Notify.failure(resultado.mensaje);
            }
            $('#modalcategoria').modal('hide')
        }
    })
})
//ELIMINAR
$(document).on('click','.btneliminar', function(){
    $('#lblmensajeeliminar').text("¿Seguro de eliminar la categoria "
    + $(this).attr('data-desccategoria') + "?")
    $('#hddnidcategoriaeliminar').val($(this).attr('data-idcategoria')),
    $('#modalcategoriaeliminar').modal('show')
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
            Notiflix.Notify.success(resultado.mensaje);
        }
        else{
            Notiflix.Notify.failure(resultado.mensaje);
        }
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
});