
function validate(){
  reg_error.innerHTML= "";
  var user = reg_user.value
  var email =reg_email.value
  var pass = reg_pass.value
  if(vUser(user) == -1){
    $('#btn_reg').prop( "disabled", true );
    return -1;
  }
  if(vPass(pass, reg_pass_v2.value) == -1){
    $('#btn_reg').prop( "disabled", true );
    return -1;
  }
  if(email.length < 5){
    $('#btn_reg').prop( "disabled", true );
    return -1;
  }
  $('#btn_reg').prop( "disabled", false );
}

function vPass(p1, p2){
  if(p1 != p2) {
    console.log(p1);
    console.log(reg_pass_v2.value);
    reg_error.innerHTML= "La contraseña no coincide";
    return -1;
  } else {
    if(p1.length < 6){
       reg_error.innerHTML= "Contraseña muy pequeña";
       return -1;
    }
    else {
      if(!p1.match(/^(\w)*$/)){
        reg_error.innerHTML= "Contraseña inválida. (Solo numeros y letras)";
        return -1;
      }
    }
  }
  return 0;
}

function vUser(u){
  if(u.length < 6 ){
    reg_error.innerHTML= "Usuario muy pequeña";
    return -1;
  } else {
    if(!u.match(/^(\w)*$/)) {
      reg_error.innerHTML= "Usuario Inválido (Solo numeros y letras)";
      return -1
    }
  }
}
