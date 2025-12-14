// Navbar mobile toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', ()=>{
  navLinks.classList.toggle('active');
});


document.querySelectorAll(".dropdown").forEach(drop => {
  drop.addEventListener("mouseenter", () => {
    gsap.to(drop.querySelector(".dropdown-menu"), {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  });

  drop.addEventListener("mouseleave", () => {
    gsap.to(drop.querySelector(".dropdown-menu"), {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power3.in"
    });
  });
});

