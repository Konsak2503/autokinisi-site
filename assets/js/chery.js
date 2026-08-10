const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:0.08});
document.querySelectorAll('.fade').forEach(el=>obs.observe(el));

document.querySelectorAll('.ch-carousel').forEach(car=>{
  const slides=car.querySelectorAll('.ch-model-img-slide');
  const dots=car.querySelectorAll('.ch-model-img-dot');
  if(slides.length<2) return;
  let idx=0;
  const interval=parseInt(car.dataset.interval,10)||4500;
  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    dots.forEach(d=>d.classList.remove('active'));
    slides[i].classList.add('active');
    if(dots[i]) dots[i].classList.add('active');
    idx=i;
  }
  let timer=setInterval(()=>show((idx+1)%slides.length),interval);
  dots.forEach((d,i)=>d.addEventListener('click',()=>{
    show(i);
    clearInterval(timer);
    timer=setInterval(()=>show((idx+1)%slides.length),interval);
  }));
});
