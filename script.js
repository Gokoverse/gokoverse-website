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

function renderLatestVideo() {
  const slot = document.querySelector("#latest-video-slot");
  if (!slot) return;

  const embedUrl = getYouTubeEmbedUrl(window.gokoverseData.latestVideoUrl);

  if (!embedUrl) {
    slot.innerHTML = `
      <div>
        <strong>Yakinda</strong>
        <p>Son YouTube videosu eklendiginde burada gorunecek.</p>
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

function createLink(label, url) {
  if (!url) {
    return `<span>${label}: Yakinda</span>`;
  }

  return `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
}

function renderProducks() {
  const grid = document.querySelector("#producks-grid");
  if (!grid) return;

  grid.innerHTML = window.gokoverseData.producks
    .map((item, index) => {
      const media = item.image
        ? `<img src="${item.image}" alt="${item.title}" />`
        : `<div class="produck-media-fallback">${String(index + 1).padStart(2, "0")}</div>`;

      return `
        <article class="produck-card">
          <div class="produck-media">${media}</div>
          <div class="produck-body">
            <div class="produck-topline">
              <span>${item.type}</span>
              <span class="status">${item.status}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="produck-links">
              ${createLink("Website", item.website)}
              ${createLink("App Store", item.appStore)}
              ${createLink("Play Store", item.playStore)}
              ${createLink("Video", item.video)}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

renderLatestVideo();
renderProducks();
