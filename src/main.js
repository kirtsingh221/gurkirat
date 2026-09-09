const themeToggle = document.getElementById("themeToggle");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");


// ================= THEME =================

function applyTheme(theme) {
  const html = document.documentElement;

  if (theme === "dark") {
    html.classList.add("dark");

    moonIcon?.classList.remove("hidden");
    sunIcon?.classList.add("hidden");
  } else {
    html.classList.remove("dark");

    moonIcon?.classList.add("hidden");
    sunIcon?.classList.remove("hidden");
  }
}


// ================= INITIAL THEME =================

const savedTheme = localStorage.getItem("theme");

applyTheme(
  savedTheme === "dark"
    ? "dark"
    : "light"
);


// ================= THEME ANIMATION =================

async function toggleTheme() {

  const html = document.documentElement;

  const currentTheme = html.classList.contains("dark")
    ? "dark"
    : "light";

  const newTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";


  // Browser View Transition support
  if (!document.startViewTransition) {
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    return;
  }


  const transition = document.startViewTransition(() => {
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });


  await transition.ready;


  // Click position
  const rect = themeToggle.getBoundingClientRect();

  const x = rect.left + rect.width / 10;
  const y = rect.top + rect.height / 10;


  // Maximum radius needed
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );


  // Circular reveal
  document.documentElement.animate(
    [
      {
        clipPath: `circle(0% at ${x}px ${y}px)`,
      },
      {
        clipPath: `circle(150% at ${x}px ${y}px)`,
      },
    ],
    {
      duration: 1200,
      easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      pseudoElement: "::view-transition-new(root)",
      fill: "both",
    }
  );
}


// ================= CLICK =================

themeToggle?.addEventListener(
  "click",
  toggleTheme
);

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


document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".skill-tab");
  const cards = document.querySelectorAll(".skill-card");

  function showSkills(category) {

    cards.forEach((card, index) => {

      const cardCategory = card.dataset.category;

      const shouldShow =
        category === "all" ||
        cardCategory === category;

      if (shouldShow) {

        card.style.display = "";

        /*
         * Restart animation every time
         * tab changes
         */
        card.style.animation = "none";

        requestAnimationFrame(() => {

          requestAnimationFrame(() => {

            card.style.animation =
              `skillCardIn 0.55s cubic-bezier(.2,.8,.2,1) ${
                index * 70
              }ms both`;

          });

        });

      } else {

        card.style.display = "none";

      }

    });

  }


  tabs.forEach((tab) => {

    tab.addEventListener("click", () => {

      const category = tab.dataset.filter;

      /* Remove active */
      tabs.forEach((item) => {
        item.classList.remove("active");
      });

      /* Add active */
      tab.classList.add("active");

      /* Filter cards */
      showSkills(category);

    });

  });


  /* Initial */
  showSkills("all");

});




