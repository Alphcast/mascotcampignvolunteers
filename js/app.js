(function () {
  /* ---------- Init EmailJS ---------- */
  emailService.init();

  /* ---------- Loading Screen ---------- */
  const loading = document.getElementById("loading-screen");
  window.addEventListener("load", function () {
    loading.classList.add("hidden");
  });
  setTimeout(function () {
    loading.classList.add("hidden");
  }, 4000);

  /* ---------- Mobile Nav Toggle ---------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  toggle.addEventListener("click", function () {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  /* ---------- Close menu on nav link click (mobile) ---------- */
  menu.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });

  /* ---------- Header scroll effect ---------- */
  const header = document.getElementById("site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 60);
  });

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- Stat Counter Animation ---------- */
  const statNums = document.querySelectorAll(".stat-num");
  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"), 10);
          if (!target) return;
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const interval = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current.toLocaleString();
          }, 25);
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach(function (el) {
    statObserver.observe(el);
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  document.querySelectorAll(".gallery-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const img = btn.querySelector("img");
      const caption = btn.getAttribute("data-caption") || "";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption;
      lightbox.setAttribute("aria-hidden", "false");
      lightbox.classList.add("active");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) closeLightbox();
  });
})();
