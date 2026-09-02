// ================= THEME =================

const themeToggle = document.getElementById("themeToggle");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");

function applyTheme(theme) {
  const html = document.documentElement;

  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  // Icons
  if (theme === "dark") {
    moonIcon?.classList.remove("hidden");
    sunIcon?.classList.add("hidden");
  } else {
    moonIcon?.classList.add("hidden");
    sunIcon?.classList.remove("hidden");
  }
}


// IMPORTANT:
// First visit = LIGHT

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}


// Toggle Theme

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");

  const newTheme = isDark ? "light" : "dark";

  applyTheme(newTheme);

  localStorage.setItem("theme", newTheme);

  // Update side nav immediately
  updateSideNav();
});


// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("hidden");
});


// Close mobile menu after clicking link

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu?.classList.add("hidden");
  });
});


// ================= NAVBAR SCROLL =================

const navbar = document.getElementById("navbar");
const currentSection = document.getElementById("currentSection");


// IMPORTANT:
// Sections declared ONLY ONCE

const sections = document.querySelectorAll("section[id]");


// Section Names

const sectionNames = {
  home: "Home",
  about: "About",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  contact: "Contact",
};


// ================= GET ACTIVE SECTION =================

function getActiveSection() {
  // 250px offset works better for mobile + desktop

  const scrollPosition = window.scrollY + 250;

  let activeSection = "home";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeSection = section.id;
    }
  });

  return activeSection;
}


// ================= CURRENT SECTION =================

function updateCurrentSection() {
  const activeSection = getActiveSection();

  const name = sectionNames[activeSection] || "Home";

  if (currentSection) {
    currentSection.textContent = name;
    currentSection.href = `#${activeSection}`;
  }
}


// ================= SIDE NAV ACTIVE =================

const navLinks = document.querySelectorAll(".side-nav-link");


function updateSideNav() {
  const activeId = getActiveSection();

  const isDark =
    document.documentElement.classList.contains("dark");


  navLinks.forEach((link) => {
    const isActive =
      link.dataset.section === activeId;


    // Remove previous states

    link.classList.remove(
      "bg-[#124D1C]",
      "text-[#FFFCE1]",
      "text-[#124D1C]/60",
      "text-[#FFFCE1]/55",
      "shadow-lg",
      "shadow-[#124D1C]/20"
    );


    // ================= ACTIVE =================

    if (isActive) {
      link.classList.add(
        "bg-[#124D1C]",
        "text-[#FFFCE1]",
        "shadow-lg",
        "shadow-[#124D1C]/20"
      );
    }


    // ================= INACTIVE =================

    else {
      if (isDark) {
        link.classList.add(
          "text-[#FFFCE1]/55"
        );
      } else {
        link.classList.add(
          "text-[#124D1C]/60"
        );
      }
    }
  });
}


// ================= UPDATE EVERYTHING =================

function updateNavigation() {
  updateCurrentSection();
  updateSideNav();
}


// ================= SCROLL =================

window.addEventListener(
  "scroll",
  updateNavigation,
  { passive: true }
);


// ================= RESIZE =================

// Important for mobile orientation / browser resize

window.addEventListener(
  "resize",
  updateNavigation
);


// ================= INITIAL LOAD =================

updateNavigation();
