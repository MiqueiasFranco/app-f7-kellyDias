 
$.getScript('js/menu.js')
if(JSON.parse(localStorage.getItem('usuario'))){
    app.views.main.router.navigate('/agendamento/')
}
else{
    document.querySelector('.login').addEventListener('submit',(event)=>{
        event.preventDefault()     
        let nome = document.querySelector('.login').nome.value
            let whatsapp = document.querySelector('.login').whatsapp.value
            
            let usuario = {
                nome: nome,
                whatsapp: whatsapp
            }
        if(nome == localStorage.getItem(usuario.nome)){
            console.log('ja existe')
            localStorage.removeItem(usuario)
        }else{
            console.log('nao existe')
            localStorage.setItem('usuario', JSON.stringify(usuario))  
            app.views.main.router.navigate('/inicio/')
        }
    })

}

