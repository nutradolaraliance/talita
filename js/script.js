const totalPosts = 8;
let originalPrimaryContent = "";

document.addEventListener("DOMContentLoaded", function () {
  originalPrimaryContent = document.getElementById("primary-content").innerHTML;

  // Verifica se a URL contém um número de post e carrega o post
  const url = window.location.pathname;
  const postMatch = url.match(/\/post(\d+)/);

  if (postMatch) {
    const postNumber = postMatch[1];
    loadFullPost(postNumber, false); // Carrega o post correspondente sem atualizar a URL
  }

  loadPosts(); // Carrega os posts no carrossel
});

function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.toggle("show");
}

function activateAccordion() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      panel.classList.toggle("show");
    });
  });
}

function showSection(page) {
  const mainContent = document.getElementById("main-content");
  mainContent.className = "";

  fetch(`pages/${page}.html`)
    .then((response) => response.text())
    .then((data) => {
      mainContent.innerHTML = data;
      mainContent.classList.add(`page-${page}`);

      const mobileMenu = document.getElementById("mobileMenu");
      if (mobileMenu.classList.contains("show")) {
        toggleMenu();
      }

      activateAccordion();
    })
    .catch((error) => console.error("Erro ao carregar a página:", error));
}

function loadFullPost(postNumber, updateUrl = true) {
  console.log(`Carregando post completo: post${postNumber}`);

  const primaryContent = document.getElementById("primary-content");

  primaryContent.innerHTML = "";

  fetch(`maindon/post${postNumber}.html`)
    .then((response) => {
      console.log(`Resposta para post${postNumber}:`, response.status);
      if (!response.ok) {
        throw new Error("Post não encontrado");
      }
      return response.text();
    })
    .then((data) => {
      console.log(`Conteúdo do post${postNumber} carregado`);

      primaryContent.innerHTML = data;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      // Atualiza a URL sem recarregar a página
      if (updateUrl) {
        history.pushState(null, null, `/post${postNumber}`);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar o post:", error.message);
    });
}

function loadPosts() {
  const glideSlides = document.querySelector(".glide__slides");
  let postNumber = 1;

  // Obtém o número do post atual da URL, se existir
  const url = window.location.pathname;
  const postMatch = url.match(/\/post(\d+)/);
  const currentPostNumber = postMatch ? parseInt(postMatch[1], 10) : null;

  function loadNextPost() {
    if (postNumber > totalPosts) {
      console.log("Nenhum post adicional encontrado. Fim do carregamento.");
      initGlide();
      return;
    }

    // Verifica se o post atual deve ser ignorado
    if (postNumber === currentPostNumber) {
      postNumber++;
      loadNextPost();
      return;
    }

    fetch(`maindon/post${postNumber}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Post não encontrado");
        }
        return response.text();
      })
      .then((data) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data;
        const img = tempDiv.querySelector("img");
        const h3 = tempDiv.querySelector("h3");

        if (img && h3) {
          const slideItem = document.createElement("li");
          slideItem.classList.add("glide__slide");
          slideItem.appendChild(img);
          slideItem.appendChild(h3);

          (function (currentPostNumber) {
            const button = document.createElement("button");
            button.classList.add("post-button");
            button.textContent = "QUERO DOAR";
            button.addEventListener("click", function () {
              loadFullPost(currentPostNumber);
            });
            slideItem.appendChild(button);
          })(postNumber);

          glideSlides.appendChild(slideItem);
        }

        postNumber++;
        loadNextPost();
      })
      .catch((error) => {
        console.log("Nenhum post adicional encontrado. Fim do carregamento.");
        initGlide();
      });
  }

  loadNextPost();
}


function initGlide() {
  new Glide(".glide", {
    type: "carousel",
    perView: 3,
    gap: 20,
    breakpoints: {
      1024: { perView: 2 },
      768: { perView: 1 },
    },
  }).mount();
}

// Lidar com o botão de voltar/avançar do navegador
window.addEventListener('popstate', function () {
  const url = window.location.pathname;
  const postMatch = url.match(/\/post(\d+)/);

  if (postMatch) {
    const postNumber = postMatch[1];
    loadFullPost(postNumber, false); // Carrega o post sem atualizar a URL
  } else {
    // Se a URL não contém um post, volta para o conteúdo principal
    document.getElementById("primary-content").innerHTML = originalPrimaryContent;
  }
});

function CopyTexto(id) {
  var text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(function() {
    console.log('Texto copiado com sucesso');
  }, function(err) {
    console.error('Erro ao copiar texto: ', err);
  });
}
