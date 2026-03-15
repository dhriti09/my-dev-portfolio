document.addEventListener("DOMContentLoaded", () => {
  // 1. Update Copyright Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Navbar Shrink Effect
  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // 3. Scroll Reveal Animation (Intersection Observer)
  // Added IDs for Experience and Certifications to the observer
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, #experience, #certifications");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        
        // If the revealed element is the skills section, trigger progress bars
        if (entry.target.id === "skills") {
          animateSkills();
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Skills Progress Bar Animation
  function animateSkills() {
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });
  }

  // 5. Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      
      if (name && email) {
        alert(`Hi ${name}, thank you for reaching out! This is a demo; please use the email link provided to send a real message.`);
        contactForm.reset();
      }
    });
  }
});