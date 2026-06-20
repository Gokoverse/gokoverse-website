let activeAppId = window.gokoverseData.apps[0]?.id || "";

function getYouTubeEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }

    const videoId = parsed.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {
    return "";
  }

  return "";
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderIcon(app) {
  if (app.icon) {
    return `<img src="${app.icon}" alt="${app.name} icon" />`;
  }

  return `<span class="app-icon-fallback">${getInitials(app.name)}</span>`;
}

function renderLatestVideo() {
  const slot = document.querySelector("#latest-video-slot");
  if (!slot) return;

  const embedUrl = getYouTubeEmbedUrl(window.gokoverseData.latestVideoUrl);

  if (!embedUrl) {
    slot.innerHTML = `
      <div>
        <span class="youtube-mark" aria-hidden="true"></span>
        <strong>YouTube</strong>
        <p>Latest video will appear here soon.</p>
      </div>
    `;
    return;
  }

  slot.className = "video-frame";
  slot.innerHTML = `
    <iframe
      src="${embedUrl}"
      title="Gokoverse son YouTube videosu"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `;
}

function renderAppsList() {
  const list = document.querySelector("#apps-list");
  const count = document.querySelector("#apps-count");
  if (!list) return;

  if (count) {
    count.textContent = `${window.gokoverseData.apps.length} projects`;
  }

  list.innerHTML = window.gokoverseData.apps
    .map(
      (app) => `
        <button class="app-row ${app.id === activeAppId ? "is-active" : ""}" data-app-id="${app.id}">
          ${renderIcon(app)}
          <span>
            <strong>${app.name}</strong>
            <small>${app.shortDescription}</small>
          </span>
          <span class="arrow">›</span>
        </button>
      `,
    )
    .join("");

  list.querySelectorAll(".app-row").forEach((button) => {
    button.addEventListener("click", () => {
      activeAppId = button.dataset.appId;
      renderAppsList();
      renderIconCloud();
      renderAppDetail();
    });
  });
}

function renderIconCloud() {
  const cloud = document.querySelector("#icon-cloud");
  if (!cloud) return;

  const apps = window.gokoverseData.apps;
  const active = apps.find((app) => app.id === activeAppId) || apps[0];
  const others = apps.filter((app) => app.id !== active.id).slice(0, 3);

  cloud.innerHTML = `
    <div class="float-icon main">${renderIcon(active)}</div>
    ${others
      .map(
        (app, index) => `<div class="float-icon ${["one", "two", "three"][index]}">${renderIcon(app)}</div>`,
      )
      .join("")}
  `;
}

function storeLabel(label) {
  const isPlay = label.toLowerCase().includes("play");
  const logoUrl = isPlay
    ? "https://cdn.simpleicons.org/googleplay/ffffff"
    : "https://cdn.simpleicons.org/appstore/ffffff";
  const storeName = isPlay ? "Google Play" : "App Store";
  return `
    <span class="store-button-row">
      <img src="${logoUrl}" alt="" />
      <span class="store-main">${storeName}</span>
    </span>
  `;
}
function storeButton(label, url) {
  if (!url) {
    return `<span class="store-button is-disabled">${storeLabel(label)}</span>`;
  }

  return `<a class="store-button" href="${url}" target="_blank" rel="noreferrer">${storeLabel(label)}</a>`;
}

function renderAppDetail() {
  const detail = document.querySelector("#app-detail");
  if (!detail) return;

  const app = window.gokoverseData.apps.find((item) => item.id === activeAppId) || window.gokoverseData.apps[0];

  detail.innerHTML = `
    <div class="detail-head">
      ${renderIcon(app)}
      <div>
        <h3>${app.name}</h3>
        <p>${app.description}</p>
      </div>
    </div>
    <p>${app.detail}</p>
    <div class="detail-tags">
      <span>${app.platform}</span>
      <span>${app.status}</span>
      <span>App Store</span>
    </div>
    <div class="store-buttons">
      ${storeButton("Download App Store", app.appStore)}
      ${storeButton("Download Play Store", app.playStore)}
    </div>
  `;
}

function renderUpdates() {
  const strip = document.querySelector("#updates-strip");
  const grid = document.querySelector("#updates-grid");
  if (!strip || !grid) return;

  const shipped = window.gokoverseData.updates.shipped;
  const app = window.gokoverseData.apps.find((item) => item.id === shipped.appId) || window.gokoverseData.apps[0];

  strip.innerHTML = `
    <div class="shipped-item">
      ${renderIcon(app)}
      <div>
        <small>${shipped.label}</small>
        <p>${shipped.text}</p>
      </div>
    </div>
  `;

  grid.innerHTML = window.gokoverseData.updates.cards
    .map(
      (card) => `
        <article class="update-card">
          <small>${card.label}</small>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
          <a href="${card.url}" target="_blank" rel="noreferrer">${card.linkLabel} →</a>
        </article>
      `,
    )
    .join("");
}

renderLatestVideo();
renderAppsList();
renderIconCloud();
renderAppDetail();
renderUpdates();



