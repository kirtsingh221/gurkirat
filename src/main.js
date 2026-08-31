// ================= THEME =================

const themeToggle = document.getElementById("themeToggle");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains("dark");

  if (isDark) {
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  } else {
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  }
}


// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}

updateThemeIcon();


// Toggle theme
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");

  if (isDark) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }

  updateThemeIcon();
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
