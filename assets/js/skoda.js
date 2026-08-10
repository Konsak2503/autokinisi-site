const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:0.1});
document.querySelectorAll('.fade').forEach(el=>obs.observe(el));

const tabs=document.querySelectorAll('.sk-tab');
const cards=document.querySelectorAll('.sk-model-card');
tabs.forEach(t=>t.addEventListener('click',()=>{
tabs.forEach(x=>x.classList.remove('active'));
t.classList.add('active');
const f=t.dataset.filter;
cards.forEach(c=>{
const cats=(c.dataset.cat||'').split(' ');
c.style.display=(f==='all'||cats.includes(f))?'':'none';
});
}));

// ===== MOBILE NAV TOGGLE =====
(function(){
  var toggle = document.getElementById('skNavToggle');
  var links = document.getElementById('skNavLinks');
  if(!toggle || !links) return;
  toggle.addEventListener('click', function(){
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
