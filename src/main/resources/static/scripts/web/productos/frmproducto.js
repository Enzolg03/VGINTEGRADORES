$(document).on('click','#btnnuevo', function(){
    $('#hddnidproducto').val("0")
    $('#txtnomproducto').val("");
    $('#txtdescripcion').val("");
    $('#cbocategoria').empty();
    $('#cbomarca').empty();
    $('#cboestado').empty();
    $('#txtstock').val("");
    $('#txtprecio').val("");
    $('#image').val("");
    $.ajax({
                    type: "GET",
                    url: "/productos/categoria/listar",
                    dataType: "json",
                    success: function(resultado){
                        $.each(resultado, function(index, value){
                            $("#cbocategoria").append(
                            `<option value="${value.idcategoria}">${value.desccategoria}</option>`)
                        });
                    }
                });
    $.ajax({
                        type: "GET",
                        url: "/productos/marca/listar",
                        dataType: "json",
                        success: function(resultado){
                            $.each(resultado, function(index, value){
                                $("#cbomarca").append(
                                `<option value="${value.idmarca}">${value.descmarca}</option>`)
                            });
                        }
                    });
    $.ajax({
                type: "GET",
                url: "/administracion/estado/listar",
                dataType: "json",
                success: function(resultado){
                    $.each(resultado, function(index, value){
                        $("#cboestado").append(
                        `<option value="${value.idestado}">${value.descestado}</option>`)
                    });
                }
            });
    $('#modalproducto').modal('show')
})

$(document).on('click','.btnactualizar', function(){
    $('#hddnidproducto').val($(this).attr("data-idproducto"));
    $('#txtnomproducto').val($(this).attr("data-nomproducto"));
    $('#txtdescripcion').val($(this).attr("data-descproducto"));
    $('#cbocategoria').empty();
    $('#cbomarca').empty();
    $('#cboestado').empty();
    $('#txtstock').val($(this).attr("data-stock"));
    $('#txtprecio').val($(this).attr("data-precio"));
    $('#image').val($(this).attr("data-imagen"));
    var idcategoria = $(this).attr("data-idcategoria");
    var idmarca = $(this).attr("data-idmarca");
    var idestado = $(this).attr("data-idestado");
    $.ajax({
                    type: "GET",
                    url: "/productos/categoria/listar",
                    dataType: "json",
                    success: function(resultado){
                        $.each(resultado, function(index, value){
                            $("#cbocategoria").append(
                            `<option value="${value.idcategoria}">${value.desccategoria}</option>`)
                        });
                        $("#cbocategoria").val(idcategoria);
                    }
                });
    $.ajax({
                        type: "GET",
                        url: "/productos/marca/listar",
                        dataType: "json",
                        success: function(resultado){
                            $.each(resultado, function(index, value){
                                $("#cbomarca").append(
                                `<option value="${value.idmarca}">${value.descmarca}</option>`)
                            });
                            $("#cbomarca").val(idmarca);
                        }
                    });
    $.ajax({
                type: "GET",
                url: "/administracion/estado/listar",
                dataType: "json",
                success: function(resultado){
                    $.each(resultado, function(index, value){
                        $("#cboestado").append(
                        `<option value="${value.idestado}">${value.descestado}</option>`)
                    });
                    $("#cboestado").val(idestado);
                }
            });
    $('#modalproducto').modal('show')
})

$(document).on('click','#btnguardar', function(){
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/productos/producto/registrar",
        data: JSON.stringify({
             idproducto: $("#hddnidproducto").val(),
             nomproducto: $("#txtnomproducto").val(),
             descproducto: $("#txtdescripcion").val(),
             idcategoria: $("#cbocategoria").val(),
             idmarca: $("#cbomarca").val(),
             idestado: $("#cboestado").val(),
             stock: $("#txtstock").val(),
             precio: $("#txtprecio").val(),
             imagen: $('#image').val(),
        }),
        success:function(resultado){
            if(resultado.respuesta){
                listarProductos();
            }
            alert(resultado.mensaje)
            $('#modalproducto').modal('hide')
        }
    })
})
function listarProductos(){
    $.ajax({
        type: "GET",
        url: "/productos/producto/listar",
        dataType: "json",
        success: function(resultado){
            $("#tblproducto > tbody").html("");
            $.each(resultado, function(index, value){
                $("#tblproducto > tbody").append("<tr>" +
                    "<td>"+value.imagen+"</td>" +
                    "<td>"+value.idproducto+"</td>" +
                    "<td>"+value.nomproducto+"</td>" +
                    "<td>"+value.descproducto+"</td>" +
                    "<td>"+value.categoria.desccategoria+"</td>" +
                    "<td>"+value.marca.descmarca+"</td>" +
                    "<td>"+value.estado.descestado+"</td>" +
                    "<td>"+value.stock+"</td>" +
                    "<td>"+value.precio+"</td>" +
                    "<td>"+
                    "<button type='button' class='btn btn-info btnactualizar'"+
                    " data-imagen='"+value.imagen+"'"+
                    " data-idproducto='"+value.idproducto+"'"+
                    " data-nomproducto='"+value.nomproducto+"'"+
                    " data-descproducto='"+value.descproducto+"'"+
                    " data-idcategoria='"+value.categoria.idcategoria+"'"+
                    " data-idmarca='"+value.marca.idmarca+"'"+
                    " data-idestado='"+value.estado.idestado+"'"+
                    " data-stock='"+value.stock+"'"+
                    " data-precio='"+value.precio+"'>"+
                    "<i class='bi bi-pencil-square'></i>"+
                    "</button></td>"+
                    "</tr>");
            })
        }
    })
}