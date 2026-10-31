const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* Cloudflare Web Analytics */
(function(){var s=document.createElement('script');s.type='module';s.src='https://static.cloudflareinsights.com/beacon.min.js';s.setAttribute('data-cf-beacon','{"token": "ebf0d0dcce444033ac67c5993255b577"}');document.body.appendChild(s)})();

/* Google Analytics 4 (με συναίνεση cookies) */
(function(){var s=document.createElement('script');s.src='assets/js/analytics.js';s.defer=true;document.head.appendChild(s)})();
