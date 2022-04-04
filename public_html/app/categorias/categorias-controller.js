var dt_categorias;
var categoria_to_delete;

$(document).ready(function() {
  dt_categorias = $('#listCategorias').DataTable({
    "ajax":{
      type: 'get',
      url :"http://apis-oxigas.c2510084.ferozo.com/api/categorias",
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
          return "<button class='btn btn-outline-warning btn-sm' onclick=\"loadEditCategoria('"+row.id+"')\"><i class=' fa fa-edit'></i> Editar</button> <button class='btn btn-outline-danger btn-sm' onclick=\"loadConfirmDelete('"+ row.id +"');\"><i class='fa fa-trash'></i> Eliminar</button>";
        },
      },
    ]
  });
});

function updateDatatable(){
  dt_categorias.ajax.reload();
}

function loadConfirmDelete(id){
  categoria_to_delete = id;
  $('#modalContainer1').load("/views/categorias/frm-confirm-delete.html", function(response){
    $('#mdlConfirmDelete').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
  });
}

function loadNewCategoria(){

  $('#modalContainer1').load("/views/categorias/frm-new-categoria.html", function(response){
    $('#mdlNewCategoria').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
  });
}

function loadEditCategoria(id){
  $('#modalContainer1').load("/views/categorias/frm-edit-categoria.html", function(response){
    loadDataCategoria(id);
  });
}

function loadDataCategoria(id){
  $.ajax({
    method: "get",
    url: "http://apis-oxigas.c2510084.ferozo.com/api/categorias/"+id,
    headers: {"Authorization": "Bearer "+_token}
  }).done(function(response){

    $("#txtId").val(response.data.id);
    $("#txtCodigo").val(response.data.codigo);
    $("#txtNombre").val(response.data.nombre);
    $('#mdlEditCategoria').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
    
  }); 
  
}