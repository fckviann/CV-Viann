
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. SELECT ELEMENTS
  // ==========================================
  const header = document.querySelector(".site-header, header[data-header], header");

  const progressBar = document.querySelector(
    ".scroll-progress, #scroll-progress, .progress-bar"
  );

  const backToTop = document.querySelector(
    ".back-to-top, #back-to-top"
  );

  const menuToggle = document.querySelector(
    ".menu-toggle, .hamburger, #menu-toggle"
  );

  const navMenu = document.querySelector(
    "#nav-panel, .nav-panel, .nav-links, .nav-menu, #nav-menu"
  );

  // ==========================================
  // 2. SCROLL PROGRESS, HEADER, BACK TO TOP
  // ==========================================
  function handleScroll() {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      const progressFill = progressBar.querySelector("span");

      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      } else {
        progressBar.style.width = `${progress}%`;
      }
    }

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 50);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollTop > 400);
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ==========================================
  // 3. MOBILE NAVIGATION
  // ==========================================
  function closeMobileMenu() {
    if (navMenu) {
      navMenu.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = !navMenu.classList.contains("active");

      navMenu.classList.toggle("active", isOpen);
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  // ==========================================
  // 4. SMOOTH SCROLLING
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.getElementById(
        targetId.slice(1)
      );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      closeMobileMenu();
    });
  });

  // ==========================================
  // 5. REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll(
    ".reveal, .fade-in, .reveal-up"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ==========================================
  // 6. EXPERIENCE ACCORDION
  // ==========================================
  const experienceItems = Array.from(
    document.querySelectorAll(".experience-item")
  );

  function getExperienceContent(item) {
    return item.querySelector(".experience-details");
  }

  function getExperienceButton(item) {
    return item.querySelector(".expand-button");
  }

  function closeExperience(item) {
    const content = getExperienceContent(item);
    const button = getExperienceButton(item);

    item.classList.remove("active");

    if (content) {
      content.style.display = "block";
      content.style.overflow = "hidden";
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
      content.style.visibility = "hidden";
    }

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  }

  function openExperience(item) {
    const content = getExperienceContent(item);
    const button = getExperienceButton(item);

    if (!content) return;

    item.classList.add("active");

    content.style.display = "block";
    content.style.overflow = "hidden";
    content.style.visibility = "visible";
    content.style.opacity = "1";

    if (button) {
      button.setAttribute("aria-expanded", "true");
    }

    // Reset height before measuring the content
    content.style.maxHeight = "none";

    const contentHeight = content.scrollHeight;

    content.style.maxHeight = "0px";

    // Force the browser to register the collapsed height
    void content.offsetHeight;

    content.style.maxHeight = `${contentHeight}px`;
  }

  // Initialize every experience item
  experienceItems.forEach((item) => {
    const button = getExperienceButton(item);
    const content = getExperienceContent(item);

    if (!button || !content) return;

    // Make sure the details element can be expanded
    content.style.display = "block";
    content.style.overflow = "hidden";
    content.style.transition =
      "max-height 0.35s ease, opacity 0.25s ease";

    if (item.classList.contains("active")) {
      content.style.maxHeight = "none";
      content.style.opacity = "1";
      content.style.visibility = "visible";
      button.setAttribute("aria-expanded", "true");
    } else {
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
      content.style.visibility = "hidden";
      button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = item.classList.contains("active");

      // Close all other experience items
      experienceItems.forEach((otherItem) => {
        if (otherItem !== item) {
          closeExperience(otherItem);
        }
      });

      // Toggle the selected experience
      if (isOpen) {
        closeExperience(item);
      } else {
        openExperience(item);
      }
    });
  });

  // Recalculate expanded content heights after resizing
  window.addEventListener("resize", () => {
    experienceItems.forEach((item) => {
      if (!item.classList.contains("active")) return;

      const content = getExperienceContent(item);

      if (content) {
        content.style.maxHeight = "none";
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = `${contentHeight}px`;
      }
    });
  });

  // ==========================================
  // 7. EXPERIENCE FILTERING
  // ==========================================
  const filterButtons = Array.from(
    document.querySelectorAll(".filter-button[data-filter]")
  );

  const resultCount = document.querySelector(
    ".result-count strong, .result-count"
  );

  function applyExperienceFilter(filter) {
    let visibleCount = 0;
    const seenExperiences = new Set();

    experienceItems.forEach((item) => {
      const categories = (
        item.getAttribute("data-categories") || ""
      )
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      const title = item.querySelector("h3");
      const role = item.querySelector("strong");
      const date = item.querySelector("time");

      const experienceKey = [
        title?.textContent.trim().toLowerCase() || "",
        date?.textContent.trim() || ""
      ].join("|");

      let shouldShow = false;

      if (filter === "all") {
        shouldShow = !seenExperiences.has(experienceKey);

        if (shouldShow) {
          seenExperiences.add(experienceKey);
        }
      } else {
        shouldShow = categories.includes(filter);
      }

      if (shouldShow) {
        item.style.display = "";
        item.classList.remove("filtered-out");

        const index = item.querySelector(".index");

        if (index) {
          index.textContent = String(visibleCount + 1).padStart(2, "0");
        }

        visibleCount++;
      } else {
        closeExperience(item);
        item.classList.add("filtered-out");
        item.style.display = "none";
      }
    }); // <-- PERBAIKAN 1: Menutup perulangan experienceItems.forEach dengan benar di sini

    if (resultCount) {
      resultCount.textContent = String(visibleCount);
    }
  } // <-- PERBAIKAN 2: Menutup fungsi applyExperienceFilter dengan benar di sini

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter") || "all";

      filterButtons.forEach((otherButton) => {
        const isActive = otherButton === button;

        otherButton.classList.toggle("active", isActive);
        otherButton.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });

      applyExperienceFilter(filter);
    });
  });

  // Apply the default filter on page load
  if (filterButtons.length > 0) {
    const activeButton =
      filterButtons.find((button) =>
        button.classList.contains("active")
      ) || filterButtons[0];

    const initialFilter =
      activeButton.getAttribute("data-filter") || "all";

    filterButtons.forEach((button) => {
      const isActive = button === activeButton;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    applyExperienceFilter(initialFilter);
  }
  // ==========================================
  // 8. NAVBAR SCROLL SPY
  // ==========================================
  const navLinks = Array.from(
    document.querySelectorAll(".nav-panel .nav-link")
  );

  const targetSections = navLinks
    .map((link) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return null;

      return document.getElementById(href.slice(1));
    })
    .filter(Boolean);

  if (
    targetSections.length > 0 &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
      }
    );

    targetSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ==========================================
  // 9. CURRENT YEAR
  // ==========================================
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});