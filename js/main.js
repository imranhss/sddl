gsap.registerPlugin(ScrollTrigger);

// Image animation
gsap.from(".md-image-box", {
  scrollTrigger: {
    trigger: ".md-message",
    start: "top 80%"
  },
  x: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

// Caption animation
gsap.from(".md-caption", {
  scrollTrigger: {
    trigger: ".md-message",
    start: "top 75%"
  },
  y: 30,
  opacity: 0,
  delay: 0.4,
  duration: 0.8,
  ease: "power2.out"
});

// Text animation
gsap.from(".md-text", {
  scrollTrigger: {
    trigger: ".md-message",
    start: "top 80%"
  },
  x: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});
