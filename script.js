const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
function applyTheme(t){
  root.setAttribute('data-theme', t);
  themeToggle.textContent = t === 'light' ? '☀️' : '🌙';
  try{ localStorage.setItem('theme', t); }catch(e){}
}
let saved = 'dark';
try{ saved = localStorage.getItem('theme') || 'dark'; }catch(e){}
applyTheme(saved);
themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlinks a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if(window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
}, {threshold:0.15});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('formStatus');
  if(!name || !email || !message){
    status.textContent = 'Please fill in all fields.';
    status.style.color = '#ff6b6b';
    return;
  }
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = `mailto:yourmail@example.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email client...';
  status.style.color = '#6c8cff';
});