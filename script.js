// ---------- TYPING EFFECT ----------
document.addEventListener("DOMContentLoaded", () => {
  const typingEl = document.querySelector(".typing-text");
  if (!typingEl) return;

  const words = ["Data Analyst", "Data Visualization"];
  let wIndex = 0, cIndex = 0, deleting = false;

  function tick() {
    const word = words[wIndex];
    if (!deleting) {
      cIndex++;
      typingEl.textContent = word.slice(0, cIndex);
    } else {
      cIndex--;
      typingEl.textContent = word.slice(0, cIndex);
    }

    // speed control
    let delay = deleting ? 60 : 120;
    if (!deleting && cIndex === word.length) delay = 900;
    if (deleting && cIndex === 0) {
      deleting = false;
      wIndex = (wIndex + 1) % words.length;
      delay = 300;
    }
    if (!deleting && cIndex === word.length) deleting = true;

    setTimeout(tick, delay);
  }

  tick();
});

// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById("theme-toggle");
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    if (moonIcon) moonIcon.style.display = "none";
    if (sunIcon) sunIcon.style.display = "inline-block";
  } else {
    document.body.classList.remove("dark");
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "inline-block";
  }
}

// load stored theme (or system preference)
const savedTheme = localStorage.getItem("theme") || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    applyTheme(isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// ---------- SMOOTH SCROLL & ACTIVE NAV ----------
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = a.getAttribute("href").slice(1);
    const section = document.getElementById(targetId);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "smooth" });
    // update active class
    navLinks.forEach(n => n.classList.remove("active"));
    a.classList.add("active");
  });
});

// highlight nav on scroll
const sections = document.querySelectorAll("main > section");
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(n => n.classList.remove("active"));
      if (link) link.classList.add("active");
    }
  });
}, { passive: true });
