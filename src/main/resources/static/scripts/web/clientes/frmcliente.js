$(document).on("click", "#btnnuevo", function(){
    $("#cliente_form").validate().resetForm();
    $("#cliente_form").find('.error').removeClass('error');
    $("#hddidcliente").val("0");
    $("#txtnroruc").val("");
    $("#txtnomempresa").val("");
    $("#txtnomcliente").val("");
    $("#txtdireccion").val("");
    $("#txttelefono").val("");
    $("#txtcorreo").val("");
    $("#txtlogo").val("");
    $("#modalcliente").modal("show");
});

$(document).on("click", ".btnactualizar", function(){
    $("#cliente_form").validate().resetForm();
    $("#cliente_form").find('.error').removeClass('error');
    $("#hddidcliente").val($(this).attr("data-idcliente"));
    $("#txtnroruc").val($(this).attr("data-nroruc"));
    $("#txtnomempresa").val($(this).attr("data-nomempresa"));
    $("#txtnomcliente").val($(this).attr("data-nomcliente"));
    $("#txtdireccion").val($(this).attr("data-direccion"));
    $("#txttelefono").val($(this).attr("data-telefono"));
    $("#txtcorreo").val($(this).attr("data-correo"));
    $("#txtlogo").val($(this).attr("data-logo"));
    $("#modalcliente").modal("show");
});

$(document).on("click", "#btnguardar", function(){
    if (!$("#cliente_form").valid()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/clientes/cliente/registrar",
        data: {
            idcliente: $("#hddidcliente").val(),
            nroruc: $("#txtnroruc").val(),
            nomempresa: $("#txtnomempresa").val(),
            nomcliente: $("#txtnomcliente").val(),
            direccion: $("#txtdireccion").val(),
            telefono: $("#txttelefono").val(),
            correo: $("#txtcorreo").val(),
            logo: $("#txtlogo").val(),
        },
        success: function(resultado){
            if(resultado.respuesta){
                listarClientes();
                Notiflix.Notify.success(resultado.mensaje);
            }else{
                Notiflix.Notify.failure(resultado.mensaje);
            }
            $("#modalcliente").modal("hide")
        }
    })
});

function listarClientes(){
    $.ajax({
        type: "GET",
        url: "/clientes/cliente/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblcliente > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblcliente > tbody").append("<tr>" +
                    "<td>"+value.logo+"</td>" +
                    "<td>"+value.idcliente+"</td>" +
                    "<td>"+value.nroruc+"</td>" +
                    "<td>"+value.nomempresa+"</td>" +
                    "<td>"+value.nomcliente+"</td>" +
                    "<td>"+value.direccion+"</td>" +
                    "<td>"+value.telefono+"</td>" +
                    "<td>"+value.correo+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-idcliente='"+value.idcliente+"'"+
                    " data-logo='"+value.logo+"'"+
                    " data-nroruc='"+value.nroruc+"'"+
                    " data-nomempresa='"+value.nomempresa+"'"+
                    " data-nomcliente='"+value.nomcliente+"'"+
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
