
$(".button-collapse").sideNav();

$(document).ready(function(){
  $('.modal').modal();
});

/*
$(document).ready(function(a){

     $("#btn_reg_event").click(function(evento){
       evento.preventDefault();
       $.ajax({
         global: false,
         type: 'POST',
         url : '/createEvent',
         dataType: 'application/json',
         success: function(msj){
           console.log("Me gustan los caracoles");
         },
         data: {
           form_asunto: $("#reg_asunto")[0].value,
           form_day: $("#reg_day")[0].value
         }
       })
       $("#reg_asunto").val('')
       $("#reg_day").val('')

  	  });
   });
*/
