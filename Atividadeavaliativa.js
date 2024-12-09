class SiteInteractions {
  constructor() {
    this.initializeEventListeners();
    this.addScrollAnimations();
  }

  initializeEventListeners() {
    this.handlePartnerLogos();
    this.handleTableRows();
    this.handleTooltips();
  }

  handlePartnerLogos() {
    const logos = document.querySelectorAll(".partner-link img");
    logos.forEach((logo) => {
      logo.addEventListener("mouseenter", () => this.animateElement(logo));
      logo.addEventListener("mouseleave", () => this.resetElement(logo));
    });
  }

  handleTableRows() {
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => this.highlightRow(row));
      row.addEventListener("mouseleave", () => this.unhighlightRow(row));
    });
  }

  handleTooltips() {
    const links = document.querySelectorAll(".partner-link, .social-link");
    links.forEach((link) => {
      link.addEventListener("mouseenter", (e) => this.showTooltip(e));
      link.addEventListener("mouseleave", () => this.hideTooltip());
    });
  }

  animateElement(element) {
    element.style.transform = "translateY(-5px)";
    element.style.filter = "grayscale(0%)";
  }

  resetElement(element) {
    element.style.transform = "translateY(0)";
    element.style.filter = "grayscale(20%)";
  }

  highlightRow(row) {
    row.style.backgroundColor = "rgba(0, 102, 204, 0.1)";
    row.style.cursor = "pointer";
  }

  unhighlightRow(row) {
    row.style.backgroundColor = "";
  }

  showTooltip(event) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = "Clique para visitar";

    document.body.appendChild(tooltip);

    const rect = event.target.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;

    setTimeout(() => (tooltip.style.opacity = "1"), 10);
  }

  hideTooltip() {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.opacity = "0";
      setTimeout(() => tooltip.remove(), 300);
    }
  }

  addScrollAnimations() {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-section");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SiteInteractions();
});
