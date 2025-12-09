

var data = new Date();
var dataAtual = new Date();

var count = 0

// VOLTAR AO CLICAR NA SETA
$('.voltar').on('click',()=>{
    app.views.main.router.navigate('/inicio/')
})

// CRIAÇÃO DA AREA DE SERVICO ESCOLHIDO
var descricaoEscolhido = document.createElement('div')
descricaoEscolhido.classList.add('descricao-escolhido')

var imgEscolhido = document.createElement('img')


// VERIFICANDO SE HÁ UM SERVICO ESCOLHIDO
if(window.cardServico){
    var elemento = document.querySelector(`#${window.cardServico.id}`);
    var style = window.getComputedStyle(elemento);
    var bg = style.backgroundImage;
    var url = bg.substring(31)
    imgEscolhido.src = url.replace('")','')
    
    $(".servico-escolhido").append(imgEscolhido)
    descricaoEscolhido.appendChild(elemento.querySelector('.nome-servico'))
    descricaoEscolhido.appendChild(elemento.querySelector('.duracao'))
    descricaoEscolhido.appendChild(elemento.querySelector('.preco'))
    $(".servico-escolhido").append(descricaoEscolhido)
    window.nomeServico = descricaoEscolhido.querySelector('.nome-servico')
    window.duracaoServico = descricaoEscolhido.querySelector('.duracao')
    window.precoServico = descricaoEscolhido.querySelector('.preco')
}else{
    
    var h2Vazio = document.createElement('h2')
    h2Vazio.innerHTML = 'Voçê Ainda não escolheu um serviço'
    $('.servico-escolhido').append(h2Vazio)
    // $('.descricao-escolhido').css('width','100%')
    // $('.descricao-escolhido').css('justify-content','center')
    $('.h2-escolha').css('display','none')
    $('.data-hora').css('display','none')
    $('.calendario').css('display','none')
}



// $(".servico-escolhido").prepend(imgEscolhido)

var dadosAgendados = [];

async function carregarAgendados() {
    const res = await fetch(window.env.SUPABASE_URL_SELECT, {
        headers:{
            'apikey': window.env.SUPABASE_KEY
        }
    });

    dadosAgendados = await res.json();
}
async function agendarCliente(novoAgendamento) {
    fetch(window.env.SUPABASE_URL_INSERT, { 
                    method: 'POST',
                    headers:{
                        'apikey':`${window.env.SUPABASE_KEY}`,
                        'Content-Type': 'application/json',
                        "Prefer": "return=representation",
                        "Authorization": `Bearer ${window.env.SUPABASE_KEY}`
                    },
                    body: JSON.stringify(novoAgendamento)
                    }).then(async response =>{
                        console.log("Status recebido:", response.status);

                        return response.json().then(json => {
                            // console.log("Resposta do Supabase:", json);
                            
                            if (!response.ok) {
                                throw new Error("Erro Supabase");
                            }

                            return json;
                        });
                    }).then(data=>{
                        console.log('POST funcionao', data)
                    }).catch(err=>{
                        console.error("erro:", err)
                    })
}
var updateCalendar = async () => {
   
    const anoAtual = data.getFullYear();
    let mesAtual = data.getMonth();

    let primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    let ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    const totalDias = ultimoDiaMes.getDate();

    let indexPrimeiroDia = primeiroDiaMes.getDay();
    let indexUltimoDia = ultimoDiaMes.getDay();

    
    $('.mes').html(data.toLocaleDateString( "pt-BR", { month: "long" } ));

    // CRIANDO CONTEUDO HTML PARA OS DIAS DO MES ANTERIOR
    for(let i = indexPrimeiroDia ; i > 0; i--){
        const dataAnterior = new Date(anoAtual, mesAtual,0 - i + 1);
        const divDiaAnterior = document.createElement("div");
        divDiaAnterior.innerHTML = dataAnterior.getDate();
        divDiaAnterior.classList.add("dia-anterior");
        $('.num-dias').append(divDiaAnterior);
    }
    // CRIANDO CONTEUDO HTML PARA OS DIAS DO MES ATUAL
    for(let i = 1 ; i <= totalDias; i++){
        
        const divDia = document.createElement("div");
        divDia.id = `${i}`
        divDia.innerHTML = i
        divDia.classList.add("dia");
        
        // DEIXANDO O DIA ATUAL COM UMA COR DIFERENTE
        if(i == dataAtual.getDate() && mesAtual == dataAtual.getMonth()){
            divDia.classList.add("dia-atual");
        }
        // DEIXANDO OS DIAS ANTERIORES SEM SELEÇÃO
        if(i < dataAtual.getDate() && mesAtual == dataAtual.getMonth()){
            divDia.classList.remove('dia')
            divDia.classList.add('dia-anterior')
        }
        // SOMENTE DIAS POSTERIORES SÃO SELETIVEIS
        // horarios disponíveis no dia
        if(divDia.classList.contains('dia')){
            
            // CRIANDO DIV DE HORARIO PARA CADA DIA
            const divHorario = document.createElement("div")
            divHorario.id = divDia.id
            divHorario.classList.add("div-horario");
            divHorario.classList.add("inativo");
            const h3Horario = document.createElement("h3")
            h3Horario.innerHTML = 'Horários Disponíveis'
            
            const divHora = document.createElement("div")
            divHora.classList.add("hora")

            const buttonAgendar = document.createElement("button")
            buttonAgendar.classList.add('btn-agendar')
            buttonAgendar.innerHTML = 'Agendar'


            divHorario.appendChild(h3Horario)
            divHorario.appendChild(divHora)
            divHorario.appendChild(buttonAgendar)

            // VERIFICANDO SE A DIV HORARIO CORRESPONDE AO DIA 
            if(divDia.id == divHorario.id){  
                        
                // ADICIONANDO HORARIOS
                for(let i=9;i <= 18;i++){

                    const divTime = document.createElement("div")
                    divTime.classList.add("time")
                    divTime.dataset.day = divHorario.id
                    divTime.dataset.hour = i
                    
                    let horaLabel = i < 10 ? `0${i}:00` : `${i}:00`;
                    divTime.innerHTML = horaLabel

                    window.horaFormatada = `${divHorario.id} de ${data.toLocaleDateString( "pt-BR", { month: "long" } )} ás ${horaLabel}hrs`

                    divTime.addEventListener('click',()=>{
                        window.horaFormatada = `${divHorario.id} de ${data.toLocaleDateString( "pt-BR", { month: "long" } )} ás ${horaLabel}hrs`
                    })

                    const ocupado = dadosAgendados.some(a => a.horario === window.horaFormatada);
                    if(ocupado){
                        divTime.remove()
                    }
                    else{
                        divHora.appendChild(divTime)
                    }
                
                }

            }  
            buttonAgendar.addEventListener('click',()=>{
                // enviar para o banco de dados
                const nomeServico = window.nomeServico.textContent
                const duracaoServico = window.duracaoServico.textContent
                const precoServico = window.precoServico.textContent
                const nomeCliente = window.usuarioSalvo.nome
                const whatsappCliente = window.usuarioSalvo.whatsapp
                const horarioCliente = window.horaFormatada
                const novoAgendamento = {
                    nome: nomeCliente,
                    whatsapp: whatsappCliente,
                    servico: {
                        nome: nomeServico,
                        duracao: duracaoServico,
                        preco: precoServico
                    },
                    horario: horarioCliente

                }
                agendarCliente(novoAgendamento)
            })
            
            verificar(divHorario,divDia)
        }
            
            $('.num-dias').append(divDia);
            
        }
        
        
}
    


// AO CLICAR NOS BOTÕES DE PRÓXIMO E ANTERIOR /////////////////////////

$(".btnNext").on("click", () => {
  
    if(count < 2){
        count ++
        data.setMonth(data.getMonth() + 1);
        $('.num-dias').html('');
        $(".horarios").empty();
        updateCalendar()
    }
    
})

$(".btnPrev").on("click", () => {
    
    if(count > 0){
        
        count --
        data.setMonth(data.getMonth() - 1);

        $('.num-dias').html('');
        $(".horarios").empty();
        updateCalendar()
    }

}
)

var verificar = (divhorario,divDia)=>{
    // mostrar horarios disponíveis correspondentes ao dia
    divDia.addEventListener('click',()=>{
       if(divhorario.id == divDia.id){

           if($(".horarios").children().length == 0){
                $(".horarios").append(divhorario)
                divhorario.classList.remove('inativo')
           }
           else{
                Array.from($(".horarios").children()).forEach(filho =>{
                    
                    if(filho.id != divhorario.id){
                        $(filho).remove()
                        $(".horarios").append(divhorario)
                        divhorario.classList.remove('inativo')
                        
                    }
                    
                })

           }
       }

  
    })
    
}
async function init() {
    await carregarAgendados();
    updateCalendar();
}

init();


