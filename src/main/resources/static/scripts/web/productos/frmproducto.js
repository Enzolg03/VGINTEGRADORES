$(document).ready(function() {
    //VALIDACIONES
    $("#producto_form").validate({
        rules: {
            txtnomproducto: {
                required: true,
                minlength: 2
            },
            txtdescripcion: {
                required: true,
                minlength: 2
            },
            cbocategoria: {
                required: true
            },
            cbomarca: {
                required: true
            },
            cboestado: {
                required: true
            },
            txtstock: {
                required: true,
            },
            txtprecio: {
                required: true,
                number: true,
            },
            image: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            txtnomproducto: {
                required: "Por favor, introduce un nombre de producto",
                minlength: "La descripcion debe tener al menos 2 caracteres"
            },
            txtdescripcion: {
                required: "Por favor, introduce una descripcion",
                minlength: "La descripcion debe tener al menos 2 caracteres"
            },
            cbocategoria: {
                required: "Por favor, seleccione una categoria",
            },
            cbomarca: {
                required: "Por favor, seleccione una marca"
            },
            cboestado: {
                required: "Por favor, seleccione un estado"
            },
            txtstock: {
                required: "Por favor, introduce un stock"
            },
            txtprecio: {
                required: "Por favor, introduce una precio",
                number: "Por favor, ingrese números decimales"
            },
            image: {
                required: "Por favor, introduce una descripcion",
                minlength: "La descripcion debe tener al menos 2 caracteres"
            }
        }
    });
$(document).on('click','#btnnuevo', function(){
    $("#producto_form").validate().resetForm();
    $("#producto_form").find('.error').removeClass('error');
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
    $("#producto_form").validate().resetForm();
    $("#producto_form").find('.error').removeClass('error');
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
    if (!$("#producto_form").valid()) {
                return;
        }
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
});