
var _token = sessionStorage.getItem('_token');
if(!_token)
window.location="/views/login.html";
$(document).ready(function(){
  $("#header").load("/views/layout/header.html");
  $("#admin-menu").load("/views/layout/admin-menu.html", configurarMenu);
  $("#footer").load("/views/layout/footer.html");
});

function configurarMenu(response){
  path = document.location.pathname;

  $("#adminMenu li").each(function(index){
    if($(this).html().indexOf(path)>0){
      $(this).children().addClass("active");
    }
    
  });
}