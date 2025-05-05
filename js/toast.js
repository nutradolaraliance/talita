// Nomes brasileiros para notificações de doação
const nomesBrasileiros = [
  "Ana Silva",
  "João Santos",
  "Maria Oliveira",
  "Pedro Costa",
  "Juliana Lima",
  "Carlos Pereira",
  "Fernanda Souza",
  "Marcelo Alves",
  "Camila Rodrigues",
  "Rafael Gomes",
  "Aline Ferreira",
  "Bruno Carvalho",
  "Daniela Martins",
  "Eduardo Ribeiro",
  "Flávia Moreira",
  "Gabriel Pinto",
  "Isabela Nunes",
  "Leandro Dias",
  "Luciana Barbosa",
  "Mateus Mendes",
  "Natália Cardoso",
  "Otávio Correia",
  "Patrícia Freitas",
  "Roberto Vieira",
  "Sandra Teixeira",
];

// Valores de doação para notificações
const valoresDoacao = [
  30, 40, 50, 70, 80, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700,
  900, 1000,
];

// Variáveis de controle da arrecadação
let valorArrecadado = localStorage.getItem("valorArrecadado")
  ? parseFloat(localStorage.getItem("valorArrecadado"))
  : 23450.41;
const valorMeta = 287000.0;

// Função para criar e mostrar uma notificação toast
function mostrarNotificacaoDoacao() {
  // Selecionar um nome e valor aleatórios
  const nome =
    nomesBrasileiros[Math.floor(Math.random() * nomesBrasileiros.length)];
  const valor = valoresDoacao[Math.floor(Math.random() * valoresDoacao.length)];

  // Criar elemento toast
  const toast = document.createElement("div");
  toast.className = "toast-notification";

  // Adicionar ícone (emoji de coração)
  const icone = document.createElement("span");
  icone.className = "toast-icon";
  icone.textContent = "❤️";
  toast.appendChild(icone);

  // Adicionar conteúdo
  const conteudo = document.createElement("div");
  conteudo.className = "toast-content";
  conteudo.innerHTML = `<strong>${nome}</strong> acabou de doar <strong>R$ ${valor.toFixed(
    2
  )}</strong>`;
  toast.appendChild(conteudo);

  // Adicionar ao corpo do documento
  document.body.appendChild(toast);

  // Adicionar classe para animar entrada
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remover após alguns segundos
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");

    // Remover do DOM após a animação
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 4000);

  // Atualizar o progresso
  atualizarProgresso(valor);

  // Agendar a próxima notificação
  agendarProximaNotificacao();
}

// Função para atualizar a barra de progresso e o valor arrecadado
function atualizarProgresso(valorDoacao) {
  // Atualizar valor arrecadado
  valorArrecadado += valorDoacao;

  // Salvar no localStorage
  localStorage.setItem("valorArrecadado", valorArrecadado.toString());

  // Calcular a porcentagem
  const porcentagem = Math.min(100, (valorArrecadado / valorMeta) * 100);

  // Atualizar os elementos na página
  const valorArrecadadoElement = document.querySelector(
    ".progress-values p:first-child"
  );
  const barraProgressoElement = document.querySelector(".progress-bar");
  const porcentagemElement = document.querySelector(".progress-bar strong");

  if (valorArrecadadoElement) {
    valorArrecadadoElement.textContent = `R$ ${valorArrecadado.toFixed(2)}`;
  }

  if (barraProgressoElement) {
    barraProgressoElement.style.width = `${porcentagem}%`;

    // Adicionar classe de animação
    barraProgressoElement.classList.add("updated");

    // Remover a classe após a animação terminar
    setTimeout(() => {
      barraProgressoElement.classList.remove("updated");
    }, 500);
  }

  if (porcentagemElement) {
    porcentagemElement.textContent = `${Math.round(porcentagem)}%`;
  }
}

// Função para inicializar o valor arrecadado na página
function inicializarValorArrecadado() {
  const valorArrecadadoElement = document.querySelector(
    ".progress-values p:first-child"
  );
  const barraProgressoElement = document.querySelector(".progress-bar");
  const porcentagemElement = document.querySelector(".progress-bar strong");

  if (valorArrecadadoElement) {
    valorArrecadadoElement.textContent = `R$ ${valorArrecadado.toFixed(2)}`;
  }

  const porcentagem = Math.min(100, (valorArrecadado / valorMeta) * 100);

  if (barraProgressoElement) {
    barraProgressoElement.style.width = `${porcentagem}%`;
  }

  if (porcentagemElement) {
    porcentagemElement.textContent = `${Math.round(porcentagem)}%`;
  }
}

// Função para agendar a próxima notificação
function agendarProximaNotificacao() {
  // Tempo aleatório entre 5 e 20 segundos
  const tempoEspera = Math.floor(Math.random() * (20000 - 5000) + 5000);
  setTimeout(mostrarNotificacaoDoacao, tempoEspera);
}

// Função para configurar os botões de doação
function configurarBotoesDoacao() {
  const botoes = document.querySelectorAll(".post-button2");

  botoes.forEach((botao) => {
    botao.addEventListener("click", function (e) {
      e.preventDefault();

      // Obter o valor do botão (texto do botão sem o "R$ ")
      const valorTexto = this.textContent.trim().replace("R$ ", "");
      const valor = parseFloat(valorTexto.replace(",", "."));

      // Mostrar notificação personalizada para o doador atual
      mostrarNotificacaoDoadorAtual(valor);

      // Redirecionar para a página de pagamento (substitua pela URL real)
      // window.location.href = `URL_DE_PAGAMENTO?valor=${valor}`;

      // Atualizar o progresso
      atualizarProgresso(valor);
    });
  });
}

// Função para mostrar notificação para o doador atual
function mostrarNotificacaoDoadorAtual(valor) {
  // Criar notificação para o doador atual
  const toast = document.createElement("div");
  toast.className = "toast-notification";

  // Adicionar ícone (emoji de coração)
  const icone = document.createElement("span");
  icone.className = "toast-icon";
  icone.textContent = "🎉";
  toast.appendChild(icone);

  // Adicionar conteúdo
  const conteudo = document.createElement("div");
  conteudo.className = "toast-content";
  conteudo.innerHTML = `<strong>Obrigado pela sua doação de R$ ${valor.toFixed(
    2
  )}!</strong> Sua ajuda é preciosa para o Davizinho.`;
  toast.appendChild(conteudo);

  // Adicionar ao corpo do documento
  document.body.appendChild(toast);

  // Adicionar classe para animar entrada
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remover após alguns segundos
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");

    // Remover do DOM após a animação
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 5000);
}

// Iniciar o processo quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar o valor arrecadado
  inicializarValorArrecadado();

  // Configurar os botões de doação
  configurarBotoesDoacao();

  // Primeira notificação aparece entre 3 e 8 segundos após carregar
  setTimeout(() => {
    mostrarNotificacaoDoacao();
  }, Math.floor(Math.random() * (8000 - 3000) + 3000));
});
