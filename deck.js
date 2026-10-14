(() => {
  const slides = Array.from(document.querySelectorAll(".slide[data-slide]"));
  const dotHost = document.querySelector(".slide-dots");
  const currentLabel = document.getElementById("current-slide");
  const notesPanel = document.getElementById("notes-panel");
  const notesText = document.getElementById("notes-text");
  const announcement = document.getElementById("announcement");
  const notes = [
  "The annual edition is a useful atlas: it gives the research a point of view and a map of the evidence. The Observatory extends that work between editions. Researchers can compare trends, follow source updates, and return to the report for context. The concept is inspired by Cornell EMI and is independent of Cornell University.",
  "The research inventory describes 177 physical pages and 13 chapter analyses. The project catalogues 164 source and methodology files, including company, mergers and acquisitions, and greenfield material. The annual edition frames the questions. The source library lets researchers trace a series, its definition, and its date as they move from a report exhibit to a comparison.",
  "A researcher starts with an economy, a measure, and a time window. Visualization makes the shape of the comparison easier to inspect before writing an explanation. Units, gaps, and filters belong beside the trend. The drawing on screen is schematic, not an actual data result. The chart-ready snapshot contains six annual World Bank indicators.",
  "Official World Bank responses enter a Python preparation step, where the data are normalized and checked. Each dated snapshot keeps its source, units, metadata, and identity together. Think of it as a dated photograph of the evidence. Plotly supports interactive charts, while FastAPI provides read-only data access for a separately managed setting. The public presentation layer remains static.",
  "The current World Bank source-check design runs weekly, on Monday at 06:00 UTC. That check looks for revisions; it does not change the annual observation frequency. Changed snapshots remain addressable for pinned views. A source's own publication rhythm should set its refresh cadence, with event-driven updates where providers allow them. Python, FastAPI, Plotly, and GitHub Actions form the working stack. A production design can add Dagster and PostgreSQL to coordinate source-specific runs and history.",
  "A chart and a descriptive question use the same economy, measure, years, and snapshot. An answer travels with its source, unit, and observation period, so a reader can compare it with the visual view and then return to the annual edition. That connection between question, chart, and citation is what makes the interaction useful for research.",
  "The annual edition gives the work its editorial frame. The Observatory follows source updates at their own cadence and keeps each version available for repeatable comparisons. Explainable answers keep the source, unit, period, and snapshot beside the result. Together, the two rhythms carry Cornell's emerging-market research from an annual account into an evidence system researchers can revisit throughout the year."
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
