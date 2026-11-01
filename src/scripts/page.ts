function enhance() {
  const root = document.body;
  if (root.dataset.enhanced === "true") return;
  root.dataset.enhanced = "true";

  document.querySelectorAll<HTMLElement>(".reveal").forEach((section, index) => {
    section.style.setProperty("--i", String(index));
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.add("ready");
    });
  });
}

enhance();
