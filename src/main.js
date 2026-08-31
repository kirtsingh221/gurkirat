// ================= THEME TOGGLE =================

const themeToggle = document.getElementById("themeToggle");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains("dark");

  moonIcon?.classList.toggle("hidden", !isDark);
  sunIcon?.classList.toggle("hidden", isDark);
}

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  localStorage.setItem("theme", theme);
  updateThemeIcon();
}

// Saved theme
const savedTheme = localStorage.getItem("theme");

// Default = LIGHT
setTheme(savedTheme || "light");

// Toggle
themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");

  setTheme(isDark ? "light" : "dark");
});

// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});


// Close mobile menu after clicking link
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});


// ================= NAVBAR SCROLL =================

const navbar = document.getElementById("navbar");

const currentSection = document.getElementById("currentSection");

const sections = document.querySelectorAll("section[id]");


const sectionNames = {
  home: "Home",
  about: "About",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  contact: "Contact",
};


function updateCurrentSection() {

  const scrollPosition = window.scrollY + 180;

  let activeSection = "home";

  sections.forEach((section) => {

    if (scrollPosition >= section.offsetTop) {
      activeSection = section.id;
    }

  });


  const name = sectionNames[activeSection] || "Home";

  currentSection.textContent = name;

  currentSection.href = `#${activeSection}`;
}


window.addEventListener(
  "scroll",
  updateCurrentSection
);


updateCurrentSection();
