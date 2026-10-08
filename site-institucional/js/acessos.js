// Demonstração de interface: os nomes são persistidos neste navegador.
// As senhas são apenas validadas no formulário; autenticação real requer backend seguro.
(() => {
  'use strict';
  const STORAGE = 'bluecheese_acessos_demo_v1';
  const defaults = [
    {id:'principal',login:'marcos.almeida',me:true},
    {id:'sala',login:'sala.maturacao',me:false},
    {id:'qualidade',login:'qualidade.serra',me:false}
  ];
  const $ = id => document.getElementById(id);
  const list = $('listaLogins');
  const dialog = $('acessosDialog');
  const form = $('acessosForm');
  const login = $('campoLogin');
  const senha = $('campoSenha');
  const confirmar = $('confirmarSenha');
  const erro = $('erroAcessos');
  let editing = null;
  let users;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE));
    users = Array.isArray(stored) && stored.every(u => typeof u.login === 'string' && typeof u.id === 'string') ? stored : defaults;
  } catch { users = defaults; }
  const save = () => {
    try { localStorage.setItem(STORAGE, JSON.stringify(users)); }
    catch { /* Armazenamento indisponível; a lista funciona nesta sessão. */ }
  };
  const showError = msg => { erro.textContent=msg; erro.hidden=!msg; };
  const initials = value => (value.trim()[0] || '?').toUpperCase();
  function render() {
    list.replaceChildren();
    if (!users.length) {
      const p=document.createElement('p'); p.className='acessos-vazio'; p.textContent='Nenhum login cadastrado.'; list.append(p); return;
    }
    users.forEach(user => {
      const article=document.createElement('article'); article.className='acessos-item';
      const avatar=document.createElement('span'); avatar.className='acessos-avatar'; avatar.textContent=initials(user.login);
      const name=document.createElement('strong'); name.className='acessos-nome'; name.textContent=user.login;
      const edit=document.createElement('button'); edit.type='button'; edit.className='acessos-editar'; edit.textContent='Editar'; edit.setAttribute('aria-label',`Editar ${user.login}`); edit.addEventListener('click',()=>openEditor(user.id));
      article.append(avatar,name);
      if (user.me) { const tag=document.createElement('span'); tag.className='acessos-voce'; tag.textContent='Você'; article.append(tag); }
      article.append(edit); list.append(article);
    });
  }
  function openEditor(id=null) {
    editing=id;
    const current=users.find(user=>user.id===id);
    form.reset(); showError('');
    $('acessosDialogTitle').textContent=current?'Editar login':'Novo login';
    $('salvarLogin').textContent=current?'Salvar':'Criar login';
    $('senhaLabel').textContent=current?'Nova senha':'Senha';
    $('senhaHelp').hidden=!current;
    $('excluirLogin').hidden=!current || Boolean(current?.me);
    login.value=current?.login || '';
    senha.required=!current;
    confirmar.required=!current;
    dialog.showModal(); login.focus();
  }
  const close = () => dialog.close();
  $('novoLogin').addEventListener('click',()=>openEditor());
  $('fecharAcessos').addEventListener('click',close);
  $('cancelarAcessos').addEventListener('click',close);
  dialog.addEventListener('click',e=>{if(e.target===dialog) close();});
  form.addEventListener('submit', e => {
    e.preventDefault(); showError('');
    const value=login.value.trim();
    if (!value) return showError('Informe um login.');
    if (users.some(u => u.login.toLowerCase()===value.toLowerCase() && u.id!==editing)) return showError('Já existe um acesso com esse login.');
    if (!editing && !senha.value) return showError('Informe uma senha.');
    if (senha.value || confirmar.value) {
      if (senha.value.length<8) return showError('A senha precisa ter pelo menos 8 caracteres.');
      if (senha.value !== confirmar.value) return showError('As senhas não coincidem.');
    }
    if (editing) {
      const current=users.find(u=>u.id===editing);
      if (!current) return showError('Login não encontrado.');
      current.login=value;
    } else {
      users.push({id:crypto.randomUUID?.() || `${Date.now()}_${Math.random()}`,login:value,me:false});
    }
    // Intencionalmente não salvar senha em localStorage.
    save(); render(); close();
  });
  $('excluirLogin').addEventListener('click',()=>{
    const current=users.find(u=>u.id===editing);
    if(!current || current.me) return;
    if (!window.confirm(`Excluir o login "${current.login}"?`)) return;
    users=users.filter(u=>u.id!==editing); save(); render(); close();
  });
  const menuToggle=$('menuToggle');
  const sidebar=$('sidebar');
  menuToggle?.addEventListener('click',()=>{
    const open=sidebar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded',String(open));
  });
  render();
})();
