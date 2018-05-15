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
function setDays(diaSem, diaMes, mes, año){
  while(diaSem != 0){ //Vamos al lunes

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

  for(var i = 0; i < D.length; i++){
    D[i][0].children[1].innerHTML = diaMes + "-"+Mes[mes].name;
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
}
