function setOpen(item: HTMLElement, open: boolean) {
  const button = item.querySelector<HTMLButtonElement>(".trigger");
  const panel = item.querySelector<HTMLElement>(".panel");
  if (!button || !panel) return;
  item.classList.toggle("open", open);
  button.setAttribute("aria-expanded", String(open));
  panel.inert = !open;
}

function enhance() {
  const root = document.body;
  if (root.dataset.enhanced === "true") return;
  root.dataset.enhanced = "true";

  document.querySelectorAll<HTMLElement>(".project").forEach((item) => {
    const button = item.querySelector<HTMLButtonElement>(".trigger");
    button?.addEventListener("click", () => {
      setOpen(item, !item.classList.contains("open"));
    });
  });

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
