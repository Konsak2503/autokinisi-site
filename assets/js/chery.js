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

// ===== BOOKING FORM (Formspree) =====
(function(){
  const form = document.getElementById('chery-booking-form');
  if(!form) return;
  const statusEl = document.getElementById('cf-status');
  const submitBtn = document.getElementById('cf-submit-btn');

  function clearErrors(){
    form.querySelectorAll('.ch-form-error').forEach(function(e){ e.textContent = ''; });
    form.querySelectorAll('.ch-form-field').forEach(function(f){ f.classList.remove('has-error'); });
  }
  function setError(fieldId, msg){
    const input = document.getElementById(fieldId);
    const field = input.closest('.ch-form-field');
    field.classList.add('has-error');
    field.querySelector('.ch-form-error').textContent = msg;
  }
  function validate(){
    clearErrors();
    let ok = true;
    const name = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const model = document.getElementById('cf-model').value;
    const type = document.getElementById('cf-type').value;

    if(!name){ setError('cf-name', 'Συμπληρώστε το ονοματεπώνυμό σας'); ok = false; }
    if(!phone){ setError('cf-phone', 'Συμπληρώστε το τηλέφωνό σας'); ok = false; }
    else if(!/^[+\d][\d\s-]{6,}$/.test(phone)){ setError('cf-phone', 'Ελέγξτε τον αριθμό τηλεφώνου'); ok = false; }
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setError('cf-email', 'Ελέγξτε τη διεύθυνση email'); ok = false; }
    if(!model){ setError('cf-model', 'Επιλέξτε μοντέλο'); ok = false; }
    if(!type){ setError('cf-type', 'Επιλέξτε τι θέλετε'); ok = false; }
    return ok;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Αποστολή...';
    statusEl.className = 'ch-form-status';
    statusEl.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(response){
      if(response.ok){
        form.reset();
        form.style.display = 'none';
        statusEl.className = 'ch-form-status success';
        statusEl.textContent = 'Ευχαριστούμε! Λάβαμε το αίτημά σας και θα επικοινωνήσουμε μαζί σας σύντομα.';
      } else {
        throw new Error('submit failed');
      }
    }).catch(function(){
      statusEl.className = 'ch-form-status error';
      statusEl.textContent = 'Κάτι πήγε στραβά με την αποστολή. Δοκιμάστε ξανά ή καλέστε μας στο 23410 75330.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Αποστολή Αιτήματος';
    });
  });
})();
