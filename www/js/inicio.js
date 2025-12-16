


var cliente =  []

 async function buscarDados(){
    
    const response = await fetch(window.env.SUPABASE_URL_SELECT, { 
        method: 'GET',
        headers:{
            'apikey':`${window.env.SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            
            }
        })

    if (!response.ok) {
        throw new Error('Erro ao buscar dados')
    }

    const dados = await response.json()

    cliente = dados.filter(c => c.whatsapp === window.usuarioSalvo.whatsapp )
        
    localStorage.setItem('cliente',JSON.stringify(cliente))
    
    atualizarDados()
    
}
buscarDados()

window.divServicoAgendado = document.querySelector('.servicos-agendados')
var data = new Date();
$('.dia-da-semana').html(`<h2>${data.toLocaleDateString("pt-BR", { weekday: "long" })}</h2>
                        <span>${data.toLocaleDateString("pt-BR",{ day: "2-digit",month: "long"} )}</span>`)
$('.mensagem').html(`<h2>Olá, <span>${window.usuarioSalvo.nome}</span></h2>`)
$('.mensagem').css("text-transform",'capitalize')

var h2 = document.createElement('h2')
h2.classList.add('h2-inicio')
h2.innerHTML = 'Serviços Agendados'
var servicoagendadoHtml = document.querySelectorAll('.servico-agendado')



function renderizarServico(){
    $(window.divServicoAgendado).empty()
    window.divServicoAgendado.appendChild(h2)
    $.each(cliente,(index, item)=>{
            const servicoAgendado = document.createElement('div')
            servicoAgendado.classList.add('servico-agendado')
            var url = item.servico.img
            const img= document.createElement('img')
            img.src = url ? url.replace('")','') :   ''
            
            const divDescricao =  document.createElement('div')
            divDescricao.classList.add('descricao-servico')
            
            
            const span = document.createElement('span')
            const strong = document.createElement('strong')
            strong.innerHTML = `${item.servico.nome}`
            span.appendChild(strong)

            const p = document.createElement('p')
            const strongP = document.createElement('strong')
            strongP.innerHTML = "Horário"
            p.appendChild(strongP)
            p.append(`: ${item.horario}`)
            
            const buttonDelete = document.createElement('button')
            buttonDelete.classList.add('btn-excluir')
            buttonDelete.innerHTML = 'Excluir'
            buttonDelete.id = item.id

            divDescricao.appendChild(span)
            divDescricao.appendChild(p)
            divDescricao.appendChild(buttonDelete)
            
            servicoAgendado.appendChild(img)
            servicoAgendado.appendChild(divDescricao)
            

            window.divServicoAgendado.appendChild(servicoAgendado)

            // excluir servico agendado ao clicar
            
                
        })
}

$(window.divServicoAgendado)
.off('click', '.btn-excluir')
.on('click', '.btn-excluir', function () {

    app.dialog.confirm(`Deseja realmente cancelar este serviço  ?`,'Cancelamento', ()=>{
        
        fetch(`${window.env.SUPABASE_URL_INSERT}?id=eq.${$(this).attr('id')}`, {
            method: "DELETE",
            headers: {
                'apikey': window.env.SUPABASE_KEY,
                'Authorization': `Bearer ${window.env.SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao deletar")
            return response.json()
        })
        .then(() => {
            buscarDados()
            console.log($(this).attr('id'))
        })
        .catch(err => console.error(err))
    })
        

})


// agendar um servico ao clicar
Array.from($('.swiper-wrapper').children()).forEach(filho =>{
    let button = filho.querySelector('button')
    button.addEventListener('click',()=>{ 
        window.cardServico = filho
        app.views.main.router.navigate('/agendamento/')
    })  
})

function divVazio  () {
    $(window.divServicoAgendado).empty()
    const servicoVazio = document.createElement("div")
    servicoVazio.classList.add('servico-agendado')
    servicoVazio.classList.add('vazio')

    const h2Vazio = document.createElement("h2")
    h2Vazio.innerHTML = 'Não há Serviços Agendados'
    servicoVazio.appendChild(h2Vazio)
    window.divServicoAgendado.appendChild(servicoVazio)
}
function atualizarDados(){
    cliente = JSON.parse(localStorage.getItem('cliente')) || []
    if(cliente.length == 0){
        divVazio()
    }
    else{
        renderizarServico()
    }
}
// fazendo requisiçoes no banco de dados




