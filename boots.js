document.addEventListener("DOMContentLoaded", () => {


  // ==========================
  // Update Copyright Year
  // ==========================

  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }



  // ==========================
  // Navbar Scroll Effect
  // ==========================

  const nav = document.querySelector(".navbar");

  if (nav) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } 
      else {
        nav.classList.remove("scrolled");
      }

    });

  }





  // ==========================
  // Scroll Reveal Animation
  // ==========================

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3"
  );


  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          // once animation complete remove observer
          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15
    }

  );


  revealElements.forEach((element)=>{

    revealObserver.observe(element);

  });





  // ==========================
  // Skills Progress Animation
  // ==========================


  const skillsSection = document.querySelector("#skills");


  if(skillsSection){

    const skillObserver = new IntersectionObserver((entries)=>{


      entries.forEach(entry=>{


        if(entry.isIntersecting){


          const bars = document.querySelectorAll(".progress-bar");


          bars.forEach(bar=>{


            const width = bar.getAttribute("data-width");


            if(width){

              bar.style.width = width;

            }


          });


          skillObserver.unobserve(skillsSection);

        }


      });


    },{
      threshold:0.3
    });



    skillObserver.observe(skillsSection);

  }





  // ==========================
  // Smooth Navbar Close on Mobile
  // ==========================


  const navLinks = document.querySelectorAll(".nav-link");

  const navbarCollapse = document.querySelector(".navbar-collapse");


  navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


      if(navbarCollapse.classList.contains("show")){


        document.querySelector(".navbar-toggler").click();


      }


    });


  });



});