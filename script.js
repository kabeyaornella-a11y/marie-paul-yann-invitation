/* === GLOBALS : définitions uniques ready / q / qa === */
function ready(fn) {
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn)
    : fn();
}
function q(s, r)  { return (r || document).querySelector(s); }
function qa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }


/* === JS FINAL CONSOLIDÉ V34 CLEAN === */

/* ═══ TRANSLATIONS ═══ */
var LANG = {
  fr: {
    intro: "VOUS ÊTES CONVIÉS À LA CÉLÉBRATION DU MARIAGE DE",
    q1: "Deux âmes, une promesse :",
    q2: "Une éternité à écrire ensemble.",
    cta: "Vivre l’expérience"
  },
  en: {
    intro: "YOU ARE INVITED TO CELEBRATE THE WEDDING OF",
    q1: "Two souls, one promise:",
    q2: "An eternity to write together.",
    cta: "Live the experience"
  }
};
var currentLang = 'fr';
function setLang(l){
  currentLang = l;
  var t = LANG[l];
  var el = function(id){ return document.getElementById(id); };
  if(el('txt-intro')) el('txt-intro').innerHTML = t.intro;
  if(el('txt-q1')) el('txt-q1').innerHTML = t.q1;
  if(el('txt-q2')) el('txt-q2').innerHTML = t.q2;
  if(el('cta-text')) el('cta-text').textContent = t.cta;
  document.querySelectorAll('#lang-sw button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===l);});
}
function toggleMusic(){
  var a=document.getElementById('audio'),b=document.getElementById('mus-btn');
  if(!a)return;
  if(a.paused){
    a.volume=0.22;
    a.play().then(function(){ if(b){b.textContent='♫';b.classList.add('is-playing');} }).catch(function(){});
  } else {
    a.pause();
    if(b){b.textContent='♪';b.classList.remove('is-playing');}
  }
}
function startEventiaMusic(){
  var a=document.getElementById('audio'),b=document.getElementById('mus-btn');
  if(!a)return;
  try{ a.volume=0.22; a.currentTime = a.currentTime || 0; }catch(e){}
  var p=a.play();
  if(p && p.then){ p.then(function(){ if(b){b.textContent='♫';b.classList.add('is-playing');} }).catch(function(){}); }
  else { if(b){b.textContent='♫';b.classList.add('is-playing');} }
}

/* ═══ PORTE ═══ */
(function(){
  var enter  = document.getElementById('enter');
  var vid    = document.getElementById('vid');
  var wash   = document.getElementById('wash');
  var cta    = document.getElementById('cta');
  var glowC  = document.getElementById('glow');
  var gCtx   = glowC.getContext('2d');
  var hero   = document.getElementById('hero');
  var started = false;
  var GLOW_START=8.0, FADE_START=10.2, FADE_DUR=0.9, FALLBACK=12.1;

  function resize(){ glowC.width=enter.offsetWidth; glowC.height=enter.offsetHeight; }
  resize(); window.addEventListener('resize',resize);

  function drawGlow(p){
    gCtx.clearRect(0,0,glowC.width,glowC.height);
    if(p<=0) return;
    var W=glowC.width,H=glowC.height,cx=W*.5,cy=H*.24;
    glowC.style.opacity='1';
    gCtx.save();
    gCtx.globalCompositeOperation='lighter';
    var r1=Math.max(W,H)*(.04+p*.32);
    gCtx.filter='blur('+(16+p*32)+'px)';
    var g1=gCtx.createRadialGradient(cx,cy,0,cx,cy,r1);
    g1.addColorStop(0,'rgba(255,255,255,'+(0.95*p)+')');
    g1.addColorStop(.22,'rgba(255,255,255,'+(0.78*p)+')');
    g1.addColorStop(.5,'rgba(255,246,215,'+(0.42*p)+')');
    g1.addColorStop(1,'rgba(255,255,255,0)');
    gCtx.fillStyle=g1;
    gCtx.beginPath();gCtx.ellipse(cx,cy,r1*1.1,r1*1.35,0,0,Math.PI*2);gCtx.fill();
    var r2=Math.max(W,H)*(.06+p*1.2);
    gCtx.filter='blur('+(28+p*42)+'px)';
    var g2=gCtx.createRadialGradient(cx,cy,r1*.1,cx,cy,r2);
    g2.addColorStop(0,'rgba(255,255,255,'+(0.45*p)+')');
    g2.addColorStop(.35,'rgba(255,248,225,'+(0.28*p)+')');
    g2.addColorStop(1,'rgba(255,255,255,0)');
    gCtx.fillStyle=g2;
    gCtx.beginPath();gCtx.ellipse(cx,cy,r2,r2*1.5,0,0,Math.PI*2);gCtx.fill();
    gCtx.restore();
  }

  function tick(){
    var t=vid.currentTime||0;
    if(t>=GLOW_START) drawGlow(Math.min((t-GLOW_START)/(FADE_START-GLOW_START+.8),1));
    if(t>=FADE_START){
      var fp=Math.min((t-FADE_START)/FADE_DUR,1);
      fp=fp*fp*fp*fp;
      wash.style.opacity=String(fp);
      glowC.style.opacity=String(Math.max(0,1-fp*1.5));
    }
    if(t>=FALLBACK){
      wash.style.opacity='1';
      setTimeout(function(){ enter.classList.add('hide'); showHero(); },350);
      return;
    }
    requestAnimationFrame(tick);
  }

  vid.addEventListener('ended',function(){
    wash.style.opacity='1';
    setTimeout(function(){ enter.classList.add('hide'); showHero(); },350);
  });

  function showHero(){
    document.body.style.background='#f5ede0';
    /* Autoplay musique dès la page principale */
    try{ var _aud=document.getElementById('audio'); if(_aud){ _aud.volume=0.18; _aud.play().catch(function(){}); } }catch(_e){}
    document.body.style.overflow='auto';
    hero.classList.add('active');

    /* Fondu inversé : voile blanc → transparent */
    var veil=document.getElementById('hero-veil');
    if(veil){
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          veil.style.opacity='0';
          setTimeout(function(){ veil.style.display='none'; }, 700);
        });
      });
    }
    setTimeout(function(){ var q=document.querySelector('.h-q1'); if(q) q.classList.add('show'); },900);
    setTimeout(function(){ var q=document.querySelector('.h-q2'); if(q) q.classList.add('show'); },3400);
    setTimeout(startSparkles,5800);
  }

  /* iOS Safari: play MUST be called directly in click handler, synchronously */
  enter.addEventListener('click',function(){
    if(started) return;
    started=true;
    /* Musique lancée immédiatement dans le geste utilisateur, nécessaire sur iPhone */
    startEventiaMusic();
    /* Hide CTA immediately */
    cta.style.opacity='0';
    cta.style.pointerEvents='none';
    /* Show video immediately */
    vid.style.opacity='1';
    /* Play — direct call in click handler for iOS */
    vid.play().catch(function(e){
      console.log('play error:',e);
    });
    requestAnimationFrame(tick);
  });

  function startSparkles(){
    var sc=document.getElementById('sparkCanvas');
    if(!sc) return;
    var ctx2=sc.getContext('2d');
    function resize(){ sc.width=hero.offsetWidth; sc.height=hero.offsetHeight; }
    resize();
    window.addEventListener('resize', resize, {passive:true});
    var sparks=[];
    /* Étoile montante depuis le bas : naît en bas, monte doucement, scintille */
    function mk(){
      var bright=Math.random()<.55;
      return{
        x:sc.width*(0.04+Math.random()*0.92),
        y:sc.height*(0.82+Math.random()*0.18), /* naissance en bas */
        vx:(Math.random()-0.5)*0.18,
        vy:-(0.28+Math.random()*0.52),          /* monte vers le haut */
        life:0,
        maxLife:320+Math.random()*360,
        size:0.5+Math.random()*1.6,
        opacity:0,
        bright:bright,
        twinkleOffset:Math.random()*Math.PI*2
      };
    }
    for(var i=0;i<38;i++){ var s=mk(); s.life=Math.random()*s.maxLife; sparks.push(s); }
    function drawStar(ctx,x,y,sz){
      /* étoile à 4 branches fines */
      ctx.beginPath();
      ctx.moveTo(x, y-sz*2.4);
      ctx.lineTo(x+sz*0.32, y-sz*0.32);
      ctx.lineTo(x+sz*2.4, y);
      ctx.lineTo(x+sz*0.32, y+sz*0.32);
      ctx.lineTo(x, y+sz*2.4);
      ctx.lineTo(x-sz*0.32, y+sz*0.32);
      ctx.lineTo(x-sz*2.4, y);
      ctx.lineTo(x-sz*0.32, y-sz*0.32);
      ctx.closePath();
    }
    function frame(){
      ctx2.clearRect(0,0,sc.width,sc.height);
      /* naissance aléatoire douce */
      if(sparks.length<62 && Math.random()<0.12) sparks.push(mk());
      for(var i=sparks.length-1;i>=0;i--){
        var s=sparks[i];
        s.life++;
        /* mouvement doux */
        s.x += s.vx + Math.sin(s.life*0.018+s.twinkleOffset)*0.15;
        s.y += s.vy;
        /* fade in / scintillement / fade out */
        var r=s.life/s.maxLife;
        var envelope = r<0.15 ? r/0.15 : r>0.78 ? (1-r)/0.22 : 1;
        var twinkle = 0.55 + 0.45*Math.sin(s.life*0.11+s.twinkleOffset);
        s.opacity = envelope * twinkle * (s.bright ? 0.88 : 0.52);
        ctx2.save();
        ctx2.globalAlpha = Math.max(0, s.opacity);
        var col = s.bright ? 'rgba(235,195,120,' : 'rgba(160,120,55,';
        ctx2.fillStyle = col + s.opacity + ')';
        ctx2.shadowColor = s.bright ? 'rgba(255,220,140,0.9)' : 'rgba(185,144,72,0.6)';
        ctx2.shadowBlur = s.bright ? s.size*7 : s.size*3.5;
        drawStar(ctx2, s.x, s.y, s.size);
        ctx2.fill();
        ctx2.restore();
        if(s.life>=s.maxLife) sparks.splice(i,1);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();


(function(){
  function hideInst(){var el=document.querySelector('#notre-date .date-instruction-below'); if(el) el.classList.add('is-hidden-after-scratch');}
  window.addEventListener('message',function(e){ if(e.data && (e.data.type==='eventia-scratch-start'||e.data.type==='eventia-scratch-complete')) hideInst(); });
})();


(function(){
  function fitTimeline(){
    var f=document.getElementById('timelineExactFrame');
    if(!f) return;
    try{
      var d=f.contentDocument||f.contentWindow.document;
      var h=Math.max(d.documentElement.scrollHeight,d.body.scrollHeight,d.querySelector('.tl-page')?d.querySelector('.tl-page').scrollHeight:0);
      f.style.height=(h+10)+'px';
      f.style.overflow='hidden';
      d.documentElement.style.overflow='hidden';
      d.body.style.overflow='hidden';
    }catch(e){f.style.height='1040px';}
  }
  window.addEventListener('resize',fitTimeline,{passive:true});
  window.addEventListener('message',function(e){if(e.data&&e.data.type==='timeline-ready') fitTimeline();});
  setTimeout(fitTimeline,300);setTimeout(fitTimeline,900);setTimeout(fitTimeline,1800);
})();


(function(){
  var items=[].slice.call(document.querySelectorAll('.es-section .es-inner,.date-inner,.countdown-inner,.story2-intro,.places-grid,.timeline,.cards3,.rsvp-form'));
  items.forEach(function(el){el.classList.add('es-reveal');});
  if(!('IntersectionObserver' in window)){items.forEach(function(el){el.classList.add('es-visible');});return;}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('es-visible');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(el){io.observe(el);});
})();


(function(){
  document.querySelectorAll('.carousel').forEach(function(car){
    var slides=[].slice.call(car.querySelectorAll('.place-slide')); var i=0;
    function show(n){ i=(n+slides.length)%slides.length; slides.forEach(function(s,k){s.classList.toggle('active',k===i);}); }
    car.querySelectorAll('.carousel-arrow').forEach(function(btn){btn.addEventListener('click',function(){show(i+parseInt(btn.getAttribute('data-dir'),10));});});
  });
})();

var EXTRA_LANG={
 fr:{date_kicker:'NOTRE DATE',date_title:'Les Médaillons du Destin',date_copy:'Derrière ces médaillons de lumière se révèle le jour où nos âmes s’uniront.',date_inst:'GRATTEZ DÉLICATEMENT CHAQUE MÉDAILLON',countdown_kicker:'COMPTE À REBOURS',countdown_title:'L’attente sacrée',countdown_copy:'La date s’est révélée.<br/>Désormais, le temps avance doucement vers ce jour choisi, celui où nos familles, nos prières et nos promesses se réuniront dans une même lumière.',places_kicker:'LES LIEUX',places_title:'Nous y retrouver',places_copy:'Deux lieux, une même journée : la promesse civile à la mairie, puis la bénédiction et la réception au Domaine des Rois. Chaque adresse devient un chapitre de cette journée que nous rêvons avec vous.',civil_title:'CÉRÉMONIE CIVILE',reception_title:'BÉNÉDICTION & RÉCEPTION',join_btn:'Nous y rejoindre',program_kicker:'PROGRAMME',program_title:'Les heures de notre promesse',p1:'Cérémonie civile',p2:'Bénédiction nuptiale',p3:'Vin d’honneur',p4:'Dîner',p5:'Première danse',p6:'Feu d’artifice',p7:'Soirée dansante',p8:'Brunch',dress_kicker:'DRESS CODE',dress_title:'L’élégance attendue',dress_copy:'Nous vous invitons à entrer dans une harmonie douce et raffinée: ivoire, champagne, marron et noir.',stay_kicker:'HÉBERGEMENTS',stay_title:'Une parenthèse près du domaine',stay_copy:'Le Domaine des Rois dispose d’un manoir avec suites sur place. Pour compléter votre séjour, plusieurs hébergements peuvent être réservés autour d’Échouboulains et de Fontainebleau.',stay1_title:'Sur place',stay1_copy:'Le manoir du Domaine des Rois, idéal pour les proches et la famille.',stay2_copy:'Chambres d’hôtes et hébergements à proximité du domaine.',stay3_copy:'Une option pratique pour prolonger le week-end dans un cadre élégant.',discover:'Découvrir',around_kicker:'AUTOUR DE LA CÉLÉBRATION',around_title:'Quelques échappées à partager',act1:'Une cité médiévale pour une promenade pleine de charme.',act2:'Son château, ses jardins et sa forêt pour prolonger l’évasion.',act3:'Une parenthèse féerique pour les invités qui souhaitent prolonger le séjour.',prints_kicker:'VOS EMPREINTES DANS NOTRE HISTOIRE',prints_title:'Laissez une trace de cette célébration',playlist:'Playlist collaborative',playlist_copy:'Ajoutez la chanson que vous aimeriez entendre pendant la soirée.',add_song:'Ajouter ma chanson',gallery:'Album photo live',gallery_copy:'Partagez vos photos et découvrez les souvenirs des invités.',share_photos:'Partager mes photos',audio:'Livre audio',audio_copy:'Laissez un message vocal que nous écouterons après le mariage.',record_msg:'Enregistrer mon message',gifts_kicker:'POUR ORNER NOTRE UNION',gifts_title:'Une petite attention',gifts_copy:'Votre présence sera toujours notre plus beau présent. Pour ceux qui souhaitent accompagner notre nouvelle vie d’une délicate attention, quelques possibilités ont été préparées avec tendresse.',gift_list:'Liste de mariage',gift_list_copy:'Une sélection pensée pour accompagner notre nouveau chapitre.',fund:'Cagnotte',fund_copy:'Participer à nos projets et à notre vie de famille.',participate:'Participer',bank:'Virement bancaire',bank_copy:'Les coordonnées bancaires restent masquées et seront révélées sur demande.',show_details:'Afficher les coordonnées',rsvp_title:'Votre présence, notre honneur',rsvp_copy:'Merci de confirmer votre présence avant le 15 juin 2027.',thanks_kicker:'REMERCIEMENTS',thanks_title:'Merci de faire partie de notre histoire',thanks_copy:'Avec toute notre affection.',final_copy:'Le plus beau chapitre de notre histoire reste encore à écrire.',first_name:'Prénom',last_name:'Nom',email:'Email',phone:'Téléphone',presence:'Présence',yes:'Oui',no:'Non',meal:'Repas',meat:'Viande',fish:'Poisson',vegetarian:'Végétarien',adults:'Nombre adultes',children:'Nombre enfants',allergies:'Allergies, halal, sans porc, kasher',message:'Un message pour les mariés',send:'Envoyer ma réponse'},
 en:{date_kicker:'OUR DATE',date_title:'The Medallions of Destiny',date_copy:'Behind these medallions of light, the day our souls will unite is revealed.',date_inst:'GENTLY SCRATCH EACH MEDALLION',countdown_kicker:'COUNTDOWN',countdown_title:'The sacred wait',countdown_copy:'Every second brings us closer to the most beautiful chapter of our story.Time moves softly toward the chosen day, when our families, prayers and promises will gather in one light.',places_kicker:'THE PLACES',places_title:'Join us there',places_copy:'Two places, one day: the civil promise at the town hall, then the blessing and reception at Domaine des Rois.',civil_title:'CIVIL CEREMONY',reception_title:'BLESSING AND RECEPTION',join_btn:'Join us there',program_kicker:'PROGRAM',program_title:'The flow of the day',p1:'Civil ceremony',p2:'Nuptial blessing',p3:'Cocktail reception',p4:'Dinner',p5:'First dance',p6:'Fireworks',p7:'Dance party',p8:'Brunch',dress_kicker:'DRESS CODE',dress_title:'Expected elegance',dress_copy:'We invite you into a soft, refined harmony: ivory, champagne, brown and black.',stay_kicker:'ACCOMMODATION',stay_title:'Your stay',stay_copy:'Domaine des Rois offers a manor with suites on site. Additional stays can be booked around Échouboulains and Fontainebleau.',stay1_title:'On site',stay1_copy:'The manor at Domaine des Rois, ideal for close family and loved ones.',stay2_copy:'Guest houses and accommodation near the estate.',stay3_copy:'A practical option to extend the weekend in an elegant setting.',discover:'Discover',around_kicker:'AROUND THE CELEBRATION',around_title:'Moments to enjoy',act1:'A medieval town for a charming walk.',act2:'Its château, gardens and forest to extend the escape.',act3:'A magical stop for guests who wish to extend their stay.',prints_kicker:'YOUR MARKS IN OUR STORY',prints_title:'Leave your mark on the celebration',playlist:'Collaborative playlist',playlist_copy:'Add the song you would love to hear during the evening.',add_song:'Add my song',gallery:'Live photo album',gallery_copy:'Share your photos and discover guests’ memories.',share_photos:'Share my photos',audio:'Audio guestbook',audio_copy:'Leave a voice message we will listen to after the wedding.',record_msg:'Record my message',gifts_kicker:'TO HONOUR OUR UNION',gifts_title:'A small attention',gifts_copy:'Your presence will always be our most beautiful gift.',gift_list:'Wedding list',gift_list_copy:'A selection to accompany our new chapter.',fund:'Gift fund',fund_copy:'Contribute to our projects and family life.',participate:'Contribute',bank:'Bank transfer',bank_copy:'Bank details remain hidden and will be revealed on request.',show_details:'Show details',rsvp_title:'Your presence, our honour',rsvp_copy:'Please confirm your presence before June 15, 2027.',thanks_kicker:'THANK YOU',thanks_title:'Thank you for being part of our story',thanks_copy:'With all our affection.',final_copy:'The most beautiful chapter of our story is still to be written.',first_name:'First name',last_name:'Last name',email:'Email',phone:'Phone',presence:'Presence',yes:'Yes',no:'No',meal:'Meal',meat:'Meat',fish:'Fish',vegetarian:'Vegetarian',adults:'Adults',children:'Children',allergies:'Allergies, halal, no pork, kosher',message:'A message for the couple',send:'Send my reply'},
 es:{date_kicker:'NUESTRA FECHA',date_title:'Los Medallones del Destino',date_copy:'Detrás de estos medallones de luz se revela el día en que nuestras almas se unirán.',date_inst:'RASCA DELICADAMENTE CADA MEDALLÓN',countdown_kicker:'CUENTA ATRÁS',countdown_title:'La espera sagrada',countdown_copy:'Cada segundo nos acerca al capítulo más hermoso de nuestra historia.<br><br>El tiempo avanza suavemente hacia ese día elegido, cuando nuestras familias, oraciones y promesas se reunirán en una misma luz.',places_kicker:'LOS LUGARES',places_title:'Acompáñanos',places_copy:'Dos lugares, un mismo día: la promesa civil en el ayuntamiento, luego la bendición y la recepción en Domaine des Rois.',civil_title:'CEREMONIA CIVIL',reception_title:'BENDICIÓN Y RECEPCIÓN',join_btn:'Acompáñanos',program_kicker:'PROGRAMA',program_title:'El hilo del día',p1:'Ceremonia civil',p2:'Bendición nupcial',p3:'Cóctel',p4:'Cena',p5:'Primer baile',p6:'Fuegos artificiales',p7:'Fiesta',p8:'Brunch',dress_kicker:'DRESS CODE',dress_title:'La elegancia esperada',dress_copy:'Os invitamos a entrar en una armonía suave y refinada: marfil, champán, marrón y negro.',stay_kicker:'ALOJAMIENTO',stay_title:'Vuestra estancia',stay_copy:'Domaine des Rois ofrece un manoir con suites en el lugar. También hay alojamientos alrededor de Échouboulains y Fontainebleau.',discover:'Descubrir',around_kicker:'ALREDEDOR DE LA CELEBRACIÓN',around_title:'Momentos para disfrutar',prints_kicker:'VUESTRAS HUELLAS EN NUESTRA HISTORIA',prints_title:'Dejad vuestra huella en la celebración',playlist:'Playlist colaborativa',gallery:'Álbum de fotos en vivo',audio:'Libro de audio',gifts_kicker:'PARA HONRAR NUESTRA UNIÓN',gifts_title:'Una pequeña atención',rsvp_title:'Vuestra presencia, nuestro honor',thanks_kicker:'AGRADECIMIENTOS',thanks_title:'Gracias por formar parte de nuestra historia',thanks_copy:'Con todo nuestro cariño.',final_copy:'El capítulo más hermoso de nuestra historia aún está por escribirse.',join_btn:'Acompáñanos',send:'Enviar mi respuesta'}
};
var oldSetLang = window.setLang;
window.setLang=function(l){
  if(oldSetLang) oldSetLang(l==='es'?'en':l);
  var t=EXTRA_LANG[l]||EXTRA_LANG.fr;
  document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n'); if(t[k]) el.innerHTML=t[k];});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){var k=el.getAttribute('data-i18n-placeholder'); if(t[k]) el.setAttribute('placeholder',t[k]);});
  document.querySelectorAll('#lang-sw button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===l);});
  currentLang=l;
};

/* ══ TOPNAV SCROLL ══ */
window.addEventListener('scroll',function(){
  var n=document.getElementById('topnav');
  if(!n)return;
  n.classList.toggle('scrolled',window.scrollY>80);
},{passive:true});
document.getElementById('topnav').classList.add('visible');

/* ══ PARTICULES ══ */
(function(){
  var cv=document.getElementById('gp-canvas');if(!cv)return;
  var ctx=cv.getContext('2d');
  function sz(){cv.width=window.innerWidth;cv.height=window.innerHeight;}
  sz();window.addEventListener('resize',sz);
  var ps=[];
  var cols=['rgba(185,144,72,.22)','rgba(215,181,109,.15)','rgba(167,122,53,.12)'];
  for(var i=0;i<8;i++){ps.push({x:Math.random()*1400,y:Math.random()*2000+1000,r:1+Math.random()*1.5,vy:-(0.1+Math.random()*0.16),vx:(Math.random()-.5)*.05,a:0,ma:.2+Math.random()*.2,c:cols[i%3]});}
  function draw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    var sy=window.scrollY||0;
    ps.forEach(function(p){
      p.y+=p.vy;p.x+=p.vx;
      var sy2=p.y-sy;
      if(sy2<-20){p.y=sy+cv.height+20;p.x=Math.random()*cv.width;}
      p.a=Math.min(p.a+.002,p.ma);
      ctx.globalAlpha=p.a;ctx.fillStyle=p.c;
      ctx.beginPath();ctx.arc(p.x,sy2,p.r,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;requestAnimationFrame(draw);
  }
  draw();
})();

/* ══ INTERSECTION OBSERVER ══ */
(function(){
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting) e.target.classList.add('s2-in','tl-in','c-in');
    });
  },{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.story2-block,.story2-citation,.story2-finale,.tl-item').forEach(function(el){io.observe(el);});
  setTimeout(function(){
    document.querySelectorAll('.story2-block,.story2-citation,.tl-item').forEach(function(el){
      var r=el.getBoundingClientRect();if(r.top<window.innerHeight)el.classList.add('s2-in','tl-in');
    });
  },400);
})();

/* ══ CAROUSEL AUTO ══ */
(function(){
  document.querySelectorAll('.carousel').forEach(function(car){
    var slides=[].slice.call(car.querySelectorAll('.place-slide'));
    var cur=0;
    function show(n){cur=(n+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('active',k===cur);});}
    car.querySelectorAll('.carousel-arrow').forEach(function(btn){btn.addEventListener('click',function(){show(cur+parseInt(btn.getAttribute('data-dir'),10));});});
    if(slides.length>1)setInterval(function(){show(cur+1);},3500);
  });
})();



(function(){
  ready(function(){
    var hero=document.getElementById('hero');
    if(hero && !hero.querySelector('.hero-snow')){
      var snow=document.createElement('div'); snow.className='hero-snow';
      for(var i=0;i<42;i++){
        var p=document.createElement('i');
        p.style.left=(Math.random()*100).toFixed(2)+'%';
        p.style.animationDuration=(36+Math.random()*30).toFixed(2)+'s';
        p.style.animationDelay=(-Math.random()*16).toFixed(2)+'s';
        p.style.setProperty('--drift', ((Math.random()*80)-40).toFixed(1)+'px');
        snow.appendChild(p);
      }
      var content=hero.querySelector('.hero-content');
      hero.insertBefore(snow, content || hero.firstChild);
    }
    var domain=document.querySelector('[data-carousel="domain"]');
    if(domain){
      [].slice.call(domain.querySelectorAll('img.place-slide')).forEach(function(img,idx){
        if(idx>3){ img.remove(); }
        else { img.classList.toggle('active', idx===0); }
      });
    }
    // Si des boutons existent dans les carrousels, remplacer les signes par de vraies flèches sobres
    [].slice.call(document.querySelectorAll('.carousel-btn.prev')).forEach(function(b){b.textContent='‹';});
    [].slice.call(document.querySelectorAll('.carousel-btn.next')).forEach(function(b){b.textContent='›';});
  });
})();


(function(){
 ready(function(){
   var hero=document.getElementById('hero');
   if(hero){
     var snow=hero.querySelector('.hero-snow');
     if(snow){[].slice.call(snow.children).forEach(function(p){p.style.animationDuration=(36+Math.random()*30).toFixed(2)+'s';p.style.setProperty('--drift',((Math.random()*36)-18).toFixed(1)+'px');});}
   }
   var domain=document.querySelector('[data-carousel="domain"]');
   if(domain){
     [].slice.call(domain.querySelectorAll('img.place-slide')).forEach(function(img,i){ if(i>3){img.remove();} else {img.classList.toggle('active',i===0);} });
   }
   var rsvp=document.querySelector('.rsvp-form');
   if(rsvp){
     var rows=[].slice.call(rsvp.children);
     var presence=rsvp.querySelector('.rsvp-presence');
     var adults=rsvp.querySelector('.rsvp-row');
     if(presence && adults && presence.nextElementSibling!==adults){ presence.insertAdjacentElement('afterend',adults); }
   }
 });
})();


(function(){

var all = document.querySelectorAll('.tl-item');
var obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
  });
}, {threshold:0.15, rootMargin:'0px 0px -20px 0px'});
all.forEach(el => obs.observe(el));
setTimeout(() => {
  all.forEach((el,i) => {
    if (el.getBoundingClientRect().top < window.innerHeight*.92)
      setTimeout(() => el.classList.add('vis'), i * 120);
  });
}, 300);


addSparks('ax1', 3);
addSparks('ax2', 3);
addSparks('ax3', 5, '#D4AF60');

})();



/* ═══ CARROUSEL 3D ═══ */
var C = {};
function c3init(id) {
  var items = [].slice.call(document.querySelectorAll('#' + id + '-wrap .c3-item'));
  C[id] = {items:items, n:items.length, cur:0};
  items.forEach(function(el, i) {
    el.addEventListener('click', function() { if(i !== C[id].cur) c3go(id, i); });
  });
}
function c3render(id) {
  var s=C[id], n=s.n, cur=s.cur;
  var prev=(cur-1+n)%n, next=(cur+1)%n;
  s.items.forEach(function(el, i) {
    el.className='c3-item';
    if(i===cur) el.classList.add('is-active');
    else if(i===prev) el.classList.add('is-prev');
    else if(i===next) el.classList.add('is-next');
    else el.classList.add('is-hidden');
  });
  document.querySelectorAll('#'+id+'-nav .c3-dot').forEach(function(d,i){
    d.classList.toggle('is-active', i===cur);
  });
}
function c3go(id, idx) { if(!C[id]) return; C[id].cur=idx; c3render(id); }
function c3prev(id) { if(!C[id]) return; c3go(id,(C[id].cur-1+C[id].n)%C[id].n); }
function c3next(id) { if(!C[id]) return; c3go(id,(C[id].cur+1)%C[id].n); }
function c3swipe(id) {
  var el=document.getElementById(id+'-wrap'); if(!el) return;
  var sx=0;
  el.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;},{passive:true});
  el.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-sx;
    if(Math.abs(dx)>40){ dx<0?c3next(id):c3prev(id); }
  },{passive:true});
}
c3init('stay'); c3swipe('stay');

/* ═══ ACCORDÉON ═══ */
function paToggle(idx) {
  for(var i=0;i<3;i++){
    var el=document.getElementById('pa-'+i); if(!el) continue;
    if(i===idx) el.classList.toggle('is-open');
    else el.classList.remove('is-open');
  }
}



(function(){
  ready(function(){
    var intro=document.getElementById('txt-intro');
    if(intro){intro.textContent='VOUS ÊTES CONVIÉS À LA CÉLÉBRATION DU MARIAGE DE';}
    var hero=document.getElementById('hero');
    if(hero){
      var snow=hero.querySelector('.hero-snow');
      if(snow){[].slice.call(snow.children).forEach(function(p){p.style.animationDuration=(72+Math.random()*45).toFixed(2)+'s';p.style.animationDelay=(-Math.random()*30).toFixed(2)+'s';p.style.setProperty('--drift',((Math.random()*26)-13).toFixed(1)+'px');});}
    }
    var domain=document.querySelector('[data-carousel="domain"]');
    if(domain){
      var imgs=[].slice.call(domain.querySelectorAll('img.place-slide'));
      imgs.forEach(function(img,i){ if(i>3){ img.remove(); } });
      [].slice.call(domain.querySelectorAll('img.place-slide')).forEach(function(img,i){img.classList.toggle('active',i===0);});
    }
  });
})();


/* ═══════════════════════════════════════
   JS PREMIUM v11 — propre et sans conflits
═══════════════════════════════════════ */
(function(){

/* ── PROGRESS BAR ── */
var pb = document.getElementById('progress-bar');
if(pb){
  window.addEventListener('scroll', function(){
    var s = window.scrollY, t = document.documentElement.scrollHeight - window.innerHeight;
    if(t>0) pb.style.width = Math.min(100,(s/t)*100)+'%';
  }, {passive:true});
}

/* ── LANG SW : cacher au scroll (disparaît après le hero) ── */
var langSw = document.getElementById('lang-sw');
var heroEl = document.getElementById('hero');
if(langSw && heroEl){
  window.addEventListener('scroll', function(){
    var heroBottom = heroEl.getBoundingClientRect().bottom;
    if(heroBottom < 0){
      langSw.classList.add('hidden');
    } else {
      langSw.classList.remove('hidden');
    }
  }, {passive:true});
}

/* ── ANCHOR NAV ── */
var anchorNav = document.getElementById('anchor-nav');
var dots = anchorNav ? [].slice.call(anchorNav.querySelectorAll('.anav-dot')) : [];
var navSections = dots.map(function(d){ return document.getElementById(d.getAttribute('data-target')); });

function updateNav(){
  var sy = window.scrollY;
  var heroH = heroEl ? heroEl.offsetHeight : 0;
  if(anchorNav){
    if(sy > heroH * 0.5) anchorNav.classList.add('visible');
    else anchorNav.classList.remove('visible');
  }
  var active = 0;
  navSections.forEach(function(s,i){ if(s && s.getBoundingClientRect().top <= window.innerHeight*.5) active = i; });
  dots.forEach(function(d,i){ d.classList.toggle('active', i===active); });
}
dots.forEach(function(d){
  d.addEventListener('click', function(){
    var t = document.getElementById(d.getAttribute('data-target'));
    if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
window.addEventListener('scroll', updateNav, {passive:true});
setTimeout(updateNav, 600);

/* ── AUDIO AUTOPLAY dès showHero ── */
/* NB: showHero est défini dans le script principal. On l'enveloppe ici. */
var _origShowHero = window.showHero;
function patchShowHero(){
  var origFn = window.showHero;
  if(origFn && !origFn._patched){
    window.showHero = function(){
      origFn.apply(this, arguments);
      try{
        var aud = document.getElementById('audio');
        if(aud){ aud.volume = 0.18; aud.play().catch(function(){}); }
      }catch(e){}
    };
    window.showHero._patched = true;
  }
}
setTimeout(patchShowHero, 100);

/* ── AUDIO LOOP ROBUSTE ── */
var audio = document.getElementById('audio');
if(audio){
  audio.addEventListener('ended', function(){ try{ audio.currentTime=0; audio.play(); }catch(e){} });
  document.addEventListener('visibilitychange', function(){
    if(!document.hidden && audio.paused && audio._wasPlaying){ try{ audio.play(); }catch(e){} }
  });
  audio.addEventListener('play', function(){ audio._wasPlaying = true; });
  audio.addEventListener('pause', function(){ audio._wasPlaying = false; });
}

/* ── SCROLL REVEAL différencié ── */
(function(){
  if(!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('es-visible'); io.unobserve(e.target); }
    });
  }, {threshold:0.1, rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.es-section .es-inner, .date-inner, .countdown-inner, .story2-intro, .places-grid, .timeline, .cards3, .rsvp-form').forEach(function(el){
    el.classList.add('es-reveal');
    io.observe(el);
  });
})();

/* ── ÉTINCELLES SUR BOUTONS ── */
document.addEventListener('click', function(e){
  var btn = e.target.closest('.gold-btn,.place-btn,.rsvp-send,.gift-card-btn');
  if(!btn) return;
  var rect = btn.getBoundingClientRect();
  var x = e.clientX - rect.left, y = e.clientY - rect.top;
  for(var i=0; i<5; i++){
    (function(){
      var sp = document.createElement('div');
      sp.className = 'btn-spark';
      var sz = 8 + Math.random()*10;
      sp.style.cssText = 'width:'+sz+'px;height:'+sz+'px;left:'+(x-sz/2)+'px;top:'+(y-sz/2)+'px;animation-delay:'+(i*55)+'ms;';
      btn.appendChild(sp);
      setTimeout(function(){ sp.parentNode && sp.parentNode.removeChild(sp); }, 600);
    })();
  }
});

/* ── CONFETTIS RSVP (présence = oui) ── */
document.addEventListener('change', function(e){
  if(e.target.name === 'presence' && e.target.value === 'oui'){
    launchRsvpConfetti();
  }
});

/* ── GIFT RIB accordéon CSS ── */
document.addEventListener('click', function(e){
  var rib = e.target.closest('#gift-rib');
  if(!rib) return;
  var content = rib.querySelector('.gift-rib-content');
  if(!content) return;
  if(rib.classList.contains('open')){
    rib.classList.remove('open');
    content.style.maxHeight = '0';
    content.style.marginTop = '0';
  } else {
    rib.classList.add('open');
    content.style.maxHeight = '200px';
    content.style.marginTop = '14px';
  }
});

/* ── RSVP FORMSPREE ── */
function sendRsvp(){
  var form = document.getElementById('rsvp-form');
  var btn = document.getElementById('rsvp-btn');
  var successDiv = document.getElementById('rsvp-success');
  if(!form) return;

  var prenom='', nom='', email='', tel='', presence='', adultes='', enfants='', menu='Viande', allergies='', message='';
  form.querySelectorAll('input, select, textarea').forEach(function(inp){
    var ph = (inp.placeholder||'').toLowerCase();
    var val = inp.value || '';
    if(inp.type==='radio'){ if(inp.checked) presence=inp.value; return; }
    if(ph.includes('prénom')) prenom=val;
    else if(ph.includes('nom')) nom=val;
    else if(ph.includes('email')||inp.type==='email') email=val;
    else if(ph.includes('téléphone')||inp.type==='tel') tel=val;
    else if(ph.includes('adulte')) adultes=val;
    else if(ph.includes('enfant')) enfants=val;
    else if(ph.includes('allergie')) allergies=val;
    else if(ph.includes('message')) message=val;
    if(inp.tagName==='SELECT') menu=val;
  });

  if(!prenom||!nom||!email){
    var orig = btn.textContent;
    btn.textContent='Merci de renseigner prénom, nom et email';
    btn.style.background='rgba(183,60,60,.7)';
    setTimeout(function(){ btn.textContent=orig; btn.style.background=''; }, 3000);
    return;
  }

  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  fetch('https://formspree.io/f/xqegygee', {
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({
      '_subject':'RSVP Mariage Marie-Paul & Yann — '+prenom+' '+nom,
      'Prénom':prenom,'Nom':nom,'Email':email,'Téléphone':tel,
      'Présence':presence||'Non précisé','Adultes':adultes,'Enfants':enfants,
      'Menu':menu,'Allergies':allergies,'Message':message
    })
  })
  .then(function(r){ return r.json(); })
  .then(function(res){
    if(res.ok||res.next){
      form.style.transition='opacity .4s'; form.style.opacity='0';
      setTimeout(function(){ form.style.display='none'; successDiv.style.display='block'; }, 400);
    } else throw new Error('err');
  })
  .catch(function(){
    btn.textContent='Erreur — réessayez'; btn.style.background='rgba(183,60,60,.7)'; btn.disabled=false;
    setTimeout(function(){ btn.textContent='Envoyer ma réponse'; btn.style.background=''; }, 4000);
  });
}

})();


(function(){
  function launchRsvpConfetti(){
    var wrap=document.createElement('div'); wrap.className='rsvp-confetti'; document.body.appendChild(wrap);
    var colors=['#F3D391','#D8AE67','#B99048','#FFF4CF','#F7EFE3','#C99A45','#ffffff'];
    var originX=window.innerWidth/2, originY=window.innerHeight*.52;
    for(var burst=0; burst<3; burst++){
      setTimeout(function(b){
        for(var i=0;i<74;i++){
          var p=document.createElement('i');
          var dust=Math.random()<.28; p.className='rsvp-confetti-piece'+(dust?' dust':'');
          var ang=(-Math.PI*.95)+(Math.random()*Math.PI*1.9);
          var dist=90+Math.random()*260+(b*34);
          var tx=Math.cos(ang)*dist, ty=Math.sin(ang)*dist + 80 + Math.random()*120;
          var s=dust?(2+Math.random()*3):(5+Math.random()*8);
          p.style.left=(originX+(Math.random()*46-23))+'px'; p.style.top=(originY+(Math.random()*26-13))+'px';
          p.style.setProperty('--tx',tx.toFixed(1)+'px'); p.style.setProperty('--ty',ty.toFixed(1)+'px');
          p.style.setProperty('--rot',(180+Math.random()*900).toFixed(0)+'deg'); p.style.setProperty('--s',s.toFixed(1)+'px'); p.style.setProperty('--h',(dust?s:(s*1.8)).toFixed(1)+'px');
          p.style.setProperty('--r',dust?'50%':'2px'); p.style.setProperty('--sc',(0.5+Math.random()*0.7).toFixed(2)); p.style.setProperty('--dur',(1400+Math.random()*950)+'ms');
          p.style.setProperty('--c',colors[Math.floor(Math.random()*colors.length)]);
          wrap.appendChild(p);
        }
      }, burst*185, burst);
    }
    setTimeout(function(){wrap.remove();},3300);
  }
  window.launchRsvpConfetti=launchRsvpConfetti;
  document.addEventListener('change',function(e){ if(e.target && e.target.name==='presence' && e.target.value==='oui' && e.target.checked){ launchRsvpConfetti(); }});
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.gift-card-btn,#cadeaux .gold-btn'); if(!btn) return;
    var r=btn.getBoundingClientRect();
    for(var i=0;i<18;i++){
      var s=document.createElement('span'); s.className='eventia-star';
      s.style.left=(r.left+r.width/2)+'px'; s.style.top=(r.top+r.height/2)+'px';
      var ang=Math.random()*Math.PI*2, dist=18+Math.random()*68;
      s.style.setProperty('--sx',(Math.cos(ang)*dist)+'px'); s.style.setProperty('--sy',(Math.sin(ang)*dist-18)+'px');
      s.style.animationDelay=(i*18)+'ms'; document.body.appendChild(s); setTimeout(function(el){el.remove();},1400,s);
    }
  });
})();


(function(){
  function syncMusicButton(){
    var a=document.getElementById('audio');
    var b=document.getElementById('mus-btn');
    if(!a||!b)return;
    if(a.paused){ b.textContent='♪'; b.classList.remove('is-playing'); }
    else { b.textContent='♫'; b.classList.add('is-playing'); }
  }
  window.addEventListener('DOMContentLoaded',function(){
    var a=document.getElementById('audio');
    if(a){
      a.volume=0.22;
      a.addEventListener('play',syncMusicButton);
      a.addEventListener('pause',syncMusicButton);
      a.addEventListener('ended',syncMusicButton);
    }
    syncMusicButton();
  });
})();


// EVENTIA SIGNATURE · ACTIVITÉS OPTION 3 INTÉGRÉE
(function(){
  const root = document.querySelector('.es-activities-option3');
  if(!root) return;
  const places = {
    fontainebleau:{tag:'Patrimoine',title:'Château de Fontainebleau',text:'Un incontournable royal, entre jardins majestueux, galeries historiques et architecture remarquable.'},
    foret:{tag:'Nature',title:'Forêt de Fontainebleau',text:'Une parenthèse paisible pour se promener, respirer et découvrir les paysages emblématiques de la région.'},
    parrot:{tag:'Famille',title:'Parrot World',text:'Une expérience immersive et colorée, parfaite pour les familles et les amoureux de la nature.'}
  };
  const buttons = root.querySelectorAll('.es-act-selector button');
  const images = root.querySelectorAll('.es-act-panorama img');
  const tag = root.querySelector('#esActTag');
  const title = root.querySelector('#esActTitle');
  const text = root.querySelector('#esActText');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.actPlace;
      if(!places[key]) return;
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      images.forEach(img => img.classList.toggle('active', img.dataset.actImg === key));
      tag.textContent = places[key].tag;
      title.textContent = places[key].title;
      text.textContent = places[key].text;
      if(title.animate){
        title.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'ease',fill:'both'});
        text.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'ease',fill:'both'});
      }
    });
  });
})();


// Music autoplay fallback on direct visits
(function(){
  var _ms=false;
  function _tm(){
    if(_ms)return;
    var a=document.getElementById('audio');
    if(a&&a.paused){
      a.play().then(function(){
        _ms=true;
        var b=document.getElementById('mus-btn');
        if(b)b.textContent='♪';
      }).catch(function(){});
    }
  }
  document.addEventListener('click',_tm,{once:true});
  document.addEventListener('touchstart',_tm,{once:true});
})();


(function(){
  'use strict';
  var root=document.documentElement;
  function setVH(){
    var h=(window.visualViewport&&window.visualViewport.height)?window.visualViewport.height:window.innerHeight;
    root.style.setProperty('--eventia-vh',(h*0.01)+'px');
  }
  function clampPage(){
    document.documentElement.style.overflowX='hidden';
    document.body.style.overflowX='hidden';
  }
  function stabilizeFrames(){
    var timeline=document.getElementById('timelineExactFrame');
    if(timeline){
      timeline.setAttribute('scrolling','no');
      timeline.setAttribute('loading','eager');
      timeline.style.overflow='hidden';
      timeline.style.height=(window.innerWidth<=640?'820px':(window.innerWidth>=900?'700px':'760px'));
    }
    document.querySelectorAll('.scratch-frame,.countdown-frame').forEach(function(frame){
      frame.setAttribute('scrolling','no');
      frame.style.overflow='hidden';
    });
  }
  function lockNav(){
    var lang=document.getElementById('lang-sw');
    var mus=document.getElementById('mus-btn');
    if(lang){lang.classList.remove('hidden');lang.style.position='fixed';lang.style.visibility='visible';lang.style.opacity='1';}
    if(mus){mus.style.position='fixed';mus.style.visibility='visible';mus.style.opacity='1';}
  }
  function fitTimelineFromMessage(evt){
    if(!evt || !evt.data) return;
    if(evt.data.type==='timeline-ready' || evt.data.type==='eventia-timeline-height'){
      var f=document.getElementById('timelineExactFrame');
      if(!f) return;
      var h=parseInt(evt.data.height,10);
      if(!h || h<520){h=window.innerWidth<=640?820:720;}
      h=Math.min(Math.max(h,620),980);
      f.style.height=h+'px';
    }
  }
  setVH();clampPage();stabilizeFrames();lockNav();
  window.addEventListener('resize',function(){setVH();stabilizeFrames();lockNav();},{passive:true});
  if(window.visualViewport){window.visualViewport.addEventListener('resize',setVH,{passive:true});}
  window.addEventListener('orientationchange',function(){setTimeout(function(){setVH();stabilizeFrames();lockNav();},250);},{passive:true});
  window.addEventListener('message',fitTimelineFromMessage,false);
  document.addEventListener('DOMContentLoaded',function(){setVH();clampPage();stabilizeFrames();lockNav();});
  window.addEventListener('load',function(){setVH();stabilizeFrames();lockNav();setTimeout(lockNav,400);});
})();


(function(){
  'use strict';
  function lockTopControls(){
    var nav=document.getElementById('topnav');
    var lang=document.getElementById('lang-sw');
    var mus=document.getElementById('mus-btn');
    if(nav){
      nav.style.position='fixed';nav.style.left='auto';nav.style.right='10px';nav.style.bottom='auto';
      nav.style.opacity='1';nav.style.visibility='visible';nav.style.pointerEvents='auto';nav.style.zIndex='2147483640';
    }
    if(lang){lang.classList.remove('hidden');lang.style.position='static';lang.style.opacity='1';lang.style.visibility='visible';lang.style.display='flex';}
    if(mus){mus.style.position='static';mus.style.opacity='1';mus.style.visibility='visible';mus.style.display='flex';}
  }
  function fitTimeline(){
    var f=document.getElementById('timelineExactFrame');
    if(!f) return;
    var fallback=window.innerWidth<=640?1260:(window.innerWidth>=900?1180:1220);
    var h=fallback;
    try{
      var d=f.contentDocument||f.contentWindow.document;
      if(d){
        var page=d.querySelector('.tl-page')||d.body;
        h=Math.max(d.documentElement.scrollHeight||0,d.body.scrollHeight||0,page.scrollHeight||0,fallback);
        d.documentElement.style.overflow='hidden';
        d.body.style.overflow='hidden';
        d.body.style.minHeight=h+'px';
      }
    }catch(e){}
    h=Math.min(Math.max(h+28,fallback),1500);
    f.style.height=h+'px';
    f.style.minHeight=h+'px';
    f.style.overflow='hidden';
    document.documentElement.style.setProperty('--eventia-timeline-real-height',h+'px');
    document.documentElement.style.setProperty('--eventia-timeline-real-height-mobile',h+'px');
    document.documentElement.style.setProperty('--eventia-timeline-real-height-desktop',h+'px');
  }
  window.addEventListener('resize',function(){lockTopControls();fitTimeline();},{passive:true});
  window.addEventListener('orientationchange',function(){setTimeout(function(){lockTopControls();fitTimeline();},250);},{passive:true});
  window.addEventListener('message',function(e){
    if(e && e.data && (e.data.type==='timeline-ready' || e.data.type==='eventia-timeline-height')){
      var f=document.getElementById('timelineExactFrame');
      if(!f) return;
      var val=parseInt(e.data.height,10);
      if(val && val>900){f.style.height=(val+36)+'px';f.style.minHeight=(val+36)+'px';}
      setTimeout(fitTimeline,120);
    }
  },false);
  document.addEventListener('DOMContentLoaded',function(){lockTopControls();fitTimeline();setTimeout(fitTimeline,500);setTimeout(lockTopControls,700);});
  window.addEventListener('load',function(){lockTopControls();fitTimeline();setTimeout(fitTimeline,900);setTimeout(lockTopControls,1200);});
  setTimeout(function(){lockTopControls();fitTimeline();},300);
})();


(function(){

  var FULL_LANG={
    fr:{
      intro:'VOUS ÊTES CONVIÉS À LA CÉLÉBRATION DU MARIAGE DE', q1:'Deux âmes, une promesse :', q2:'Une éternité à écrire ensemble.', cta:'Vivre l’expérience',
      date_kicker:'NOTRE DATE',date_title:'Les Médaillons du Destin',date_copy:'Derrière ces médaillons de lumière se révèle le jour où nos âmes s’uniront.',date_inst:'GRATTEZ DÉLICATEMENT CHAQUE MÉDAILLON',
      countdown_kicker:'COMPTE À REBOURS',countdown_title:'L’attente sacrée',countdown_copy:'La date s’est révélée.<br>Désormais, le temps avance doucement vers ce jour choisi, celui où nos familles, nos prières et nos promesses se réuniront dans une même lumière.',
      places_kicker:'LES LIEUX',places_title:'Nous y retrouver',places_copy:'Deux lieux, une même journée : la promesse civile à la mairie, puis la bénédiction et la réception au Domaine des Rois. Chaque adresse devient un chapitre de cette journée que nous rêvons avec vous.',civil_title:'CÉRÉMONIE CIVILE',reception_title:'BÉNÉDICTION & RÉCEPTION',join_btn:'Nous y rejoindre',
      program_kicker:'PROGRAMME',program_title:'Les heures de notre promesse',p1:'Cérémonie civile',p2:'Bénédiction nuptiale',p3:'Vin d’honneur',p4:'Dîner',p5:'Première danse',p6:'Feu d’artifice',p7:'Soirée dansante',p8:'Brunch',
      dress_kicker:'DRESS CODE',dress_title:'L’élégance attendue',dress_copy:'Nous vous invitons à entrer dans une harmonie douce et raffinée : ivoire, champagne, marron et noir.',
      stay_kicker:'HÉBERGEMENTS',stay_title:'Une parenthèse près du domaine',stay_copy:'Le Domaine des Rois dispose d’un manoir avec suites sur place. Pour compléter votre séjour, plusieurs hébergements peuvent être réservés autour d’Échouboulains et de Fontainebleau.',stay1_title:'Sur place',stay1_copy:'Le manoir du Domaine des Rois, idéal pour les proches et la famille.',stay2_copy:'Chambres d’hôtes et hébergements à proximité du domaine.',stay3_copy:'Une option pratique pour prolonger le week-end dans un cadre élégant.',discover:'Découvrir',
      around_kicker:'AUTOUR DE LA CÉLÉBRATION',around_title:'Quelques échappées à partager',act1:'Une cité médiévale pour une promenade pleine de charme.',act2:'Son château, ses jardins et sa forêt pour prolonger l’évasion.',act3:'Une parenthèse féerique pour les invités qui souhaitent prolonger le séjour.',
      prints_kicker:'VOS EMPREINTES DANS NOTRE HISTOIRE',prints_title:'Laissez une trace de cette célébration',playlist:'Playlist collaborative',playlist_copy:'Ajoutez la chanson que vous aimeriez entendre pendant la soirée.',add_song:'Ajouter ma chanson',gallery:'Album photo live',gallery_copy:'Partagez vos photos et découvrez les souvenirs des invités.',share_photos:'Partager mes photos',audio:'Livre audio',audio_copy:'Laissez un message vocal que nous écouterons après le mariage.',record_msg:'Enregistrer mon message',
      gifts_kicker:'POUR ORNER NOTRE UNION',gifts_title:'Une petite attention',gifts_copy:'Votre présence sera toujours notre plus beau présent. Pour ceux qui souhaitent accompagner notre nouvelle vie d’une délicate attention, quelques possibilités ont été préparées avec tendresse.',gift_list:'Liste de mariage',gift_list_copy:'Une sélection pensée pour accompagner notre nouveau chapitre.',fund:'Cagnotte',fund_copy:'Participer à nos projets et à notre vie de famille.',participate:'Participer',bank:'Virement bancaire',bank_copy:'Les coordonnées bancaires restent masquées et seront révélées sur demande.',show_details:'Afficher les coordonnées',
      rsvp_title:'Votre présence, notre honneur',rsvp_copy:'Merci de bien vouloir confirmer votre présence avant le 22 décembre 2026 afin que nous puissions vous accueillir dans les meilleures conditions.',thanks_kicker:'REMERCIEMENTS',thanks_title:'Merci de faire partie de notre histoire',thanks_copy:'Lorsque les lumières s’adouciront, il restera l’essentiel : les souvenirs précieux partagés avec ceux que nous aimons.',final_copy:'Le plus beau chapitre de notre histoire reste encore à écrire.',
      first_name:'Prénom',last_name:'Nom',email:'Email',phone:'Téléphone',presence:'PRÉSENCE',yes:'Oui, avec joie',no:'Non, avec regret',adults:'Adultes',children:'Enfants',meal:'Choix du menu',meat:'Viande',fish:'Poisson',vegetarian:'Végétarien',allergies:'Allergies, halal, sans porc, kasher',message:'Un message pour les mariés',send:'Envoyer ma réponse',success_title:'Merci !',success_copy:'Votre réponse a bien été reçue.<br>Marie-Paul & Yann vous remercient du fond du cœur.',affection:'Avec toute notre affection,'
    },
    en:{
      intro:'YOU ARE INVITED TO CELEBRATE THE WEDDING OF', q1:'Two souls, one promise:', q2:'An eternity to write together.', cta:'Live the experience',
      date_kicker:'OUR DATE',date_title:'The Medallions of Destiny',date_copy:'Behind these medallions of light, the day our souls will unite is revealed.',date_inst:'GENTLY SCRATCH EACH MEDALLION',
      countdown_kicker:'COUNTDOWN',countdown_title:'The sacred wait',countdown_copy:'The date has been revealed.<br>Now time moves softly toward the chosen day, when our families, prayers and promises will gather in one light.',
      places_kicker:'THE PLACES',places_title:'Join us there',places_copy:'Two places, one day: the civil promise at the town hall, then the blessing and reception at Domaine des Rois. Each address becomes a chapter of the day we dream of sharing with you.',civil_title:'CIVIL CEREMONY',reception_title:'BLESSING & RECEPTION',join_btn:'Join us there',
      program_kicker:'PROGRAM',program_title:'The hours of our promise',p1:'Civil ceremony',p2:'Nuptial blessing',p3:'Cocktail reception',p4:'Dinner',p5:'First dance',p6:'Fireworks',p7:'Dance party',p8:'Brunch',
      dress_kicker:'DRESS CODE',dress_title:'Expected elegance',dress_copy:'We invite you into a soft, refined harmony: ivory, champagne, brown and black.',
      stay_kicker:'ACCOMMODATION',stay_title:'A stay near the estate',stay_copy:'Domaine des Rois offers a manor with suites on site. Additional accommodation can be booked around Échouboulains and Fontainebleau.',stay1_title:'On site',stay1_copy:'The manor at Domaine des Rois, ideal for close family and loved ones.',stay2_copy:'Guest houses and accommodation near the estate.',stay3_copy:'A practical option to extend the weekend in an elegant setting.',discover:'Discover',
      around_kicker:'AROUND THE CELEBRATION',around_title:'Moments to enjoy',act1:'A medieval town for a charming walk.',act2:'Its château, gardens and forest to extend the escape.',act3:'A magical stop for guests who wish to extend their stay.',
      prints_kicker:'YOUR MARKS IN OUR STORY',prints_title:'Leave a mark on this celebration',playlist:'Collaborative playlist',playlist_copy:'Add the song you would love to hear during the evening.',add_song:'Add my song',gallery:'Live photo album',gallery_copy:'Share your photos and discover guests’ memories.',share_photos:'Share my photos',audio:'Audio guestbook',audio_copy:'Leave a voice message we will listen to after the wedding.',record_msg:'Record my message',
      gifts_kicker:'TO HONOUR OUR UNION',gifts_title:'A small attention',gifts_copy:'Your presence will always be our most beautiful gift. For those who wish to accompany our new life with a delicate attention, a few possibilities have been prepared with tenderness.',gift_list:'Wedding list',gift_list_copy:'A selection to accompany our new chapter.',fund:'Gift fund',fund_copy:'Contribute to our projects and family life.',participate:'Contribute',bank:'Bank transfer',bank_copy:'Bank details remain hidden and will be revealed on request.',show_details:'Show details',
      rsvp_title:'Your presence, our honour',rsvp_copy:'Please confirm your presence before December 22, 2026 so that we can welcome you in the best conditions.',thanks_kicker:'THANK YOU',thanks_title:'Thank you for being part of our story',thanks_copy:'When the lights soften, what will remain is the essential: precious memories shared with those we love.',final_copy:'The most beautiful chapter of our story is still to be written.',
      first_name:'First name',last_name:'Last name',email:'Email',phone:'Phone',presence:'PRESENCE',yes:'Yes, with joy',no:'No, with regret',adults:'Adults',children:'Children',meal:'Menu choice',meat:'Meat',fish:'Fish',vegetarian:'Vegetarian',allergies:'Allergies, halal, no pork, kosher',message:'A message for the couple',send:'Send my reply',success_title:'Thank you!',success_copy:'Your reply has been received.<br>Marie-Paul & Yann thank you from the bottom of their hearts.',affection:'With all our affection,'
    }
  };

  function assignI18n(){
    var pairs=[
      ['#txt-intro','intro'],['#txt-q1','q1'],['#txt-q2','q2'],['#cta-text','cta'],
      ['#notre-date .es-kicker','date_kicker'],['#notre-date .es-title','date_title'],['#notre-date .es-copy','date_copy'],['#notre-date .scratch-instruction','date_inst'],
      ['#compte-a-rebours .es-kicker','countdown_kicker'],['#compte-a-rebours .es-title','countdown_title'],['#compte-a-rebours .es-copy','countdown_copy'],
      ['#les-lieux .es-kicker','places_kicker'],['#les-lieux .es-title','places_title'],['#les-lieux .es-copy','places_copy'],
      ['#programme .es-kicker','program_kicker'],['#programme .es-title','program_title'],
      ['#dress-code .es-kicker','dress_kicker'],['#dress-code .es-title','dress_title'],['#dress-code .es-copy','dress_copy'],
      ['#hebergements .es-kicker','stay_kicker'],['#hebergements .es-title','stay_title'],['#hebergements .es-copy','stay_copy'],
      ['#autour .es-kicker','around_kicker'],['#autour .es-title','around_title'],
      ['#empreintes .es-kicker','prints_kicker'],['#empreintes .es-title','prints_title'],
      ['#cadeaux .es-kicker','gifts_kicker'],['#cadeaux .es-title','gifts_title'],['#cadeaux .es-copy','gifts_copy'],
      ['#rsvp .es-title','rsvp_title'],['#rsvp .es-copy','rsvp_copy'],['#remerciements .es-kicker','thanks_kicker'],['#remerciements .es-title','thanks_title'],['#remerciements .thanks-copy-main','thanks_copy'],['#remerciements .thanks-copy-sub','final_copy'],['#photo-finale .final-affection','affection']
    ];
    pairs.forEach(function(p){var el=document.querySelector(p[0]); if(el){el.setAttribute('data-i18n',p[1]);}});
    var placeholders=[['input[name="prenom"]','first_name'],['input[name="nom"]','last_name'],['input[name="email"]','email'],['input[name="telephone"]','phone'],['input[name="adultes"]','adults'],['input[name="enfants"]','children'],['#rsvp textarea','message']];
    placeholders.forEach(function(p){var el=document.querySelector(p[0]); if(el){el.setAttribute('data-i18n-placeholder',p[1]);}});
    var menu=document.querySelector('#rsvp select option:first-child'); if(menu) menu.setAttribute('data-i18n','meal');
    var opts=document.querySelectorAll('#rsvp select option');
    if(opts[1]) opts[1].setAttribute('data-i18n','meat');
    if(opts[2]) opts[2].setAttribute('data-i18n','fish');
    if(opts[3]) opts[3].setAttribute('data-i18n','vegetarian');
    var allergy=document.querySelector('#rsvp .compact-row input:not([name])'); if(allergy) allergy.setAttribute('data-i18n-placeholder','allergies');
    var pres=document.querySelector('#rsvp .presence-title'); if(pres) pres.setAttribute('data-i18n','presence');
    var pills=document.querySelectorAll('#rsvp .presence-pill span'); if(pills[0]) pills[0].setAttribute('data-i18n','yes'); if(pills[1]) pills[1].setAttribute('data-i18n','no');
    var submit=document.querySelector('#rsvp-btn'); if(submit) submit.setAttribute('data-i18n','send');
    var st=document.querySelector('#rsvp-success h3'); if(st) st.setAttribute('data-i18n','success_title');
    var sc=document.querySelector('#rsvp-success p'); if(sc) sc.setAttribute('data-i18n','success_copy');
  }

  function applyLang(l){
    var t=FULL_LANG[l]||FULL_LANG.fr;
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n'); if(t[k]) el.innerHTML=t[k];});
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){var k=el.getAttribute('data-i18n-placeholder'); if(t[k]) el.setAttribute('placeholder',t[k]);});
    document.querySelectorAll('#lang-sw button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===l);});
    window.currentLang=l;
  }

  var previousSetLang=window.setLang;
  window.setLang=function(l){
    if(l!=='fr' && l!=='en') l='en';
    if(previousSetLang){try{previousSetLang(l);}catch(e){}}
    assignI18n();
    applyLang(l);
  };

  ready(function(){
    assignI18n();
    applyLang(window.currentLang||'fr');
  });
})();


(function(){
  function fitTimelineTight(){
    var f=document.getElementById('timelineExactFrame');
    if(!f)return;
    var fallback=window.innerWidth<=430?1120:1080;
    var h=fallback;
    try{
      var d=f.contentDocument||f.contentWindow.document;
      if(d){
        var page=d.querySelector('.tl-page')||d.body;
        h=Math.max(page.scrollHeight||0,d.body.scrollHeight||0,d.documentElement.scrollHeight||0,fallback);
        d.documentElement.style.overflow='hidden';d.body.style.overflow='hidden';
      }
    }catch(e){}
    h=Math.min(Math.max(h+6,fallback),1220);
    f.style.height=h+'px';f.style.minHeight=h+'px';
  }
  function boot(){fitTimelineTight();setTimeout(fitTimelineTight,400);setTimeout(fitTimelineTight,1200);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('resize',function(){fitTimelineTight();},{passive:true});
  window.addEventListener('orientationchange',function(){setTimeout(function(){fitTimelineTight();},250);},{passive:true});
})();


(function(){
  function sweepBible(){
    var el=document.querySelector('.story2-citation');
    if(!el)return;
    el.style.display='block';
    el.style.visibility='visible';
    el.style.opacity='1';
    if(!('IntersectionObserver' in window)){el.classList.add('is-swept');return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){el.classList.add('is-swept');io.disconnect();}});},{threshold:.25});
    io.observe(el);
  }
  function fixReplayText(){
    var b=document.getElementById('replay-experience');
    if(b && !b.textContent.trim()) b.textContent='Revivre l’expérience';
  }
  ready(function(){sweepBible();fixReplayText();setTimeout(sweepBible,600);});
})();


(function(){
  function forceTimeline(){var f=document.getElementById('timelineExactFrame');if(!f)return;var h=(window.innerWidth<=430)?920:980;f.style.height=h+'px';f.style.minHeight=h+'px';f.style.maxHeight=h+'px';}
  function showBible(){var c=document.querySelector('.story2-citation');if(c){c.classList.add('s2-in','is-swept');c.style.opacity='1';c.style.visibility='visible';}}
  function wireReplay(){var b=document.getElementById('replay-experience');if(!b||b.dataset.v25)return;b.dataset.v25='1';b.textContent='Revivre l’expérience';b.addEventListener('click',function(){try{sessionStorage.clear();localStorage.removeItem('eventiaEntered');}catch(e){} window.location.href=window.location.pathname+window.location.search;});}
  ready(function(){forceTimeline();showBible();wireReplay();setTimeout(forceTimeline,300);setTimeout(forceTimeline,1200);});
  window.addEventListener('resize',forceTimeline,{passive:true});
  window.addEventListener('message',function(){setTimeout(forceTimeline,40);},{passive:true});
})();


(function(){
  function updateVars(el){
    if(!el)return; var r=el.getBoundingClientRect();
    el.style.setProperty('--container-w', r.width+'px');
    el.style.setProperty('--container-h', r.height+'px');
    el.style.setProperty('--x-center', (r.width*0.5)+'px');
    el.style.setProperty('--y-gold', (r.height*0.42)+'px');
  }
  function refresh(){document.querySelectorAll('#hero,#rsvp,.story2-block,.timeline-host,#empreintes').forEach(updateVars);}
  window.eventiaRelPos=function(container,xRatio,yRatio){
    var el=typeof container==='string'?document.querySelector(container):container;
    if(!el)return {x:0,y:0}; var r=el.getBoundingClientRect();
    return {x:r.width*xRatio,y:r.height*yRatio};
  };
  refresh(); window.addEventListener('resize',refresh,{passive:true}); window.addEventListener('orientationchange',function(){setTimeout(refresh,250);},{passive:true});
  if('ResizeObserver' in window){var ro=new ResizeObserver(refresh);document.querySelectorAll('#hero,#rsvp,.story2-block,.timeline-host,#empreintes').forEach(function(el){ro.observe(el);});}
  // Ajustement iframe timeline sans scrollbar parasite.
  function fitIframe(id, extra){var f=document.getElementById(id); if(!f)return; try{var d=f.contentDocument||f.contentWindow.document; var h=Math.max(d.body.scrollHeight,d.documentElement.scrollHeight); if(h>100)f.style.height=(h+(extra||0))+'px';}catch(e){}}
  setTimeout(function(){fitIframe('timelineExactFrame',8);},700); setTimeout(function(){fitIframe('timelineExactFrame',8);},1800);
  // Bouton rejouer : retour ouverture complète.
  var replay=document.getElementById('replay-experience');
  if(replay){replay.addEventListener('click',function(){try{localStorage.removeItem('eventiaOpened');}catch(e){} window.scrollTo({top:0,behavior:'smooth'}); setTimeout(function(){location.reload();},450);});}
})();


/* EVENTIA SIGNATURE V31, JS FINAL STABILISÉ */
(function(){
  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function updateContainerVars(){
    document.querySelectorAll('section,.es-inner,.story2-block,.rsvp-chapter').forEach(function(el){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--cw', r.width+'px');
      el.style.setProperty('--ch', r.height+'px');
      el.setAttribute('data-cw', Math.round(r.width));
    });
    var rsvp=document.querySelector('.rsvp-chapter');
    if(rsvp){
      var rr=rsvp.getBoundingClientRect();
      var top=clamp(rr.height*0.22,150,215);
      rsvp.style.setProperty('--rsvpTop', top+'px');
    }
  }
  window.addEventListener('resize', function(){updateContainerVars();}, {passive:true});
  document.addEventListener('DOMContentLoaded', function(){
    updateContainerVars();
    setTimeout(updateContainerVars,300);setTimeout(updateContainerVars,900);
    document.querySelectorAll('.story2-citation').forEach(function(el){el.classList.add('in-view')});
    var replay=document.getElementById('replay-experience');
    if(replay){replay.addEventListener('click',function(){
      try{sessionStorage.removeItem('eventiaEntered');}catch(e){}
      window.scrollTo({top:0,behavior:'smooth'});
      setTimeout(function(){location.reload();},550);
    });}
  });
  window.setLang = window.setLang || function(lang){
    document.documentElement.lang=lang;
    document.querySelectorAll('#lang-sw button').forEach(function(b){b.classList.toggle('active', b.dataset.lang===lang)});
  };
})();

;

(function(){
  function showVerse(){
    var c=document.querySelector('.story2-citation'), t=document.querySelector('.story2-cit-text');
    if(c){c.style.setProperty('display','block','important');c.style.setProperty('visibility','visible','important');c.style.setProperty('opacity','1','important');c.style.setProperty('transform','none','important');c.classList.add('in-view','is-swept');}
    if(t){
      t.style.setProperty('display','block','important');t.style.setProperty('visibility','visible','important');t.style.setProperty('opacity','1','important');t.style.setProperty('clip-path','none','important');t.style.setProperty('transform','none','important');
      document.querySelectorAll('.story2-cit-text span').forEach(function(s){
        s.style.setProperty('opacity','1','important');s.style.setProperty('clip-path','inset(0 0 0 0)','important');s.style.setProperty('transform','none','important');s.style.setProperty('animation','none','important');
      });
    }
  }
  function fitFrames(){
    var tl=document.getElementById('timelineExactFrame');
    if(tl){
      try{var d=tl.contentDocument||tl.contentWindow.document;var h=Math.max(d.documentElement.scrollHeight,d.body.scrollHeight,(d.querySelector('.tl-page')||d.body).scrollHeight); if(h>800&&h<1300){tl.style.height=(h+12)+'px';tl.style.minHeight=(h+12)+'px';}}
      catch(e){tl.style.height=(window.innerWidth<430?'1000px':'1040px');}
    }
  }
  function wireOuiConfetti(){
    document.querySelectorAll('#rsvp input[name="presence"][value="oui"]').forEach(function(input){
      if(input.dataset.v32)return; input.dataset.v32='1';
      input.addEventListener('change',function(){ if(input.checked && typeof window.launchRsvpConfetti==='function'){window.launchRsvpConfetti();} });
    });
  }
  function fixReplay(){
    var b=document.getElementById('replay-experience');
    if(b){b.textContent='Revivre l’expérience'; if(!b.dataset.v32){b.dataset.v32='1'; b.addEventListener('click',function(){try{sessionStorage.clear();localStorage.removeItem('eventiaEntered');localStorage.removeItem('eventiaOpened');}catch(e){} window.scrollTo({top:0,behavior:'smooth'}); setTimeout(function(){location.reload();},500);});}}
  }
  ready(function(){
    showVerse();fitFrames();wireOuiConfetti();fixReplay();
    setTimeout(showVerse,400);setTimeout(fitFrames,700);setTimeout(fitFrames,1500);
  });
  window.addEventListener('resize',function(){fitFrames();},{passive:true});
})();

;

(function(){
  function fitFrames(){
    var tl=document.getElementById('timelineExactFrame');
    if(tl){tl.style.height=(window.innerWidth<=430?'1160px':'1180px');tl.style.minHeight=tl.style.height;tl.style.maxHeight='none';}
    document.querySelectorAll('iframe[src*="dresscode"],.dress-frame,.dress-frame-v5').forEach(function(f){f.style.height=(window.innerWidth<=430?'760px':'780px');f.style.minHeight=f.style.height;f.style.maxHeight='none';});
  }
  function showVerse(){
    var c=document.querySelector('.story2-citation'), t=document.querySelector('.story2-cit-text');
    if(c){c.style.display='block';c.style.visibility='visible';c.style.opacity='1';c.classList.add('in-view');}
    if(t){t.innerHTML='<span>« Ainsi ils ne sont plus deux, mais une seule chair.</span><span>Que l’homme donc ne sépare pas ce que Dieu a uni. »</span>';t.style.display='block';t.style.visibility='visible';t.style.opacity='1';}
  }
  function wireRsvpConfetti(){
    document.querySelectorAll('#rsvp input[name="presence"][value="oui"]').forEach(function(input){
      if(input.dataset.v33)return; input.dataset.v33='1';
      input.addEventListener('change',function(){if(input.checked) launchFastRsvpConfetti();});
    });
  }
  function launchFastRsvpConfetti(){
    var box=document.querySelector('#rsvp .presence-options')||document.querySelector('#rsvp');
    var r=box.getBoundingClientRect();
    var cx=r.left+r.width/2, cy=r.top+r.height/2;
    var layer=document.createElement('div');layer.className='rsvp-confetti';document.body.appendChild(layer);
    var colors=['#F9E6A8','#E5C36F','#C89A3D','#A86E18','#F6F0DB','#D8B663','#FFF7D6'];
    for(var i=0;i<90;i++){
      var p=document.createElement('i');p.className='rsvp-confetti-piece'+(Math.random()<.22?' dust':'');
      var a=Math.random()*Math.PI*2, d=70+Math.random()*220;
      p.style.left=cx+'px';p.style.top=cy+'px';p.style.setProperty('--tx',Math.cos(a)*d+'px');p.style.setProperty('--ty',(Math.sin(a)*d-80+Math.random()*130)+'px');p.style.setProperty('--rot',((Math.random()-.5)*900)+'deg');p.style.setProperty('--c',colors[i%colors.length]);p.style.setProperty('--dur',(520+Math.random()*430)+'ms');p.style.setProperty('--delay',(Math.random()*90)+'ms');p.style.setProperty('--s',(3+Math.random()*6)+'px');p.style.setProperty('--h',(7+Math.random()*11)+'px');
      layer.appendChild(p);
    }
    setTimeout(function(){layer.remove();},1250);
  }
  ready(function(){fitFrames();showVerse();wireRsvpConfetti();setTimeout(fitFrames,600);setTimeout(showVerse,900);});
  window.addEventListener('resize',function(){fitFrames();},{passive:true});
})();


/* ===== PATCH V44 ===== */

(function(){
  'use strict';

  function updateContainerVars(){
    qa('.es-section,#hero,#rsvp,.story2-block,.date-chapter,.countdown-chapter,.program-chapter,.final-chapter').forEach(function(el){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--container-w', r.width+'px');
      el.style.setProperty('--container-h', r.height+'px');
      el.dataset.cw=Math.round(r.width); el.dataset.ch=Math.round(r.height);
    });
  }

  function forceVerse(){
    var c=q('.story2-citation'), t=q('.story2-cit-text'), ref=q('.story2-cit-ref');
    if(t){
      t.innerHTML="<span>« Ainsi ils ne sont plus deux, mais une seule chair. »</span><span>Que l’homme donc ne sépare pas ce que Dieu a uni. »</span>";
      t.style.setProperty('display','block','important');t.style.setProperty('visibility','visible','important');t.style.setProperty('opacity','1','important');t.style.setProperty('clip-path','none','important');t.style.setProperty('transform','none','important');
      qa('span',t).forEach(function(s){
        s.style.setProperty('opacity','1','important');s.style.setProperty('clip-path','inset(0 0 0 0)','important');s.style.setProperty('transform','none','important');s.style.setProperty('animation','none','important');
      });
    }
    if(ref) ref.textContent='Matthieu 19:6';
    if(c){ c.style.setProperty('display','block','important');c.style.setProperty('visibility','visible','important');c.style.setProperty('opacity','1','important');c.style.setProperty('transform','none','important');c.classList.add('s2-in','in-view','is-swept'); }
  }

  function forceShimmer(){
    qa('.h-names,.final-h-names').forEach(function(el){
      el.style.setProperty('font-family',"'ChopinScript','Great Vibes',cursive",'important');
      el.style.setProperty('background','linear-gradient(105deg,#7A4B20 0%,#B99048 18%,#F3D391 34%,#FFF3C1 48%,#C99A45 63%,#8A5B1E 82%,#F3D391 100%)','important');
      el.style.setProperty('background-size','300% auto','important');
      el.style.setProperty('-webkit-background-clip','text','important');
      el.style.setProperty('background-clip','text','important');
      el.style.setProperty('-webkit-text-fill-color','transparent','important');
      el.style.setProperty('color','transparent','important');
      el.style.setProperty('animation','eventiaV44Shimmer 4.4s ease-in-out infinite','important');
    });
  }

  function tuneHeroStars(){
    var hero=q('#hero'); if(!hero) return;
    var snow=q('.hero-snow',hero);
    if(!snow){
      snow=document.createElement('div'); snow.className='hero-snow';
      var content=q('.hero-content',hero); hero.insertBefore(snow, content||hero.firstChild);
    }
    if(snow.children.length<90){
      for(var i=snow.children.length;i<90;i++){snow.appendChild(document.createElement('i'));}
    }
    qa('i',snow).forEach(function(p){
      p.style.left=(Math.random()*100).toFixed(2)+'%';
      p.style.setProperty('animation-duration',(18+Math.random()*22).toFixed(1)+'s','important');
      p.style.animationDelay=(-Math.random()*26).toFixed(2)+'s';
      p.style.setProperty('--extraDur','0s');
      p.style.setProperty('--drift',((Math.random()*40)-20).toFixed(1)+'px');
      p.style.setProperty('opacity',(0.45+Math.random()*0.5).toFixed(2));
    });
  }

  function fastConfettiLayer(cx,cy,count){
    var layer=document.createElement('div');
    layer.className='eventia-final-confetti-layer';
    layer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2147483647;overflow:hidden';
    document.body.appendChild(layer);
    var colors=['#F9E6A8','#E5C36F','#C89A3D','#A86E18','#F6F0DB','#D8B663','#FFF7D6','#ffffff'];
    for(var i=0;i<count;i++){
      var e=document.createElement('i'), a=Math.random()*Math.PI*2, d=90+Math.random()*280, sz=2+Math.random()*5, dust=Math.random()<.28;
      e.style.cssText='position:fixed;left:'+cx+'px;top:'+cy+'px;width:'+(dust?sz:sz*1.8)+'px;height:'+(dust?sz:Math.max(2,sz*.75))+'px;border-radius:'+(dust?'50%':'2px')+';background:'+colors[i%colors.length]+';box-shadow:0 0 10px rgba(245,214,135,.55);opacity:0;will-change:transform,opacity';
      layer.appendChild(e);
      e.animate([{transform:'translate(0,0) rotate(0deg) scale(.65)',opacity:0},{transform:'translate('+(Math.cos(a)*d*.25)+'px,'+(Math.sin(a)*d*.18-75)+'px) rotate(160deg) scale(1)',opacity:1,offset:.14},{transform:'translate('+(Math.cos(a)*d)+'px,'+(Math.sin(a)*d+85)+'px) rotate('+((Math.random()-.5)*900)+'deg) scale(.38)',opacity:0}],{duration:260+Math.random()*140,delay:Math.random()*20,easing:'cubic-bezier(.2,.8,.3,1)',fill:'forwards'});
    }
    setTimeout(function(){layer.remove();},1100);
  }
  function finalConfetti(){
    var pts=[[.18,.45],[.34,.42],[.5,.39],[.66,.42],[.82,.45]];
    [0,70,150,240].forEach(function(delay){setTimeout(function(){pts.forEach(function(p,i){setTimeout(function(){fastConfettiLayer(innerWidth*p[0],innerHeight*p[1],72);},i*8);});},delay);});
  }
  window.eventiaFinalConfetti=finalConfetti;

  function wireRsvp(){
    qa('#rsvp input[name="presence"][value="oui"]').forEach(function(input){
      if(input.dataset.eventiaV44) return; input.dataset.eventiaV44='1';
      input.addEventListener('change',function(){
        if(!input.checked) return;
        var label=input.closest('label')||input.parentElement;
        var r=label?label.getBoundingClientRect():null;
        var cx=r?(r.left+r.width/2):innerWidth/2, cy=r?(r.top+r.height/2):innerHeight*.4;
        fastConfettiLayer(cx,cy,90);
        setTimeout(function(){fastConfettiLayer(cx-50,cy-10,65);},100);
        setTimeout(function(){fastConfettiLayer(cx+50,cy-10,65);},190);
        setTimeout(function(){fastConfettiLayer(cx,cy-20,50);},300);
      });
    });
    var title=q('#rsvp .es-title'); if(title) title.innerHTML='Votre présence,<br>notre honneur';
  }

  function addCalendarButton(){
    var btn=q('#calendarBtnParent');
    if(!btn) return;
    var ics=[
      'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Eventia Signature//FR','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',
      'UID:mariepaulyann-20270522@eventiasignature.fr','SUMMARY:Mariage Marie-Paul & Yann','DTSTART;VALUE=DATE:20270522','DTEND;VALUE=DATE:20270523',
      'LOCATION:Château des Hauts de Provins + Mairie de Gennevilliers',
      'DESCRIPTION:Le mariage de Marie-Paul & Yann — 22 Mai 2027\\nChâteau des Hauts de Provins + Mairie de Gennevilliers',
      'STATUS:CONFIRMED','TRANSP:OPAQUE','END:VEVENT','END:VCALENDAR'
    ].join('\r\n');
    try{btn.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));btn.download='mariage-marie-paul-yann.ics';}catch(e){}
  }

  function normalizeTextPunctuation(){
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(node){
      var p=node.parentNode; if(!p) return NodeFilter.FILTER_REJECT;
      var tag=p.nodeName; if(/^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION)$/i.test(tag)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    var n; while(n=walker.nextNode()){
      n.nodeValue=n.nodeValue.replace(/\s[–—]\s/g, ', ').replace(/\s-\s/g, ', ');
    }
  }

  function improveLoading(){
    qa('img').forEach(function(img){ if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy'); img.setAttribute('decoding','async'); });
    qa('iframe').forEach(function(f){ if(!/scratch|countdown/i.test(f.src||'')) f.setAttribute('loading','lazy'); });
  }

  function applyLangFinal(lang){
    document.documentElement.lang=lang==='en'?'en':'fr';
    qa('#lang-sw button').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang);});
    if(typeof window.setLang==='function' && !window.setLang._eventiaV44){ try{ window.setLang(lang); }catch(e){} }
  }
  var previousSetLang=window.setLang;
  window.setLang=function(lang){
    lang=(lang==='en')?'en':'fr';
    if(previousSetLang && previousSetLang!==window.setLang){ try{ previousSetLang(lang); }catch(e){} }
    applyLangFinal(lang);
    forceVerse(); forceShimmer(); wireRsvp(); addCalendarButton();
  };
  window.setLang._eventiaV44=true;

  ready(function(){
    updateContainerVars(); forceVerse(); forceShimmer(); tuneHeroStars(); wireRsvp(); addCalendarButton(); normalizeTextPunctuation(); improveLoading();
    setTimeout(function(){forceVerse();forceShimmer();tuneHeroStars();},500);
    setTimeout(function(){forceVerse();forceShimmer();updateContainerVars();},1400);
  });
  window.addEventListener('resize',function(){updateContainerVars();},{passive:true});
  window.addEventListener('message',function(e){
    if(!e.data) return;
    var t=e.data.type, a=e.data.action;
    if(t==='eventia-scratch-complete'||t==='eventia-date-revealed'||a==='confetti'){
      var btn=document.getElementById('calendarBtnParent');
      if(btn) btn.classList.add('eventia-revealed');
      setTimeout(function(){if(typeof window.eventiaFinalConfetti==='function') window.eventiaFinalConfetti();},200);
      setTimeout(function(){if(typeof window.eventiaFinalConfetti==='function') window.eventiaFinalConfetti();},700);
      setTimeout(function(){if(typeof window.eventiaFinalConfetti==='function') window.eventiaFinalConfetti();},1400);
    }
  });
})();


/* === PHASE 3 — Bouton langue : contrôleur unique === */
(function() {
  function syncLang() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var hidden = y > 0;
    document.body.classList.toggle('lang-hidden',         hidden);
    document.body.classList.toggle('eventia-lang-hidden', hidden);
    document.body.classList.toggle('eventia-hide-lang',   hidden);
    document.body.classList.toggle('eventia-scrolled',    hidden);
    document.body.classList.toggle('eventia-show-lang',   !hidden);
    var nav = document.getElementById('topnav');
    if (nav) nav.classList.toggle('eventia-lang-hidden', hidden);
    var langSw = document.getElementById('lang-sw');
    if (langSw) {
      langSw.style.setProperty('opacity',        hidden ? '0' : '1',       'important');
      langSw.style.setProperty('visibility',     hidden ? 'hidden' : 'visible', 'important');
      langSw.style.setProperty('pointer-events', hidden ? 'none' : 'auto', 'important');
      langSw.style.setProperty('display',        'flex',                    'important');
    }
  }
  window.addEventListener('scroll', syncLang, {passive: true});
  ready(function() {
    var langSw = document.getElementById('lang-sw');
    if (langSw) langSw.style.setProperty('transition', 'opacity 0.22s ease, visibility 0.22s ease', 'important');
    syncLang();
  });
})();


/* === Dress code inline — canvas scintilles === */
(function(){
  ready(function(){
    var canvas=document.getElementById('dressCanvas');
    var wrap=document.getElementById('dressWrapInline');
    if(!canvas||!wrap) return;
    var ctx=canvas.getContext('2d');
    var particles=[];
    function resize(){canvas.width=wrap.offsetWidth;canvas.height=wrap.offsetHeight||Math.round(wrap.offsetWidth*.55);}
    resize();
    window.addEventListener('resize',resize,{passive:true});
    var COLORS=['rgba(255,248,210,','rgba(243,213,138,','rgba(255,255,235,','rgba(216,174,103,'];
    function spawn(){return{x:Math.random()*canvas.width,y:-8,size:.8+Math.random()*2.2,speedY:.18+Math.random()*.45,speedX:(Math.random()-.5)*.4,opacity:0,maxOpacity:.4+Math.random()*.55,color:COLORS[Math.floor(Math.random()*COLORS.length)],life:0,maxLife:260+Math.random()*220,twinkleSpeed:.02+Math.random()*.04};}
    for(var i=0;i<28;i++){var p=spawn();p.y=Math.random()*canvas.height;p.life=Math.random()*p.maxLife;particles.push(p);}
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(particles.length<40&&Math.random()<.18) particles.push(spawn());
      for(var i=particles.length-1;i>=0;i--){
        var p=particles[i];p.life++;p.y+=p.speedY;p.x+=p.speedX+Math.sin(p.life*.04)*.3;
        var lr=p.life/p.maxLife;
        if(lr<.15) p.opacity=(lr/.15)*p.maxOpacity;
        else if(lr>.75) p.opacity=((1-lr)/.25)*p.maxOpacity;
        else p.opacity=p.maxOpacity;
        p.opacity*=(.7+.3*Math.sin(p.life*p.twinkleSpeed*Math.PI*2));
        ctx.save();ctx.globalAlpha=Math.max(0,p.opacity);
        ctx.fillStyle=p.color+p.opacity+')';ctx.shadowColor=p.color+'0.8)';ctx.shadowBlur=p.size*3;
        ctx.translate(p.x,p.y);ctx.beginPath();
        var s=p.size;
        ctx.moveTo(0,-s*2.2);ctx.lineTo(s*.4,-s*.4);ctx.lineTo(s*2.2,0);ctx.lineTo(s*.4,s*.4);ctx.lineTo(0,s*2.2);ctx.lineTo(-s*.4,s*.4);ctx.lineTo(-s*2.2,0);ctx.lineTo(-s*.4,-s*.4);ctx.closePath();ctx.fill();ctx.restore();
        if(p.life>=p.maxLife||p.y>canvas.height+10) particles.splice(i,1);
      }
      requestAnimationFrame(draw);
    }
    draw();
  });
})();