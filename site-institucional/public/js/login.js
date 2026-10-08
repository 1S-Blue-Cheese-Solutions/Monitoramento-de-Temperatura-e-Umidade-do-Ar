function entrar(){
    // Implementar mais tarde a entrada para o dashboard
    let email = imail.value;

    if(email.includes('@') && email.includes('.com')) {
        div_result_mail.innerHTML=``
    } else {
        div_result_mail.innerHTML=`Email deve conter @ e .com`
    }
}

function verSenha() {
    if (isenha.type == 'password') {
        isenha.type = 'text';
        btn_ver.innerHTML = 'OCULTAR';
    } else {
        isenha.type = 'password';
        btn_ver.innerHTML = 'VER';
    }
}
