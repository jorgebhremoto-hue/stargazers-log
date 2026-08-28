const repositoryList = document.querySelector("#repository-list");
const numberOfRepositories = document.querySelector("#number-of-repositories");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatStars(stars) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(stars);
}

function renderRepositories(repositories) {
  numberOfRepositories.textContent = repositories.length;
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository">
      <a href="${escapeHtml(repository.url)}" target="_blank" rel="noreferrer">
        ${escapeHtml(repository.repository)}
      </a>
      <p>${escapeHtml(repository.description)}</p>
      <div class="repository-meta">
        <span aria-label="Language">${escapeHtml(repository.language)}</span>
        <span aria-label="Stars">★ ${formatStars(repository.stars)} stars</span>
        <span>Starred ${new Date(`${repository.starredAt}T00:00:00Z`).toLocaleDateString("en", { timeZone: "UTC" })}</span>
      </div>
    </li>
  `).join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = `<li class="status">Unable to load starred repositories.</li>`;
    console.error(error);
  }
}

loadRepositories();
