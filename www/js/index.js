const form = document.querySelector('.login')
let userSave = JSON.parse(localStorage.getItem('usuario'))

if(userSave){
    app.views.main.router.navigate('/inicio/')
}


form.addEventListener('submit',(event)=>{
    event.preventDefault()     
    let nome = form.nome.value
        let whatsapp = form.whatsapp.value
        
        let usuario = {
            nome: nome,
            whatsapp: whatsapp
        }
    
        localStorage.setItem('usuario', JSON.stringify(usuario))  
})

