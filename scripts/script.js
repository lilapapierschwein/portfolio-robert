const backToTopBtn = document.getElementById("backToTop");

function changeBackToTopText(text) {
  backToTopBtn.innerHTML = text;
}

function setupNavBar() {
  const hamburgerMenu = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navItems = document.querySelectorAll(".nav-links a");

  hamburgerMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    const isMobile = window.innerWidth <= 768;
    const clickInsideMenu = navMenu.contains(e.target);
    const clickedHamburger = hamburgerMenu.contains(e.target);

    if (
      isMobile &&
      navMenu.classList.contains("active") &&
      !clickInsideMenu &&
      !clickedHamburger
    ) {
      navMenu.classList.remove("active");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      // close burgerMenu on resize to desktop to prevent state issues
      navMenu.classList.remove("active");

      // fit content of backToTopBtn to screen width
      backToTopBtn.innerHTML = "▲&nbsp;&nbsp;Zum Seitenanfang";
    } else {
      backToTopBtn.innerHTML = "▲";
    }
  });
}

function setupScrollAnimations() {
  const progressBar = document.getElementById("scrollProgress");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // progressBar
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.height = `${progress}%`;
  });
}

function setupColorToggle() {
  const toggleBtn = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.add("light");
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");

    const isLight = document.documentElement.classList.contains("light");

    toggleBtn.textContent = isLight ? "🌙" : "☀️";

    localStorage.setItem("theme", isLight ? "light" : "dark");

    navMenu.classList.remove("active");
  });
}

function setUpAlerts() {
  const sendFormBtn = document.getElementById("sendFormBtn");

  sendFormBtn.addEventListener("click", (e) => {
    window.alert("Hier kann noch nichts gesendet werden!");
    e.preventDefault();
  });
}

function init() {
  if (window.innerWidth <= 768) {
    backToTopBtn.innerHTML = backToTopBtn.innerHTML = "▲";
  } else {
    backToTopBtn.innerHTML = "▲&nbsp;&nbsp;Zum Seitenanfang";
  }

  setupNavBar();
  setupScrollAnimations();
  setupColorToggle();
  setUpAlerts();
}

init();
