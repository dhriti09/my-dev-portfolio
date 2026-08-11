// Turn on scroll-animations only if this script actually runs.
// If JS ever fails to load, content stays fully visible (see .reveal in style.css).
document.documentElement.classList.add("js-anim");

document.addEventListener("DOMContentLoaded", () => {

  // ================= FOOTER YEAR =================
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // ================= NAVBAR =================
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");


  // Navbar background on scroll
  if (nav) {
    window.addEventListener("scroll", () => {

      // Existing navbar scroll effect
      nav.classList.toggle("scrolled", window.scrollY > 30);

      // Close mobile menu automatically when page is scrolled
      if (links && links.classList.contains("open")) {
        links.classList.remove("open");
      }
    }, { passive: true });
  }


  // ================= MOBILE MENU =================
  if (toggle && links) {

    // Open / close menu
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();

      links.classList.toggle("open");

      // Small accessibility improvement
      const isOpen = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });


    // Close menu when a navigation link is clicked
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });


    // Close menu when clicking outside navbar
    document.addEventListener("click", (e) => {

      if (!links.classList.contains("open")) return;

      if (
        links.contains(e.target) ||
        toggle.contains(e.target)
      ) {
        return;
      }

      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });


    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {

      if (e.key === "Escape") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }

    });
  }


  // ================= SCROLL REVEAL =================
  // Existing reveal animation
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const io = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("in");

            // Animate only once
            io.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.15
      }
    );

    revealEls.forEach((el) => io.observe(el));

  } else {

    revealEls.forEach((el) => {
      el.classList.add("in");
    });

  }


  // ================= TERMINAL TYPING EFFECT =================
  // Existing typing animation
  const typeTarget = document.querySelector("[data-type]");

  if (typeTarget) {

    const full = typeTarget.getAttribute("data-type") || "";

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


  // ================= CONTACT FORM =================
  // Submit to Netlify Forms without page reload
  const form = document.getElementById("contact-form");

  if (form) {

    const encode = (data) =>
      Object.keys(data)
        .map(
          (key) =>
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(data[key])
        )
        .join("&");


    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const btn = form.querySelector("button[type=submit]");

      if (!btn) return;

      const original = btn.textContent;

      const formData = Object.fromEntries(
        new FormData(form).entries()
      );


      btn.disabled = true;
      btn.textContent = "sending...";


      fetch("/", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: encode(formData)
      })

        .then(() => {

          btn.textContent = "message sent ✓";

          form.reset();

        })

        .catch(() => {

          btn.textContent = "failed — try again";

        })

        .finally(() => {

          setTimeout(() => {

            btn.textContent = original;
            btn.disabled = false;

          }, 2500);

        });

    });
  }


  // ================= EXTRA LIGHT ANIMATIONS =================

  // Add a subtle class when the page has been loaded
  // This can be used by CSS without affecting existing animations.
  requestAnimationFrame(() => {
    document.body.classList.add("page-loaded");
  });


  // Add a subtle active state to the current section
  // while scrolling through the page.
  const sections = document.querySelectorAll("section[id]");

  const navAnchors = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if (
    sections.length &&
    navAnchors.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            navAnchors.forEach((link) => {
              link.classList.remove("active");
            });

            const activeLink = document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );

            if (activeLink) {
              activeLink.classList.add("active");
            }

          }

        });

      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  // ================= SMOOTH ANCHOR SCROLL =================
  // Keeps navigation smooth without changing existing layout.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});