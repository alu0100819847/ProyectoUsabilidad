var D = [];
    D[0] = $("#Lunes");       //Lunes
    D[1] = $("#Martes");      //Martes
    D[2] = $("#Miercoles");   //Miercoles
    D[3] = $("#Jueves");      //Jueves
    D[4] = $("#Viernes");     //Viernes
    D[5] = $("#Sabado");      //Sabado
    D[6] = $("#Domingo");     //Domingo
var Mes=[{"sz": 31,
          "name": "Jan"},
        {"sz": 28,
          "name": "Feb"},
        {"sz": 31,
          "name": "Mar"},
        {"sz": 30,
          "name": "Apr"},
        {"sz": 31,
          "name": "May"},
        {"sz": 30,
          "name": "Jun"},
        {"sz": 31,
          "name": "Jul"},
        {"sz": 31,
          "name": "Aug"},
        {"sz": 30,
          "name": "Sep"},
        {"sz": 31,
          "name": "Oct"},
        {"sz": 30,
          "name": "Nov"},
        {"sz": 31,
          "name": "Dic"}]
          var localDay = new Date();
          var firstDay = new Date();
          var lastDay = new Date();
function setDays(diaSem, diaMes, mes, año){
  if(diaSem == 0) diaSem = 7;
  while(diaSem > 1){ //Vamos al lunes

    if(diaMes == 0){
      if(mes == 0){
        mes = 11;
      } else{
        mes--;
      }
      diaMes = Mes[mes].sz;
    } else {
      diaMes--;
      diaSem--;
    }
  }

  firstDay = new Date(año, mes, diaMes);
  for(var i = 0; i < D.length; i++){
    D[i][0].children[0].children[1].innerHTML = diaMes + "-"+Mes[mes].name;
    if(diaMes == Mes[mes].sz){
      if(mes == 11){
        mes = 0
      } else{
        mes++;
      }
      diaMes = 1;
    } else{
      diaMes++;
    }
  }
  lastDay = new Date(año, mes, diaMes);
}

function getEvents(){
  console.log(Fecha);
  var j = 0;
  var fecha = []
  var asunto = []
  for(var i = 0; i < Fecha.length; i++){
    var newFecha = new Date(Fecha[i]);
    console.log("Antes de filtrar"+Fecha[i]);
    if(newFecha >= firstDay && newFecha < lastDay){
      console.log("Despues de filtrar"+Fecha[i])
      fecha[j] = newFecha;
      asunto[j] = Asunto[i];
      j++
    }
  }
  Fecha = fecha;
  Asunto = asunto;
  fecha = [];
  asunto = [];
  console.log(Fecha);
  for(var i = 0; i < Fecha.length; i++){
    j=0;
    var temp = Fecha[i];

    for(var z = 0; z < Fecha.length; z++){
      if(Fecha[z] < temp){
        j++;
      }


    }
    fecha[j] = Fecha[i];
    asunto[j] = Asunto[i];
  }
  Fecha = fecha;
  Asunto = asunto;
  var Eve = $(".Evento")
  for(var i = 0; i < Eve.length; i++){
    Eve[i].innerHTML = "";
  }
  for(var i = 0; i < Fecha.length; i++){
    var dia = Fecha[i].getDay() -1;
    if(dia < 0) dia = dia + 7;
    console.log(dia);
    var text = Eve[dia].innerHTML;
    var hora= ""+Fecha[i].toLocaleTimeString()[0]+Fecha[i].toLocaleTimeString()[1]+Fecha[i].toLocaleTimeString()[2]+Fecha[i].toLocaleTimeString()[3]+Fecha[i].toLocaleTimeString()[4];
    text = text + '<div class="col s2 slot">  <div class="hora center-align">'+
                      hora
                    +'h</div> <div class="asunto center-align">'+Asunto[i]+'</div></div>';
    Eve[dia].innerHTML = text;
  }
  console.log(Eve);
}
  setDays(localDay.getDay(), localDay.getDate(), localDay.getMonth(), localDay.getUTCFullYear())



$(document).ready(function(a){

     $("#btn_reg_event").click(function(evento){
       var dia = $("#reg_day")[0].value
       var asunto = $("#reg_asunto")[0].value
        evento.preventDefault();
       if(dia != "" && asunto != ""){

       $.post('/createEvent',
       {
           form_asunto: asunto,
           form_day: dia
      },
      function(data, status){
        console.log("Data: "+data)
        console.log("Status: "+status)
        var newFecha = new Date($("#reg_day")[0].value);
          Fecha[Fecha.length] = dia;
          Asunto[Asunto.length] = asunto;
          getEvents();
      })
      $("#reg_asunto").val('');
      $("#reg_day").val('');
      }
  	  });
   });
getEvents();
