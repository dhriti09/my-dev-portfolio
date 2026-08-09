// Turn on scroll-animations only if this script actually runs.
// If JS ever fails to load, content stays fully visible (see .reveal in style.css).
document.documentElement.classList.add("js-anim");

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar background on scroll
  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 30);
    });
  }

  // Mobile menu toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links
      .querySelectorAll("a")
      .forEach((a) =>
        a.addEventListener("click", () => links.classList.remove("open")),
      );
  }

  // Scroll reveal (with fallback for older/unsupported browsers)
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Terminal typing effect (only runs if a [data-type] element exists)
  const typeTarget = document.querySelector("[data-type]");
  if (typeTarget) {
    const full = typeTarget.getAttribute("data-type");
    typeTarget.textContent = "";
    let i = 0;
    const speed = 45;
    function type() {
      if (i <= full.length) {
        typeTarget.textContent = full.slice(0, i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Contact form: submit to Netlify Forms via AJAX so the page doesn't reload
  const form = document.getElementById("contact-form");
  if (form) {
    const encode = (data) =>
      Object.keys(data)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
        )
        .join("&");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      const formData = Object.fromEntries(new FormData(form).entries());

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      })
        .then(() => {
          btn.textContent = "message sent ✓";
          form.reset();
        })
        .catch(() => {
          btn.textContent = "failed — try again";
        })
        .finally(() => {
          setTimeout(() => (btn.textContent = original), 2500);
        });
    });
  }
});