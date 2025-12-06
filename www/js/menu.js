
window.menu = document.querySelector('.menu')
window.menuContent = document.querySelector('.menu-content')

window.usuarioSalvo = JSON.parse(localStorage.getItem('usuario'))

window.divServicoAgendado = document.querySelector('.servicos-agendados')
window.data = new Date()


var buttonEdit = document.createElement('div')
  buttonEdit.innerHTML = 'Editar'
  buttonEdit.classList.add('btn-edit')
$('.nome-edit').empty().append(window.usuarioSalvo.nome, buttonEdit)
$('.nome-edit').css("text-transform", "capitalize")

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
  });

  $('.close').on('click', () => {
    menuContent.style.transition = 'all 0.5s ease-in-out';
    menuContent.style.left = '-100vw';
    setTimeout(() => { menuContent.style.display = 'none'; }, 500);
  });

  $('.sair').on('click', () => {
    localStorage.removeItem('usuario');
    app.views.main.router.navigate('/index/');
  });
};

