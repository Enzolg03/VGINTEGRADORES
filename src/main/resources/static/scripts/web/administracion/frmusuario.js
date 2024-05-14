$(document).on("click", "#btnnuevo", function(){
    $("#usuario_form").validate().resetForm();
    $("#usuario_form").find('.error').removeClass('error');
    $("#txtnombres").val("");
    $("#txtapellidos").val("");
    $("#txtemail").val("");
    $("#txtnomusuario").val("");
    $("#txtpassword").val("");
    $("#rol").val("");
    $("#hddidusuario").val("0");
    $("#modalusuario").modal("show");
});

$(document).on("click", ".btnactualizar", function(){
    $("#usuario_form").validate().resetForm();
    $("#usuario_form").find('.error').removeClass('error');
    $("#txtnombres").val($(this).attr("data-nombres"));
    $("#txtapellidos").val($(this).attr("data-apellidos"));
    $("#txtemail").val($(this).attr("data-email"));
    $("#txtnomusuario").val($(this).attr("data-nomusuario"));
    $("#txtpassword").val($(this).attr("data-password"));
    $("#rol").val($(this).attr("data-rol"));
    $("#hddidusuario").val($(this).attr("data-idusuario"));
    $("#modalusuario").modal("show");
});

$(document).on("click", "#btnguardar", function(){
    if (!$("#usuario_form").valid()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/auth/guardarusuario",
        data: {
            idusuario: $("#hddidusuario").val(),
            nombres: $("#txtnombres").val(),
            email: $("#txtemail").val(),
            apellidos: $("#txtapellidos").val(),
            nomusuario: $("#txtnomusuario").val(),
            password: $("#txtpassword").val(),
            rol: $("#rol").val()
        },
        success: function(resultado){
            if(resultado.respuesta){
                listarUsuarios();
                Notiflix.Notify.success(resultado.mensaje);
            }else{
                Notiflix.Notify.failure(resultado.mensaje);
            }
            $("#modalusuario").modal("hide")
        }
    })
});

function listarUsuarios(){
    $.ajax({
        type: "GET",
        url: "/auth/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblusuario > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblusuario > tbody").append("<tr>" +
                    "<td>"+value.nomusuario+"</td>" +
                    "<td>"+value.email+"</td>" +
                    "<td>"+value.nombres+"</td>" +
                    "<td>"+value.apellidos+"</td>" +
                    "<td>"+value.roles[0].descrol+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idusuario='"+value.idusuario+"'"+
                    " data-nomusuario='"+value.nomusuario+"'"+
                    " data-nombres='"+value.nombres+"'"+
                    " data-apellidos='"+value.apellidos+"'"+
                    " data-rol='"+value.roles[0].descrol+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "</tr>");
            })
        }
    })
}
