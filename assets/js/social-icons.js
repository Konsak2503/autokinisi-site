/* Αντικαθιστά τις λέξεις Facebook / Instagram στο footer με εικονίδια */
(function () {
  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>'
  };
  var NAMES = { facebook: 'Facebook', instagram: 'Instagram' };

  function brandOf(a) {
    var row = a.parentElement;
    var label = row && row.querySelector('span');
    var t = label ? label.textContent.trim() : '';
    return t && t.indexOf('Ακολουθήστε') !== 0 ? t : '';
  }

  function run() {
    var links = document.querySelectorAll('footer a[href*="facebook.com"], footer a[href*="instagram.com"], a.footer-back[href*="facebook.com"], a.footer-back[href*="instagram.com"], a.ch-footer-back[href*="facebook.com"], a.ch-footer-back[href*="instagram.com"], a.sk-footer-back[href*="facebook.com"], a.sk-footer-back[href*="instagram.com"]');
    links.forEach(function (a) {
      if (a.dataset.iconified) return;
      var key = a.href.indexOf('facebook.com') > -1 ? 'facebook' : 'instagram';
      var txt = a.textContent.replace('→', '').trim().toLowerCase();
      if (txt !== key) return; // μόνο συνδέσμοι που γράφουν σκέτο το όνομα
      var brand = brandOf(a);
      a.setAttribute('aria-label', NAMES[key] + (brand ? ' – ' + brand : ''));
      a.setAttribute('title', NAMES[key] + (brand ? ' – ' + brand : ''));
      a.innerHTML = ICONS[key];
      a.style.display = 'inline-flex';
      a.style.alignItems = 'center';
      a.style.justifyContent = 'center';
      a.style.width = '34px';
      a.style.height = '34px';
      a.style.padding = '0';
      a.style.borderRadius = '50%';
      a.style.border = '1px solid currentColor';
      a.style.textDecoration = 'none';
      a.style.transition = 'opacity .2s, color .2s';
      a.style.opacity = '.8';
      a.addEventListener('mouseenter', function () { a.style.opacity = '1'; });
      a.addEventListener('mouseleave', function () { a.style.opacity = '.8'; });
      a.dataset.iconified = '1';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
