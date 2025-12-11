

var data = new Date();

$('.dia-da-semana').html(`<h2>${data.toLocaleDateString("pt-BR", { weekday: "long" })}</h2>
                        <span>${data.toLocaleDateString("pt-BR",{ day: "2-digit",month: "long"} )}</span>`)

$('.mensagem').html(`<h2>Olá, <span>${window.usuarioSalvo.nome}</span></h2>`)
$('.mensagem').css("text-transform",'capitalize')

var h2 = document.createElement('h2')
h2.innerHTML = 'Serviços Agendados'
window.divServicoAgendado.appendChild(h2)

// agendar um servico ao clicar
Array.from($('.swiper-wrapper').children()).forEach(filho =>{
    let button = filho.querySelector('button')
    button.addEventListener('click',()=>{ 
        window.cardServico = filho
        app.views.main.router.navigate('/agendamento/')
    })  
})

// fazendo requisiçoes no banco de dados

// lendo os dadoss
fetch(window.env.SUPABASE_URL_SELECT, { 
    methods: 'GET',
    headers:{
        'apikey':`${window.env.SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        
        }
    }).then(responde=> responde.json()).then(dados=>{
        let encontrou = false
        const servicoVazio = document.createElement("div")
        servicoVazio.classList.add('servico-agendado')
        servicoVazio.classList.add('vazio')

        const h2Vazio = document.createElement("h2")
        h2Vazio.innerHTML = 'Não há Serviços Agendados'


        if(!$('.servico-agendado')){
            window.divServicoAgendado.appendChild(servicoVazio)
        }
        servicoVazio.appendChild(h2Vazio)
        dados.forEach(cliente =>{
            
            
            if(cliente.whatsapp == window.usuarioSalvo.whatsapp){
                encontrou = true
                
                const servicoAgendado = document.createElement('div')
                servicoAgendado.classList.add('servico-agendado')
                var url = cliente.servico.img
                const img= document.createElement('img')
                img.src = url.replace('")','')
                
                const divDescricao =  document.createElement('div')
                divDescricao.classList.add('descricao-servico')
                

                const span = document.createElement('span')
                const strong = document.createElement('strong')
                strong.innerHTML = `${cliente.servico.nome}`
                span.appendChild(strong)

                const p = document.createElement('p')
                const strongP = document.createElement('strong')
                strongP.innerHTML = "Horário"
                p.appendChild(strongP)
                p.append(`: ${cliente.horario}`)

                const buttonAgendado = document.createElement('button')
                buttonAgendado.classList.add('btn-excluir')
                buttonAgendado.innerHTML = 'Excluir'

                divDescricao.appendChild(span)
                divDescricao.appendChild(p)
                divDescricao.appendChild(buttonAgendado)

                servicoAgendado.appendChild(img)
                servicoAgendado.appendChild(divDescricao)
            
                window.divServicoAgendado.appendChild(servicoAgendado)
                
                
                buttonAgendado.addEventListener('click', ()=>{
                    fetch(`${window.env.SUPABASE_URL_INSERT}?id=eq.${cliente.id}`, {
                            method: "DELETE",
                            headers: {
                                'apikey': window.env.SUPABASE_KEY,
                                'Authorization': `Bearer ${window.env.SUPABASE_KEY}`,
                                'Content-Type': 'application/json',
                                // Opcional: retornar os dados deletados
                                'Prefer': 'return=representation'
                            }
                        })
                        .then(response => {
                            if (!response.ok) throw new Error("Erro ao deletar");
                            return response.json();
                        })
                        .then(data => {
                            console.log("Registro deletado:", data);
                            window.divServicoAgendado.removeChild(servicoAgendado)
                        })
                        .catch(err => {
                            console.error("Erro:", err);
                        });

                })
            }
            
            
            
        })
        if(!encontrou){
            window.divServicoAgendado.removeChild(h2)
            window.divServicoAgendado.appendChild(servicoVazio)
        }
    })

