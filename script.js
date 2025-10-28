// Simple smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent default form reload

    // collect form data
    const formData = new FormData(form);

    try {
      // send the form data to Formspree
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.innerHTML = "✅ Your message has been sent successfully!";
        form.reset(); // clear form fields
      } else {
        status.innerHTML = "❌ Oops! Something went wrong. Please try again.";
      }
    } catch (error) {
      status.innerHTML = "⚠️ Network error. Please check your connection.";
    }
  });

//-----------------------------------------------------------------
const canvas = document.getElementById("interactive-bg");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.baseX = this.x;
    this.baseY = this.y;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,255,255,0.7)";
    ctx.fill();
  }

  update(mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = 100;
    let force = (maxDistance - distance) / maxDistance;

    if (distance < maxDistance) {
      this.x -= forceDirectionX * force * 5;
      this.y -= forceDirectionY * force * 5;
    } else {
      // Return to original position
      this.x += (this.baseX - this.x) * 0.02;
      this.y += (this.baseY - this.y) * 0.02;
    }
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Mouse and touch position
const mouse = { x: width / 2, y: height / 2 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

// Animate
function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update(mouse);
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();

// Handle resize
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

