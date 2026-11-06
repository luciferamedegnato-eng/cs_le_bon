/* ===== Navigation ===== */
const NAV = [
  { id: 'accueil', l: { fr: 'Accueil', en: 'Home' } },
  { k: 'ecole', l: { fr: 'L\'école', en: 'The school' }, items: [
    { id: 'apropos', i: 'info', l: { fr: 'À propos', en: 'About us' }, d: { fr: 'Historique, vision, mission, valeurs', en: 'History, vision, mission, values' } },
    { id: 'administration', i: 'org', l: { fr: 'Administration', en: 'Administration' }, d: { fr: 'Direction et services', en: 'Management and offices' } },
    { id: 'enseignants', i: 'users', l: { fr: 'Enseignants', en: 'Teachers' }, d: { fr: 'L\'équipe pédagogique', en: 'Our teaching staff' } },
    { id: 'partenaires', i: 'star', l: { fr: 'Partenaires', en: 'Partners' }, d: { fr: 'Ils nous font confiance', en: 'Who we work with' } },
    { id: 'recrutement', i: 'briefcase', l: { fr: 'Recrutement', en: 'Careers' }, d: { fr: 'Offres d\'emploi', en: 'Job openings' } } ] },
  { k: 'form', l: { fr: 'Formations', en: 'Programmes' }, items: [
    { id: 'cycles', i: 'cap', l: { fr: 'Nos cycles', en: 'Our schools' }, d: { fr: 'De la maternelle au lycée', en: 'From nursery to high school' } },
    { id: 'filieres', i: 'gear', l: { fr: 'Lycée technique et industriel', en: 'Technical and industrial high school' }, d: { fr: 'Filières G1, G2, G3, F1, F2', en: 'G1, G2, G3, F1, F2 tracks' } },
    { id: 'documents', i: 'file', l: { fr: 'Documents', en: 'Documents' }, d: { fr: 'Règlement, calendrier, fournitures', en: 'Rules, calendar, supply lists' } } ] },
  { k: 'vie', l: { fr: 'Vie scolaire', en: 'School life' }, items: [
    { id: 'vie-scolaire', i: 'heart', l: { fr: 'Vie scolaire', en: 'School life' }, d: { fr: 'Discipline, clubs, activités', en: 'Discipline, clubs, activities' } },
    { id: 'actualites', i: 'bell', l: { fr: 'Actualités et agenda', en: 'News and calendar' }, d: { fr: 'Rentrée, examens, réunions', en: 'Term dates, exams, meetings' } },
    { id: 'galerie', i: 'image', l: { fr: 'Galerie', en: 'Gallery' }, d: { fr: 'Photos et vidéos', en: 'Photos and videos' } } ] },
  { id: 'admissions', l: { fr: 'Admissions', en: 'Admissions' } },
  { id: 'resultats', l: { fr: 'Résultats', en: 'Results' } },
  { id: 'contact', l: { fr: 'Contact', en: 'Contact' } }
];
const TITLES = {
  accueil: { fr: 'Accueil', en: 'Home' }, apropos: { fr: 'À propos', en: 'About us' }, cycles: { fr: 'Nos cycles', en: 'Our schools' },
  filieres: { fr: 'Lycée technique et industriel', en: 'Technical and industrial high school' }, admissions: { fr: 'Admissions', en: 'Admissions' }, resultats: { fr: 'Résultats aux examens', en: 'Exam results' },
  actualites: { fr: 'Actualités et agenda', en: 'News and calendar' }, galerie: { fr: 'Galerie', en: 'Gallery' }, 'vie-scolaire': { fr: 'Vie scolaire', en: 'School life' },
  enseignants: { fr: 'Enseignants', en: 'Teachers' }, administration: { fr: 'Administration', en: 'Administration' }, admin: { fr: 'Espace Administration', en: 'Admin area' }, parents: { fr: 'Espace Parents', en: 'Parent area' },
  eleves: { fr: 'Espace Élèves', en: 'Student area' }, paiement: { fr: 'Paiement en ligne', en: 'Online payment' }, contact: { fr: 'Contact', en: 'Contact' },
  faq: { fr: 'Questions fréquentes', en: 'FAQ' }, partenaires: { fr: 'Partenaires', en: 'Partners' }, recrutement: { fr: 'Recrutement', en: 'Careers' }, documents: { fr: 'Documents', en: 'Documents' }
};
const CAT_ILL = { ecole: 'green', rentree: '', examens: 'gold', reunions: 'lilac', sorties: 'green', conseils: 'lilac', stages: 'gold', concours: 'green' };
const catName = k => t((NEWS_CATS.find(c => c[0] === k) || [0, k])[1]);

function logo() {
  return CONFIG.logo ? `<img src="${CONFIG.logo}" alt="">` :
    `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="11" fill="#1C4A33"/><text x="24" y="28.5" text-anchor="middle" font-family="Bricolage Grotesque, Segoe UI, sans-serif" font-weight="800" font-size="19" fill="#fff" letter-spacing="-.5">LB</text><path d="M12 35.5c8-2.4 16-2.8 24-1.4" stroke="#EE8F86" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`;
}
function brand() {
  return `<a class="brand" href="#/accueil" aria-label="${CONFIG.nom}, ${L('accueil', 'home')}"><span class="logo ${CONFIG.logo ? '' : 'ph-block'}">${logo()}</span><span><span class="bsub">Complexe Scolaire</span><b>${CONFIG.court}</b></span></a>`;
}

/* ===== En-tête & pied ===== */
function header(route) {
  const dark = document.documentElement.classList.contains('dark');
  const unread = PARENT_DATA.avis.filter(a => a.unread).length;
  const menu = NAV.map(n => {
    if (!n.items) return `<li><a href="#/${n.id}" ${route === n.id ? 'aria-current="page"' : ''}>${t(n.l)}</a></li>`;
    const cur = n.items.some(i => i.id === route);
    return `<li><button type="button" class="${cur ? 'current' : ''}" aria-expanded="false" aria-controls="sub-${n.k}" data-act="dd" data-k="${n.k}">${t(n.l)}${ic('chev', 'chev')}</button>
      <ul class="sub" id="sub-${n.k}">${n.items.map(i => `<li><a href="#/${i.id}" ${route === i.id ? 'aria-current="page"' : ''}>${ic(i.i)}<span>${t(i.l)}<small>${t(i.d)}</small></span></a></li>`).join('')}</ul></li>`;
  }).join('');
  return `
  <div class="topbar"><div class="wrap">
    <div class="grp l"><a href="tel:${CONFIG.tel.replace(/\s/g, '')}">${ic('phone')}${ph(CONFIG.tel)}</a><a class="hide-m" href="mailto:${CONFIG.email}">${ic('mail')}${ph(CONFIG.email)}</a></div>
    <div class="grp">
      <a href="#/parents">${ic('lock')}${L('Espace Parents', 'Parent area')}</a>
      <a href="#/eleves" class="hide-m">${ic('user')}${L('Espace Élèves', 'Student area')}</a>
      <a href="#/admin" class="hide-m">${ic('key')}${L('Espace Admin', 'Staff')}</a>
      <a href="#/paiement" class="hide-m">${ic('card')}${L('Payer en ligne', 'Pay online')}</a>
      <span class="sep hide-m" aria-hidden="true"></span>
      <span class="lang" role="group" aria-label="${L('Langue', 'Language')}"><button data-act="lang" data-v="fr" aria-pressed="${S.lang === 'fr'}" lang="fr">FR</button><button data-act="lang" data-v="en" aria-pressed="${S.lang === 'en'}" lang="en">EN</button></span>
      <button data-act="theme" aria-label="${dark ? L('Passer en mode clair', 'Switch to light mode') : L('Passer en mode sombre', 'Switch to dark mode')}">${ic(dark ? 'sun' : 'moon')}</button>
    </div></div></div>
  <div class="nav"><div class="wrap">
    ${brand()}
    <nav aria-label="${L('Navigation principale', 'Main navigation')}"><ul class="menu">${menu}</ul></nav>
    <div class="nav-actions">
      <button class="iconbtn" data-act="search" aria-label="${L('Rechercher sur le site', 'Search the site')}">${ic('search')}</button>
      <span style="position:relative"><button class="iconbtn" data-act="bell" aria-expanded="false" aria-controls="bellpop" aria-label="${L('Notifications', 'Notifications')}${unread ? ` (${unread})` : ''}">${ic('bell')}${unread ? `<span class="badge">${unread}</span>` : ''}</button>
        <div class="sub" id="bellpop" style="right:0;left:auto;width:320px">${PARENT_DATA.avis.map(a => `<a href="#/parents" data-act="toavis">${a.unread ? '<span class="unread" style="margin-top:.5rem"></span>' : ic('check')}<span>${t(a.title)}<small>${fdate(a.d)}</small></span></a>`).join('')}</div></span>
      <a class="btn btn-gold btn-sm cta-insc" href="#/admissions/form">${L('S\'inscrire', 'Enrol')}</a>
      <button class="iconbtn burger" data-act="drawer" aria-label="${L('Ouvrir le menu', 'Open menu')}">${ic('menu')}</button>
    </div>
  </div></div>`;
}
function drawer() {
  const flat = NAV.map(n => n.items ? `<h4>${t(n.l)}</h4>${n.items.map(i => `<a href="#/${i.id}">${ic(i.i)}${t(i.l)}</a>`).join('')}` : `<a href="#/${n.id}">${t(n.l)}</a>`).join('');
  return `<div class="scrim" data-act="drawer-close"></div><div class="panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="head">${brand()}<button class="iconbtn" data-act="drawer-close" aria-label="${L('Fermer le menu', 'Close menu')}">${ic('close')}</button></div>
    <div style="display:grid;gap:.5rem;margin:1.2rem 0"><a class="btn btn-gold" href="#/admissions/form" style="justify-content:center">${ic('edit')}${L('Inscription en ligne', 'Online enrolment')}</a></div>
    ${flat}
    <h4>${L('Services', 'Services')}</h4>
    <a href="#/parents">${ic('lock')}${L('Espace Parents', 'Parent area')}</a><a href="#/eleves">${ic('user')}${L('Espace Élèves', 'Student area')}</a><a href="#/admin">${ic('key')}${L('Espace Administration', 'Admin area')}</a><a href="#/paiement">${ic('card')}${L('Paiement en ligne', 'Online payment')}</a><a href="#/faq">${ic('help')}${L('Questions fréquentes', 'FAQ')}</a>
  </div>`;
}
function footer() {
  const so = CONFIG.social;
  return `<footer class="foot"><div class="wrap">
    <div class="cols">
      <div>${brand()}<p class="motto">${ph(t(CONFIG.devise))}</p>
        <p class="small">${ic('pin')} ${ph(CONFIG.adresse)}<br>${ph(CONFIG.bp)}</p>
        <p class="small"><a href="tel:${CONFIG.tel.replace(/\s/g, '')}">${ph(CONFIG.tel)}</a>${CONFIG.tel2 ? ` · <a href="tel:${CONFIG.tel2.replace(/\s/g, '')}">${CONFIG.tel2}</a>` : ''}<br><a href="mailto:${CONFIG.email}">${ph(CONFIG.email)}</a></p></div>
      <div><h4>${L('L\'établissement', 'The school')}</h4><ul>
        <li><a href="#/apropos">${L('À propos', 'About us')}</a></li><li><a href="#/cycles">${L('Nos cycles', 'Our schools')}</a></li><li><a href="#/filieres">${L('Lycée technique et industriel', 'Technical and industrial high school')}</a></li>
        <li><a href="#/administration">${L('Administration', 'Administration')}</a></li><li><a href="#/enseignants">${L('Enseignants', 'Teachers')}</a></li><li><a href="#/partenaires">${L('Partenaires', 'Partners')}</a></li><li><a href="#/recrutement">${L('Recrutement', 'Careers')}</a></li></ul></div>
      <div><h4>${L('Services', 'Services')}</h4><ul>
        <li><a href="#/admissions/form">${L('Inscription en ligne', 'Online enrolment')}</a></li><li><a href="#/resultats">${L('Résultats aux examens', 'Exam results')}</a></li><li><a href="#/parents">${L('Espace Parents', 'Parent area')}</a></li>
        <li><a href="#/eleves">${L('Espace Élèves', 'Student area')}</a></li><li><a href="#/admin">${L('Espace Administration', 'Admin area')}</a></li><li><a href="#/paiement">${L('Paiement en ligne', 'Online payment')}</a></li><li><a href="#/documents">${L('Documents à télécharger', 'Downloads')}</a></li><li><a href="#/faq">${L('Questions fréquentes', 'FAQ')}</a></li></ul></div>
      <div><h4>${L('Recevoir les actualités', 'Get school news')}</h4>
        <p class="small">${L('Rentrée, examens, réunions : un e-mail par mois, pas plus.', 'Term dates, exams, meetings: one email a month, no more.')}</p>
        <form class="nl" data-form="newsletter" novalidate><label class="sr" for="nl-mail">E-mail</label><input id="nl-mail" type="email" required placeholder="${L('Votre adresse e-mail', 'Your email address')}"><button class="btn btn-gold btn-sm" type="submit">${L('S\'abonner', 'Subscribe')}</button></form>
        <div class="social">
          <a href="${so.facebook}" aria-label="Facebook">${ic('facebook')}</a><a href="${so.instagram}" aria-label="Instagram">${ic('instagram')}</a><a href="${so.tiktok}" aria-label="TikTok">${ic('tiktok')}</a><a href="${so.youtube}" aria-label="YouTube">${ic('youtube')}</a>
        </div></div>
    </div>
    <div class="bottom"><span>© ${new Date().getFullYear()} ${CONFIG.nom}. ${L('Tous droits réservés.', 'All rights reserved.')}</span><span><a href="#/faq">FAQ</a> &nbsp; <a href="#/contact">${L('Nous écrire', 'Write to us')}</a> &nbsp; <a href="#/documents">${L('Documents', 'Documents')}</a></span></div>
  </div></footer>`;
}

/* ===== Blocs communs ===== */
function phead(id, intro, parent) {
  const title = t(TITLES[id]);
  return `<header class="board phead"><div class="wrap">
    <nav class="crumbs" aria-label="${L('Fil d\'Ariane', 'Breadcrumb')}"><a href="#/accueil">${L('Accueil', 'Home')}</a>${parent ? ` / ${parent}` : ''} / <span aria-current="page">${title}</span></nav>
    <h1 tabindex="-1">${title}</h1>${SWASH}${intro ? `<p>${intro}</p>` : ''}</div></header>`;
}
function portrait(label) {
  return `<div class="portrait ph-block"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">${ICONS.user}</svg><span class="note">${label || L('Photo officielle à fournir', 'Official photo to be provided')}</span></div>`;
}
function dgBlock(h = 'h2') {
  return `<div class="dg">${portrait()}<div><${h}>${L('Mot du Fondateur', 'A word from the Founder')}</${h}>
    <blockquote class="word">${L('Le monde évolue vite, et le développement des technologies de l\'information et de la communication exige des entreprises des ressources humaines hautement qualifiées, des cadres formés aux techniques de management : des professionnels à la hauteur des défis de la mondialisation. Le Complexe Scolaire Le Bon s\'inscrit dans cette logique. Sa mission est de former des femmes et des hommes de qualité, qui allient savoir intellectuel, savoir-faire pratique et valeurs morales.', 'The world is changing fast, and the growth of information and communication technologies requires companies to find highly qualified people and managers trained in management: professionals equal to the challenges of globalisation. Le Bon school follows this approach. Its mission is to train people of quality who combine intellectual knowledge, practical skills and moral values.')}</blockquote>
    <div class="sign"><b>${CONFIG.dg}</b><span>${L('Fondateur de CS LE BON', 'Founder of CS LE BON')}</span></div></div></div>`;
}
function newsCard(n) {
  return `<article class="news"><div class="ill ${CAT_ILL[n.cat] || ''}">${art(n.art)}${n.img ? IMG(n.img) : ''}</div><div class="b">
    <div class="meta"><span class="tag">${catName(n.cat)}</span><span>${ic('calendar')}${fdate(n.d)}</span></div>
    <h3>${t(n.t)}</h3><p>${t(n.x)}</p><div class="more"><button class="linkbtn" data-act="news" data-id="${n.id}">${L('Lire la suite', 'Read more')}<span class="sr"> : ${t(n.t)}</span></button></div></div></article>`;
}
function upcoming(n = 5) {
  const today = new Date().toISOString().slice(0, 10);
  let list = EVENTS.filter(e => e.d >= today);
  if (!list.length) list = EVENTS.slice(-n);
  return list.slice(0, n);
}
function agenda(list) {
  return `<ul class="agenda">${list.map(e => { const d = new Date(e.d + 'T12:00:00'); return `<li><div class="dbox"><b>${d.getDate()}</b><span>${MSHORT[S.lang][d.getMonth()]}</span></div><div><h4>${t(e.t)}</h4><p>${e.k === 'exam' ? L('Examens', 'Exams') : e.k === 'hol' ? L('Congé', 'Holiday') : L('Événement', 'Event')}</p></div></li>`; }).join('')}</ul>`;
}
function mapBlock() {
  const q = encodeURIComponent(CONFIG.maps);
  if (CONFIG.mapEmbed) return `<div class="map"><iframe src="${CONFIG.mapEmbed}" title="${L('Plan d\'accès', 'Location map')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
  return `<div class="map ph-block"><svg class="bgmap" viewBox="0 0 400 250" fill="none" stroke="currentColor" stroke-width="10" aria-hidden="true"><path d="M-10 180C80 160 120 60 220 70s150 90 200 60"/><path d="M60 -10l40 270M260 -10l-30 270M-10 90h420" stroke-width="5"/></svg>
    <div class="pin">${ic('pin')}<b style="display:block;margin:.3rem 0">${CONFIG.nom}</b><span class="small muted">${ph(CONFIG.adresse)}</span><br><a class="btn btn-sm btn-ghost" style="margin-top:.7rem" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">${ic('external')}${L('Ouvrir dans Google Maps', 'Open in Google Maps')}</a></div></div>`;
}
function field(id, label, opts = {}) {
  const { type = 'text', req = true, hint = '', options = null, ph: pl = '', full = false, value = '', auto = '' } = opts;
  const ctl = options ? `<select id="${id}" name="${id}" ${req ? 'required' : ''}><option value="">${L('Choisir…', 'Choose…')}</option>${options.map(o => `<option value="${esc(o[0])}" ${o[0] === value ? 'selected' : ''}>${o[1]}</option>`).join('')}</select>`
    : type === 'textarea' ? `<textarea id="${id}" name="${id}" ${req ? 'required' : ''} placeholder="${pl}">${value}</textarea>`
    : `<input id="${id}" name="${id}" type="${type}" ${req ? 'required' : ''} placeholder="${pl}" value="${esc(value)}" ${auto ? `autocomplete="${auto}"` : ''}>`;
  return `<div class="field" ${full ? 'style="grid-column:1/-1"' : ''}><label for="${id}">${label}${req ? '' : ` <span class="muted small">(${L('facultatif', 'optional')})</span>`}</label>${hint ? `<span class="hint">${hint}</span>` : ''}${ctl}<span class="msg">${type === 'email' ? L('Saisissez une adresse e-mail valide, par exemple nom@domaine.com.', 'Enter a valid email, e.g. name@domain.com.') : type === 'tel' ? L('Saisissez un numéro de téléphone (8 chiffres minimum).', 'Enter a phone number (at least 8 digits).') : L('Ce champ est obligatoire.', 'This field is required.')}</span></div>`;
}
const cycleOpts = () => CYCLES.map(c => [c.id, t(c.name)]);

/* ===== ACCUEIL ===== */
function slidesData() {
  return [
    { stick: 's-white', art: 'school', lbl: L('Bienvenue', 'Welcome'), say: L('Bienvenue à<br>CS LE BON', 'Welcome to<br>CS LE BON'), motto: true,
      sub: L('De la maternelle au lycée technique et industriel, un seul établissement pour accompagner votre enfant jusqu\'au diplôme.', 'From nursery school to the technical and industrial high school, one school to guide your child all the way to a diploma.'),
      acts: [['#/admissions/form', L('Inscription', 'Enrol'), 'btn-gold', 'edit'], ['#/contact', L('Contact', 'Contact'), 'btn-chalk', 'phone'], ['#/parents', L('Espace Parents', 'Parent area'), 'btn-chalk', 'lock']] },
    { stick: 's-gold', art: 'book', lbl: L('Inscriptions', 'Enrolment'), say: L('Inscriptions<br>2026-2027', 'Enrolment<br>2026-2027'),
      sub: L('Les dossiers sont reçus en ligne et au secrétariat. Les places sont limitées en maternelle et en seconde.', 'Applications are accepted online and at the secretariat. Places are limited in nursery and in seconde.'),
      acts: [['#/admissions/form', L('S\'inscrire en ligne', 'Enrol online'), 'btn-gold', 'edit'], ['#/admissions', L('Voir les conditions', 'See requirements'), 'btn-chalk', 'list']] },
    { stick: 's-green', art: 'gears', lbl: L('Lycée technique et industriel', 'Technical and industrial high school'), say: L('Cinq filières<br>techniques', 'Five technical<br>tracks'),
      sub: L('G1, G2, G3, F1 et F2 : des formations concrètes, avec ateliers, laboratoires et stages en entreprise.', 'G1, G2, G3, F1 and F2: hands-on programmes with workshops, labs and company internships.'),
      acts: [['#/filieres', L('Découvrir les filières', 'Explore the tracks'), 'btn-gold', 'gear'], ['#/cycles/institut', L('Programmes et horaires', 'Programmes and hours'), 'btn-chalk', 'clock']] },
    { stick: 's-lilac', art: 'computer', lbl: L('Espace Parents', 'Parent area'), say: L('Suivez sa<br>scolarité', 'Follow their<br>progress'),
      sub: L('Notes, absences, bulletins et paiements : tout est réuni dans l\'Espace Parents, sur ordinateur comme sur téléphone.', 'Grades, absences, reports and payments: everything is in the Parent area, on computer or phone.'),
      acts: [['#/parents', L('Ouvrir l\'Espace Parents', 'Open the Parent area'), 'btn-gold', 'lock'], ['#/paiement', L('Payer en ligne', 'Pay online'), 'btn-chalk', 'card']] }
  ];
}
function pHome() {
  const sl = slidesData();
  const latest = [...NEWS].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 2);
  return `<h1 class="sr" tabindex="-1">${CONFIG.nom}</h1>
  <section class="board hero" aria-roledescription="carousel" aria-label="${L('À la une', 'Highlights')}">
    <div class="wrap slides" id="slides" aria-live="off">
      ${sl.map((s, i) => `<div class="slide ${i === S.slide ? 'on' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${sl.length}">
        <div>${s.motto ? `<p class="motto write">${ph(t(CONFIG.devise))}</p>` : ''}
          <h2 class="say chalk write d2">${s.say}</h2>
          <p class="sub-t">${s.sub}</p>
          <div class="acts">${s.acts.map(a => `<a class="btn ${a[2]}" href="${a[0]}">${ic(a[3])}${a[1]}</a>`).join('')}</div></div>
        <figure class="art" style="margin:0">${CONFIG.heroPhotos[i] ? `<img class="photo" src="${CONFIG.heroPhotos[i]}" alt="">` : art(s.art)}${CONFIG.heroPhotos[i] ? '' : `<figcaption>${L('Dessin provisoire, à remplacer par une photo', 'Placeholder drawing, to be replaced with a photo')}</figcaption>`}</figure>
      </div>`).join('')}
    </div>
    <div class="tray"><div class="wrap">
      <div class="sticks" role="group" aria-label="${L('Choisir une diapositive', 'Choose a slide')}">${sl.map((s, i) => `<button class="stick ${s.stick}" data-act="slide" data-i="${i}" aria-label="${s.lbl}" aria-current="${i === S.slide}"></button>`).join('')}</div>
      <span class="lbl" id="slidelbl">${sl[S.slide].lbl}</span>
      <div class="ctrl"><button data-act="slide-prev" aria-label="${L('Diapositive précédente', 'Previous slide')}">${ic('left')}</button><button data-act="slide-pause" id="pausebtn" aria-label="${L('Mettre en pause le diaporama', 'Pause slideshow')}">${ic('pause')}</button><button data-act="slide-next" aria-label="${L('Diapositive suivante', 'Next slide')}">${ic('right')}</button></div>
    </div></div>
  </section>
  <nav class="quick" aria-label="${L('Accès rapides', 'Quick links')}"><ul class="wrap">
    <li><a href="#/admissions/form"><span class="ico">${ic('edit')}</span><span>${L('Inscription en ligne', 'Online enrolment')}<small>${L('Pré-inscrire un enfant', 'Pre-register a child')}</small></span></a></li>
    <li><a href="#/resultats"><span class="ico">${ic('chart')}</span><span>${L('Résultats', 'Results')}<small>${L('Taux de réussite aux examens', 'Exam pass rates')}</small></span></a></li>
    <li><a href="#/parents"><span class="ico">${ic('lock')}</span><span>${L('Espace Parents', 'Parent area')}<small>${L('Suivi de la scolarité', 'Follow schooling')}</small></span></a></li>
    <li><a href="#/paiement"><span class="ico">${ic('card')}</span><span>${L('Paiement en ligne', 'Online payment')}<small>${L('Scolarité, cantine, uniformes', 'Fees, canteen, uniforms')}</small></span></a></li>
    <li><a href="#/actualites/agenda"><span class="ico">${ic('calendar')}</span><span>${L('Calendrier', 'Calendar')}<small>${L('Prochains événements', 'Upcoming events')}</small></span></a></li>
  </ul></nav>
  <section class="sec"><div class="wrap">${dgBlock()}</div></section>
  <section class="sec tint"><div class="wrap">
    <div class="sec-h"><div><h2>${L('Nos cycles', 'Our schools')}</h2><p>${L('Un parcours complet, de 3 ans jusqu\'au baccalauréat général ou technique.', 'A complete path, from age 3 to the general or technical baccalaureate.')}</p></div><a class="btn btn-ghost" href="#/cycles">${L('Programmes et horaires', 'Programmes and hours')}</a></div>
    <ol class="ladder">${CYCLES.map(c => `<li><a href="#/cycles/${c.id}"><div class="ill">${art(c.art)}${c.img ? IMG(c.img, t(c.name)) : ''}</div><div class="b"><span class="age">${t(c.age)}</span><h3>${t(c.name)}</h3><p>${t(c.short)}</p></div></a></li>`).join('')}</ol>
    ${homeResults()}
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="sec-h"><h2>${L('Actualités', 'News')}</h2><a class="btn btn-ghost" href="#/actualites">${L('Toutes les actualités', 'All news')}</a></div>
    <div class="split w21"><div class="grid g2">${latest.map(newsCard).join('')}</div>
      <aside class="card"><h3>${L('Prochains rendez-vous', 'Coming up')}</h3>${agenda(upcoming(5))}<a href="#/actualites/agenda">${L('Voir le calendrier complet', 'See full calendar')}</a></aside></div>
  </div></section>
  <section class="sec tint"><div class="wrap split">
    <div><h2>${L('Visiter l\'établissement en vidéo', 'Tour the school on video')}</h2><p class="lead">${L('Trois minutes pour découvrir les classes, le laboratoire, la salle informatique et les ateliers du lycée technique et industriel.', 'Three minutes to see the classrooms, lab, computer room and technical workshops.')}</p>
      <div class="facts"><div><b>5</b><span>${L('cycles d\'enseignement', 'school levels')}</span></div><div><b>5</b><span>${L('filières techniques', 'technical tracks')}</span></div><div><b>${ph('XX')}</b><span>${L('enseignants', 'teachers')}</span></div><div><b>${ph('XXX')}</b><span>${L('élèves', 'students')}</span></div></div></div>
    ${videoBlock()}
  </div></section>
  <section class="sec tight"><div class="wrap"><div class="sec-h"><h2 style="font-size:1.5rem">${L('Nos partenaires', 'Our partners')}</h2><a href="#/partenaires">${L('Tous les partenaires', 'All partners')}</a></div><div class="logos">${partnerLogos(6)}</div></div></section>
  <section class="sec" style="padding-top:1rem"><div class="wrap"><div class="board cta"><div><h2>${L('Les inscriptions 2026-2027 sont ouvertes', 'Enrolment for 2026-2027 is open')}</h2><p>${L('Pré-inscrivez votre enfant en ligne en dix minutes. Le secrétariat vous contacte ensuite pour finaliser le dossier.', 'Pre-register your child online in ten minutes. The secretariat will then contact you to complete the file.')}</p></div>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap"><a class="btn btn-gold" href="#/admissions/form">${L('Commencer l\'inscription', 'Start enrolment')}</a><a class="btn btn-chalk" href="#/admissions">${L('Voir les conditions', 'See requirements')}</a></div></div></div></section>`;
}
function homeResults() {
  const y = lastSession();
  return `<div class="sec-h" style="margin-top:4rem"><div><h2>${L('Nos résultats aux examens', 'Our exam results')}, ${L('session', 'session')} ${y}</h2><p>${L('Taux de réussite de nos candidats aux examens officiels.', 'Pass rates of our candidates in national exams.')}</p></div><a class="btn btn-ghost" href="#/resultats">${L('Détail et évolution', 'Details and trends')}</a></div>
    <div class="facts res ph-block">${EXAMS.map(e => `<div><b>${pct(examRate(EXAM_RES[y][e.id]).p)}</b><span>${t(e.name)}</span></div>`).join('')}</div>`;
}
function videoBlock() {
  return `<div class="video ${CONFIG.video ? '' : 'ph-block'}" id="vid">${art('video')}<button class="play" data-act="video" aria-label="${L('Lire la vidéo de présentation', 'Play the presentation video')}" style="position:absolute">${ic('play')}</button><div class="cap"><span>${L('Film de présentation', 'Presentation film')}</span><span>3:00</span></div></div>`;
}
const partnerLogos = n => Array.from({ length: n }, (_, i) => `<div class="logo-ph ph-block">${L('Logo partenaire', 'Partner logo')} ${i + 1}</div>`).join('');

/* ===== À PROPOS ===== */
function pAbout() {
  const hist = [
    ['19XX', L('Création de l\'établissement', 'School founded'), L('Ouverture des premières classes de maternelle et de primaire.', 'First nursery and primary classes open.')],
    ['20XX', L('Ouverture du collège', 'Middle school opens'), L('Premières classes de 6e et premiers candidats au BEPC.', 'First 6e classes and first BEPC candidates.')],
    ['20XX', L('Ouverture du lycée', 'High school opens'), L('Séries A, C et D jusqu\'au baccalauréat.', 'A, C and D tracks up to the baccalaureate.')],
    ['20XX', L('Création de le lycée technique et industriel', 'Technical and industrial high school founded'), L('Filières G1, G2, G3, F1 et F2, avec ateliers et laboratoires.', 'G1, G2, G3, F1 and F2 tracks, with workshops and labs.')],
    ['2026', L('Services en ligne', 'Online services'), L('Lancement du site, de l\'Espace Parents et du paiement en ligne.', 'Launch of the website, Parent area and online payment.')]
  ];
  const values = [['star', L('Travail', 'Hard work'), L('L\'effort régulier, en classe comme à la maison.', 'Steady effort, in class and at home.')], ['shield', L('Rigueur', 'Rigour'), L('Ponctualité, méthode et respect des règles.', 'Punctuality, method and respect for rules.')], ['heart', L('Respect', 'Respect'), L('Envers les camarades, les enseignants et le matériel.', 'For classmates, teachers and equipment.')], ['users', L('Solidarité', 'Solidarity'), L('S\'entraider pour que personne ne reste en arrière.', 'Helping each other so no one is left behind.')]];
  return `${phead('apropos', L('Un établissement qui accompagne chaque élève, de la maternelle jusqu\'au diplôme.', 'A school that supports every student, from nursery to diploma.'), L('L\'école', 'The school'))}
  <section class="sec"><div class="wrap split">
    <div><h2>${L('Notre histoire', 'Our story')}</h2><p class="lead">${L('Fondé en', 'Founded in')} ${ph(CONFIG.creation)}, ${L('le Complexe Scolaire LE BON, école privée laïque de Lomé, a grandi avec les familles, un cycle après l\'autre.', 'LE BON, a private secular school in Lomé, has grown with local families, one level at a time.')}</p>
      <p class="muted small">${L('Dates et étapes à confirmer par l\'établissement.', 'Dates and milestones to be confirmed by the school.')}</p></div>
    <ol class="steps timeline">${hist.map(h => `<li><div><span class="yr">${ph(h[0])}</span><h4>${h[1]}</h4><p>${h[2]}</p></div></li>`).join('')}</ol>
  </div></section>
  <section class="sec tint"><div class="wrap">
    <div class="grid g2">
      <div class="card edge"><div class="ico">${ic('eye')}</div><h3>${L('Vision', 'Vision')}</h3><p class="ph-block">${L('Être une référence de l\'enseignement général et technique, reconnue pour la réussite de ses élèves et leur insertion professionnelle.', 'To be a reference in general and technical education, known for student success and employability.')}</p></div>
      <div class="card edge gold"><div class="ico">${ic('target')}</div><h3>${L('Mission', 'Mission')}</h3><p class="ph-block">${L('Offrir à chaque enfant un enseignement de qualité, un cadre discipliné et bienveillant, et des outils concrets pour réussir ses examens et son avenir.', 'To give every child quality teaching, a disciplined and caring environment, and practical tools to succeed in exams and beyond.')}</p></div>
    </div>
    <h2 style="margin-top:3rem">${L('Nos valeurs', 'Our values')}</h2>
    <div class="grid g4">${values.map(v => `<div class="card"><div class="ico">${ic(v[0])}</div><h3>${v[1]}</h3><p class="muted">${v[2]}</p></div>`).join('')}</div>
  </div></section>
  <section class="sec"><div class="wrap">${dgBlock()}</div></section>
  <section class="sec tint" id="organigramme"><div class="wrap">
    <div class="sec-h"><div><h2>${L('Organigramme', 'Organisation chart')}</h2><p>${L('Qui fait quoi dans l\'établissement.', 'Who does what at the school.')}</p></div><a class="btn btn-ghost" href="#/administration">${L('Voir l\'administration', 'See administration')}</a></div>
    <div class="org">
      <div class="row first"><div class="node top"><b>${L('Directeur Général', 'Managing Director')}</b><span>${ph(CONFIG.dg)}</span></div></div>
      <div class="row">${[L('Censeur', 'Director of Studies'), L('Surveillant Général', 'Head of Discipline'), L('Économe', 'Bursar'), L('Secrétariat', 'Secretariat')].map(x => `<div class="node"><b>${x}</b><span>${ph(L('Nom à compléter', 'Name to add'))}</span></div>`).join('')}</div>
      <div class="row">${[L('Enseignants', 'Teachers'), L('Surveillants', 'Supervisors'), L('Comptabilité', 'Accounts'), L('Accueil', 'Reception')].map(x => `<div class="node"><b>${x}</b></div>`).join('')}</div>
    </div>
  </div></section>
  <section class="sec" id="localisation"><div class="wrap split rev">
    <div><h2>${L('Nous trouver', 'Find us')}</h2><dl class="dl"><dt>${L('Adresse', 'Address')}</dt><dd>${ph(CONFIG.adresse)}</dd><dt>${L('Boîte postale', 'PO Box')}</dt><dd>${ph(CONFIG.bp)}</dd><dt>${L('Accueil', 'Office hours')}</dt><dd>${ph(t(CONFIG.horaires))}</dd><dt>${L('Téléphone', 'Phone')}</dt><dd>${ph(CONFIG.tel)}</dd></dl></div>
    ${mapBlock()}
  </div></section>`;
}

/* ===== CYCLES ===== */
function pCycles(param) {
  const cur = CYCLES.find(c => c.id === param) || CYCLES[0];
  return `${phead('cycles', L('Cinq cycles, une même exigence. Choisissez un cycle pour voir son programme, ses horaires et les diplômes préparés.', 'Five levels, one standard. Choose a level to see its programme, hours and diplomas.'), L('Formations', 'Programmes'))}
  <section class="sec"><div class="wrap">
    <div class="tabs" role="tablist" aria-label="${L('Cycles', 'Levels')}">${CYCLES.map(c => `<button role="tab" id="tab-${c.id}" aria-controls="panel-cycle" aria-selected="${c.id === cur.id}" data-act="go" data-href="#/cycles/${c.id}">${t(c.name)}</button>`).join('')}</div>
    <div class="split" id="panel-cycle" role="tabpanel" aria-labelledby="tab-${cur.id}">
      <div><div class="ill" style="margin-bottom:1.5rem">${art(cur.art)}${cur.img ? IMG(cur.img, t(cur.name)) : ''}</div>
        <h2>${t(cur.name)}</h2><p class="lead">${t(cur.short)}</p>
        <dl class="dl"><dt>${L('Âge', 'Age')}</dt><dd>${t(cur.age)}</dd><dt>${L('Classes', 'Classes')}</dt><dd>${t(cur.classes)}</dd>${cur.filieres ? `<dt>${L('Filières', 'Tracks')}</dt><dd>${t(cur.filieres)}</dd>` : ''}</dl></div>
      <div class="stack">
        <div class="card"><h3>${L('Programme', 'Programme')}</h3><ul class="ticks">${t(cur.prog).map(p => `<li>${p}</li>`).join('')}</ul></div>
        <div class="card"><h3>${ic('clock')} ${L('Horaires', 'Hours')}</h3><p>${ph(t(cur.hours))}</p><p class="small muted">${L('Du lundi au vendredi. Samedi matin réservé aux devoirs surveillés et aux activités.', 'Monday to Friday. Saturday morning for supervised tests and activities.')}</p></div>
        <div class="card edge gold"><h3>${ic('award')} ${L('Diplôme préparé', 'Diploma')}</h3><p>${t(cur.dipl)}</p>${cur.id === 'institut' ? `<a class="btn btn-sm" href="#/filieres">${L('Voir les cinq filières', 'See the five tracks')}</a>` : ''}</div>
        <a class="btn btn-gold" href="#/admissions/form">${ic('edit')}${L('Inscrire mon enfant en', 'Enrol my child in')} ${t(cur.name).toLowerCase()}</a>
      </div>
    </div>
  </div></section>`;
}

/* ===== FILIÈRES ===== */
function pFilieres() {
  const grp = (fam, title, intro) => `<h2 style="margin-top:${fam === 'ind' ? '3.5rem' : '0'}">${title}</h2><p class="lead" style="margin-bottom:1.5rem">${intro}</p>
    <div class="grid ${fam === 'tert' ? 'g3' : 'g2'}">${FILIERES.filter(f => f.fam === fam).map(f => `<article class="card" style="padding:0;overflow:hidden" id="f-${f.code}">
      <div class="ill ${fam === 'ind' ? 'green' : ''}" style="border-radius:0;aspect-ratio:${fam === 'ind' ? '2/1' : '16/10'}">${art(f.art)}<span style="position:absolute;left:1rem;top:.6rem;font:800 2.2rem/1 var(--f-display);color:#fff">${f.code}</span></div>
      <div style="padding:1.4rem 1.5rem 1.6rem"><h3>${t(f.name)}</h3><p class="muted">${t(f.desc)}</p>
        <h4 style="margin-top:1rem">${L('Matières principales', 'Core subjects')}</h4><ul class="ticks">${t(f.mat).map(m => `<li>${m}</li>`).join('')}</ul>
        <h4 style="margin-top:1rem">${L('Débouchés', 'Careers')}</h4><p class="muted" style="margin:0">${t(f.jobs)}</p>
        <p style="margin:1rem 0 0"><span class="tag gold">${ic('award')}BAC ${f.code}</span></p></div></article>`).join('')}</div>`;
  return `${phead('filieres', L('Des formations concrètes, après la 3e, qui mènent à un baccalauréat technique, à l\'emploi ou aux études supérieures.', 'Hands-on programmes after 3e leading to a technical baccalaureate, a job or further studies.'), L('Formations', 'Programmes'))}
  <section class="sec"><div class="wrap">
    <div class="notice info" style="margin-bottom:2.5rem">${ic('info')}<div><b>${L('Conditions d\'accès', 'Entry requirements')}</b>${COLON}${L('être titulaire du BEPC ou avoir terminé la classe de 3e, et passer un entretien d\'orientation. Durée : trois ans (seconde, première, terminale), avec un stage en entreprise en terminale.', 'hold the BEPC or have completed 3e, and attend a guidance interview. Duration: three years, with a company internship in the final year.')}</div></div>
    ${grp('tert', L('Filières tertiaires', 'Business tracks'), L('Gestion, administration et commerce : les métiers du bureau et de l\'entreprise.', 'Management, administration and sales: office and business careers.'))}
    ${grp('ind', L('Filières industrielles', 'Industrial tracks'), L('Mécanique et électronique : les métiers de l\'atelier et de la maintenance.', 'Mechanics and electronics: workshop and maintenance careers.'))}
    <div class="board cta" style="margin-top:3.5rem"><div><h2>${L('Une question sur l\'orientation ?', 'A question about which track?')}</h2><p>${L('Le censeur reçoit les familles sur rendez-vous pour choisir la filière adaptée.', 'The Director of Studies meets families by appointment to choose the right track.')}</p></div><div style="display:flex;gap:.75rem;flex-wrap:wrap"><a class="btn btn-gold" href="#/admissions/form">${L('S\'inscrire', 'Enrol')}</a><a class="btn btn-chalk" href="#/contact">${L('Prendre rendez-vous', 'Book a meeting')}</a></div></div>
  </div></section>`;
}

/* ===== ADMISSIONS ===== */
function pAdmissions() {
  const cond = [
    [L('Maternelle', 'Nursery'), L('Avoir 3 ans révolus au 31 décembre de l\'année d\'entrée.', 'Be 3 years old by 31 December of the year of entry.')],
    [L('Primaire', 'Primary'), L('Avoir 6 ans pour le CP1, ou présenter le dernier bulletin pour les autres classes.', 'Be 6 for CP1, or provide the latest report for other classes.')],
    [L('Collège', 'Middle school'), L('Être titulaire du CEPD pour la 6e ; test de niveau pour les autres classes.', 'Hold the CEPD for 6e; placement test for other classes.')],
    [L('Lycée', 'High school'), L('Être titulaire du BEPC ; orientation en série selon les résultats.', 'Hold the BEPC; track assigned according to results.')],
    [L('Lycée technique et industriel', 'Technical and industrial high school'), L('BEPC ou fin de 3e, et entretien d\'orientation.', 'BEPC or completed 3e, plus guidance interview.')]
  ];
  const pieces = [L('Extrait d\'acte de naissance', 'Birth certificate'), L('Bulletins de l\'année précédente', 'Previous year\'s reports'), L('Certificat de scolarité ou exeat (changement d\'établissement)', 'School certificate or transfer letter'), L('Quatre photos d\'identité récentes', 'Four recent passport photos'), L('Carnet de vaccination (maternelle et primaire)', 'Vaccination record (nursery and primary)'), L('Copie du dernier diplôme obtenu (CEPD ou BEPC)', 'Copy of last diploma (CEPD or BEPC)'), L('Frais d\'inscription', 'Registration fee')];
  const steps = [[L('Pré-inscription en ligne', 'Online pre-registration'), L('Remplissez le formulaire ci-dessous. Vous recevez un numéro de dossier.', 'Fill in the form below. You receive a file number.')], [L('Dépôt du dossier', 'Submit documents'), L('Apportez les pièces au secrétariat dans les 15 jours.', 'Bring the documents to the secretariat within 15 days.')], [L('Test ou entretien', 'Test or interview'), L('Selon la classe demandée, un test de niveau ou un entretien est organisé.', 'Depending on the class, a placement test or interview is held.')], [L('Confirmation et paiement', 'Confirmation and payment'), L('Réglez les frais d\'inscription en ligne ou à la comptabilité.', 'Pay the registration fee online or at the accounts office.')], [L('Rentrée', 'First day'), L('Vos identifiants Espace Parents vous sont remis à la rentrée.', 'Your Parent area login is given on the first day.')]];
  return `${phead('admissions', L('Conditions, pièces à fournir, frais de scolarité et pré-inscription en ligne.', 'Requirements, documents, fees and online pre-registration.'))}
  <section class="sec"><div class="wrap split">
    <div><h2>${L('Conditions d\'inscription', 'Requirements')}</h2><dl class="dl" style="row-gap:1rem">${cond.map(c => `<dt>${c[0]}</dt><dd>${c[1]}</dd>`).join('')}</dl></div>
    <div class="card edge green"><h3>${L('Pièces à fournir', 'Documents to provide')}</h3><ul class="ticks">${pieces.map(p => `<li>${p}</li>`).join('')}</ul><a class="btn btn-sm btn-ghost" href="#/documents" style="margin-top:.8rem">${ic('download')}${L('Fiche d\'inscription à imprimer', 'Printable enrolment form')}</a></div>
  </div></section>
  <section class="sec tint" id="frais"><div class="wrap">
    <div class="sec-h"><div><h2>${L('Frais de scolarité', 'Tuition fees')} ${CONFIG.annee}</h2><p>${L('Payables en trois tranches : 40 % à l\'inscription, 30 % avant le 30 novembre, 30 % avant le 28 février.', 'Payable in three instalments: 40% at enrolment, 30% by 30 November, 30% by 28 February.')}</p></div><a class="btn btn-green" href="#/paiement">${ic('card')}${L('Payer en ligne', 'Pay online')}</a></div>
    <div class="tbl-wrap ph-block"><table><thead><tr><th>${L('Cycle', 'Level')}</th><th class="num">${L('Inscription', 'Registration')}</th><th class="num">${L('Scolarité annuelle', 'Annual tuition')}</th><th class="num">${L('1re tranche', '1st')}</th><th class="num">${L('2e tranche', '2nd')}</th><th class="num">${L('3e tranche', '3rd')}</th></tr></thead>
      <tbody>${FEES.map(f => { const c = CYCLES.find(x => x.id === f.cycle); return `<tr><td><b>${t(c.name)}</b></td><td class="num">${fcfa(f.ins)}</td><td class="num">${fcfa(f.sco)}</td><td class="num">${fcfa(f.sco * .4)}</td><td class="num">${fcfa(f.sco * .3)}</td><td class="num">${fcfa(f.sco * .3)}</td></tr>`; }).join('')}</tbody></table></div>
    <p class="small muted" style="margin-top:.8rem">${L('Montants d\'exemple, à remplacer par la grille officielle. Cantine : 25 000 FCFA par trimestre. Uniforme : 12 000 FCFA la tenue.', 'Sample amounts, to be replaced with the official schedule. Canteen: 25,000 FCFA per term. Uniform: 12,000 FCFA each.')}</p>
  </div></section>
  <section class="sec" id="form"><div class="wrap split rev">
    <div><h2>${L('Calendrier d\'inscription', 'How enrolment works')}</h2><ol class="steps" style="margin-top:1.5rem">${steps.map(s => `<li><div><h4>${s[0]}</h4><p>${s[1]}</p></div></li>`).join('')}</ol></div>
    <div class="card" style="padding:2rem"><h2 style="font-size:1.6rem">${L('Pré-inscription en ligne', 'Online pre-registration')}</h2><p class="muted">${L('Les champs sont obligatoires sauf mention contraire.', 'All fields are required unless marked optional.')}</p>
      <form class="form" data-form="inscription" novalidate>
        <h4 style="margin:.5rem 0 0">${L('L\'élève', 'The student')}</h4>
        <div class="two">${field('ins-nom', L('Nom', 'Last name'), { auto: 'family-name' })}${field('ins-prenom', L('Prénoms', 'First names'), { auto: 'given-name' })}</div>
        <div class="two">${field('ins-naiss', L('Date de naissance', 'Date of birth'), { type: 'date' })}${field('ins-sexe', L('Sexe', 'Sex'), { options: [['F', L('Féminin', 'Female')], ['M', L('Masculin', 'Male')]] })}</div>
        <div class="two">${field('ins-cycle', L('Cycle demandé', 'Level requested'), { options: cycleOpts() })}${field('ins-classe', L('Classe ou filière', 'Class or track'), { ph: L('ex. 6e, 2nde G2', 'e.g. 6e, 2nde G2') })}</div>
        ${field('ins-ecole', L('Établissement précédent', 'Previous school'), { req: false })}
        <h4 style="margin:.5rem 0 0">${L('Le parent ou tuteur', 'Parent or guardian')}</h4>
        <div class="two">${field('ins-parent', L('Nom complet', 'Full name'), { auto: 'name' })}${field('ins-tel', L('Téléphone', 'Phone'), { type: 'tel', auto: 'tel' })}</div>
        ${field('ins-mail', 'E-mail', { type: 'email', req: false, auto: 'email' })}
        <label class="check"><input type="checkbox" required id="ins-ok"> <span>${L('J\'accepte que ces informations soient utilisées par l\'établissement pour traiter la demande d\'inscription.', 'I agree that the school may use this information to process the application.')}</span></label>
        <button class="btn btn-gold btn-block" type="submit">${ic('send')}${L('Envoyer la pré-inscription', 'Send pre-registration')}</button>
      </form></div>
  </div></section>`;
}

/* ===== RÉSULTATS AUX EXAMENS (statistiques uniquement, aucune liste nominative) ===== */
const examRate = rows => { const c = rows.reduce((a, r) => a + r[1], 0), a = rows.reduce((x, r) => x + r[2], 0); return { c, a, p: c ? a / c * 100 : 0 }; };
const pct = n => (S.lang === 'en' ? n.toFixed(1) : n.toFixed(1).replace('.', ',')) + ' %';
const lastSession = () => sessions().pop();
function examTrend(id) {
  return [...EXAM_OLD[id].map((p, i) => ({ y: String(2022 + i), p })), ...sessions().map(y => ({ y, ...examRate(EXAM_RES[y][id]) }))].slice(-5);
}
function trendChart(ex) {
  const data = examTrend(ex.id);
  const tip = d => `${L('Session', 'Session')} ${d.y}${COLON}${pct(d.p)}${d.c ? `, ${d.a} ${L('admis sur', 'passed of')} ${d.c}` : ''}`;
  return `<figure class="chart ph-block" aria-labelledby="chart-t">
    <figcaption id="chart-t"><b>${t(ex.name)}</b> <span class="muted">${L('taux de réussite par session, en %', 'pass rate by session, in %')}</span></figcaption>
    <div class="plot" aria-hidden="true"><div class="grid-y">${[100, 75, 50, 25, 0].map(v => `<span style="bottom:${v}%"><i>${v}</i></span>`).join('')}</div>
      <div class="tcols">${data.map((d, i) => `<button type="button" class="tcol" style="--h:${d.p.toFixed(1)}%" data-tip="${tip(d)}" tabindex="-1"><span class="b"></span>${i === data.length - 1 ? `<span class="val">${pct(d.p)}</span>` : ''}<span class="yr">${d.y}</span></button>`).join('')}</div></div>
    <table class="sr"><caption>${t(ex.name)}, ${L('taux de réussite par session', 'pass rate by session')}</caption><thead><tr><th>${L('Session', 'Session')}</th><th>${L('Taux', 'Rate')}</th></tr></thead><tbody>${data.map(d => `<tr><td>${d.y}</td><td>${pct(d.p)}</td></tr>`).join('')}</tbody></table>
  </figure>`;
}
function pResults() {
  const y = S.resYear || lastSession(), R = EXAM_RES[y];
  const ex = EXAMS.find(e => e.id === (S.resExam || 'bac2'));
  const all = examRate(EXAMS.flatMap(e => R[e.id]));
  const sum = k => EXAMS.flatMap(e => R[e.id]).reduce((a, r) => a + r[k], 0);
  return `${phead('resultats', L('Les résultats de nos élèves aux examens officiels, session après session.', 'How our students perform in national exams, session by session.'))}
  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><h2>${L('Session', 'Session')} ${y}</h2><p>${L('Taux de réussite global de l\'établissement', 'School-wide pass rate')}${COLON}<b>${pct(all.p)}</b>, ${L('soit', 'that is')} ${all.a} ${L('admis sur', 'passed out of')} ${all.c} ${L('candidats', 'candidates')}.</p></div>
      <div class="chips" style="margin:0" role="group" aria-label="${L('Choisir la session', 'Choose a session')}">${sessions().reverse().map(k => `<button class="chip" data-act="resyear" data-v="${k}" aria-pressed="${k === y}">${k}</button>`).join('')}</div></div>
    <div class="exams ph-block">${EXAMS.map(e => { const r = examRate(R[e.id]); return `<article class="card exam"><h3>${t(e.name)}</h3><p class="small muted">${t(e.full)}</p><b class="rate">${pct(r.p)}</b><div class="bar" aria-hidden="true"><i style="width:${r.p.toFixed(1)}%"></i></div><p class="small" style="margin:0">${r.a} ${L('admis sur', 'passed of')} ${r.c} ${L('candidats', 'candidates')}</p></article>`; }).join('')}</div>
  </div></section>
  <section class="sec tint"><div class="wrap">
    <h2>${L('Détail par série et par filière', 'Breakdown by track')}, ${L('session', 'session')} ${y}</h2>
    <div class="tbl-wrap ph-block" style="margin-top:1.5rem"><table><thead><tr><th>${L('Examen', 'Exam')}</th><th>${L('Série ou filière', 'Track')}</th><th class="num">${L('Candidats', 'Candidates')}</th><th class="num">${L('Admis', 'Passed')}</th><th class="num">${L('Taux', 'Rate')}</th><th class="num">${L('Très bien', 'Distinction')}</th><th class="num">${L('Bien', 'Merit')}</th><th class="num">${L('Assez bien', 'Credit')}</th></tr></thead>
      <tbody>${EXAMS.map(e => R[e.id].map((r, i) => `<tr>${i === 0 ? `<td rowspan="${R[e.id].length}"><b>${t(e.name)}</b></td>` : ''}<td>${r[0] || L('Toutes séries', 'All')}</td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td class="num"><b>${pct(r[2] / r[1] * 100)}</b></td><td class="num">${r[3]}</td><td class="num">${r[4]}</td><td class="num">${r[5]}</td></tr>`).join('')).join('')}</tbody>
      <tfoot><tr><td colspan="2">${L('Ensemble de l\'établissement', 'Whole school')}</td><td class="num">${all.c}</td><td class="num">${all.a}</td><td class="num">${pct(all.p)}</td><td class="num">${sum(3)}</td><td class="num">${sum(4)}</td><td class="num">${sum(5)}</td></tr></tfoot></table></div>
    <p class="small muted" style="margin-top:.8rem">${L('Chiffres d\'exemple, à remplacer par les résultats officiels de chaque session.', 'Sample figures, to be replaced with the official results for each session.')}</p>
  </div></section>
  <section class="sec"><div class="wrap split w21">
    <div><h2>${L('Évolution sur cinq sessions', 'Five-session trend')}</h2>
      <div class="chips" style="margin:1rem 0 0" role="group" aria-label="${L('Choisir l\'examen', 'Choose the exam')}">${EXAMS.map(e => `<button class="chip" data-act="resexam" data-v="${e.id}" aria-pressed="${e.id === ex.id}">${t(e.name)}</button>`).join('')}</div>
      ${trendChart(ex)}</div>
    <aside class="stack">
      <div class="card edge"><h3>${L('Les notes de votre enfant', 'Your child\'s grades')}</h3><p class="muted">${L('Notes, bulletins, relevés et attestations de scolarité se consultent dans les espaces sécurisés.', 'Grades, report cards, transcripts and certificates are in the secure areas.')}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap"><a class="btn btn-sm" href="#/parents">${ic('lock')}${L('Espace Parents', 'Parent area')}</a><a class="btn btn-sm btn-ghost" href="#/eleves">${ic('user')}${L('Espace Élèves', 'Student area')}</a></div></div>
      <div class="notice info">${ic('shield')}<span>${L('Aucune liste nominative n\'est publiée sur ce site. Les résultats individuels sont communiqués directement aux familles.', 'No lists of names are published on this site. Individual results are shared directly with families.')}</span></div>
    </aside>
  </div></section>`;
}
function notesTable(st) {
  return `<div class="tbl-wrap"><table><thead><tr><th>${L('Matière', 'Subject')}</th><th class="num">${L('Coef.', 'Coef.')}</th><th class="num">${L('Note / 20', 'Grade / 20')}</th><th>${L('Appréciation', 'Comment')}</th></tr></thead>
    <tbody>${SUBJ[st.cycle].map(s => `<tr><td>${S.lang === 'en' ? s[1] : s[0]}</td><td class="num">${s[2]}</td><td class="num"><span class="grade ${s[3] >= 15 ? 'hi' : s[3] < 10 ? 'lo' : ''}">${fmt(s[3])}</span></td><td>${mention(s[3])}</td></tr>`).join('')}</tbody>
    <tfoot><tr><td>${L('Moyenne générale', 'Overall average')}</td><td></td><td class="num">${fmt(avg(st))}</td><td>${mention(avg(st))}</td></tr></tfoot></table></div>`;
}

/* ===== ACTUALITÉS ===== */
function pNews() {
  const list = [...NEWS].sort((a, b) => b.d.localeCompare(a.d)).filter(n => S.newsCat === 'all' || n.cat === S.newsCat);
  return `${phead('actualites', L('Rentrée, examens, réunions, sorties, stages et concours : toute la vie de l\'établissement.', 'Term dates, exams, meetings, trips, internships and competitions.'), L('Vie scolaire', 'School life'))}
  <section class="sec"><div class="wrap">
    <div class="chips" role="group" aria-label="${L('Filtrer par catégorie', 'Filter by category')}"><button class="chip" data-act="newscat" data-v="all" aria-pressed="${S.newsCat === 'all'}">${L('Toutes', 'All')}</button>${NEWS_CATS.map(c => `<button class="chip" data-act="newscat" data-v="${c[0]}" aria-pressed="${S.newsCat === c[0]}">${t(c[1])}</button>`).join('')}</div>
    ${list.length ? `<div class="grid g3">${list.map(newsCard).join('')}</div>` : `<div class="notice info">${ic('info')}<span>${L('Aucune actualité dans cette catégorie pour le moment. Choisissez « Toutes » pour voir les autres publications.', 'No news in this category yet. Choose “All” to see other posts.')}</span></div>`}
    <p class="small muted" style="margin-top:1.5rem">${L('Articles d\'exemple. L\'établissement publiera ses propres actualités depuis l\'interface d\'administration.', 'Sample articles. The school will publish its own news from the admin interface.')}</p>
  </div></section>
  <section class="sec tint" id="agenda"><div class="wrap split">
    <div>${calendar()}</div>
    <div><h2>${L('Calendrier des événements', 'Events calendar')}</h2><p class="muted">${L('Sélectionnez un jour marqué pour voir le détail.', 'Select a marked day to see details.')}</p><div id="calday">${calDay()}</div></div>
  </div></section>`;
}
function calendar() {
  const now = new Date();
  const nx = upcoming(1)[0], nd = nx ? new Date(nx.d + 'T12:00:00') : now;
  const m = S.calMonth || new Date(nd.getFullYear(), nd.getMonth(), 1);
  S.calMonth = m;
  const first = (m.getDay() + 6) % 7, days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const todayIso = iso(now);
  let cells = '';
  for (let i = 0; i < 42; i++) {
    const d = new Date(m.getFullYear(), m.getMonth(), i - first + 1), k = iso(d), ev = EVENTS.filter(e => e.d === k);
    const out = d.getMonth() !== m.getMonth();
    if (i >= 35 && out && d.getDate() < 8 && i % 7 === 0) break;
    cells += `<button type="button" class="${out ? 'out' : ''} ${k === todayIso ? 'today' : ''} ${ev.length ? 'has ' + ev[0].k : ''}" data-act="calday" data-d="${k}" aria-pressed="${S.calSel === k}" aria-label="${d.getDate()} ${MONTHS[S.lang][d.getMonth()]}${ev.length ? ', ' + ev.map(e => t(e.t)).join(', ') : ''}">${d.getDate()}</button>`;
  }
  return `<div class="cal"><div class="cal-h"><button class="iconbtn" data-act="calnav" data-v="-1" aria-label="${L('Mois précédent', 'Previous month')}">${ic('left')}</button><h3 aria-live="polite">${MONTHS[S.lang][m.getMonth()]} ${m.getFullYear()}</h3><button class="iconbtn" data-act="calnav" data-v="1" aria-label="${L('Mois suivant', 'Next month')}">${ic('right')}</button></div>
    <div class="cal-grid">${DOW[S.lang].map(d => `<span class="dow">${d}</span>`).join('')}${cells}</div>
    <div class="cal-legend"><span><i style="background:var(--gold)"></i>${L('Événement', 'Event')}</span><span><i style="background:var(--red)"></i>${L('Examens', 'Exams')}</span><span><i style="background:var(--green)"></i>${L('Congé', 'Holiday')}</span></div></div>`;
}
function calDay() {
  const m = S.calMonth;
  if (S.calSel) {
    const ev = EVENTS.filter(e => e.d === S.calSel);
    return `<h3 style="margin-top:1rem">${fdate(S.calSel)}</h3>${ev.length ? agenda(ev) : `<p class="muted">${L('Aucun événement ce jour-là.', 'No events that day.')}</p>`}<button class="linkbtn" data-act="calday" data-d="">${L('Voir tout le mois', 'Show whole month')}</button>`;
  }
  const ev = EVENTS.filter(e => { const d = new Date(e.d + 'T12:00:00'); return d.getMonth() === m.getMonth() && d.getFullYear() === m.getFullYear(); });
  return ev.length ? agenda(ev) : `<p class="muted">${L('Aucun événement ce mois-ci. Utilisez les flèches pour changer de mois.', 'No events this month. Use the arrows to change month.')}</p>`;
}

/* ===== GALERIE ===== */
function pGallery() {
  const list = GALLERY.filter(g => S.galCat === 'all' || g.c === S.galCat);
  return `${phead('galerie', L('Les lieux et les moments forts de l\'établissement, en photos et en vidéos.', 'The school\'s spaces and highlights, in photos and videos.'), L('Vie scolaire', 'School life'))}
  <section class="sec"><div class="wrap">
    <div class="chips" role="group" aria-label="${L('Filtrer la galerie', 'Filter gallery')}"><button class="chip" data-act="galcat" data-v="all" aria-pressed="${S.galCat === 'all'}">${L('Tout', 'All')}</button>${GAL_CATS.map(c => `<button class="chip" data-act="galcat" data-v="${c[0]}" aria-pressed="${S.galCat === c[0]}">${t(c[1])}</button>`).join('')}</div>
    <div class="notice" style="margin-bottom:1.5rem">${ic('image')}<span>${L('Dessins provisoires : chaque vignette indique la photo ou la vidéo à fournir.', 'Placeholder drawings: each tile shows which photo or video to provide.')}</span></div>
    <div class="gal">${list.map(g => { const i = GALLERY.indexOf(g); return `<button class="${g.cls && g.cls.includes('wide') ? 'wide' : ''}" data-act="gal" data-i="${i}"><span class="ill ${(g.cls || '').replace('wide', '')}" style="display:grid">${g.img ? `<img src="${g.img}" alt="">` : art(g.art)}${g.video ? `<span class="vid-ico">${ic('play')}${L('Vidéo', 'Video')}</span>` : ''}</span><span class="cap">${t(g.t)}<small>${t((GAL_CATS.find(c => c[0] === g.c) || [0, ''])[1])}</small></span></button>`; }).join('')}</div>
  </div></section>`;
}

/* ===== VIE SCOLAIRE ===== */
function pLife() {
  const rules = [L('Être ponctuel : le portail ferme à 7 h 05.', 'Be on time: the gate closes at 7:05 am.'), L('Porter l\'uniforme complet du lundi au vendredi.', 'Wear full uniform Monday to Friday.'), L('Téléphones éteints et rangés pendant les cours.', 'Phones off and away during lessons.'), L('Respecter les camarades, le personnel et le matériel.', 'Respect classmates, staff and equipment.'), L('Justifier toute absence par écrit dès le retour.', 'Excuse every absence in writing on return.')];
  const clubs = [['sport', 'gold', L('Sport', 'Sport'), L('Football, basket, athlétisme et handball, avec tournois inter-classes.', 'Football, basketball, athletics and handball, with inter-class tournaments.')], ['music', 'lilac', L('Musique', 'Music'), L('Chorale, percussions et préparation des cérémonies.', 'Choir, drums and ceremony preparation.')], ['theatre', '', L('Théâtre', 'Drama'), L('Expression orale, mise en scène et spectacle de fin d\'année.', 'Public speaking, staging and end-of-year show.')], ['computer', 'green', L('Informatique', 'Computing'), L('Bureautique, initiation au code et création de sites.', 'Office tools, coding basics and building websites.')]];
  const acts = [['star', L('Journée culturelle', 'Cultural day'), L('Danses, gastronomie et tenues traditionnelles présentées par chaque classe.', 'Dances, food and traditional dress presented by each class.')], ['award', L('Remise des prix', 'Awards ceremony'), L('Les meilleurs élèves de chaque cycle sont récompensés en fin d\'année.', 'Top students in each level are rewarded at year end.')], ['bus', L('Sorties pédagogiques', 'School trips'), L('Visites d\'entreprises, de musées et de sites naturels.', 'Visits to companies, museums and natural sites.')], ['flask', L('Semaine des sciences', 'Science week'), L('Expériences, exposés et concours entre classes.', 'Experiments, talks and inter-class competitions.')]];
  return `${phead('vie-scolaire', L('Un cadre discipliné et des activités qui donnent envie de venir à l\'école.', 'A disciplined setting and activities that make students want to come to school.'), L('Vie scolaire', 'School life'))}
  <section class="sec"><div class="wrap split">
    <div><h2>${L('Discipline', 'Discipline')}</h2><p class="lead">${L('Le règlement intérieur fixe les règles communes. La surveillance générale veille à leur respect et informe les familles.', 'The school rules set out shared expectations. The discipline office enforces them and keeps families informed.')}</p><a class="btn btn-ghost" href="#/documents">${ic('download')}${L('Télécharger le règlement intérieur', 'Download the school rules')}</a></div>
    <div class="card edge"><h3>${L('L\'essentiel du règlement', 'Key rules')}</h3><ul class="ticks">${rules.map(r => `<li>${r}</li>`).join('')}</ul></div>
  </div></section>
  <section class="sec tint"><div class="wrap"><h2>${L('Clubs', 'Clubs')}</h2><p class="lead" style="margin-bottom:2rem">${L('Le mercredi après-midi et le samedi matin, chaque élève peut rejoindre un club.', 'On Wednesday afternoons and Saturday mornings, every student can join a club.')}</p>
    <div class="grid g4">${clubs.map(c => `<article class="card" style="padding:0;overflow:hidden"><div class="ill ${c[1]}" style="border-radius:0">${art(c[0])}</div><div style="padding:1.2rem 1.3rem 1.4rem"><h3>${c[2]}</h3><p class="muted">${c[3]}</p></div></article>`).join('')}</div></div></section>
  <section class="sec"><div class="wrap"><h2>${L('Activités et temps forts', 'Activities and highlights')}</h2>
    <div class="grid g2" style="margin-top:1.5rem">${acts.map(a => `<div class="list-row" style="border:0"><span class="ico">${ic(a[0])}</span><div class="grow"><h4>${a[1]}</h4><p>${a[2]}</p></div></div>`).join('')}</div></div></section>`;
}

/* ===== ENSEIGNANTS ===== */
function pTeachers() {
  const f = S.tFilter || 'all';
  return `${phead('enseignants', L('Une équipe qualifiée et expérimentée, à l\'écoute des élèves.', 'A qualified, experienced team that listens to students.'), L('L\'école', 'The school'))}
  <section class="sec"><div class="wrap">
    <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;margin-bottom:1.5rem">
      <div class="chips" style="margin:0" role="group" aria-label="${L('Filtrer par cycle', 'Filter by level')}"><button class="chip" data-act="tfilter" data-v="all" aria-pressed="${f === 'all'}">${L('Tous', 'All')}</button>${CYCLES.filter(c => c.id !== 'maternelle').map(c => `<button class="chip" data-act="tfilter" data-v="${c.id}" aria-pressed="${f === c.id}">${t(c.name)}</button>`).join('')}</div>
      <div class="field" style="min-width:260px"><label for="tq" class="sr">${L('Rechercher une matière ou un nom', 'Search a subject or name')}</label><input id="tq" type="search" placeholder="${L('Matière ou nom…', 'Subject or name…')}" value="${esc(S.tQuery || '')}" data-input="tq"></div>
    </div>
    <div class="notice" style="margin-bottom:1.5rem">${ic('info')}<span>${L('Fiches d\'exemple, à remplacer par l\'équipe réelle (photo, nom, matière, diplôme, expérience).', 'Sample profiles, to be replaced by the real team (photo, name, subject, degree, experience).')}</span></div>
    <div class="grid g4" id="tgrid">${teacherCards()}</div>
  </div></section>`;
}
function teacherCards() {
  const q = (S.tQuery || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const list = TEACHERS.filter(x => (S.tFilter || 'all') === 'all' || x.c === S.tFilter).filter(x => !q || (x.n + ' ' + x.m.fr + ' ' + x.m.en).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q));
  if (!list.length) return `<p class="muted" style="grid-column:1/-1">${L('Aucun enseignant ne correspond. Essayez une autre matière ou retirez le filtre.', 'No teacher matches. Try another subject or clear the filter.')}</p>`;
  return list.map(x => { const ini = x.n.split(' ').slice(1).map(w => w[0]).join(''); return `<article class="card person"><div class="av ph-block">${ini}<small>${L('Photo à fournir', 'Photo to provide')}</small></div><h3>${ph(x.n)}</h3><p class="role">${t(x.m)}</p><dl><dt>${L('Diplôme', 'Degree')}</dt><dd>${t(x.dip)}</dd><dt>${L('Expérience', 'Experience')}</dt><dd>${x.xp} ${L('ans', 'years')}</dd></dl></article>`; }).join('');
}

/* ===== ADMINISTRATION ===== */
function pAdmin() {
  return `${phead('administration', L('Les responsables et les services à votre écoute.', 'The people and offices here to help you.'), L('L\'école', 'The school'))}
  <section class="sec"><div class="wrap">
    <div class="grid g3">${ADMIN.map((a, i) => `<article class="card ${i === 0 ? 'edge gold' : ''}"><div style="display:flex;gap:1rem;align-items:center;margin-bottom:1rem"><div class="person"><div class="av ph-block" style="width:72px;height:72px;margin:0;font-size:1.1rem">${ic(a.icon)}</div></div><div><h3 style="margin:0">${t(a.r)}</h3><span class="small muted">${ph(L('Nom à compléter', 'Name to add'))}</span></div></div><p class="muted">${t(a.d)}</p></article>`).join('')}</div>
    <div class="notice info" style="margin-top:2rem">${ic('clock')}<span>${L('Le secrétariat et la comptabilité reçoivent le public', 'The secretariat and accounts office are open')} ${ph(t(CONFIG.horaires).toLowerCase())}.</span></div>
    <p style="margin-top:1.5rem"><a href="#/apropos/organigramme">${L('Voir l\'organigramme', 'See the organisation chart')}</a></p>
  </div></section>`;
}

/* ===== CONTACT ===== */
function pContact() {
  const wa = CONFIG.whatsapp;
  return `${phead('contact', L('Une question sur une inscription, un paiement ou la scolarité ? Écrivez-nous ou appelez-nous.', 'A question about enrolment, payments or schooling? Write or call us.'))}
  <section class="sec"><div class="wrap split rev">
    <div class="stack">
      <a class="card link" href="tel:${CONFIG.tel.replace(/\s/g, '')}"><div style="display:flex;gap:1rem;align-items:center"><span class="ico" style="margin:0">${ic('phone')}</span><div><h3 style="margin:0">${L('Téléphone', 'Phone')}</h3><span>${ph(CONFIG.tel)}</span></div></div></a>
      <a class="card link" href="${wa ? `https://wa.me/${wa}` : '#'}" ${wa ? 'target="_blank" rel="noopener"' : 'data-act="wa-missing"'}><div style="display:flex;gap:1rem;align-items:center"><span class="ico" style="margin:0;background:var(--green-soft);color:var(--green)">${ic('whatsapp')}</span><div><h3 style="margin:0">WhatsApp</h3><span>${wa ? '+' + wa : ph(L('Numéro à configurer', 'Number to configure'))}</span></div></div></a>
      <a class="card link" href="mailto:${CONFIG.email}"><div style="display:flex;gap:1rem;align-items:center"><span class="ico" style="margin:0">${ic('mail')}</span><div><h3 style="margin:0">E-mail</h3><span>${ph(CONFIG.email)}</span></div></div></a>
      <div class="card"><div style="display:flex;gap:1rem;align-items:center"><span class="ico" style="margin:0">${ic('clock')}</span><div><h3 style="margin:0">${L('Horaires d\'accueil', 'Office hours')}</h3><span>${ph(t(CONFIG.horaires))}</span></div></div></div>
    </div>
    <div class="card" style="padding:2rem"><h2 style="font-size:1.6rem">${L('Nous écrire', 'Write to us')}</h2>
      <form class="form" data-form="contact" novalidate>
        <div class="two">${field('ct-nom', L('Nom complet', 'Full name'), { auto: 'name' })}${field('ct-tel', L('Téléphone', 'Phone'), { type: 'tel', auto: 'tel' })}</div>
        ${field('ct-mail', 'E-mail', { type: 'email', auto: 'email' })}
        ${field('ct-sujet', L('Sujet', 'Subject'), { options: [['ins', L('Inscription', 'Enrolment')], ['pay', L('Paiement', 'Payment')], ['res', L('Résultats', 'Results')], ['rdv', L('Prendre rendez-vous', 'Book a meeting')], ['autre', L('Autre', 'Other')]] })}
        ${field('ct-msg', L('Message', 'Message'), { type: 'textarea' })}
        <button class="btn btn-gold btn-block" type="submit">${ic('send')}${L('Envoyer le message', 'Send message')}</button>
      </form></div>
  </div></section>
  <section class="sec tint"><div class="wrap split"><div><h2>${L('Plan d\'accès', 'How to get here')}</h2><p class="lead">${ph(CONFIG.adresse)}</p><p class="muted">${L('Réponses rapides', 'Quick answers')}${COLON}<a href="#/faq">${L('consultez la FAQ', 'see the FAQ')}</a>.</p></div>${mapBlock()}</div></section>`;
}

/* ===== FAQ, PARTENAIRES, RECRUTEMENT, DOCUMENTS ===== */
function pFaq() {
  return `${phead('faq', L('Les réponses aux questions que les familles nous posent le plus souvent.', 'Answers to the questions families ask us most.'))}
  <section class="sec"><div class="wrap narrow"><div class="acc">${FAQ.map(q => `<details><summary>${t(q[0])}</summary><div class="a ${q[2] ? 'ph-block' : ''}">${t(q[1])}</div></details>`).join('')}</div>
    <div class="card" style="margin-top:2.5rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;justify-content:space-between"><div><h3 style="margin:0">${L('Vous ne trouvez pas votre réponse ?', 'Can\'t find your answer?')}</h3><p class="muted" style="margin:0">${L('Le secrétariat vous répond sous 48 heures ouvrées.', 'The secretariat replies within 2 working days.')}</p></div><a class="btn" href="#/contact">${L('Poser une question', 'Ask a question')}</a></div></div></section>`;
}
function pPartners() {
  return `${phead('partenaires', L('Entreprises, institutions et associations qui accompagnent nos élèves.', 'Companies, institutions and associations that support our students.'), L('L\'école', 'The school'))}
  <section class="sec"><div class="wrap"><div class="logos">${partnerLogos(12)}</div>
    <div class="split" style="margin-top:3.5rem"><div><h2>${L('Devenir partenaire', 'Become a partner')}</h2><p class="lead">${L('Accueillez des stagiaires du lycée technique et industriel, soutenez un club ou un prix d\'excellence, ou participez aux journées métiers.', 'Host technical and industrial high school interns, sponsor a club or an excellence award, or take part in career days.')}</p></div>
    <div class="card"><ul class="ticks"><li>${L('Stages de quatre semaines en terminale G1, G2, G3, F1 et F2', 'Four-week internships for final-year students')}</li><li>${L('Interventions de professionnels en classe', 'Professionals speaking in class')}</li><li>${L('Dons de matériel informatique ou d\'atelier', 'Donations of computer or workshop equipment')}</li></ul><a class="btn" href="#/contact" style="margin-top:.8rem">${L('Nous contacter', 'Contact us')}</a></div></div></div></section>`;
}
function pJobs() {
  return `${phead('recrutement', L('Rejoignez une équipe engagée pour la réussite des élèves.', 'Join a team committed to student success.'), L('L\'école', 'The school'))}
  <section class="sec"><div class="wrap"><h2>${L('Offres en cours', 'Current openings')}</h2>
    <div class="card" style="padding:.5rem 1.5rem;margin-top:1.2rem">${JOBS.map((j, i) => `<div class="list-row"><span class="ico">${ic('briefcase')}</span><div class="grow"><h4>${t(j.t)}</h4><p>${t(j.p)}</p><div class="meta" style="margin-top:.35rem"><span class="tag ${i ? '' : 'green'}">${t(j.type)}</span><span>${L('Publiée le', 'Posted')} ${fdate(j.d)}</span></div></div><a class="btn btn-sm btn-ghost" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(L('Candidature', 'Application') + ' : ' + t(j.t))}">${L('Postuler', 'Apply')}</a></div>`).join('')}</div>
    <p class="small muted" style="margin-top:.8rem">${L('Offres d\'exemple.', 'Sample job posts.')}</p>
    <div class="split" style="margin-top:3rem"><div><h2>${L('Candidature spontanée', 'Open application')}</h2><p class="lead">${L('Aucune offre ne vous correspond ? Envoyez votre CV et une lettre de motivation : nous les gardons pour les prochains recrutements.', 'No matching opening? Send your CV and cover letter: we keep them for future hiring.')}</p></div>
      <div class="card"><form class="form" data-form="candidature" novalidate>${field('cv-nom', L('Nom complet', 'Full name'))}${field('cv-poste', L('Poste ou matière souhaités', 'Position or subject'))}${field('cv-mail', 'E-mail', { type: 'email' })}<div class="field"><label for="cv-file">${L('CV (PDF)', 'CV (PDF)')}</label><input id="cv-file" type="file" accept=".pdf,.doc,.docx" required><span class="msg">${L('Joignez votre CV.', 'Attach your CV.')}</span></div><button class="btn btn-gold" type="submit">${ic('send')}${L('Envoyer ma candidature', 'Send my application')}</button></form></div></div>
  </div></section>`;
}
function pDocs() {
  return `${phead('documents', L('Les documents utiles pour l\'année', 'Useful documents for the year') + ' ' + CONFIG.annee + '.')}
  <section class="sec"><div class="wrap narrow"><div class="card" style="padding:.5rem 1.5rem">${DOCS.map(d => `<div class="list-row"><span class="ico">${ic(d.icon)}</span><div class="grow"><h4>${t(d.t)}</h4><p>${d.f}, ${L('mis à jour en septembre 2026', 'updated September 2026')}</p></div><button class="btn btn-sm btn-ghost" data-act="dl" data-name="${esc(t(d.t))}">${ic('download')}${L('Télécharger', 'Download')}</button></div>`).join('')}</div>
  <p class="small muted" style="margin-top:.8rem">${L('Les fichiers PDF seront ajoutés par l\'établissement.', 'PDF files will be added by the school.')}</p></div></section>`;
}
