// Scroll-triggered reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// Count-up 25+ (hardcoded fallback "25" is already in the markup;
// this only re-animates 0 -> 25 for effect once the card scrolls into view)
const counterEl = document.querySelector('[data-counter]');
if (counterEl) {
  const target = parseInt(counterEl.dataset.counter, 10);
  const runCountUp = () => {
    const duration = 1100;
    const start = performance.now();
    counterEl.textContent = '0';
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counterEl.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else counterEl.textContent = target;
    }
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCountUp();
          counterObs.disconnect();
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    counterObs.observe(counterEl);

    setTimeout(() => {
      if (counterEl.textContent === '0') counterEl.textContent = String(target);
    }, 2500);
  }
}

// Hero parallax
const heroBg = document.getElementById('heroBg');
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e) => {
  const r = hero.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
  const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  heroBg.style.transform = `translate(${x * -10}px, ${y * -8}px) scale(1.04)`;
});
hero.addEventListener('mouseleave', () => { heroBg.style.transform = 'translate(0,0) scale(1)'; });

// Magnetic buttons
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.28}px, ${y * 0.45}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

// ===== MOBILE NAV TOGGLE =====
(function(){
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('mobileNavPanel');
  if(!toggle || !panel) return;
  toggle.addEventListener('click', function(){
    var isOpen = panel.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      panel.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
