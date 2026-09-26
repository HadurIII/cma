const app = document.querySelector("#app");

const ASSETS = {
  logo: "imagens/logo_1_cropped.svg",
  logoOutline: "imagens/logo_1_outline_cropped.svg",
  banner: "imagens/animais/Banner_1.png",
  lostPreview: "imagens/animais/perfil_3.png",
  foundPreview: "imagens/animais/perfil_2.png"
};

const lostFriends = [
  { id: "bob", name: "Bob", photo: "imagens/animais/perfil_1.png", lastSeenAt: "12/09/2025 - 14:30", place: "Saise Hinge - Teresina/PI", status: "Perdido", reward: "R$90", size: "Médio", color: "Caramelo", sex: "Macho", description: "Usava coleira azul. Tem uma mancha branca no peito." },
  { id: "mel", name: "Mel", photo: "imagens/animais/perfil_2.png", lastSeenAt: "16/09/2025 - 09:20", place: "Zona Leste", status: "Encontrado", reward: "-", size: "Pequeno", color: "Preto e branco", sex: "Fêmea", description: "Muito dócil, encontrada perto de uma praça." },
  { id: "luna", name: "Luna", photo: "imagens/animais/perfil_3.png", lastSeenAt: "09/09/2025 - 18:10", place: "Canoas", status: "Para adoção", reward: "-", size: "Pequeno", color: "Branco e caramelo", sex: "Fêmea", description: "Resgatada recentemente e pronta para adoção responsável." },
  { id: "thor", name: "Thor", photo: "imagens/animais/perfil_4.png", lastSeenAt: "06/09/2025 - 20:45", place: "Morada de Sol", status: "Perdido", reward: "R$50", size: "Grande", color: "Preto", sex: "Macho", description: "Assustado com barulhos altos, mas atende pelo nome Thor." }
];

let selectedPet = lostFriends[0];

function splashScreen() {
  app.innerHTML = `
    <section class="screen splash">
      <div class="splash-center">
        <img class="splash-logo" src="${ASSETS.logo}" alt="Cadê Meu Amiguinho">
        <h1>Cadê Meu Amiguinho</h1>
        <p>Ajude a encontrar animais perdidos e conecte quem encontrou com seus tutores.</p>
      </div>
      <div class="splash-actions">
        <button class="primary-button" type="button" data-route="menu">Cadastrar</button>
        <span class="or-label">ou</span>
        <button class="outline-button" type="button" data-route="menu"><span class="google-mark">G</span>Entrar com o Google</button>
        <button class="ghost-button" type="button" data-route="menu">Entrar como visitante</button>
      </div>
    </section>
  `;
}

function appHeader(title, right = "", backRoute = "menu") {
  return `
    <header class="app-header">
      <button class="icon-button" type="button" data-route="${backRoute}" aria-label="Voltar">‹</button>
      <div class="app-header-title">
        <img src="${ASSETS.logoOutline}" alt="" aria-hidden="true">
        <span>${title}</span>
      </div>
      <div class="app-header-action">${right}</div>
    </header>
  `;
}

function statusClass(status) {
  return status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
}

function menuScreen() {
  app.innerHTML = `
    <section class="screen menu">
      <header class="menu-header">
        <button class="profile-top-button" type="button" data-route="profile" aria-label="Abrir perfil">●</button>
        <div class="compact-brand" aria-label="Cadê Meu Amiguinho">
          <img class="header-logo" src="${ASSETS.logoOutline}" alt="">
          <span>Cadê Meu<br>Amiguinho</span>
        </div>
        <span></span>
      </header>

      <div class="hero-dog">
        <img class="hero-banner" src="${ASSETS.banner}" alt="Animal feliz em destaque">
        <h1 class="hero-title">Todo animal tem um lar ❤</h1>
      </div>

      <div class="menu-grid" aria-label="Opções principais">
        <button class="menu-card" type="button" data-route="lost-form">
          <span class="menu-card-icon">❤</span>
          <h2>Perdi meu amiguinho</h2>
          <p>Cadastre o alerta de desaparecimento</p>
        </button>
        <button class="menu-card" type="button" data-route="found-form">
          <span class="menu-card-icon">♥</span>
          <h2>Achei um animal</h2>
          <p>Informe e ajude a encontrar o tutor</p>
        </button>
        <button class="menu-card" type="button" data-route="lost-list">
          <span class="menu-card-icon">⌕</span>
          <h2>Ver amigos perdidos</h2>
        </button>
        <button class="menu-card" type="button" data-route="contact">
          <span class="menu-card-icon">☎</span>
          <h2>Contato</h2>
          <p>Fale conosco</p>
        </button>
      </div>
      ${bottomNav()}
    </section>
  `;
}

function bottomNav(active = "home") {
  return `
    <nav class="bottom-nav" aria-label="Navegação principal">
      <button class="nav-item ${active === "home" ? "active" : ""}" type="button" data-route="menu"><span class="nav-icon">🏠</span><span>Início</span></button>
      <button class="nav-item ${active === "alerts" ? "active" : ""}" type="button" data-route="lost-list"><span class="nav-icon">🔔</span><span>Alertas</span></button>
      <button class="nav-item ${active === "favorites" ? "active" : ""}" type="button" data-route="favorites"><span class="nav-icon">💙</span><span>Favoritos</span></button>
    </nav>
  `;
}

function uploadBlock(image, label) {
  return `
    <div class="photo-row">
      <label class="upload-card">
        <input class="photo-input" type="file" accept="image/*" aria-label="${label}">
        <img src="${ASSETS.logoOutline}" alt="" aria-hidden="true">
        <span>${label}</span>
      </label>
      <img class="form-preview" src="${image}" alt="Prévia do amiguinho">
    </div>
  `;
}

function contactFields() {
  return `
    <fieldset class="contact-fieldset">
      <legend>Seus dados de contato</legend>
      <label class="form-field icon-field"><span>Nome</span><input type="text" placeholder="Digite seu nome"></label>
      <label class="form-field icon-field phone"><span>Telefone</span><input type="tel" placeholder="(00) 00000-0000"></label>
      <label class="form-field icon-field email"><span>Email</span><input type="email" placeholder="seu@email.com"></label>
    </fieldset>
  `;
}

function lostFormScreen() {
  app.innerHTML = `
    <section class="screen form-screen">
      ${appHeader("Perdi meu amiguinho")}
      <main class="form-content">
        ${uploadBlock(ASSETS.lostPreview, "Adicione uma foto do amiguinho")}
        <form class="pet-form">
          <label class="form-field"><span>Nome</span><input type="text" placeholder="Ex.: Bob, Mel, Luna..."></label>
          <label class="form-field"><span>Espécie e/ou raça</span><input type="text" placeholder="Ex.: Sem raça definida, siamês, vira-lata..."></label>
          <label class="form-field"><span>Última vez vista</span><input type="text" placeholder="Rua, bairro ou referência"></label>
          <label class="form-field"><span>Descrição</span><textarea placeholder="Conte mais sobre cor, porte, coleira, etc."></textarea></label>
          ${contactFields()}
          <button class="submit-alert" type="button" data-route="confirmation">Enviar alerta</button>
        </form>
      </main>
    </section>
  `;
}

function foundFormScreen() {
  app.innerHTML = `
    <section class="screen form-screen">
      ${appHeader("Achei um amiguinho")}
      <main class="form-content">
        ${uploadBlock(ASSETS.foundPreview, "Adicione uma foto do amiguinho")}
        <form class="pet-form">
          <label class="form-field"><span>Descrição</span><textarea placeholder="Cor, porte, coleira, características..."></textarea></label>
          <label class="form-field"><span>Local</span><input type="text" placeholder="Rua, bairro, ponto de referência"></label>
          <label class="form-field"><span>Data/hora</span><input type="text" placeholder="Selecione a data e hora"></label>
          ${contactFields()}
          <button class="submit-alert" type="button" data-route="confirmation">Enviar informação</button>
        </form>
      </main>
    </section>
  `;
}

function confirmationScreen() {
  app.innerHTML = `
    <section class="screen confirm-screen">
      ${appHeader("", "", "menu")}
      <main class="confirm-content">
        <div class="check-icon" aria-hidden="true">✓</div>
        <img class="confirm-logo" src="${ASSETS.logo}" alt="Cadê Meu Amiguinho">
        <h1>Seu alerta foi enviado!</h1>
        <p>Agora outras pessoas da sua região podem te ajudar a encontrar seu amiguinho.</p>
        <div class="warning-box">
          <span aria-hidden="true">💡</span>
          <strong>Dica</strong>
          <p>Compartilhe nas redes sociais e mantenha seus dados atualizados.</p>
        </div>
        <button class="submit-alert" type="button" data-route="menu">Voltar para o início</button>
      </main>
    </section>
  `;
}

function profileScreen() {
  app.innerHTML = `
    <section class="screen profile-screen">
      ${appHeader("Cadê Meu Amiguinho")}
      <main class="profile-content">
        <section class="profile-summary">
          <div class="profile-avatar" aria-hidden="true">●</div>
          <div>
            <h1>Denise</h1>
            <button type="button">Editar perfil</button>
          </div>
        </section>
        <section class="settings-list" aria-label="Perfil e configurações">
          <button class="settings-row" type="button"><span>♙</span><strong>Meus alertas</strong><em>›</em></button>
          <button class="settings-row" type="button"><span>♡</span><strong>Meus achados</strong><em>›</em></button>
          <button class="settings-row" type="button"><span>♢</span><strong>Notificações</strong><span class="toggle on" aria-hidden="true"></span></button>
          <button class="settings-row" type="button"><span>⚙</span><strong>Configurações</strong><em>›</em></button>
          <button class="settings-row" type="button"><span>⇱</span><strong>Sair</strong></button>
        </section>
      </main>
      ${bottomNav("favorites")}
    </section>
  `;
}
function contactScreen() {
  app.innerHTML = `
    <section class="screen contact-screen">
      ${appHeader("Cadê Meu Amiguinho")}
      <main class="contact-content">
        <section class="contact-hero-panel">
          <img src="${ASSETS.logo}" alt="Cadê Meu Amiguinho">
          <h1>Cadê Meu Amiguinho</h1>
          <p>Entre em contato conosco ou envie uma mensagem.</p>
        </section>
        <section class="contact-list" aria-label="Informações de contato">
          <div class="contact-item"><span aria-hidden="true">☏</span><div><strong>(86) 9 9999-9999</strong><small>Segunda a sexta - 8h às 18h</small></div></div>
          <div class="contact-item"><span aria-hidden="true">✉</span><div><strong>contato@cademeuamiguinho.com.br</strong></div></div>
          <div class="contact-item"><span aria-hidden="true">◎</span><div><strong>@cademeuamiguinho</strong></div></div>
        </section>
        <section class="about-panel">
          <h2>Sobre</h2>
          <p>O Cadê Meu Amiguinho é um aplicativo criado com muito carinho para ajudar pets perdidos ou abandonados.</p>
          <div class="about-brand"><img src="${ASSETS.logoOutline}" alt="" aria-hidden="true"><strong>Cadê Meu Amiguinho</strong></div>
        </section>
      </main>
    </section>
  `;
}

function favoritesScreen() {
  const favorites = [lostFriends[1], lostFriends[2], lostFriends[3]];
  app.innerHTML = `
    <section class="screen favorites-screen">
      ${appHeader("Favoritos")}
      <main class="favorites-content">
        <div class="favorites-list">
          ${favorites.map((pet) => `
            <article class="favorite-card">
              <img src="${pet.photo}" alt="Foto de ${pet.name}">
              <div>
                <strong>${pet.name}</strong>
                <span>Visto em ${pet.lastSeenAt.split(" - ")[0]}</span>
                <small>${pet.place}</small>
              </div>
              <button type="button" aria-label="Remover dos favoritos">♥</button>
            </article>
          `).join("")}
        </div>
      </main>
      ${bottomNav("favorites")}
    </section>
  `;
}
function petListCard(pet, index) {
  return `
    <button class="lost-card" type="button" data-pet="${pet.id}" ${index === 0 ? "data-route=\"pet-detail\"" : ""}>
      <img class="lost-card-photo" src="${pet.photo}" alt="Foto de ${pet.name}">
      <span class="lost-card-info">
        <strong>${pet.name}</strong>
        <span>Visto pela última vez em</span>
        <span>${pet.lastSeenAt} - ${pet.place}</span>
        <em class="status-pill ${statusClass(pet.status)}">${pet.status}</em>
      </span>
      <span class="card-favorite" aria-hidden="true">✣</span>
    </button>
  `;
}

function lostListScreen() {
  app.innerHTML = `
    <section class="screen list-screen">
      ${appHeader("Amigos perdidos")}
      <main class="list-content">
        <label class="search-box"><span aria-hidden="true">⌕</span><input type="text" placeholder="Buscar por nome, bairro..." aria-label="Buscar por nome, bairro"></label>
        <div class="lost-list" aria-label="Amigos perdidos cadastrados">${lostFriends.map(petListCard).join("")}</div>
      </main>
      ${bottomNav("alerts")}
    </section>
  `;
}

function petDetailScreen() {
  const pet = selectedPet;
  app.innerHTML = `
    <section class="screen detail-screen">
      ${appHeader("Detalhe do amigo", `<button class="heart-action" type="button" aria-label="Favoritar">♥</button>`)}
      <main class="detail-content">
        <div class="detail-photo-wrap"><img class="detail-photo" src="${pet.photo}" alt="Foto de ${pet.name}"><span class="detail-status ${statusClass(pet.status)}">${pet.status}</span></div>
        <section class="detail-card">
          <div class="detail-title-row"><h1><span aria-hidden="true">🐾</span>${pet.name}</h1><button class="heart-inline" type="button" aria-label="Adicionar aos favoritos">♥</button></div>
          <p class="last-seen">Visto pela última vez em ${pet.lastSeenAt}<br>${pet.place}</p>
          <dl class="pet-facts"><div><dt>Recompensa</dt><dd>${pet.reward}</dd></div><div><dt>Porte</dt><dd>${pet.size}</dd></div><div><dt>Cor</dt><dd>${pet.color}</dd></div><div><dt>Sexo</dt><dd>${pet.sex}</dd></div></dl>
          <p class="pet-description">${pet.description}</p>
          <button class="contact-button" type="button"><span aria-hidden="true">☏</span>Entrar em contato</button>
          <button class="favorite-button" type="button"><span aria-hidden="true">♡</span>Adicionar aos favoritos</button>
        </section>
      </main>
    </section>
  `;
}

function navigate(route) {
  if (route === "menu") return menuScreen();
  if (route === "lost-form") return lostFormScreen();
  if (route === "found-form") return foundFormScreen();
  if (route === "confirmation") return confirmationScreen();
  if (route === "lost-list") return lostListScreen();
  if (route === "contact") return contactScreen();
  if (route === "profile") return profileScreen();
  if (route === "favorites") return favoritesScreen();
  if (route === "pet-detail") return petDetailScreen();
  splashScreen();
}

function updatePhotoPreview(input) {
  const file = input.files && input.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  const photoRow = input.closest(".photo-row");
  const preview = photoRow && photoRow.querySelector(".form-preview");
  if (!preview) return;

  if (preview.dataset.objectUrl) URL.revokeObjectURL(preview.dataset.objectUrl);
  const objectUrl = URL.createObjectURL(file);
  preview.src = objectUrl;
  preview.alt = `Prévia da foto selecionada: ${file.name}`;
  preview.dataset.objectUrl = objectUrl;
}

document.addEventListener("change", (event) => {
  const input = event.target.closest(".photo-input");
  if (input) updatePhotoPreview(input);
});

document.addEventListener("click", (event) => {
  const petButton = event.target.closest("[data-pet]");
  if (petButton) selectedPet = lostFriends.find((pet) => pet.id === petButton.dataset.pet) || selectedPet;
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) navigate(routeButton.dataset.route);
});

splashScreen();






