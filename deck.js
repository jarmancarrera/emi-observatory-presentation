(() => {
  const slides = Array.from(document.querySelectorAll(".slide[data-slide]"));
  const dotHost = document.querySelector(".slide-dots");
  const currentLabel = document.getElementById("current-slide");
  const notesPanel = document.getElementById("notes-panel");
  const notesText = document.getElementById("notes-text");
  const announcement = document.getElementById("announcement");
  const notes = [
  "The annual edition is a useful atlas: it gives the research a point of view and a map of the evidence. The Observatory extends that work between editions. Researchers can compare trends, follow source updates, and return to the report for context. The concept is inspired by Cornell EMI and is independent of Cornell University.",
  "The annual edition frames the research. The project catalogues 164 source and methodology files, including company, mergers and acquisitions, and greenfield material. The Observatory will turn this library into searchable company profiles, an M&A deal explorer, and a greenfield project explorer. Researchers will filter by geography, sector, and year, then open each record with its details and source evidence.",
  "A researcher starts with an economy, a company, a deal, or an investment project. The visual tools make comparisons easier to inspect before writing an explanation. Users will filter by geography, sector, and period, move from an overview to individual records, and export the selected view. Units, source dates, and coverage stay beside the data. The drawing on screen is schematic.",
  "The Observatory is designed around a full source ecosystem. Capital IQ and Fortune support company analysis, with SEC EDGAR and GLEIF adding filings and identity. UNCTAD and IMF DIP supply investment evidence; fDi Markets and SDC/LSEG cover greenfield projects and M&A. World Bank, IMF and OECD provide economic context. Comtrade, WTO and national sources add trade and country detail. WIPO, UNESCO, WGI, Transparency International, SIPRI and IRENA add innovation, governance, geopolitical and energy context. GDELT helps surface news events.",
  "Each source has its own clock. A new filing, a revised investment table, and an annual index arrive at different speeds. The automation layer will follow those rhythms through APIs, scheduled collection, and authorized data deliveries. Python prepares the records; Dagster will coordinate source-specific jobs, with PostgreSQL holding comparable data and history. FastAPI serves the research interface, Plotly supports interactive charts, and GitHub Actions handles checks and publishing. Think of it as an editorial desk: collect, check, version, then publish. The annual edition remains the reference.",
  "The Observatory will also include a chatbot. Researchers will be able to ask questions in plain language: How has foreign investment changed in this country? Which companies are expanding abroad? What M&A deals or greenfield projects match these filters? The chatbot will use the same evidence as the dashboard, cite its sources, and connect the answer to a chart or record. Think of it as a research assistant working beside the visual tools.",
  "The annual edition gives the work its editorial frame. The Observatory follows source updates at their own cadence and keeps each version available for repeatable comparisons. Researchers will explore countries, companies, M&A deals, and greenfield projects visually, or ask the chatbot for an explanation with sources. The two publishing rhythms make the research useful throughout the year while preserving the annual reference edition."
];

  let activeIndex = 0;
  const toSlideNumber = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), slides.length) : 1;
  };

  function closeNotes() {
    notesPanel.hidden = true;
    document.querySelector(".notes-hint").setAttribute("aria-expanded", "false");
  }

  function showSlide(number, updateUrl = true) {
    const nextIndex = toSlideNumber(number) - 1;
    activeIndex = nextIndex;
    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.hidden = !active;
      slide.setAttribute("aria-hidden", String(!active));
    });
    Array.from(dotHost.children).forEach((dot, index) => {
      if (index === activeIndex) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    const current = slides[activeIndex];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tokens = getComputedStyle(document.documentElement);
    const duration = reduced ? 150 : parseFloat(tokens.getPropertyValue("--motion-base")) || 360;
    current.getAnimations().forEach((animation) => animation.cancel());
    current.animate(reduced ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }], { duration, easing: "cubic-bezier(.2,.7,.2,1)" });
    const label = String(activeIndex + 1).padStart(2, "0");
    currentLabel.textContent = label;
    announcement.textContent = `Slide ${activeIndex + 1} of ${slides.length}: ${slides[activeIndex].querySelector("h1,h2").textContent.replace(/\s+/g, " ").trim()}`;
    notesText.textContent = notes[activeIndex];
    closeNotes();
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(activeIndex + 1));
      window.history.replaceState({ slide: activeIndex + 1 }, "", url);
    }
  }

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index + 1));
    dotHost.appendChild(dot);
  });

  document.querySelector(".previous").addEventListener("click", () => showSlide(activeIndex === 0 ? slides.length : activeIndex));
  document.querySelector(".next").addEventListener("click", () => showSlide((activeIndex + 1) % slides.length + 1));
  document.querySelector(".notes-hint").addEventListener("click", () => {
    notesPanel.hidden = !notesPanel.hidden;
    document.querySelector(".notes-hint").setAttribute("aria-expanded", String(!notesPanel.hidden));
  });
  document.querySelector(".notes-close").addEventListener("click", closeNotes);

  window.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key.toLowerCase() === "n") {
      event.preventDefault();
      notesPanel.hidden = !notesPanel.hidden;
      document.querySelector(".notes-hint").setAttribute("aria-expanded", String(!notesPanel.hidden));
      return;
    }
    if (event.key === "Escape") {
      closeNotes();
      return;
    }
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      showSlide((activeIndex + 1) % slides.length + 1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      showSlide(activeIndex === 0 ? slides.length : activeIndex);
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(1);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length);
    }
  });
  window.addEventListener("popstate", () => showSlide(new URL(window.location.href).searchParams.get("slide"), false));

  const lockup = document.querySelector(".cornell-lockup");
  const placeholder = document.querySelector(".lockup-placeholder");
  if (lockup.complete && lockup.naturalWidth > 0) lockup.hidden = false;
  lockup.addEventListener("load", () => {
    lockup.hidden = false;
    placeholder.hidden = true;
  });
  lockup.addEventListener("error", () => {
    lockup.hidden = true;
    placeholder.hidden = false;
  });

  const requestedSlide = new URL(window.location.href).searchParams.get("slide") || 1;
  showSlide(requestedSlide, false);
})();
