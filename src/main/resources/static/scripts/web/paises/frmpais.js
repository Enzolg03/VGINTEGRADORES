$(document).ready(function() {
//VALIDACIONES
$("#pais_form").validate({
        rules: {
            txtnompais: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            txtnompais: {
                required: "Por favor, introduce un nombre de pais",
                minlength: "El nombre de pais debe tener al menos 2 caracteres"
            }
        }
    });

//AGREGAR Y ACTUALIZAR
$(document).on("click", "#btnnuevo", function(){
    $("#pais_form").validate().resetForm();
    $("#pais_form").find('.error').removeClass('error');
    $("#txtnompais").val("");
    $("#hddidpais").val("0");
    $("#modalpais").modal("show");
});
$(document).on("click", ".btnactualizar", function(){
    $("#pais_form").validate().resetForm();
    $("#pais_form").find('.error').removeClass('error');
    $("#txtnompais").val($(this).attr("data-nompais"));
    $("#hddidpais").val($(this).attr("data-idpais"));
    $("#modalpais").modal("show");
});
$(document).on("click", ".btneliminar", function(){
    $("#lblmensajeeliminar").text("¿Seguro de eliminar el país "
        + $(this).attr("data-nompais") + "?");
    $("#hddidpaiseliminar").val($(this).attr("data-idpais"));
    $("#modaleliminarpais").modal("show");
});
$(document).on("click", "#btnguardar", function(){
    if (!$("#pais_form").valid()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/paises/registrar",
        data: {
            idpais: $("#hddidpais").val(),
            nompais: $("#txtnompais").val()
        },
        success: function(resultado){
            if(resultado.respuesta){
                listarPaises();
                Notiflix.Notify.success(resultado.mensaje);
            }else{
                Notiflix.Notify.failure(resultado.mensaje);
            }
            $("#modalpais").modal("hide")
        }
    })
});
//ELIMINAR
$(document).on("click", "#btneliminar", function(){
    $.ajax({
        type: "DELETE",
        url: "/paises/frmpais",
        data: {
            idpais: $("#hddidpaiseliminar").val(),
        },
        success: function(resultado){
            if(resultado.respuesta){
                listarPais();
                Notiflix.Notify.success(resultado.mensaje);
            }else{
                Notiflix.Notify.failure(resultado.mensaje);
            }
            $("#modaleliminarpais").modal("hide")
        }
    })
});
//LISTAR
function listarPaises(){
    $.ajax({
        type: "GET",
        url: "/paises/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblpais > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblpais > tbody").append("<tr>" +
                    "<td>"+value.idpais+"</td>" +
                    "<td>"+value.nompais+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idpais='"+value.idpais+"'"+
                    " data-nompais='"+value.nompais+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "<td>"+
                    "<button type='button' class='btn btn-danger btneliminar'"+
                    " data-idpais='"+value.idpais+"'"+
                    " data-nompais='"+value.nompais+"'>"+
                    "<i class='bi bi-trash'></i>"+
                    "</button></td>"+
                    "</tr>");
            })
        }
    })
}
});