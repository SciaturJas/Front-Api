
var dt_productos;
var producto_to_delete;

$(document).ready(function() {
  
  dt_productos = $('#listProductos').DataTable({
    "ajax":{
      type: 'get',
      url: "http://apis-oxigas.c2510084.ferozo.com/api/productos",
      headers: {"Authorization": "Bearer "+_token},
      dataSrc: 'data',
      cache: true
    },
    columns:[
      {
        "targets": 0,
        "render": function(data, type, row){

          return moment(row.created_at).format('DD/MM/YYYY HH:mm:ss');
        },
      },
      
      {data: 'codigo'},
      {data: 'nombre'},
      {
        "targets":3,
        "render":function(data, type, row){
          if(row.categoria)
            return row.categoria.nombre;
          else
            return "";
          
        },
      },
      {
        "targets":4,
        "render":function(data, type, row){
          return "<button class='btn btn-sm btn-outline-success' onclick=\"loadEditProducto('"+row.id+"')\"><i class=' fa fa-edit'></i> Editar</button> <button class='btn btn-outline-danger btn-sm' onclick=\"loadConfirmDelete('"+ row.id +"');\"><i class='fa fa-trash'></i> Eliminar</button>";
        },
      },
    ]
  });
});

function updateDatatable(){
  dt_productos.ajax.reload();
}

function loadConfirmDelete(id){
  producto_to_delete = id;
  $('#modalContainer1').load("/views/productos/frm-confirm-delete.html", function(response){
    $('#mdlConfirmDelete').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
  });
}

function loadNewProducto(){

  $('#modalContainer1').load("/views/productos/frm-new-producto.html", function(response){

    $.ajax({
      method: "get",
      headers: {"Authorization": "Bearer "+_token},
      url: "http://apis-oxigas.c2510084.ferozo.com/api/categorias"
      
    }).done(function(response){
      for(i=0; i<response.data.length; i++){
        item = response.data[i];
        $("#cmbCategoria").append(new Option(item.nombre, item.id));

      }
      $('#mdlNewProducto').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
    });
    
  });
}

function loadEditProducto(id){
  $('#modalContainer1').load("/views/productos/frm-edit-producto.html", function(response){
    $.ajax({
      method: "get",
      headers: {"Authorization": "Bearer "+_token},
      url: "http://apis-oxigas.c2510084.ferozo.com/api/categorias"
      
    }).done(function(response){
      for(i=0; i<response.data.length; i++){
        item = response.data[i];
        $("#cmbCategoria").append(new Option(item.nombre, item.id));

      }
      loadDataProducto(id);
    });
    
  });
}

function loadDataProducto(id){
  $.ajax({
    method: "get",
    url: "http://apis-oxigas.c2510084.ferozo.com/api/productos/"+id,
    headers: {"Authorization": "Bearer "+_token}
  }).done(function(response){

    $("#txtId").val(response.data.id);
    $("#cmbCategoria").val(response.data.categoria_id);
    $("#txtCodigo").val(response.data.codigo);
    $("#txtNombre").val(response.data.nombre);
    //$("#txtPrecio").val("");
    $('#mdlEditProducto').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
    
  }); 
  
}