// Simple smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Theme toggle removed - permanent dark mode

const form = document.getElementById('contactForm');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent page reload

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.innerHTML = "Your message has been sent successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      status.innerHTML = "Oops! Something went wrong. Please try again.";
      status.style.color = "red";
    }
  } catch (error) {
    status.innerHTML = "Network error. Please check your connection.";
    status.style.color = "orange";
  }
});

//-----------------------------------------------------------------
const canvas = document.getElementById("interactive-bg");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 70;

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 1; // velocity x
    this.vy = (Math.random() - 0.5) * 1; // velocity y
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,216,255,0.7)";
    ctx.fill();
  }

  update(mouse) {
    // move continuously
    this.x += this.vx;
    this.y += this.vy;

    // bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // repel from mouse
    if (mouse.x != null && mouse.y != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        this.x -= dx * 0.02;
        this.y -= dy * 0.02;
      }
    }
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Mouse and touch position
const mouse = { x: null, y: null };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});
window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

// Animate
function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update(mouse);
    p.draw();
  });

  // Connect particles (Network Constellation effect)
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 216, 255, ${1 - distance / 120})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Handle resize
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Typing Animation
const typingSpan = document.getElementById('typing');
const roles = ["Cybersecurity Enthusiast", "SOC Analyst Aspirant", "Web Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingSpan.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingSpan.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before new word
  }

  setTimeout(typeEffect, typeSpeed);
}
if (typingSpan) {
  setTimeout(typeEffect, 1000); // Start after 1s
}

// Scroll Reveal & Progress Bars Animation
const revealElements = document.querySelectorAll('.reveal, .reveal-item');
const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // Animate progress bars safely if they exist
      const progressBars = entry.target.querySelectorAll('.progress');
      progressBars.forEach(bar => {
        const pWidth = bar.getAttribute('data-width');
        bar.style.width = pWidth;
      });
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));
