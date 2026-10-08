function fecharPopups() {
  popup_novo_login.style.display = 'none';
  popup_editar_login.style.display = 'none';
}

function abrirNovoLogin() {
  popup_novo_login.style.display = 'flex';
}

function abrirEditarLogin(login) {
  input_login_editar.value = login;
  popup_editar_login.style.display = 'flex';
}

function criarLogin() {
  let login = input_login_novo.value;
  let senha = input_senha_novo.value;
  let confirmar = input_confirmar_novo.value;

  if (login == '') {
    div_msg_novo.innerHTML = 'Informe um login';
  } else if (senha.length < 8) {
    div_msg_novo.innerHTML = 'A senha precisa ter pelo menos 8 caracteres';
  } else if (senha != confirmar) {
    div_msg_novo.innerHTML = 'As senhas não coincidem';
  } else {
    div_msg_novo.innerHTML = '';
    fecharPopups();
  }
}

function salvarLogin() {
  let login = input_login_editar.value;
  let senha = input_senha_editar.value;
  let confirmar = input_confirmar_editar.value;

  if (login == '') {
    div_msg_editar.innerHTML = 'Informe um login';
  } else if (senha != '' && senha.length < 8) {
    div_msg_editar.innerHTML = 'A senha precisa ter pelo menos 8 caracteres';
  } else if (senha != confirmar) {
    div_msg_editar.innerHTML = 'As senhas não coincidem';
  } else {
    div_msg_editar.innerHTML = '';
    fecharPopups();
  }
}
