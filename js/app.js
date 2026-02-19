// not my finest work, pls don't hate!

// nav
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
      // we close the burgerMenu on resize to desktop to prevent state issues
      navMenu.classList.remove("active");
    }
  });
}

// scroll
function setupScrollAnimations() {
  const progressBar = document.getElementById("scrollProgress");
  const backToTopBtn = document.getElementById("backToTop");

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
    // we timeOut to let scroll finish, then replace the url ro avoid leaving
    // the 'wrong' url in address bar
    setTimeout(() => {
      window.location.replace("/#top");
    }, 650);
  });

  // progressBar
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.transform = `scaleX(${progress / 100})`;
  });
}

// colors
function setupColorToggle() {
  const navLogo = document.getElementById("navLogo");
  const toggleBtn = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "light") {
    navLogo.classList.remove("nav-logo-bright");
    document.documentElement.classList.add("light");
    toggleBtn.textContent = "☀";
  }

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    navLogo.classList.toggle("nav-logo-bright");
    const isLight = document.documentElement.classList.contains("light");

    toggleBtn.textContent = isLight ? "☀" : "☀";

    localStorage.setItem("theme", isLight ? "light" : "dark");

    navMenu.classList.remove("active");
  });
}

// projects count
function setUpProjectsCount() {
  const tableBodyRows = document.querySelectorAll(".table-row-body");
  const projectsTableFoot = document.getElementById("projectsTableFoot");

  const projectsCount = tableBodyRows.length;
  console.log(projectsCount);
  projectsTableFoot.innerHTML = `Gesamt: ${projectsCount}`;
}

// form alert
function setUpAlerts() {
  const sendFormBtn = document.getElementById("sendFormBtn");

  sendFormBtn.addEventListener("click", (e) => {
    window.alert("Hier kann noch nichts gesendet werden!");
    e.preventDefault();
  });
}

// gallery/lightbox
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxImage = document.getElementById("lightbox-image");

function setupGallery() {
  galleryItems.forEach((item) => {
    item.setAttribute("cursor", "pointer");
    item.addEventListener("click", function () {
      const imageName = this.getAttribute("data-image");
      showLightbox(imageName);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// lightbox logic
function showLightbox(imageName) {
  if (lightbox && lightboxImage) {
    lightboxImage.alt = imageName;

    imagePath = "";
    if (imageName) {
      imagePath = `assets/img/${imageName}.png`;
    }
    lightboxImage.src = imagePath;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function init() {
  setupNavBar();
  setupScrollAnimations();
  setupColorToggle();
  setUpProjectsCount();
  setupGallery();
  setUpAlerts();
}

init();
