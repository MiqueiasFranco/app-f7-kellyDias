let mensagem = document.querySelector('.mensagem')
let menu = document.querySelector('.menu')
let menuContent = document.querySelector('.menu-content')
const closeDiv = document.querySelector('.close')
let sair =  document.querySelector('#sair')
let nomeEdit =  document.querySelector('.nome-edit')

let usuarioSalvo = JSON.parse(localStorage.getItem('usuario'))

nomeEdit.prepend(usuarioSalvo.nome)
nomeEdit.style.textTransform = 'capitalize'
nome.style.flexDirection = 'column-reverse'

mensagem.innerHTML = `<h2>Olá, <span>${usuarioSalvo.nome}</span></h2>`
mensagem.style.textTransform = 'capitalize'

menu.addEventListener('click', () => {
    menuContent.style.display = 'flex';
    
    // força o navegador a aplicar o display antes da animação
    requestAnimationFrame(() => {
        menuContent.style.transition = 'all 0.5s ease-in-out';
        menuContent.style.left = '0';
    });
});

closeDiv.addEventListener('click', () => {
    menuContent.style.transition = 'all 0.5s ease-in-out';
    menuContent.style.left = '-100vw';

    // espera a animação terminar antes de ocultar
    setTimeout(() => {
        menuContent.style.display = 'none';
    }, 500); // mesmo tempo da transition
});

sair.addEventListener('click',()=>{
    localStorage.removeItem('usuario')
    app.views.main.router.navigate('/index/')
})