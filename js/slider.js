document.addEventListener('DOMContentLoaded', function(){

  function splitToSpans(el){
    if(!el) return;
    const text = el.textContent.trim();
    el.innerHTML = '';
    const frag = document.createDocumentFragment();
    const words = text.split(' ');
    words.forEach((w,wi)=>{
      const wordWrap = document.createElement('span');
      wordWrap.style.display='inline-block';
      wordWrap.style.whiteSpace='nowrap';
      for(let c=0;c<w.length;c++){
        const sp = document.createElement('span');
        sp.className='char';
        sp.textContent=w[c];
        sp.style.display='inline-block';
        sp.style.opacity='0';
        sp.style.transform='translateY(8px)';
        frag.appendChild(sp);
      }
      if(wi<words.length-1){
        const spacer=document.createElement('span');
        spacer.textContent=' ';
        spacer.style.display='inline-block';
        spacer.style.width='0.36em';
        frag.appendChild(spacer);
      }
    });
    el.appendChild(frag);
  }

  document.querySelectorAll('[data-split]').forEach(el=>splitToSpans(el));

  function kenBurns(target, opts={}){
    const {scaleFrom=1.06, scaleTo=1.18, xFrom='0px', xTo='-30px', duration=12}=opts;
    if(target._kb) target._kb.kill();
    target._kb=gsap.timeline({repeat:-1,yoyo:true}).fromTo(target,{scale:scaleFrom,x:xFrom},{scale:scaleTo,x:xTo,duration:duration,ease:"sine.inOut"});
  }

  function parallaxOnMouse(container){
    container.addEventListener('mousemove',function(e){
      const rect=container.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-0.5;
      const y=(e.clientY-rect.top)/rect.height-0.5;
      container.querySelectorAll('[data-speed]').forEach(layer=>{
        const speed=parseFloat(layer.getAttribute('data-speed'))||0.1;
        gsap.to(layer,{duration:0.9,x:x*50*speed,y:y*30*speed,ease:"power3.out",overwrite:true});
      });
    });
    container.addEventListener('mouseleave',function(){
      container.querySelectorAll('[data-speed]').forEach(layer=>gsap.to(layer,{duration:1.2,x:0,y:0,ease:"power3.out"}));
    });
  }

  const revo=document.querySelector('.revo');
  parallaxOnMouse(revo);

  const swiper=new Swiper('.revo',{
    loop:true,
    speed:1200,
    autoplay:{delay:6000,disableOnInteraction:false},
    effect:'fade',
    fadeEffect:{crossFade:true},
    pagination:{el:'.swiper-pagination',clickable:true},
    navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'},
    on:{
      init:function(){
        animateSlide(this.slides[this.activeIndex]);
        const activeBg=this.slides[this.activeIndex].querySelector('.bg-layer');
        if(activeBg) kenBurns(activeBg);
      },
      slideChangeTransitionStart:function(){
        const prevSlide=this.slides[this.previousIndex];
        if(prevSlide){
          gsap.to(prevSlide.querySelectorAll('.char,.subtitle,.eyebrow,.cta-row a'),{opacity:0,y:20,duration:0.35,stagger:0.02,ease:"power2.out"});
          const prevBg=prevSlide.querySelector('.bg-layer');
          if(prevBg && prevBg._kb) prevBg._kb.kill();
        }
      },
      slideChangeTransitionEnd:function(){
        const activeSlide=this.slides[this.activeIndex];
        animateSlide(activeSlide);
        const activeBg=activeSlide.querySelector('.bg-layer');
        if(activeBg) kenBurns(activeBg);
      }
    }
  });

  function animateSlide(slideEl){
    if(!slideEl) return;
    const chars=slideEl.querySelectorAll('.title .char');
    const subtitle=slideEl.querySelector('.subtitle');
    const eyebrow=slideEl.querySelector('.eyebrow');
    const ctabtns=slideEl.querySelectorAll('.cta-row a');
    const tl=gsap.timeline({defaults:{ease:"power3.out"}});
    tl.set([chars,subtitle,eyebrow,ctabtns],{opacity:0});
    if(eyebrow) tl.fromTo(eyebrow,{y:8,opacity:0},{y:0,opacity:1,duration:0.45});
    if(chars.length) tl.to(chars,{opacity:1,y:0,duration:0.9,stagger:0.03,ease:"power3.out"},"-=0.12");
    else { const t=slideEl.querySelector('.title'); if(t) tl.fromTo(t,{y:12,opacity:0},{y:0,opacity:1,duration:0.9}); }
    if(subtitle) tl.fromTo(subtitle,{y:18,opacity:0},{y:0,opacity:1,duration:0.7},"-=0.5");
    if(ctabtns.length) tl.fromTo(ctabtns,{y:20,opacity:0},{y:0,opacity:1,stagger:0.12,duration:0.6},"-=0.5");
  }

  revo.addEventListener('mouseenter',()=>swiper.autoplay.stop());
  revo.addEventListener('mouseleave',()=>swiper.autoplay.start());
});



// Animate Core Values cards on scroll
gsap.from(".core-card", {
  scrollTrigger:{
    trigger:".core-cards",
    start:"top 80%",
  },
  y:60,
  opacity:0,
  stagger:0.25,
  duration:1,
  ease:"power3.out"
});

// Floating animation for icons
gsap.to(".core-icon", {
  y:10,
  repeat:-1,
  yoyo:true,
  duration:2,
  ease:"sine.inOut"
});




gsap.to(".social-icon", {
  y:5,
  repeat:-1,
  yoyo:true,
  duration:2,
  ease:"sine.inOut"
});
