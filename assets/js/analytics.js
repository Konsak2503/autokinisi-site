/* Google Analytics 4 με συναίνεση (Consent Mode). Δεν φορτώνει τίποτα πριν την αποδοχή. */
(function () {
  var GA_ID = 'G-PDBD4Y61R5';
  var KEY = 'sak_cookie_consent';

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Προεπιλογή: όλα απορρίπτονται μέχρι να αποφασίσει ο επισκέπτης
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  var loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function clearGACookies() {
    try {
      var host = location.hostname.replace(/^www\./, '');
      document.cookie.split(';').forEach(function (c) {
        var n = c.split('=')[0].trim();
        if (n === '_ga' || n.indexOf('_ga_') === 0 || n === '_gid') {
          [location.hostname, '.' + host].forEach(function (d) {
            document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
          });
        }
      });
    } catch (e) {}
  }

  var css = '' +
    '#sak-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:560px;margin:0 auto;background:#0a0a0a;color:#f5f4f0;border:1px solid #c8a84b;border-radius:10px;padding:18px 20px;font-family:Barlow,Arial,sans-serif;font-size:14px;line-height:1.5;box-shadow:0 10px 40px rgba(0,0,0,.45)}' +
    '#sak-consent p{margin:0 0 12px}' +
    '#sak-consent a{color:#e2bc5a;text-decoration:underline}' +
    '#sak-consent .sak-btns{display:flex;gap:10px;flex-wrap:wrap}' +
    '#sak-consent button{cursor:pointer;font:inherit;font-weight:600;padding:9px 18px;border-radius:6px;border:1px solid #c8a84b;background:transparent;color:#f5f4f0}' +
    '#sak-consent button.sak-accept{background:#c8a84b;color:#0a0a0a}' +
    '#sak-consent button:focus-visible{outline:2px solid #e2bc5a;outline-offset:2px}' +
    '#sak-cookie-settings{position:fixed;left:12px;bottom:12px;z-index:99998;background:#0a0a0a;color:#f5f4f0;border:1px solid #c8a84b;border-radius:999px;padding:6px 12px;font:600 12px Barlow,Arial,sans-serif;cursor:pointer;opacity:.85}' +
    '#sak-cookie-settings:hover{opacity:1}';

  function injectCSS() {
    if (document.getElementById('sak-consent-css')) return;
    var st = document.createElement('style');
    st.id = 'sak-consent-css';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function removeBanner() {
    var b = document.getElementById('sak-consent');
    if (b) b.remove();
  }

  function showSettingsButton() {
    if (document.getElementById('sak-cookie-settings')) return;
    var b = document.createElement('button');
    b.id = 'sak-cookie-settings';
    b.type = 'button';
    b.textContent = 'Cookies';
    b.setAttribute('aria-label', 'Ρυθμίσεις cookies');
    b.addEventListener('click', function () {
      b.remove();
      showBanner();
    });
    document.body.appendChild(b);
  }

  function showBanner() {
    injectCSS();
    removeBanner();
    var d = document.createElement('div');
    d.id = 'sak-consent';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Συναίνεση cookies');
    d.innerHTML =
      '<p>Χρησιμοποιούμε cookies του Google Analytics για να μετράμε την επισκεψιμότητα και να βελτιώνουμε τον ιστότοπο. Θα ενεργοποιηθούν μόνο αν τα αποδεχτείτε. Περισσότερα στην <a href="cookies.html">Πολιτική Cookies</a>.</p>' +
      '<div class="sak-btns">' +
      '<button type="button" class="sak-accept">Αποδοχή</button>' +
      '<button type="button" class="sak-reject">Απόρριψη</button>' +
      '</div>';
    document.body.appendChild(d);
    d.querySelector('.sak-accept').addEventListener('click', function () {
      setChoice('granted');
      removeBanner();
      loadGA();
      showSettingsButton();
    });
    d.querySelector('.sak-reject').addEventListener('click', function () {
      setChoice('denied');
      removeBanner();
      clearGACookies();
      showSettingsButton();
    });
  }

  function init() {
    injectCSS();
    var c = getChoice();
    if (c === 'granted') {
      loadGA();
      showSettingsButton();
    } else if (c === 'denied') {
      showSettingsButton();
    } else {
      showBanner();
    }
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
