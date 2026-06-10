const dataInicio = new Date(2026,2,4,19,0,0);

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60* 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("contador").innerHTML =  `Estamos juntos há: <br> <span>${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos</span>`;

}

setInterval(atualizarContador, 1000);

const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btn-musica");

btnMusica.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        btnMusica.innerText = "⏸️ Pausar Música";
    } else {
        musica.pause();
        btnMusica.innerText = "▶️ Dar play";
    }
});

const btnSaudade = document.getElementById("btn-saudade");
const msgSaudade = document.getElementById("mensagem-saudade");
const modalVideo = document.getElementById("modal-video");
const videoSaudade = document.getElementById("video-saudade");
const fecharModal = document.getElementById("fechar-modal");

// Quando clicar no botão principal: abre o vídeo na tela toda
btnSaudade.addEventListener("click", () => {
    msgSaudade.classList.remove("hidden"); // Mostra a mensagem de texto
    modalVideo.classList.remove("hidden"); // Abre o fundo preto com o vídeo
    videoSaudade.play(); // Dá o play automático
});

// Quando clicar no "X": fecha o vídeo e para o som
fecharModal.addEventListener("click", () => {
    modalVideo.classList.add("hidden"); // Esconde o modal
    videoSaudade.pause(); // Pausa o vídeo
    videoSaudade.currentTime = 0; // Reseta para o início
});

// Extra: Se a pessoa clicar no fundo preto fora do vídeo, também fecha!
modalVideo.addEventListener("click", (e) => {
    if (e.target === modalVideo) {
        modalVideo.classList.add("hidden");
        videoSaudade.pause();
        videoSaudade.currentTime = 0;
    }
});

// Configuração da chuva de corações
const HEARTS_CONFIG = {
  shapes: ['♥', '♥', '♥', '♥', '✦', '♥', '·', '♥'],
  colors: ['#D4537E', '#ED93B1', '#F4C0D1', '#993556', '#e8609a', '#c0415f', '#f7a8c4', '#D4537E'],
  totalParticles: 80,  // Quantidade de corações por ciclo
  intervalMs: 55,      // Velocidade de criação (menor número = mais rápido)
  durationMin: 2.5,    // Tempo mínimo de queda de cada coração (segundos)
  durationMax: 4.5,    // Tempo máximo de queda de cada coração (segundos)
  repeatAfter: 0   // Reinicia a chuva a cada 12 segundos (0 = não repete)
};

function launchHearts() {
  const overlay = document.getElementById('anniversary-overlay');
  if (!overlay) return; // Segurança caso a div não exista na página
  
  let count = 0;

  const timer = setInterval(() => {
    if (count >= HEARTS_CONFIG.totalParticles) {
      clearInterval(timer);
      if (HEARTS_CONFIG.repeatAfter > 0) {
        setTimeout(launchHearts, HEARTS_CONFIG.repeatAfter);
      }
      return;
    }

    const idx = Math.floor(Math.random() * HEARTS_CONFIG.shapes.length);
    const el = document.createElement('span');
    
    el.className = 'heart-particle';
    el.textContent = HEARTS_CONFIG.shapes[idx];
    el.style.left = Math.random() * 98 + '%';
    el.style.fontSize = (13 + Math.random() * 22) + 'px';
    el.style.color = HEARTS_CONFIG.colors[idx];
    
    const dur = HEARTS_CONFIG.durationMin + Math.random() * (HEARTS_CONFIG.durationMax - HEARTS_CONFIG.durationMin);
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random() * 0.4) + 's';
    
    overlay.appendChild(el);
    
    // Remove o coração do HTML assim que ele terminar de cair para não travar o site
    el.addEventListener('animationend', () => el.remove());
    count++;
  }, HEARTS_CONFIG.intervalMs);
}

// Inicia a animação assim que a página estiver pronta
document.addEventListener('DOMContentLoaded', launchHearts);
