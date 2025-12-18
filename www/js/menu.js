
window.menu = document.querySelector('.menu')
window.menuContent = document.querySelector('.menu-content')

window.usuarioSalvo = JSON.parse(localStorage.getItem('usuario'))

window.data = new Date()
var pageContent = document.querySelector('.page-content-inicio')

var buttonEdit = document.createElement('div')
  buttonEdit.innerHTML = 'Editar'
  buttonEdit.classList.add('btn-edit')

var nomeUsuario = document.createElement('span')  
nomeUsuario.innerHTML = window.usuarioSalvo.nome
nomeUsuario.classList.add('nome-usuario')

$('.nome-edit').empty().append(nomeUsuario, buttonEdit)
$('.nome-edit').css("text-transform", "capitalize")

buttonEdit.addEventListener('click',()=>{
  app.dialog.confirm(`<input  type="text" class ="input-nome" placeholder="Digite um nome">`,'Editar Nome',function(){
    let nomeInput = document.querySelector('.input-nome').value
    nomeUsuario.innerHTML = nomeInput
    let usuario = {
      nome: nomeInput,
      whatsapp: window.usuarioSalvo.whatsapp
    }
    localStorage.setItem('usuario',JSON.stringify(usuario))
    $('.nome-edit').empty().append(nomeUsuario, buttonEdit)
  })
})





// menu.js
window.initMenu = function (pageEl) {
  const root = pageEl || document;
  const menuBtn = root.querySelector('.menu');
  const menuContent = root.querySelector('.menu-content');

  if (!menuBtn || !menuContent) {
    console.log('Menu não encontrado nesta página.');
    return;
  }

  // evita múltiplos listeners caso initMenu seja chamado mais de uma vez
  if (menuBtn.dataset.menuInit === '1') return;
  menuBtn.dataset.menuInit = '1';

  menuBtn.addEventListener('click', () => {
    menuContent.style.display = 'flex';
    requestAnimationFrame(() => {
      menuContent.style.transition = 'all 0.5s ease-in-out';
      menuContent.style.left = '0';
    });
    setTimeout(() => { pageContent.classList.add('blur'); }, 500)
    
  });

  $('.close').on('click', () => {
    menuContent.style.transition = 'all 0.5s ease-in-out';
    menuContent.style.left = '-100vw';
    pageContent.classList.remove('blur')

    let usuarioNome = JSON.parse(localStorage.getItem('usuario'))
    var msgHtml = `<h2>Olá, <span>${usuarioNome.nome}</span> </h2>`
    $('.mensagem').empty().append(msgHtml)
    $('.mensagem').css("text-transform",'capitalize')
    
    setTimeout(() => { menuContent.style.display = 'none'; }, 500);
    
  });

  $('.sair').on('click', () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('cliente');
    app.views.main.router.navigate('/index/');
  });
};

document.querySelector('.img-perfil').addEventListener('click',()=>{

  navigator.camera.getPicture(onSuccess, onFail, { 
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      correctOrientation:true
   });
  
  function onSuccess(imageURI) {
      window.resolveLocalFileSystemURL(imageURI, (entry) => {
          let img = document.querySelector('.img-perfil');
          img.src = entry.toURL();
      }, onFail);
  }
  
  function onFail(message) {
      alert('Failed because: ' + message);
  }
})


$('.fidelidade').off().on('click', () => {

  app.dialog.create({
    title: 'Programa de Fidelidade',
    text: `Ao término de cada serviço é entregue um cartão fidelidade e uma assinatura.
              Ao completar 10 assinaturas você recebe um Voucher gratuidade para usar em qualquer serviço.`,
    buttons: [
      {
        text: 'Fechar',
        bold: true
      }
    ]
  }).open();
});

$('.duvidas').off().on('click', () => {

  app.dialog.create({
    title: 'Dúvidas',
    text: `Atrasos: a tolerância máxima é de 15 minutos.
           Cancelamento: Só será cancelado o serviço com aviso de no mínimo 24hrs de antecedência.`,
    buttons: [
      {
        text: 'Fechar',
        bold: true
      }
    ]
  }).open();
});