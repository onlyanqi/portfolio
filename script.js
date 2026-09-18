'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  root.classList.add('js');
  const themeButton = document.querySelector('.theme-toggle');
  // Versioned preference intentionally restores the requested pastel default.
  let savedTheme;
  try { savedTheme = localStorage.getItem('anqi-pastel-theme'); } catch { /* Optional storage. */ }
  function setTheme(theme) {
    root.dataset.theme = theme;
    const night = theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(night));
    themeButton.setAttribute('aria-label', `Switch to ${night ? 'day' : 'night'} palette`);
    document.querySelector('meta[name="theme-color"]').content = night ? '#242230' : '#f8edf2';
  }
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('anqi-pastel-theme', theme); } catch { /* Works without storage. */ }
  });
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  menuButton.hidden = false;
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.dataset.open = 'false';
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.dataset.open = String(open);
  });
  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    // Preserve keyboard position after the mobile navigation closes.
    const section = document.querySelector(link.hash);
    if (section) {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
  const links = Array.from(navigation.querySelectorAll('a'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
    // One gentle reveal for the illustration; reading content remains visible.
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  }
  const film = document.querySelector('.film-hero');
  const filmButton = document.querySelector('.film-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setFilmPaused(paused) {
    film.dataset.paused = String(paused);
    filmButton.setAttribute('aria-pressed', String(!paused));
    filmButton.setAttribute('aria-label', paused ? 'Play ambient motion' : 'Pause ambient motion');
    filmButton.querySelector('span').textContent = paused ? 'Play motion' : 'Pause motion';
  }
  setFilmPaused(reducedMotion.matches);
  filmButton.hidden = false;
  filmButton.addEventListener('click', () => setFilmPaused(film.dataset.paused !== 'true'));
  reducedMotion.addEventListener('change', event => setFilmPaused(event.matches));
  document.querySelector('#year').textContent = new Date().getFullYear();
});
