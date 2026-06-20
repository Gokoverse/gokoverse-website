const iconSvg = (label, bg, fg = "#f4f1ea") =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="30" fill="${bg}"/>
      <circle cx="92" cy="30" r="15" fill="rgba(255,255,255,.18)"/>
      <path d="M24 88 C40 46, 68 108, 104 42" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="14" stroke-linecap="round"/>
      <text x="64" y="77" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="900" fill="${fg}">${label}</text>
    </svg>
  `)}`;

window.gokoverseData = {
  latestVideoUrl: "",
  apps: [
    {
      id: "very-soon",
      name: "Very Soon",
      shortDescription: "Details will be added very soon",
      description: "Details will be added very soon.",
      detail: "Details will be added very soon. App visuals, store links, launch notes, and video previews will be published here.",
      platform: "iOS",
      status: "Live",
      icon: iconSvg("VS", "#1a2a4a"),
      appStore: "",
      playStore: "",
      video: "",
    },
    {
      id: "soon",
      name: "Soon",
      shortDescription: "Details will be added very soon",
      description: "Details will be added very soon.",
      detail: "Details will be added very soon. This product card will be updated when the app is ready for preview.",
      platform: "iOS",
      status: "Soon",
      icon: iconSvg("S", "#253b2f", "#35d184"),
      appStore: "",
      playStore: "",
      video: "",
    },
    {
      id: "almost-soon",
      name: "Almost Soon",
      shortDescription: "Details will be added very soon",
      description: "Details will be added very soon.",
      detail: "Details will be added very soon. The App Store and Play Store download links will appear here later.",
      platform: "iOS",
      status: "Building",
      icon: iconSvg("AS", "#33224a", "#d786ff"),
      appStore: "",
      playStore: "",
      video: "",
    },
    {
      id: "near",
      name: "Near",
      shortDescription: "Details will be added very soon",
      description: "Details will be added very soon.",
      detail: "Details will be added very soon. Screenshots, release details, and product notes will be added as the app gets closer.",
      platform: "iOS",
      status: "Building",
      icon: iconSvg("N", "#4a2d18", "#f4cc3f"),
      appStore: "",
      playStore: "",
      video: "",
    },
  ],
  updates: {
    shipped: {
      appId: "very-soon",
      label: "Recently shipped",
      text: "is almost ready for the App Store.",
      url: "https://x.com/GokoVerseCom",
    },
    cards: [
      {
        label: "Latest on X",
        title: "Latest build notes will be shared on X.",
        text: "Product tests, build notes, and launch updates from Gokoverse will be shared here.",
        linkLabel: "Read on X",
        url: "https://x.com/GokoVerseCom",
      },
      {
        label: "Now building",
        title: "Mobile apps are the current focus.",
        text: "App cards, store links, screenshots, and preview videos will be added to producks as they become ready.",
        linkLabel: "Follow the process",
        url: "https://www.instagram.com/gokoversecom",
      },
    ],
  },
};

