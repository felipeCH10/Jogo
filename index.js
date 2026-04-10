const NOME_JOGO = "Spin & Collect";
const ANO_LANCAMENTO = 2026;
const IDADE_MINIMA = 13;
const MAX_MOEDAS = 100;
const TEMA_PADRAO = "te";

let plataformaSelecionada = "";
let contadorCliques = 0;
let temaAtual = TEMA_PADRAO;
let idadeUsuario = 0;
let nomeJogador = "";
let menuAberto = false;

const plataformas = ["PC", "Web", "Mobile"];

function injetarDadosEstaticos() {
    const tituloJogo = document.querySelector(".logo");
    const anoDisplay = document.getElementById("anoAtual");
    const idadeMinimaDisplay = document.getElementById("idadeMinima");
    const maxMoedasDisplay = document.getElementById("maxMoedas");
    const temaAtualDisplay = document.getElementById("temaAtual");
    
    if (tituloJogo) tituloJogo.innerHTML = NOME_JOGO.split(" ")[0] + "<span>&</span>" + NOME_JOGO.split(" ")[2];
    if (anoDisplay) anoDisplay.textContent = ANO_LANCAMENTO;
    if (idadeMinimaDisplay) idadeMinimaDisplay.textContent = IDADE_MINIMA + " anos";
    if (maxMoedasDisplay) maxMoedasDisplay.textContent = MAX_MOEDAS + " moedas";
    if (temaAtualDisplay) temaAtualDisplay.textContent = temaAtual === "te" ? "Escuro" : "Claro";
}

function solicitarIdade() {
    const entrada = prompt("Bem-vindo ao " + NOME_JOGO + "!\n\nDigite sua idade para acessar o conteúdo:");
    
    idadeUsuario = parseInt(entrada);
    
    if (isNaN(idadeUsuario)) {
        alert("Por favor, digite um número válido!");
        solicitarIdade();
        return;
    }
    
    validarIdade(idadeUsuario);
}

function validarIdade(idade) {
    const conteudoPrincipal = document.getElementById("conteudoPrincipal");
    const previewJogo = document.getElementById("previewJogo");
    
    if (idade < IDADE_MINIMA) {
        alert("⚠️ Acesso restrito!\n\nVocê tem " + idade + " anos.\nEste conteúdo é permitido apenas para maiores de " + IDADE_MINIMA + " anos.");
        
        if (conteudoPrincipal) {
            conteudoPrincipal.classList.add("desfocado");
        }
        if (previewJogo) {
            previewJogo.style.filter = "blur(10px)";
        }
        
    } else if (idade >= 18) {
        alert("✅ Acesso liberado!\n\nBem-vindo, explorador adulto! Divirta-se com " + NOME_JOGO + "!");
        
        if (conteudoPrincipal) {
            conteudoPrincipal.classList.remove("desfocado");
        }
        if (previewJogo) {
            previewJogo.style.filter = "none";
        }
        
    } else {
        alert("✅ Acesso liberado!\n\nOlá, jovem explorador! Aproveite " + NOME_JOGO + " com moderação.");
        
        if (conteudoPrincipal) {
            conteudoPrincipal.classList.remove("desfocado");
        }
        if (previewJogo) {
            previewJogo.style.filter = "none";
        }
    }
}

function saudarJogador() {
    const inputNome = document.getElementById("nomeJogador");
    const elementoMensagem = document.getElementById("mensagemSaudacao");
    
    nomeJogador = inputNome.value.trim();
    
    if (!nomeJogador || nomeJogador === "") {
        elementoMensagem.textContent = "❌ Digite um nome válido!";
        elementoMensagem.style.color = "#ff6b35";
        return;
    }
    
    const hora = new Date().getHours();
    let saudacao = "";
    
    if (hora < 12) {
        saudacao = "Bom dia";
    } else if (hora < 18) {
        saudacao = "Boa tarde";
    } else {
        saudacao = "Boa noite";
    }
    
    elementoMensagem.innerHTML = "🎮 " + saudacao + ", <strong>" + nomeJogador + "</strong>! Pronto para coletar moedas?";
    elementoMensagem.style.color = "#00ff88";
}

function alternarTema() {
    const body = document.body;
    const botaoTemaDesktop = document.getElementById("botaoTemaDesktop");
    const botaoTemaMobile = document.getElementById("botaoTemaMobile");
    
    if (temaAtual === "te") {
        temaAtual = "tc";
        body.classList.remove("te");
        body.classList.add("tc");
        
        if (botaoTemaDesktop) {
            botaoTemaDesktop.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
        if (botaoTemaMobile) {
            botaoTemaMobile.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
        
        body.style.backgroundColor = "#fff8f0";
        body.style.color = "#2d2d2d";
        
    } else {
        temaAtual = "te";
        body.classList.remove("tc");
        body.classList.add("te");
        
        if (botaoTemaDesktop) {
            botaoTemaDesktop.innerHTML = '<i class="fa-regular fa-sun"></i>';
        }
        if (botaoTemaMobile) {
            botaoTemaMobile.innerHTML = '<i class="fa-regular fa-sun"></i>';
        }
        
        body.style.backgroundColor = "#0a0a1a";
        body.style.color = "#f0f0f0";
    }
    
    const temaAtualDisplay = document.getElementById("temaAtual");
    if (temaAtualDisplay) temaAtualDisplay.textContent = temaAtual === "te" ? "Escuro" : "Claro";
}

function verificarLancamento() {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    
    const elementoAno = document.getElementById("anoAtual");
    if (elementoAno) {
        elementoAno.textContent = anoAtual;
    }
    
    const elementoMensagem = document.getElementById("mensagemLancamento");
    
    if (anoAtual === ANO_LANCAMENTO) {
        const mensagem = "🚀 GRANDE LANÇAMENTO! " + NOME_JOGO + " está disponível AGORA em " + anoAtual + "!";
        
        if (elementoMensagem) {
            elementoMensagem.textContent = mensagem;
        }
        
        setTimeout(function() {
            alert("🎉 " + mensagem);
        }, 1000);
        
    } else if (anoAtual > ANO_LANCAMENTO) {
        const anosDepois = anoAtual - ANO_LANCAMENTO;
        const mensagem = "📅 " + NOME_JOGO + " foi lançado há " + anosDepois + " ano(s). Obrigado por jogar!";
        
        if (elementoMensagem) {
            elementoMensagem.textContent = mensagem;
        }
        
    } else {
        const anosFaltando = ANO_LANCAMENTO - anoAtual;
        const mensagem = "⏳ Aguarde! " + NOME_JOGO + " será lançado em " + ANO_LANCAMENTO + " (faltam " + anosFaltando + " ano(s))";
        
        if (elementoMensagem) {
            elementoMensagem.textContent = mensagem;
        }
    }
}

function mostrarMensagem(plataforma) {
    plataformaSelecionada = plataforma;
    contadorCliques++;
    
    const elementoMensagem = document.getElementById("mensagemDownload");
    
    if (plataforma === "PC") {
        elementoMensagem.innerHTML = "💻 Download iniciado para Windows!";
    } else if (plataforma === "Web") {
        elementoMensagem.innerHTML = "🌐 Abrindo versão web do jogo...";
    } else if (plataforma === "Mobile") {
        elementoMensagem.innerHTML = "📱 Em breve nas lojas de aplicativos!";
    } else {
        elementoMensagem.innerHTML = "❌ Plataforma não reconhecida";
    }
}

function iniciarJogo() {
    const iframe = document.getElementById("iframeJogo");
    const telaInicial = document.getElementById("telaInicial");
    
    telaInicial.style.display = "none";
    iframe.style.display = "block";
    iframe.src = "jogo 5 (1)/index.html";
}

function animarCards() {
    const cards = document.querySelectorAll(".cartao-recurso");
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.opacity = "0";
        cards[i].style.transform = "translateY(30px)";
        cards[i].style.transition = "0.6s";
        
        setTimeout(function() {
            cards[i].style.opacity = "1";
            cards[i].style.transform = "translateY(0)";
        }, 100);
    }
}

function scrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function(evento) {
            evento.preventDefault();
            
            const href = this.getAttribute("href");
            const alvo = document.querySelector(href);
            
            if (alvo) {
                const posicaoAlvo = alvo.offsetTop - 80;
                
                window.scrollTo({
                    top: posicaoAlvo,
                    behavior: 'smooth'
                });
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    injetarDadosEstaticos();
    animarCards();
    scrollSuave();
    verificarLancamento();
    
    setTimeout(solicitarIdade, 500);
});

window.mostrarMensagem = mostrarMensagem;
window.saudarJogador = saudarJogador;
window.alternarTema = alternarTema;
window.iniciarJogo = iniciarJogo;   