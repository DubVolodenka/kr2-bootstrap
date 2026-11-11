// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const h=a.getAttribute('href');if(h.length<2)return;const t=document.querySelector(h);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
// Reveal on scroll
const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
 items.forEach(el=>io.observe(el));
}else items.forEach(el=>el.classList.add('visible'));
// Catalog filters (data-epoch / data-region on .col items)
const fe=document.getElementById('f-epoch'),fr=document.getElementById('f-region');
if(fe&&fr){
 const cols=document.querySelectorAll('[data-epoch]'),empty=document.querySelector('.empty');
 const apply=()=>{let n=0;cols.forEach(c=>{
  const ok=(!fe.value||c.dataset.epoch===fe.value)&&(!fr.value||c.dataset.region===fr.value);
  c.hidden=!ok;if(ok)n++});
  empty.style.display=n?'none':'block'};
 fe.addEventListener('change',apply);fr.addEventListener('change',apply);
}
// Back-to-top button
const toTop=document.getElementById('toTop');
if(toTop){
 const toggle=()=>toTop.classList.toggle('show',window.scrollY>400);
 window.addEventListener('scroll',toggle,{passive:true});toggle();
 toTop.addEventListener('click',()=>{
  const calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top:0,behavior:calm?'auto':'smooth'});
  const skip=document.querySelector('.skip');if(skip){skip.focus({preventScroll:true});skip.blur()}
 });
}
// Glossary search
const gs=document.getElementById('g-search');
if(gs){
 const items=[...document.querySelectorAll('.gl-item')],groups=[...document.querySelectorAll('.gl-group')],ge=document.getElementById('g-empty');
 const norm=s=>s.toLowerCase().replace(/ё/g,'е');
 gs.addEventListener('input',()=>{const q=norm(gs.value.trim());let n=0;
  items.forEach(i=>{const ok=!q||norm(i.textContent).includes(q);i.hidden=!ok;if(ok)n++});
  groups.forEach(g=>g.hidden=!g.querySelector('.gl-item:not([hidden])'));
  ge.style.display=n?'none':'block'});
}
