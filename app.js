// ============================================================
// SkillForge — Application Logic
// State management, rendering, gamification, persistence
// ============================================================

import { DOMAINS, QUOTES, ACHIEVEMENTS, LEVEL_THRESHOLDS, getLevelForXP, getXPForNextLevel, getIcon } from './data.js';

// ─── Constants ───
const STORAGE_KEY = 'skillforge_state';
const XP_PER_ITEM = 10;
const XP_CHECKPOINT = 50;

// ─── Default State ───
function createDefaultState() {
  return {
    checkedItems: [],
    xp: 0,
    level: 1,
    streak: { count: 0, lastDate: null },
    achievements: [],
    timer: { todaySessions: 0, todayMinutes: 0, totalMinutes: 0, lastDate: null },
    activeTab: 'python',
    theme: 'light',
  };
}

// ─── State ───
let state = createDefaultState();

// ─── Load / Save ───
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...createDefaultState(), ...parsed };
      // Convert arrays back to sets for internal use via helper
      state.checkedItems = new Set(parsed.checkedItems || []);
      state.achievements = new Set(parsed.achievements || []);
    } else {
      state.checkedItems = new Set();
      state.achievements = new Set();
    }
  } catch (e) {
    console.error('Failed to load state:', e);
    state = createDefaultState();
    state.checkedItems = new Set();
    state.achievements = new Set();
  }
}

function saveState() {
  try {
    const toSave = {
      ...state,
      checkedItems: [...state.checkedItems],
      achievements: [...state.achievements],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// ─── Utility ───
function getToday() {
  return new Date().toISOString().split('T')[0];
}

function $(id) {
  return document.getElementById(id);
}

function getTotalItems() {
  let count = 0;
  DOMAINS.forEach(d => {
    if (!d.locked || isUnlocked(d)) {
      d.sections.forEach(s => count += s.items.length);
      if (d.checkpoint) count++;
    }
  });
  return count;
}

function getCheckedCount() {
  return state.checkedItems.size;
}

function getDomainItemIds(domain) {
  const ids = [];
  domain.sections.forEach(s => s.items.forEach(i => ids.push(i.id)));
  if (domain.checkpoint) ids.push(domain.checkpoint.id);
  return ids;
}

function getDomainProgress(domain) {
  const ids = getDomainItemIds(domain);
  const checked = ids.filter(id => state.checkedItems.has(id)).length;
  return { checked, total: ids.length, percent: ids.length ? Math.round((checked / ids.length) * 100) : 0 };
}

function getOverallProgress() {
  let total = 0, checked = 0;
  DOMAINS.forEach(d => {
    if (!d.locked || isUnlocked(d)) {
      const ids = getDomainItemIds(d);
      total += ids.length;
      checked += ids.filter(id => state.checkedItems.has(id)).length;
    }
  });
  return { checked, total, percent: total ? Math.round((checked / total) * 100) : 0 };
}

function isUnlocked(domain) {
  if (!domain.locked) return true;
  const progress = getOverallProgressExcluding(domain.id);
  return progress.percent >= (domain.lockThreshold || 0.8) * 100;
}

function getOverallProgressExcluding(excludeId) {
  let total = 0, checked = 0;
  DOMAINS.forEach(d => {
    if (d.id === excludeId) return;
    if (!d.locked) {
      const ids = getDomainItemIds(d);
      total += ids.length;
      checked += ids.filter(id => state.checkedItems.has(id)).length;
    }
  });
  return { checked, total, percent: total ? Math.round((checked / total) * 100) : 0 };
}

function isDomainAllItemsChecked(domain) {
  const sectionItems = domain.sections.flatMap(s => s.items.map(i => i.id));
  return sectionItems.every(id => state.checkedItems.has(id));
}

// ─── Initialize ───
function init() {
  loadState();
  applyTheme(state.theme);
  checkStreakOnLoad();
  resetTimerIfNewDay();
  injectIcons();
  renderDomainTabs();
  renderAllDomains();
  switchTab(state.activeTab);
  updateAllProgress();
  updateDashboard();
  updateQuote();
  bindEvents();
  checkAchievements(true); // silent check on load

  // Register service worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

// ─── Theme ───
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.theme = theme;
  const btn = $('btn-theme');
  if (btn) btn.innerHTML = theme === 'dark' ? getIcon('sun') : getIcon('moon');
  saveState();
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

// ─── Inject SVG Icons into static elements ───
function injectIcons() {
  // Logo
  $('logo-icon-svg').innerHTML = getIcon('flame', 18);

  // Top bar stats
  $('stat-level-icon').innerHTML = getIcon('trophy', 14);
  $('stat-xp-icon').innerHTML = getIcon('star', 14);
  $('stat-streak-icon').innerHTML = getIcon('flame', 14);
  $('stat-done-icon').innerHTML = getIcon('check', 14);

  // Mobile stats
  if ($('m-stat-level-icon')) $('m-stat-level-icon').innerHTML = getIcon('trophy', 14);
  if ($('m-stat-xp-icon')) $('m-stat-xp-icon').innerHTML = getIcon('star', 14);
  if ($('m-stat-streak-icon')) $('m-stat-streak-icon').innerHTML = getIcon('flame', 14);
  if ($('m-stat-done-icon')) $('m-stat-done-icon').innerHTML = getIcon('check', 14);

  // Toolbar buttons
  $('btn-theme').innerHTML = state.theme === 'dark' ? getIcon('sun') : getIcon('moon');
  $('btn-calendar').innerHTML = getIcon('calendar');
  $('btn-timer').innerHTML = getIcon('clock');
  $('btn-reset').innerHTML = getIcon('refresh-cw');

  // Dashboard icons
  $('dash-focus-icon').innerHTML = getIcon('crosshair', 14);
  $('dash-goals-icon').innerHTML = getIcon('target', 14);
  $('dash-streak-icon').innerHTML = getIcon('flame', 14);
  $('dash-ach-icon').innerHTML = getIcon('award', 14);

  // Calendar Modal
  $('download-icon').innerHTML = getIcon('download', 18);

  // Toast icons
  $('toast-level-icon').innerHTML = getIcon('trending-up', 20);
  $('toast-ach-icon').innerHTML = getIcon('award', 20);
}

// ─── Render Domain Tabs ───
function renderDomainTabs() {
  const container = $('domain-tabs');
  container.innerHTML = '';

  DOMAINS.forEach(domain => {
    const tab = document.createElement('button');
    tab.className = 'domain-tab';
    tab.dataset.id = domain.id;

    if (domain.locked && !isUnlocked(domain)) {
      tab.classList.add('locked');
    }

    const prog = getDomainProgress(domain);

    tab.innerHTML = `
      <span class="tab-icon">${getIcon(domain.locked && !isUnlocked(domain) ? 'lock' : domain.icon, 16)}</span>
      <span class="tab-title">${domain.title.split('(')[0].trim()}</span>
      <span class="tab-progress">${prog.percent}%</span>
    `;

    tab.addEventListener('click', () => {
      if (domain.locked && !isUnlocked(domain)) return;
      switchTab(domain.id);
    });

    container.appendChild(tab);
  });
  setTimeout(() => { if (typeof updateNavArrows === 'function') updateNavArrows(); }, 50);
}

// ─── Switch Tab ───
function switchTab(tabId) {
  state.activeTab = tabId;
  saveState();

  // Update tab styles
  document.querySelectorAll('.domain-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.id === tabId);
  });

  // Show/hide domain content
  document.querySelectorAll('.domain-content').forEach(content => {
    content.classList.toggle('active', content.dataset.id === tabId);
  });
}

// ─── Render All Domains ───
function renderAllDomains() {
  const main = $('main-content');
  main.innerHTML = '';

  DOMAINS.forEach(domain => {
    const div = document.createElement('div');
    div.className = 'domain-content';
    div.dataset.id = domain.id;

    if (domain.locked && !isUnlocked(domain)) {
      div.innerHTML = renderLockedDomain(domain);
    } else {
      div.innerHTML = renderDomainContent(domain);
    }

    main.appendChild(div);
  });
}

// ─── Render Locked Domain ───
function renderLockedDomain(domain) {
  const threshold = Math.round((domain.lockThreshold || 0.8) * 100);
  const current = getOverallProgressExcluding(domain.id).percent;
  return `
    <div class="domain-locked-overlay">
      <div class="locked-icon">${getIcon('lock', 32)}</div>
      <h3 class="locked-title">${domain.title}</h3>
      <p class="locked-desc">
        Complete ${threshold}% of the other domains to unlock this section.
        <br>Current progress: ${current}%
      </p>
      <div class="progress-bar-track" style="width: 200px; margin-top: 8px;">
        <div class="progress-bar-fill" style="width: ${Math.min(100, (current / threshold) * 100)}%; background: ${domain.gradient};"></div>
      </div>
    </div>
  `;
}

// ─── Render Domain Content ───
function renderDomainContent(domain) {
  const prog = getDomainProgress(domain);
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (prog.percent / 100) * circumference;

  let html = `
    <div class="domain-header">
      <div class="domain-icon-wrap" style="background: ${domain.gradient}">
        ${getIcon(domain.icon, 24)}
      </div>
      <div class="domain-title-group">
        <h2 class="domain-title">${domain.title}</h2>
        <p class="domain-subtitle">${prog.checked} of ${prog.total} items completed</p>
      </div>
      <div class="domain-progress-ring">
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle class="ring-bg" cx="26" cy="26" r="20"/>
          <circle class="ring-fill" cx="26" cy="26" r="20"
            stroke="${domain.color}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"/>
        </svg>
        <span class="domain-progress-text" style="color: ${domain.color}">${prog.percent}%</span>
      </div>
    </div>
  `;

  domain.sections.forEach((section, sIdx) => {
    const sectionChecked = section.items.filter(i => state.checkedItems.has(i.id)).length;
    const isExpanded = sectionChecked < section.items.length; // auto-expand incomplete sections

    html += `
      <div class="section ${isExpanded ? 'expanded' : ''}" data-section="${domain.id}-${sIdx}">
        <div class="section-header" onclick="window.__toggleSection(this)">
          <div class="section-header-left">
            <span class="section-chevron">${getIcon('chevron-right')}</span>
            <span class="section-title">${section.title}</span>
          </div>
          <span class="section-count">${sectionChecked}/${section.items.length}</span>
        </div>
        <div class="section-items">
          <div class="section-items-inner">
    `;

    section.items.forEach(item => {
      const isChecked = state.checkedItems.has(item.id);
      html += `
        <div class="item ${isChecked ? 'checked' : ''}" data-item-id="${item.id}" onclick="window.__toggleItem('${item.id}', this)">
          <div class="item-checkbox">${getIcon('check')}</div>
          <span class="item-label">${item.label}</span>
          <span class="item-xp">+${XP_PER_ITEM} XP</span>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;
  });

  // Checkpoint
  if (domain.checkpoint) {
    const cpDone = isDomainAllItemsChecked(domain);
    const cpChecked = state.checkedItems.has(domain.checkpoint.id);
    html += `
      <div class="checkpoint ${cpChecked ? 'completed' : ''}" data-cp-id="${domain.checkpoint.id}">
        <div class="checkpoint-icon" style="${cpChecked ? '' : 'color: ' + domain.color}">${cpChecked ? getIcon('check', 20) : getIcon('award', 20)}</div>
        <div class="checkpoint-content">
          <div class="checkpoint-label-tag" style="color: ${domain.color}">Checkpoint</div>
          <div class="checkpoint-text">${domain.checkpoint.label}</div>
          ${!cpChecked && cpDone ? '<button class="timer-btn" style="margin-top: 8px; font-size: 12px; padding: 6px 16px;" onclick="window.__checkpointUnlock(\'' + domain.checkpoint.id + '\', \'' + domain.id + '\')">Mark as Complete</button>' : ''}
          ${!cpChecked && !cpDone ? '<div style="font-size: 12px; color: var(--text-tertiary); margin-top: 4px;">Complete all items above to unlock</div>' : ''}
        </div>
      </div>
    `;
  }

  return html;
}

// ─── Toggle Section ───
window.__toggleSection = function (headerEl) {
  const section = headerEl.closest('.section');
  section.classList.toggle('expanded');
};

// ─── Toggle Item ───
window.__toggleItem = function (id, el) {
  const wasChecked = state.checkedItems.has(id);

  if (wasChecked) {
    state.checkedItems.delete(id);
    state.xp = Math.max(0, state.xp - XP_PER_ITEM);
    el.classList.remove('checked', 'just-checked');
  } else {
    state.checkedItems.add(id);
    state.xp += XP_PER_ITEM;
    el.classList.add('checked', 'just-checked');

    // Update streak
    updateStreakOnAction();

    // Remove just-checked after animation
    setTimeout(() => el.classList.remove('just-checked'), 1500);
  }

  // Check level
  const newLevel = getLevelForXP(state.xp);
  if (newLevel > state.level) {
    state.level = newLevel;
    showLevelUpToast(newLevel);
  } else {
    state.level = newLevel;
  }

  saveState();
  updateAllProgress();
  updateDashboard();
  checkAchievements(false);

  // Re-render the active domain to update section counts and checkpoint
  rerenderActiveDomain();
};

// ─── Checkpoint Unlock ───
window.__checkpointUnlock = function (cpId, domainId) {
  state.checkedItems.add(cpId);
  state.xp += XP_CHECKPOINT;
  updateStreakOnAction();

  const newLevel = getLevelForXP(state.xp);
  if (newLevel > state.level) {
    state.level = newLevel;
    showLevelUpToast(newLevel);
  } else {
    state.level = newLevel;
  }

  saveState();
  updateAllProgress();
  updateDashboard();
  checkAchievements(false);
  rerenderActiveDomain();
  launchConfetti();
};

// ─── Re-render active domain ───
function rerenderActiveDomain() {
  const activeDomain = DOMAINS.find(d => d.id === state.activeTab);
  if (!activeDomain) return;

  const contentEl = document.querySelector(`.domain-content[data-id="${state.activeTab}"]`);
  if (!contentEl) return;

  if (activeDomain.locked && !isUnlocked(activeDomain)) {
    contentEl.innerHTML = renderLockedDomain(activeDomain);
  } else {
    contentEl.innerHTML = renderDomainContent(activeDomain);
  }

  // Also update tabs
  renderDomainTabs();
  switchTab(state.activeTab);

  // Check if locked domains should now be unlocked
  DOMAINS.forEach(d => {
    if (d.locked && isUnlocked(d)) {
      const el = document.querySelector(`.domain-content[data-id="${d.id}"]`);
      if (el && el.querySelector('.domain-locked-overlay')) {
        el.innerHTML = renderDomainContent(d);
      }
    }
  });
}

// ─── Update All Progress Indicators ───
function updateAllProgress() {
  const overall = getOverallProgress();

  // Overall bar
  $('overall-fill').style.width = overall.percent + '%';
  $('overall-percent').textContent = overall.percent + '%';

  // XP bar
  const nextLevelXP = getXPForNextLevel(state.level);
  const prevLevelXP = state.level > 1 ? LEVEL_THRESHOLDS[state.level - 1] : 0;
  const xpInLevel = state.xp - prevLevelXP;
  const xpNeeded = nextLevelXP - prevLevelXP;
  const xpPercent = xpNeeded > 0 ? Math.min(100, Math.round((xpInLevel / xpNeeded) * 100)) : 100;

  $('xp-fill').style.width = xpPercent + '%';
  $('xp-remaining').textContent = Math.max(0, nextLevelXP - state.xp);
  $('xp-current-level').textContent = 'Level ' + state.level;

  // Stat pills
  $('level-value').textContent = state.level;
  $('xp-value').textContent = state.xp;
  $('streak-value').textContent = state.streak.count + 'd';
  $('completed-value').textContent = overall.checked + '/' + overall.total;

  // Mobile stats
  if ($('m-level-value')) $('m-level-value').textContent = state.level;
  if ($('m-xp-value')) $('m-xp-value').textContent = state.xp + ' XP';
  if ($('m-streak-value')) $('m-streak-value').textContent = state.streak.count + 'd';
  if ($('m-completed-value')) $('m-completed-value').textContent = overall.checked + '/' + overall.total;
}

// ─── Update Dashboard ───
function updateDashboard() {
  // Next step
  const nextItem = findNextItem();
  if (nextItem) {
    $('dash-next-domain').textContent = nextItem.domainTitle;
    $('dash-next-item').textContent = nextItem.label;
  } else {
    $('dash-next-domain').textContent = 'All Done';
    $('dash-next-item').textContent = 'Congratulations! You completed everything!';
  }

  // Daily goals status
  const today = getToday();
  const todayStudy = state.timer.lastDate === today ? state.timer.todayMinutes : 0;
  const checkedToday = state.streak.lastDate === today;

  let goalsHtml = '';
  goalsHtml += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="color:${checkedToday ? '#22c55e' : 'var(--text-tertiary)'}">${checkedToday ? getIcon('check', 14) : '&#9675;'}</span> Check off 1 item</div>`;
  goalsHtml += `<div style="display:flex;align-items:center;gap:6px;"><span style="color:${todayStudy >= 45 ? '#22c55e' : 'var(--text-tertiary)'}">${todayStudy >= 45 ? getIcon('check', 14) : '&#9675;'}</span> Study for 45 min (${todayStudy}m)</div>`;
  $('dash-goals-content').innerHTML = goalsHtml;

  // Streak status
  const streakEl = $('dash-streak-msg');
  if (state.streak.count === 0) {
    streakEl.textContent = 'Start today to begin your streak!';
    streakEl.className = 'dash-card-value';
  } else if (state.streak.lastDate === today) {
    streakEl.textContent = state.streak.count + ' day streak! Keep it up!';
    streakEl.className = 'dash-card-value success';
  } else {
    streakEl.textContent = 'Study today or lose your ' + state.streak.count + ' day streak!';
    streakEl.className = 'dash-card-value warning';
  }

  // Achievements
  $('dash-ach-count').textContent = state.achievements.size + ' / ' + ACHIEVEMENTS.length + ' unlocked';
}

function findNextItem() {
  for (const domain of DOMAINS) {
    if (domain.locked && !isUnlocked(domain)) continue;
    for (const section of domain.sections) {
      for (const item of section.items) {
        if (!state.checkedItems.has(item.id)) {
          return { label: item.label, domainTitle: domain.title.split('(')[0].trim() };
        }
      }
    }
  }
  return null;
}

// ─── Streak ───
function updateStreakOnAction() {
  const today = getToday();
  if (state.streak.lastDate === today) return; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (state.streak.lastDate === yesterdayStr) {
    state.streak.count++;
  } else if (state.streak.lastDate !== today) {
    state.streak.count = 1;
  }

  state.streak.lastDate = today;
  saveState();
}

function checkStreakOnLoad() {
  const today = getToday();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (state.streak.lastDate && state.streak.lastDate !== today && state.streak.lastDate !== yesterdayStr) {
    // Streak broken
    state.streak.count = 0;
    saveState();
  }
}

// ─── Timer ───
function resetTimerIfNewDay() {
  const today = getToday();
  if (state.timer.lastDate !== today) {
    state.timer.todaySessions = 0;
    state.timer.todayMinutes = 0;
    state.timer.lastDate = today;
    saveState();
  }
}

let timerInterval = null;
let timerSecondsLeft = 25 * 60;
let timerTotalSeconds = 25 * 60;
let timerRunning = false;

function updateTimerDisplay() {
  const mins = Math.floor(timerSecondsLeft / 60);
  const secs = timerSecondsLeft % 60;
  $('timer-display').textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  $('timer-start').disabled = true;
  $('timer-pause').disabled = false;

  timerInterval = setInterval(() => {
    timerSecondsLeft--;
    updateTimerDisplay();

    if (timerSecondsLeft <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      $('timer-start').disabled = false;
      $('timer-pause').disabled = true;

      // Log session
      const minutesDone = Math.round(timerTotalSeconds / 60);
      state.timer.todaySessions++;
      state.timer.todayMinutes += minutesDone;
      state.timer.totalMinutes += minutesDone;
      state.timer.lastDate = getToday();
      updateStreakOnAction();
      saveState();
      updateTimerStats();
      updateDashboard();
      checkAchievements(false);

      // Play sound + notification
      playTimerSound();
      showBrowserNotification('Study session complete!', `You studied for ${minutesDone} minutes. Great work!`);

      // Reset display
      timerSecondsLeft = timerTotalSeconds;
      updateTimerDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  if (!timerRunning) return;
  timerRunning = false;
  clearInterval(timerInterval);
  $('timer-start').disabled = false;
  $('timer-pause').disabled = true;
}

function resetTimer() {
  pauseTimer();
  timerSecondsLeft = timerTotalSeconds;
  updateTimerDisplay();
}

function setTimerPreset(minutes) {
  pauseTimer();
  timerTotalSeconds = minutes * 60;
  timerSecondsLeft = timerTotalSeconds;
  updateTimerDisplay();

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.minutes) === minutes);
  });
}

function updateTimerStats() {
  $('today-sessions').textContent = state.timer.todaySessions;
  $('today-minutes').textContent = state.timer.todayMinutes;
  $('total-hours').textContent = Math.round(state.timer.totalMinutes / 60 * 10) / 10;
}

function playTimerSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const frequencies = [523.25, 659.25, 783.99, 1046.5];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.5);
      osc.start(ctx.currentTime + i * 0.2);
      osc.stop(ctx.currentTime + i * 0.2 + 0.5);
    });
  } catch (e) {
    // Audio not supported
  }
}

function showBrowserNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>' });
  }
}

// ─── Achievements ───
function checkAchievements(silent) {
  ACHIEVEMENTS.forEach(ach => {
    if (state.achievements.has(ach.id)) return;
    if (ach.condition(state)) {
      state.achievements.add(ach.id);
      saveState();
      if (!silent) {
        showAchievementToast(ach.title, ach.desc);
      }
    }
  });
  updateDashboard();
}

// ─── Toasts ───
function showLevelUpToast(level) {
  $('toast-message').textContent = 'You reached Level ' + level + '!';
  const toast = $('level-up-toast');
  toast.classList.add('show');
  launchConfetti();
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function showAchievementToast(title, desc) {
  $('achievement-message').textContent = title + ' — ' + desc;
  const toast = $('achievement-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ─── Confetti ───
function launchConfetti() {
  const container = $('confetti-container');
  const colors = ['#c4b5fd', '#f9a8d4', '#93c5fd', '#86efac', '#fdba74', '#fde68a', '#8b5cf6', '#ec4899'];

  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (2 + Math.random() * 1.5) + 's';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = '';
  }, 3000);
}

// ─── Quote ───
function updateQuote() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  $('quote-text').textContent = '"' + quote.text + '"';
  $('quote-author').textContent = '-- ' + quote.author;
}

// ─── Calendar (.ics) Generation ───
let selectedReminderTime = 'morning';

function generateICS() {
  const timeMap = {
    morning: { hour: 8, min: 0 },
    afternoon: { hour: 14, min: 0 },
    evening: { hour: 19, min: 0 }
  };

  let t;
  if (selectedReminderTime === 'custom') {
    const customTime = $('custom-reminder-time').value;
    const [h, m] = customTime.split(':').map(Number);
    t = { hour: h, min: m };
  } else {
    t = timeMap[selectedReminderTime];
  }

  const now = new Date();
  const startDate = formatICSDate(now, t.hour, t.min);
  const customMsg = $('custom-reminder-msg').value || 'SkillForge: Daily Study Session';

  // Create 2 recurring events
  const events = [
    {
      summary: customMsg,
      description: 'Time to study! Open SkillForge and check off your roadmap items. Stay consistent, stay sharp.',
      alarm: 0
    },
    {
      summary: 'SkillForge: Streak Reminder',
      description: 'Don\'t let your streak break! Log at least one activity in SkillForge today.',
      alarm: 10
    }
  ];

  let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SkillForge//Reminders//EN\nCALSCALE:GREGORIAN\n';

  events.forEach((evt, idx) => {
    const offset = idx * 15; // stagger by 15 minutes
    const h = t.hour;
    const m = t.min + offset;

    ics += 'BEGIN:VEVENT\n';
    ics += 'DTSTART:' + formatICSDate(now, h, m) + '\n';
    ics += 'DURATION:PT30M\n';
    ics += 'RRULE:FREQ=DAILY\n';
    ics += 'SUMMARY:' + evt.summary + '\n';
    ics += 'DESCRIPTION:' + evt.description + '\n';
    ics += 'BEGIN:VALARM\n';
    ics += 'TRIGGER:-PT' + evt.alarm + 'M\n';
    ics += 'ACTION:DISPLAY\n';
    ics += 'DESCRIPTION:' + evt.summary + '\n';
    ics += 'END:VALARM\n';
    ics += 'END:VEVENT\n';
  });

  ics += 'END:VCALENDAR';

  // Download
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'skillforge-reminders.ics';
  a.click();
  URL.revokeObjectURL(url);
}

function formatICSDate(date, hours, minutes) {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// ─── Reset ───
function resetAll() {
  if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.\n\nYour XP, achievements, streaks, and all checked items will be cleared.')) {
    localStorage.removeItem(STORAGE_KEY);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
        }
        caches.keys().then(keys => {
          Promise.all(keys.map(key => caches.delete(key))).then(() => {
            window.location.href = window.location.pathname + '?reset=' + Date.now();
          });
        });
      });
    } else {
      window.location.href = window.location.pathname + '?reset=' + Date.now();
    }
  }
}

// ─── Modal Management ───
function openModal(id) {
  $(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  $(id).classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Bind Events ───
function bindEvents() {
  // Theme toggle
  $('btn-theme').addEventListener('click', toggleTheme);

  // Timer modal
  $('btn-timer').addEventListener('click', () => {
    updateTimerStats();
    openModal('timer-modal');
  });
  $('timer-close').addEventListener('click', () => closeModal('timer-modal'));
  $('timer-start').addEventListener('click', startTimer);
  $('timer-pause').addEventListener('click', pauseTimer);
  $('timer-reset-btn').addEventListener('click', resetTimer);
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => setTimerPreset(parseInt(btn.dataset.minutes)));
  });

  // Calendar modal
  $('btn-calendar').addEventListener('click', () => openModal('calendar-modal'));
  $('calendar-close').addEventListener('click', () => closeModal('calendar-modal'));
  document.querySelectorAll('.reminder-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      document.querySelectorAll('.reminder-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedReminderTime = opt.dataset.time;

      if (opt.dataset.time === 'custom') {
        const input = opt.querySelector('.custom-time-input');
        if (input && e.target !== input) {
          input.focus();
        }
      }
    });
  });
  $('download-calendar-btn').addEventListener('click', generateICS);

  // Reset
  $('btn-reset').addEventListener('click', resetAll);

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Close modals on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });

  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    // Wait a bit before asking
    setTimeout(() => {
      Notification.requestPermission();
    }, 5000);
  }

  // Scroll arrows
  const tabContainer = $('domain-tabs');
  const leftArrow = $('nav-arrow-left');
  const rightArrow = $('nav-arrow-right');
  if (tabContainer && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      tabContainer.scrollBy({ left: -tabContainer.clientWidth, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
      tabContainer.scrollBy({ left: tabContainer.clientWidth, behavior: 'smooth' });
    });
    tabContainer.addEventListener('scroll', updateNavArrows);
    window.addEventListener('resize', updateNavArrows);
  }
}

function updateNavArrows() {
  const container = $('domain-tabs');
  const leftArrow = $('nav-arrow-left');
  const rightArrow = $('nav-arrow-right');
  if (!container || !leftArrow || !rightArrow) return;
  
  // Check if scrollable
  if (container.scrollWidth <= container.clientWidth) {
    leftArrow.classList.add('hidden');
    rightArrow.classList.add('hidden');
    return;
  }

  leftArrow.classList.toggle('hidden', container.scrollLeft <= 0);
  rightArrow.classList.toggle('hidden', container.scrollLeft >= container.scrollWidth - container.clientWidth - 1);
}

// ─── Start ───
document.addEventListener('DOMContentLoaded', init);
