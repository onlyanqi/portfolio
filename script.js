'use strict';
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('anqi-theme'); } catch { /* Storage may be disabled. */ }
function setTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === 'light';
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
  themeButton.querySelector('span').textContent = isLight ? '☾' : '☼';
  document.querySelector('meta[name="theme-color"]').content = isLight ? '#f6f5ef' : '#111210';
}
setTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('anqi-theme', theme); } catch { /* Theme still works without storage. */ }
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.dataset.open = 'false';
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.dataset.open = String(open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
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
}
document.querySelector('#year').textContent = new Date().getFullYear();
