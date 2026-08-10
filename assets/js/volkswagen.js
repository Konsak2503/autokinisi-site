const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:0.1});
document.querySelectorAll('.fade').forEach(el=>obs.observe(el));

// ===== MOBILE NAV TOGGLE =====
(function(){
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('topNavLinks');
  if(!toggle || !links) return;
  toggle.addEventListener('click', function(){
    var isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
