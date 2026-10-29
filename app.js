/**
 * GTA SAN ANDREAS PAUSE MENU CONTROLLER
 * Clean, snappy, and responsive.
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error("PORTFOLIO_DATA not found. Ensure portfolio-data.js is loaded.");
    return;
  }

  // State
  let currentScreen = "home";
  let selectedIndex = 0;
  const menuItems = data.menuItems || [];

  // Elements
  const splashScreen = document.getElementById("splash-screen");
  const splashFill = document.getElementById("splash-loader-fill");
  const splashPercent = document.getElementById("splash-loader-percent");
  const splashStatus = document.getElementById("splash-loader-status");
  const menuList = document.getElementById("menu-items-list");

  // Footer prompts
  const promptNav = document.getElementById("prompt-nav");
  const promptEnter = document.getElementById("prompt-enter");
  const promptBack = document.getElementById("prompt-back");

  /* ==========================================================================
     1. INITIALIZE PROFILE
     ========================================================================== */
  function initProfile() {
    const prof = data.profile;
    if (!prof) return;

    const nameEl = document.getElementById("home-name-display");
    const titleEl = document.getElementById("home-title-display");
    const locEl = document.getElementById("home-loc-display");
    const imgEl = document.getElementById("home-character-img");

    if (nameEl) nameEl.textContent = prof.name || "Allen Christopher Raj D";
    if (titleEl) titleEl.textContent = prof.title || "Cyber Security Student & Developer";
    if (locEl) locEl.textContent = prof.location || "INDIA";
    if (imgEl && prof.characterImage) imgEl.src = prof.characterImage;
  }

  /* ==========================================================================
     2. RENDER MENU ITEMS (LEFT PANEL)
     ========================================================================== */
  function renderMenu() {
    if (!menuList) return;
    menuList.innerHTML = "";

    menuItems.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = `menu-item-row ${index === selectedIndex ? "selected" : ""}`;
      row.dataset.id = item.id;
      row.dataset.index = index;

      row.innerHTML = `
        <span class="menu-item-arrow">▶</span>
        <span class="menu-item-text">${item.label}</span>
      `;

      row.addEventListener("mouseenter", () => {
        if (selectedIndex !== index) {
          updateSelection(index);
        }
      });

      row.addEventListener("click", () => {
        openSection(item.id);
      });

      menuList.appendChild(row);
    });
  }

  function updateSelection(newIndex) {
    if (newIndex < 0) newIndex = menuItems.length - 1;
    if (newIndex >= menuItems.length) newIndex = 0;

    selectedIndex = newIndex;
    const rows = menuList.querySelectorAll(".menu-item-row");
    rows.forEach((row, idx) => {
      if (idx === selectedIndex) {
        row.classList.add("selected");
        row.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        row.classList.remove("selected");
      }
    });
  }

  /* ==========================================================================
     3. RENDER SUB-SCREENS (RIGHT PANEL)
     ========================================================================== */

  // About
  function renderAbout() {
    const wrap = document.getElementById("about-wrap");
    const about = data.about;
    if (!wrap || !about) return;

    const highlightsHtml = (about.highlights || []).map(h => `
      <div class="about-stat-card">
        <span class="about-stat-label">${h.label}</span>
        <span class="about-stat-val">${h.value}</span>
      </div>
    `).join("");

    const parasHtml = (about.paragraphs || []).map(p => `<p>${p}</p>`).join("");

    wrap.innerHTML = `
      <div class="about-intro-box">
        ${about.bio || ""}
      </div>
      <div class="about-highlights-grid">
        ${highlightsHtml}
      </div>
      <div class="about-body-text">
        ${parasHtml}
      </div>
    `;
  }

  // Education
  function renderEducation() {
    const wrap = document.getElementById("education-wrap");
    const edu = data.education;
    if (!wrap || !edu) return;

    wrap.innerHTML = (edu.items || []).map(item => `
      <div class="edu-item-box">
        <div class="edu-badges-group">
          ${item.percentage ? `<div class="edu-badge-score">SCORE: ${item.percentage}</div>` : ''}
          <div class="edu-badge-status">${item.status || "COMPLETED"}</div>
        </div>
        <h4 class="edu-item-inst">${item.institution}</h4>
        <div class="edu-item-degree">${item.degree}</div>
        <div class="edu-item-meta">
          <span>📅 ${item.period}</span>
          <span>📍 ${item.location}</span>
          ${item.percentage ? `<span class="edu-meta-score">🏆 Score: ${item.percentage}</span>` : ''}
        </div>
        <ul class="edu-item-bullets">
          ${(item.details || []).map(d => `<li>${d}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  // Skills
  function renderSkills() {
    const wrap = document.getElementById("skills-wrap");
    const skills = data.skills;
    if (!wrap || !skills) return;

    wrap.innerHTML = (skills.categories || []).map(cat => `
      <div class="skill-group">
        <h4 class="skill-group-title">${cat.title}</h4>
        <div class="skill-rows-grid">
          ${(cat.skills || []).map(s => `
            <div class="skill-unit">
              <div class="skill-unit-header">
                <span class="skill-unit-name">${s.name}</span>
                <span class="skill-unit-score">${s.level}%</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" data-level="${s.level}%"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  function animateSkillBars() {
    const fills = document.querySelectorAll(".skill-bar-fill");
    fills.forEach(fill => {
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.width = fill.dataset.level || "80%";
      }, 80);
    });
  }

  // Projects
  function renderProjects() {
    const wrap = document.getElementById("projects-wrap");
    const proj = data.projects;
    if (!wrap || !proj) return;

    wrap.innerHTML = (proj.missions || []).map(p => `
      <div class="mission-panel ${p.featured ? 'featured' : ''}">
        <div class="mission-top-row">
          <div>
            <span class="mission-cat-tag">${p.category || "PROJECT"}</span>
            <h4 class="mission-heading">${p.title}</h4>
          </div>
          <div class="mission-passed-label">MISSION PASSED</div>
        </div>

        <p class="mission-info-text">${p.description}</p>

        <ul class="mission-bullet-points">
          ${(p.highlights || []).map(h => `<li>${h}</li>`).join("")}
        </ul>

        <div class="mission-tags-wrap">
          ${(p.techStack || []).map(t => `<span class="mission-tag-pill">${t}</span>`).join("")}
        </div>

        <div class="mission-actions-bar">
          ${p.github ? `
            <a href="${p.github}" target="_blank" rel="noopener" class="btn-mission-link">
              SOURCE CODE
            </a>
          ` : ''}
          ${p.demo ? `
            <a href="${p.demo}" target="_blank" rel="noopener" class="btn-mission-link">
              LIVE DEMO
            </a>
          ` : ''}
        </div>
      </div>
    `).join("");
  }

  // Internship
  function renderInternship() {
    const wrap = document.getElementById("internship-wrap");
    const intern = data.internship;
    if (!wrap || !intern) return;

    wrap.innerHTML = (intern.items || []).map(item => `
      <div class="intern-card">
        <div class="intern-status-pill">COMPLETED</div>
        <h4 class="intern-company-name">${item.company}</h4>
        <div class="intern-role-title">${item.role}</div>
        <div class="intern-meta-details">
          <span>📅 ${item.period}</span>
          <span>📍 ${item.location}</span>
        </div>
        <p class="intern-body-desc">${item.description}</p>
        <ul class="intern-points">
          ${(item.responsibilities || []).map(r => `<li>${r}</li>`).join("")}
        </ul>
        <div class="mission-tags-wrap" style="margin-top: 14px;">
          ${(item.techUsed || []).map(t => `<span class="mission-tag-pill">${t}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // Official Original SVG Icons
  const SVG_ICONS = {
    linkedin: `<svg class="contact-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z"/></svg>`,
    github: `<svg class="contact-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    email: `<svg class="contact-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`
  };

  // Contact
  function renderContact() {
    const wrap = document.getElementById("contact-wrap");
    const contact = data.contact;
    if (!wrap || !contact) return;

    const linksHtml = (contact.details || []).map(item => {
      let iconSvg = SVG_ICONS.email;
      const key = (item.label || "").toLowerCase();
      if (key.includes("linkedin") || item.icon === "linkedin") {
        iconSvg = SVG_ICONS.linkedin;
      } else if (key.includes("github") || item.icon === "github") {
        iconSvg = SVG_ICONS.github;
      }

      return `
        <a href="${item.href}" target="_blank" rel="noopener" class="contact-entry-row">
          <span class="contact-entry-icon">${iconSvg}</span>
          <div class="contact-entry-content">
            <span class="contact-entry-label">${item.label}</span>
            <span class="contact-entry-val">${item.value}</span>
          </div>
        </a>
      `;
    }).join("");

    wrap.innerHTML = `
      <div class="contact-msg-box">
        ${contact.message || ""}
      </div>
      <div class="contact-links-deck">
        ${linksHtml}
      </div>
    `;
  }

  /* ==========================================================================
     4. NAVIGATION & SCREEN SWITCHING
     ========================================================================== */
  function openSection(sectionId) {
    const target = document.getElementById(`screen-${sectionId}`);
    if (!target) return;

    document.querySelectorAll(".content-screen").forEach(s => s.classList.remove("active"));
    target.classList.add("active");
    target.scrollTop = 0;
    currentScreen = sectionId;

    if (sectionId === "skills") {
      animateSkillBars();
    }
  }

  function returnToHome() {
    if (currentScreen === "home") return;

    document.querySelectorAll(".content-screen").forEach(s => s.classList.remove("active"));
    const homeScreen = document.getElementById("screen-home");
    if (homeScreen) homeScreen.classList.add("active");

    currentScreen = "home";
  }

  /* ==========================================================================
     5. KEYBOARD INPUTS
     ========================================================================== */
  window.addEventListener("keydown", (e) => {
    // If splash is loading, ignore or allow fast-forward
    if (!splashScreen.classList.contains("hidden")) {
      if (e.key === "Enter" || e.key === " ") {
        splashScreen.classList.add("hidden");
      }
      return;
    }

    if (currentScreen === "home") {
      // Navigation on menu
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        updateSelection(selectedIndex - 1);
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        updateSelection(selectedIndex + 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const active = menuItems[selectedIndex];
        if (active) openSection(active.id);
      }
    } else {
      // On a sub-screen: allow Escape to return, and ArrowUp/Down / W/S to scroll
      if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        returnToHome();
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        const activeScreen = document.querySelector(".content-screen.active");
        if (activeScreen) {
          activeScreen.scrollBy({ top: 75, behavior: "smooth" });
        }
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        const activeScreen = document.querySelector(".content-screen.active");
        if (activeScreen) {
          activeScreen.scrollBy({ top: -75, behavior: "smooth" });
        }
      }
    }
  });

  // Back button listeners
  document.querySelectorAll("[data-back]").forEach(btn => {
    btn.addEventListener("click", () => returnToHome());
  });

  // Footer prompts
  promptNav?.addEventListener("click", () => {
    updateSelection(selectedIndex + 1);
  });

  promptEnter?.addEventListener("click", () => {
    const active = menuItems[selectedIndex];
    if (active) openSection(active.id);
  });

  promptBack?.addEventListener("click", () => returnToHome());

  /* ==========================================================================
     6. AUTO-LOADING SPLASH (NO BUTTON, DIRECT DISPLAY)
     ========================================================================== */
  function runAutoLoader() {
    let progress = 0;
    const stages = [
      { at: 20, text: "INITIALIZING MODULES..." },
      { at: 55, text: "LOADING OPERATIVE ARCHIVES..." },
      { at: 85, text: "CALIBRATING DEFENSE ASSETS..." },
      { at: 100, text: "SYSTEM READY" }
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        if (splashFill) splashFill.style.width = "100%";
        if (splashPercent) splashPercent.textContent = "100%";
        if (splashStatus) splashStatus.textContent = "SYSTEM READY";

        // Directly transition into menu
        setTimeout(() => {
          splashScreen.classList.add("hidden");
        }, 350);
      } else {
        if (splashFill) splashFill.style.width = `${progress}%`;
        if (splashPercent) splashPercent.textContent = `${progress}%`;

        const currentStage = stages.find(s => progress <= s.at);
        if (currentStage && splashStatus) {
          splashStatus.textContent = currentStage.text;
        }
      }
    }, 45);
  }

  /* ==========================================================================
     7. BOOTSTRAP
     ========================================================================== */
  initProfile();
  renderMenu();
  renderAbout();
  renderEducation();
  renderSkills();
  renderProjects();
  renderInternship();
  renderContact();
  runAutoLoader();
});
