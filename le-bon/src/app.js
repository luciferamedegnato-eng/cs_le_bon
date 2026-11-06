/* ===== Application : routage, interactions ===== */
ICONS.pause = '<path d="M9 5v14M15 5v14"/>';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const ROUTES = { accueil: pHome, apropos: pAbout, cycles: pCycles, filieres: pFilieres, admissions: pAdmissions, resultats: pResults, actualites: pNews, galerie: pGallery, 'vie-scolaire': pLife, enseignants: pTeachers, administration: pAdmin, parents: pParents, admin: pAdminSpace, eleves: pStudents, paiement: pPay, contact: pContact, faq: pFaq, partenaires: pPartners, recrutement: pJobs, documents: pDocs };
let VH = null; // navigation interne : fonctionne aussi quand l'aperçu bloque les liens #/…
let route = 'accueil', param = '', prevRoute = null, lastFocus = null;

function parse() {
  const h = (VH !== null ? VH : (location.hash || '')).replace(/^#\/?/, '');
  const [r, p] = h.split('/');
  return [ROUTES[r] ? r : 'accueil', p || ''];
}
function renderChrome() {
  $('#hdr').innerHTML = header(route);
  $('#ftr').innerHTML = footer();
  $('#drawer').innerHTML = drawer();
  $('#mock').innerHTML = `<span class="txt"><b>${L('Maquette', 'Mock-up')}</b> <span class="more">${L('contenus à fournir', 'content to provide')}</span></span><span class="sr">${L('Surligner les contenus à fournir', 'Highlight content to provide')}</span><button class="switch" role="switch" aria-checked="${S.review}" data-act="review" aria-label="${L('Surligner les contenus à fournir', 'Highlight content to provide')}"></button>`;
  $('#wa').setAttribute('aria-label', L('Discuter sur WhatsApp', 'Chat on WhatsApp'));
  $('#wapop').innerHTML = `<div class="h"><b>${CONFIG.nom}</b><small>${L('Répond généralement dans la journée', 'Usually replies within a day')}</small></div><div class="b"><div class="bubble">${L('Bonjour ! Une question sur une inscription, un paiement ou la scolarité ? Écrivez-nous.', 'Hello! A question about enrolment, payments or schooling? Message us.')}</div>
    <a class="btn btn-green btn-block" ${CONFIG.whatsapp ? `href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(L('Bonjour, je souhaite un renseignement.', 'Hello, I would like some information.'))}" target="_blank" rel="noopener"` : 'href="#" data-act="wa-missing"'}>${ic('whatsapp')}${L('Ouvrir WhatsApp', 'Open WhatsApp')}</a></div>`;
  $('#search .in input').placeholder = L('Rechercher : inscription, frais, G2, calendrier…', 'Search: enrolment, fees, G2, calendar…');
  $('#search .in input').setAttribute('aria-label', L('Rechercher sur le site', 'Search the site'));
  $('#search kbd').textContent = L('Échap', 'Esc');
  $('.skip').textContent = L('Aller au contenu', 'Skip to content');
}
function render() {
  [route, param] = parse();
  document.documentElement.lang = S.lang;
  renderChrome();
  $('#main').innerHTML = ROUTES[route](param);
  document.title = route === 'accueil' ? `${CONFIG.nom} | ${L('Maternelle, primaire, collège, lycée général et lycée technique et industriel', 'Nursery to technical high school')}` : `${t(TITLES[route])} | ${CONFIG.nom}`;
  const target = param && document.getElementById(param);
  if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  else if (!(route === prevRoute && route === 'cycles')) window.scrollTo(0, 0);
  if (route !== prevRoute) { const h = $('#main h1'); h && h.focus({ preventScroll: true }); }
  prevRoute = route;
  route === 'accueil' ? startSlider() : stopSlider();
}
function rerender() {
  const y = window.scrollY;
  renderChrome();
  $('#main').innerHTML = ROUTES[route](param);
  window.scrollTo(0, y);
  if (route === 'accueil') startSlider();
}

/* ===== Diaporama ===== */
let timer = null, paused = false;
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function startSlider() { stopSlider(); if (paused || reduce()) return; timer = setInterval(() => goSlide(S.slide + 1), 7000); }
function stopSlider() { clearInterval(timer); timer = null; }
function goSlide(i) {
  const n = $$('.slide').length; if (!n) return;
  S.slide = (i + n) % n;
  $$('.slide').forEach((s, k) => s.classList.toggle('on', k === S.slide));
  $$('.stick').forEach((b, k) => b.setAttribute('aria-current', k === S.slide));
  const l = $('#slidelbl'); if (l) l.textContent = slidesData()[S.slide].lbl;
}

/* ===== Notifications (toasts) ===== */
function toast(msg, icon = 'check') {
  const el = document.createElement('div');
  el.className = 'toast'; el.setAttribute('role', 'status');
  el.innerHTML = `${ic(icon)}<span>${msg}</span>`;
  $('#toasts').appendChild(el);
  const all = $$('#toasts .toast'); if (all.length > 3) all.slice(0, all.length - 3).forEach(x => x.remove());
  setTimeout(() => el.remove(), 4200);
}

/* ===== Modale ===== */
function modal(html, wide = false) {
  lastFocus = document.activeElement;
  const m = $('#modal');
  m.innerHTML = `<div class="scrim" data-act="modal-close"></div><div class="box ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" tabindex="-1"><button class="iconbtn x" data-act="modal-close" aria-label="${L('Fermer', 'Close')}">${ic('close')}</button>${html}</div>`;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
  m.querySelector('.box').focus();
}
function closeModal() {
  const m = $('#modal'); if (!m.classList.contains('open')) return;
  m.classList.remove('open'); m.innerHTML = ''; document.body.style.overflow = '';
  lastFocus && lastFocus.focus && lastFocus.focus();
}
function galModal(i) {
  const g = GALLERY[i], cat = t((GAL_CATS.find(c => c[0] === g.c) || [0, ''])[1]);
  modal(`<div class="ill ${(g.cls || '').replace('wide', '')}">${g.img ? `<img src="${g.img}" alt="${esc(t(g.t))}">` : art(g.art)}${g.video ? `<button class="play" data-act="video" aria-label="${L('Lire', 'Play')}" style="position:absolute;width:76px;height:76px;border-radius:50%;background:var(--gold);color:var(--v900);border:0;display:grid;place-items:center;cursor:pointer">${ic('play')}</button>` : ''}</div>
    <div class="inner" style="display:flex;justify-content:space-between;gap:1rem;align-items:center;flex-wrap:wrap"><div><h2 style="font-size:1.4rem;margin:0">${t(g.t)}</h2><span class="muted">${cat}${g.img ? '' : ', ' + (g.video ? L('vidéo à fournir', 'video to provide') : L('photo à fournir', 'photo to provide'))}</span></div>
    <div style="display:flex;gap:.5rem"><button class="iconbtn" data-act="gal" data-i="${(i - 1 + GALLERY.length) % GALLERY.length}" aria-label="${L('Précédente', 'Previous')}">${ic('left')}</button><button class="iconbtn" data-act="gal" data-i="${(i + 1) % GALLERY.length}" aria-label="${L('Suivante', 'Next')}">${ic('right')}</button></div></div>`, true);
}

/* ===== Recherche ===== */
let IDX = null;
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
function buildIndex() {
  const keep = { newsCat: S.newsCat, galCat: S.galCat, tFilter: S.tFilter, tQuery: S.tQuery };
  S.newsCat = 'all'; S.galCat = 'all'; S.tFilter = 'all'; S.tQuery = '';
  IDX = Object.keys(ROUTES).filter(r => !['parents', 'eleves', 'admin'].includes(r)).map(r => {
    const d = document.createElement('div'); d.innerHTML = ROUTES[r]('').replace(/></g, '> <');
    d.querySelectorAll('svg,.crumbs,form,.demo-cred').forEach(e => e.remove());
    return { r, title: t(TITLES[r]), text: d.textContent.replace(/\s+/g, ' ').trim() };
  });
  IDX.push({ r: 'parents', title: t(TITLES.parents), text: L('Connexion sécurisée des parents : notes, bulletins, absences, retards, paiement des frais, avis de l\'établissement.', 'Secure parent sign-in: grades, reports, absences, lateness, fee payment, school notices.') });
  IDX.push({ r: 'eleves', title: t(TITLES.eleves), text: L('Connexion sécurisée des élèves : notes, cours à télécharger, emploi du temps, devoirs, dépôt de travaux.', 'Secure student sign-in: grades, lessons, timetable, homework, hand in work.') });
  Object.assign(S, keep);
  IDX.lang = S.lang;
}
function runSearch(q) {
  if (!IDX || IDX.lang !== S.lang) buildIndex();
  const box = $('#sres'), terms = norm(q).split(/\s+/).filter(w => w.length > 1);
  if (!terms.length) {
    const sug = [['admissions', L('Inscription et frais', 'Enrolment and fees')], ['resultats', L('Résultats aux examens', 'Exam results')], ['filieres', L('Filières G1, G2, G3, F1, F2', 'G1 to F2 tracks')], ['actualites', L('Calendrier des événements', 'Events calendar')], ['parents', L('Espace Parents', 'Parent area')]];
    box.innerHTML = `<div class="empty" style="padding:.6rem .9rem">${L('Suggestions', 'Suggestions')}</div>${sug.map(s => `<a href="#/${s[0]}" data-act="search-close"><b>${s[1]}</b></a>`).join('')}`;
    return;
  }
  const res = IDX.map(e => {
    const nt = norm(e.text), ti = norm(e.title);
    let score = 0, pos = -1;
    for (const w of terms) { const i = nt.indexOf(w); if (i < 0 && !ti.includes(w)) return null; if (ti.includes(w)) score += 10; if (i >= 0) { score += nt.split(w).length - 1; if (pos < 0) pos = i; } }
    let snip = '';
    if (pos >= 0) { const a = Math.max(0, pos - 60); snip = (a ? '…' : '') + e.text.slice(a, pos + 110) + '…'; }
    else snip = e.text.slice(0, 140) + '…';
    let html = esc(snip);
    terms.forEach(w => { const re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').split('').map(ch => { const v = { a: 'aàâä', e: 'eéèêë', i: 'iîï', o: 'oôö', u: 'uùûü', c: 'cç' }[ch]; return v ? `[${v}]` : ch; }).join('') + ')', 'gi'); html = html.replace(re, '<mark>$1</mark>'); });
    return { e, score, html };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);
  box.innerHTML = res.length ? res.map((x, i) => `<a href="#/${x.e.r}" data-act="search-close" class="${i ? '' : 'sel'}"><b>${x.e.title}</b><span>${x.html}</span></a>`).join('')
    : `<div class="empty">${L('Aucun résultat pour', 'No results for')} « ${esc(q)} ». ${L('Essayez un mot plus court ou consultez la', 'Try a shorter word or see the')} <a href="#/faq" data-act="search-close">FAQ</a>.</div>`;
}
function openSearch() { lastFocus = document.activeElement; $('#search').classList.add('open'); const i = $('#sq'); i.value = ''; runSearch(''); setTimeout(() => i.focus(), 10); }
function closeSearch() { $('#search').classList.remove('open'); }

/* ===== Formulaires ===== */
function validate(f) {
  let ok = true, first = null;
  f.querySelectorAll('.field').forEach(fl => {
    const inp = fl.querySelector('input,select,textarea'); if (!inp) return;
    const v = (inp.value || '').trim(); let bad = false;
    if (inp.type === 'file') bad = inp.required && !inp.files.length;
    else if (inp.required && !v) bad = true;
    else if (v && inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) bad = true;
    else if (v && inp.type === 'tel' && v.replace(/\D/g, '').length < 8) bad = true;
    fl.classList.toggle('err', bad); inp.setAttribute('aria-invalid', bad);
    if (bad) { ok = false; first = first || inp; }
  });
  const cb = f.querySelector('input[type=checkbox][required]');
  if (ok && cb && !cb.checked) { ok = false; first = cb; toast(L('Cochez la case de consentement pour envoyer la demande.', 'Tick the consent box to send the request.'), 'alert'); }
  if (first) first.focus();
  return ok;
}
const ref = p => p + '-' + Math.floor(10000 + Math.random() * 89999);
function success(f, title, body) {
  const box = f.closest('.card') || f.parentElement;
  box.innerHTML = `<div class="notice ok" role="status" style="padding:1.4rem">${ic('check')}<div><h3 style="margin:0 0 .3rem">${title}</h3><p style="margin:0">${body}</p><p class="small muted" style="margin:.6rem 0 0">${L('Démonstration : aucune donnée n\'a été envoyée.', 'Demo: no data was sent.')}</p></div></div><button class="btn btn-ghost btn-sm" style="margin-top:1rem" data-act="reload">${L('Remplir un nouveau formulaire', 'Fill in a new form')}</button>`;
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
const FORMS = {
  inscription: f => { const v = id => f.querySelector('#' + id).value.trim(), r = ref('PI');
    INSCRIPTIONS.unshift({ ref: r, d: todayIso(), nom: v('ins-nom').toUpperCase(), prenom: v('ins-prenom'), naiss: v('ins-naiss'), cycle: v('ins-cycle'), classe: v('ins-classe'), parent: v('ins-parent'), tel: v('ins-tel'), st: 'new' });
    success(f, L('Pré-inscription enregistrée', 'Pre-registration received'), `${L('Votre numéro de dossier est', 'Your file number is')} <b>${r}</b>. ${L('Le secrétariat vous contactera pour fixer le dépôt des pièces.', 'The secretariat will contact you to arrange the documents.')}`); },
  contact: f => { const v = id => f.querySelector('#' + id).value.trim();
    MESSAGES.unshift({ id: 'm' + Date.now(), d: todayIso(), nom: v('ct-nom'), mail: v('ct-mail'), tel: v('ct-tel'), sujet: v('ct-sujet'), msg: v('ct-msg'), read: false });
    success(f, L('Message envoyé', 'Message sent'), L('Le secrétariat vous répond sous 48 heures ouvrées.', 'The secretariat will reply within 2 working days.')); },
  candidature: f => success(f, L('Candidature envoyée', 'Application sent'), L('Nous étudions votre dossier et revenons vers vous si un poste correspond.', 'We will review it and contact you if a position matches.')),
  'login-parent': f => login(f, 'parent'),
  'login-eleve': f => login(f, 'eleve'),
  depot: f => { const id = f.querySelector('#dp-dev').value; S.submitted.add(id); S.etab = 'devoirs'; S.depotSel = ''; rerender(); toast(L('Travail déposé. Ton professeur le verra dans son espace.', 'Work handed in. Your teacher will see it in their area.')); },
  pay: f => {
    const st = STUDENTS.find(s => s.mat.toLowerCase() === (S.payMat || '').trim().toLowerCase());
    if (!st) { const fl = f.querySelector('#pay-mat').closest('.field'); fl.classList.add('err'); fl.querySelector('.msg').textContent = L('Matricule introuvable. Exemple : LB-26-0142.', 'Student number not found. Example: LB-26-0142.'); f.querySelector('#pay-mat').focus(); return; }
    if (!S.paySel.size) { toast(L('Cochez au moins une rubrique à régler.', 'Tick at least one item to pay.'), 'alert'); return; }
    const total = payTotal(), card = S.payMethod === 'card';
    S.payCtx = { mat: st.mat, total, card, pref: ref('PAY'), tel: (f.querySelector('#pay-tel') || {}).value || '' };
    const fields = card
      ? `${field('pc-num', L('Numéro de carte', 'Card number'), { value: '4242 4242 4242 4242', hint: L('Carte de démonstration', 'Demo card') })}<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">${field('pc-exp', L('Expiration', 'Expiry'), { value: '12/30' })}${field('pc-cvc', L('Cryptogramme', 'CVC'), { value: '123' })}</div>`
      : `<p class="muted">${L('Une demande de paiement a été envoyée au', 'A payment request was sent to')} <b>${esc(S.payCtx.tel || '90 00 00 00')}</b>. ${L('Saisissez votre code secret pour la valider.', 'Enter your PIN to confirm it.')}</p>${field('pc-pin', L('Code secret Mobile Money', 'Mobile Money PIN'), { type: 'password', value: '1234', hint: L('Code de démonstration : 1234', 'Demo PIN: 1234') })}`;
    modal(`<div class="inner"><h2 style="font-size:1.5rem">${card ? L('Paiement par carte', 'Card payment') : 'Mobile Money'}</h2><form class="form" data-form="paycode" novalidate><p><b>${L('Montant à payer', 'Amount due')}${COLON}${fcfa(total)}</b></p>${fields}<button class="btn btn-green btn-block" type="submit">${ic('lock')}${L('Confirmer le paiement', 'Confirm payment')}</button></form></div>`);
  },
  paycode: f => {
    const c = S.payCtx; if (!c) return;
    const bad = c.card ? f.querySelector('#pc-num').value.replace(/\s/g, '') !== '4242424242424242' : f.querySelector('#pc-pin').value !== '1234';
    if (bad) { let n = f.querySelector('.notice'); if (!n) { n = document.createElement('div'); n.className = 'notice'; n.setAttribute('role', 'alert'); f.prepend(n); } n.innerHTML = `${ic('alert')}<span>${c.card ? L('Carte refusée. Utilisez la carte de démonstration 4242 4242 4242 4242.', 'Card declined. Use the demo card 4242 4242 4242 4242.') : L('Code incorrect. En démonstration, le code est 1234.', 'Wrong PIN. For the demo, the PIN is 1234.')}</span>`; return; }
    const st = STUDENTS.find(s => s.mat === c.mat), total = c.total, pref = c.pref, method = c.card ? L('Carte bancaire', 'Bank card') : 'Mobile Money';
    S.lastReceipt = { pref, st, total, method, items: PAY_ITEMS.filter(p => S.paySel.has(p.id)).map(p => t(p.name)), d: todayIso() };
    modal(`<div class="inner" id="payflow"><h2 style="font-size:1.5rem">${L('Paiement en cours…', 'Processing payment…')}</h2><p class="muted">${L('Merci de patienter quelques secondes.', 'Please wait a few seconds.')}</p><div class="bar"><i style="width:35%;transition:width 1.2s" id="paybar"></i></div></div>`);
    setTimeout(() => { const b = $('#paybar'); if (b) b.style.width = '100%'; }, 50);
    setTimeout(() => {
      PAY_ITEMS.filter(p => S.paySel.has(p.id)).forEach(p => { const fe = PARENT_DATA.fees.find(x => x.k === p.id); if (st.mat === 'LB-26-0142' && fe) fe.paid = Math.min(fe.total, fe.paid + p.amount); PAYMENTS.unshift({ ref: pref, d: todayIso(), mat: st.mat, eleve: `${st.nom} ${st.prenom}`, k: p.id, amt: p.amount, m: c.card ? 'card' : 'momo' }); });
      const pf = $('#payflow'); if (!pf) return;
      pf.innerHTML = `<div class="notice ok" style="margin-bottom:1.2rem">${ic('check')}<div><b>${L('Paiement simulé avec succès', 'Simulated payment successful')}</b><br><span class="small">${L('Démonstration : aucun paiement réel n\'a été effectué. Le paiement apparaît dans l\'Espace Parents et dans l\'Espace Administration.', 'Demo: no real payment was made. It now shows in the Parent and Admin areas.')}</span></div></div>
        <dl class="dl"><dt>${L('Référence', 'Reference')}</dt><dd>${pref}</dd><dt>${L('Élève', 'Student')}</dt><dd>${st.prenom} ${st.nom}, ${st.classe}</dd><dt>${L('Montant', 'Amount')}</dt><dd><b>${fcfa(total)}</b></dd><dt>${L('Moyen', 'Method')}</dt><dd>${method}</dd><dt>${L('Rubriques', 'Items')}</dt><dd>${S.lastReceipt.items.join(', ')}</dd></dl>
        <div style="display:flex;gap:.6rem;margin-top:1.5rem;flex-wrap:wrap"><button class="btn btn-gold" data-act="pay-receipt">${ic('download')}${L('Télécharger le reçu', 'Download receipt')}</button><a class="btn" href="#/parents" data-act="modal-close-go">${L('Voir dans l\'Espace Parents', 'View in Parent area')}</a><button class="btn btn-ghost" data-act="modal-close">${L('Fermer', 'Close')}</button></div>`;
    }, 1500);
  },
  'login-admin': f => login(f, 'admin'),
  'adm-news': f => { const v = id => esc(f.querySelector('#' + id).value.trim()), cat = v('an-cat');
    NEWS.unshift({ id: 'n' + Date.now(), cat, d: v('an-d'), art: CAT_ART[cat] || 'school', t: both(v('an-t')), x: both(v('an-x')), b: both(v('an-b')) });
    rerender(); toast(`${L('Actualité publiée.', 'News published.')} <a href="#/actualites" style="color:inherit">${L('Voir sur le site', 'View on site')}</a>`); },
  'adm-event': f => { const v = id => esc(f.querySelector('#' + id).value.trim());
    EVENTS.push({ d: v('ae-d'), k: v('ae-k'), t: both(v('ae-t')) });
    rerender(); toast(`${L('Date ajoutée à l\'agenda.', 'Date added to the calendar.')} <a href="#/actualites/agenda" style="color:inherit">${L('Voir le calendrier', 'View calendar')}</a>`, 'calendar'); },
  'adm-gal': f => { const file = f.querySelector('#ag-file').files[0];
    GALLERY.unshift({ c: f.querySelector('#ag-c').value, img: URL.createObjectURL(file), t: both(esc(f.querySelector('#ag-t').value.trim())) });
    rerender(); toast(`${L('Photo ajoutée.', 'Photo added.')} <a href="#/galerie" style="color:inherit">${L('Voir la galerie', 'View gallery')}</a>`, 'image'); },
  'adm-results': f => {
    const y = f.dataset.year, R = EXAM_RES[y], errs = [];
    f.querySelectorAll('input.cell').forEach(i => i.removeAttribute('aria-invalid'));
    const val = (e, i, c) => f.querySelector(`[name="r|${e}|${i}|${c}"]`);
    const next = {};
    EXAMS.forEach(e => { next[e.id] = R[e.id].map((r, i) => { const n = [1, 2, 3, 4, 5].map(c => Math.max(0, Math.round(+val(e.id, i, c).value || 0)));
      const lbl = `${t(e.name)}${r[0] ? ' ' + r[0] : ''}`;
      if (n[1] > n[0]) { errs.push(`${lbl}${COLON}${L('plus d\'admis que de candidats', 'more passes than candidates')}`); val(e.id, i, 2).setAttribute('aria-invalid', 'true'); }
      if (n[2] + n[3] + n[4] > n[1]) { errs.push(`${lbl}${COLON}${L('plus de mentions que d\'admis', 'more distinctions than passes')}`); [3, 4, 5].forEach(c => val(e.id, i, c).setAttribute('aria-invalid', 'true')); }
      return [r[0], ...n]; }); });
    if (errs.length) { $('#res-err').innerHTML = `<div class="notice" style="margin-top:1rem">${ic('alert')}<span>${L('À corriger avant d\'enregistrer', 'Fix before saving')}${COLON}${errs.join(' ; ')}.</span></div>`; f.querySelector('[aria-invalid="true"]').focus(); return; }
    EXAM_RES[y] = next; S.resYear = null; rerender();
    toast(`${L('Session', 'Session')} ${y} ${L('enregistrée.', 'saved.')} <a href="#/resultats" style="color:inherit">${L('Voir la page publique', 'View public page')}</a>`, 'chart'); },
  'adm-notes': f => {
    const si = +f.dataset.subj, ins = [...f.querySelectorAll('input.cell')]; let bad = null;
    const vals = ins.map(i => { const n = parseFloat(String(i.value).replace(',', '.')); const ok = i.value !== '' && n >= 0 && n <= 20; i.setAttribute('aria-invalid', !ok); if (!ok && !bad) bad = i; return Math.round(n * 4) / 4; });
    if (bad) { $('#notes-err').innerHTML = `<div class="notice" style="margin:1rem 0">${ic('alert')}<span>${L('Chaque note doit être comprise entre 0 et 20.', 'Each grade must be between 0 and 20.')}</span></div>`; bad.focus(); return; }
    NOTES3A[SUBJ.college[si][0]] = vals; SUBJ.college[si][3] = vals[0];
    rerender(); toast(`${L('Notes enregistrées. Les parents les voient dans leur espace.', 'Grades saved. Parents can see them in their area.')} <a href="#/parents" style="color:inherit">${L('Espace Parents', 'Parent area')}</a>`, 'book'); },
  'adm-avis': f => { const v = id => esc(f.querySelector('#' + id).value.trim()), sel = f.querySelector('#av-to');
    PARENT_DATA.avis.unshift({ d: todayIso(), unread: true, title: both(v('av-t')), body: both(v('av-b')), to: sel.options[sel.selectedIndex].text });
    rerender(); toast(L('Avis envoyé : il apparaît dans la cloche et l\'Espace Parents.', 'Notice sent: it shows in the bell and the Parent area.'), 'bell'); },
  'adm-job': f => { const v = id => esc(f.querySelector('#' + id).value.trim()), ty = { tp: { fr: 'Temps plein', en: 'Full time' }, vac: { fr: 'Vacataire', en: 'Part time' }, stage: { fr: 'Stage', en: 'Internship' } };
    JOBS.unshift({ t: both(v('aj-t')), type: ty[v('aj-type')], d: todayIso(), p: both(v('aj-p')) });
    rerender(); toast(`${L('Offre publiée.', 'Opening published.')} <a href="#/recrutement" style="color:inherit">${L('Voir la page', 'View page')}</a>`, 'briefcase'); },
  'adm-config': f => { const v = id => esc(f.querySelector('#' + id).value.trim());
    CONFIG.tel = v('ac-tel'); CONFIG.whatsapp = v('ac-wa').replace(/\D/g, ''); CONFIG.email = v('ac-mail'); CONFIG.adresse = v('ac-adr');
    CONFIG.horaires[S.lang] = v('ac-hor'); CONFIG.devise[S.lang] = v('ac-dev');
    if (S.pendingLogo) { CONFIG.logo = S.pendingLogo; S.pendingLogo = null; }
    rerender(); toast(L('Réglages enregistrés : regardez l\'en-tête et le pied de page.', 'Settings saved: look at the header and footer.'), 'gear'); }
};
const both = s => ({ fr: s, en: s });
function login(f, kind) {
  const id = f.querySelector(`#${kind}-id`).value.trim(), pw = f.querySelector(`#${kind}-pw`).value;
  if (id !== kind + '.demo' || pw !== 'demo') {
    let n = f.querySelector('.notice'); if (!n) { n = document.createElement('div'); n.className = 'notice'; n.setAttribute('role', 'alert'); f.prepend(n); }
    n.innerHTML = `${ic('alert')}<span>${L('Identifiant ou mot de passe incorrect.', 'Incorrect username or password.')} ${L('En démonstration, utilisez', 'For the demo, use')} <code>${kind}.demo</code> / <code>demo</code>.</span>`;
    return;
  }
  S[kind] = true; if (kind === 'parent') S.ptab = 'notes'; else if (kind === 'eleve') S.etab = 'notes'; else { S.atab = 'dash'; S.arole = S.arole || 'direction'; }
  rerender(); toast(L('Connexion réussie.', 'Signed in.'), 'lock');
}

/* ===== Actions au clic ===== */
const A = {
  skip: () => { const m = $('#main h1') || $('#main'); m.setAttribute('tabindex', '-1'); m.focus(); },
  lang: el => { if (S.lang === el.dataset.v) return; S.lang = el.dataset.v; document.documentElement.lang = S.lang; rerender(); document.title = route === 'accueil' ? CONFIG.nom : `${t(TITLES[route])} | ${CONFIG.nom}`; },
  theme: () => { document.documentElement.classList.toggle('dark'); renderChrome(); try { localStorage.setItem('lb-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); } catch (e) { } },
  review: el => { S.review = !S.review; document.documentElement.classList.toggle('review', S.review); el.setAttribute('aria-checked', S.review); if (S.review) toast(L('Les contenus à fournir sont surlignés en jaune.', 'Content to provide is highlighted in yellow.'), 'edit'); },
  search: openSearch, 'search-close': closeSearch,
  dd: el => { const sub = document.getElementById('sub-' + el.dataset.k), open = !sub.classList.contains('open'); closeMenus(); sub.classList.toggle('open', open); el.setAttribute('aria-expanded', open); },
  bell: el => { const p = $('#bellpop'), open = !p.classList.contains('open'); closeMenus(); p.classList.toggle('open', open); el.setAttribute('aria-expanded', open); },
  drawer: () => { $('#drawer').classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => $('#drawer .panel a') && $('#drawer .panel a').focus(), 30); },
  'drawer-close': () => { $('#drawer').classList.remove('open'); document.body.style.overflow = ''; },
  slide: el => { goSlide(+el.dataset.i); startSlider(); },
  'slide-prev': () => { goSlide(S.slide - 1); startSlider(); },
  'slide-next': () => { goSlide(S.slide + 1); startSlider(); },
  'slide-pause': el => { paused = !paused; paused ? stopSlider() : startSlider(); el.innerHTML = ic(paused ? 'play' : 'pause'); el.setAttribute('aria-label', paused ? L('Reprendre le diaporama', 'Resume slideshow') : L('Mettre en pause le diaporama', 'Pause slideshow')); },
  newscat: el => { S.newsCat = el.dataset.v; rerender(); },
  news: el => { const n = NEWS.find(x => x.id === el.dataset.id); modal(`<div class="ill ${CAT_ILL[n.cat] || ''}">${art(n.art)}${n.img ? IMG(n.img) : ''}</div><div class="inner"><div class="meta"><span class="tag">${catName(n.cat)}</span><span>${ic('calendar')}${fdate(n.d)}</span></div><h2 style="margin-top:.8rem">${t(n.t)}</h2><p class="lead">${t(n.x)}</p><p>${t(n.b)}</p></div>`); },
  galcat: el => { S.galCat = el.dataset.v; rerender(); },
  gal: el => galModal(+el.dataset.i),
  calnav: el => { const m = S.calMonth; S.calMonth = new Date(m.getFullYear(), m.getMonth() + (+el.dataset.v), 1); S.calSel = null; rerender(); },
  calday: el => { S.calSel = el.dataset.d || null; if (S.calSel) { const d = new Date(S.calSel + 'T12:00:00'); if (d.getMonth() !== S.calMonth.getMonth()) S.calMonth = new Date(d.getFullYear(), d.getMonth(), 1); } rerender(); },
  go: el => nav(el.dataset.href),
  doc: el => { const st = STUDENTS.find(s => s.mat === el.dataset.mat); modal(`<div class="inner">${docSheet(el.dataset.doc, st)}<div style="display:flex;gap:.6rem;margin-top:1.2rem;flex-wrap:wrap"><button class="btn" data-act="print">${ic('print')}${L('Imprimer ou enregistrer en PDF', 'Print or save as PDF')}</button><button class="btn btn-ghost" data-act="modal-close">${L('Fermer', 'Close')}</button></div></div>`, true); },
  print: () => window.print(),
  dl: el => toast(`« ${el.dataset.name} » : ${L('fichier à fournir par l\'établissement.', 'file to be provided by the school.')}`, 'download'),
  ptab: el => { S.ptab = el.dataset.v; rerender(); },
  etab: el => { S.etab = el.dataset.v; rerender(); },
  child: el => { S.child = +el.dataset.i; rerender(); },
  logout: el => { S[{ p: 'parent', e: 'eleve', a: 'admin' }[el.dataset.v]] = null; rerender(); toast(L('Vous êtes déconnecté.', 'You are signed out.'), 'logout'); },
  read: el => { PARENT_DATA.avis[+el.dataset.i].unread = false; rerender(); },
  readall: () => { PARENT_DATA.avis.forEach(a => a.unread = false); rerender(); },
  toavis: () => { S.ptab = 'avis'; if (route === 'parents') setTimeout(rerender, 0); },
  todepot: el => { S.depotSel = el.dataset.id; S.etab = 'depot'; rerender(); },
  paymat: el => { S.payMat = el.dataset.mat; const i = $('#pay-mat'); if (i) { i.value = S.payMat; i.closest('.field').classList.remove('err'); } $('#pay-who').innerHTML = payWho(); },
  'pay-receipt': () => { const r = S.lastReceipt; if (!r) return; const txt = `${CONFIG.nom}\nREÇU DE PAIEMENT (DÉMONSTRATION, SANS VALEUR OFFICIELLE)\n\nRéférence : ${r.pref}\nDate : ${fdate(r.d)}\nÉlève : ${r.st.nom} ${r.st.prenom} (${r.st.mat}), ${r.st.classe}\nRubriques : ${r.items.join(', ')}\nMontant : ${fcfa(r.total)}\nMoyen : ${r.method}\n`; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain;charset=utf-8' })); a.download = `recu-${r.pref}.txt`; a.click(); toast(L('Reçu téléchargé.', 'Receipt downloaded.'), 'download'); },
  paychild: el => { S.payMat = el.dataset.mat; S.paySel = new Set(PARENT_DATA.fees.filter(f => f.paid < f.total).map(f => f.k)); },
  video: () => { if (CONFIG.video) { closeModal(); const v = $('#vid'); if (v) v.innerHTML = `<iframe src="${CONFIG.video}?autoplay=1" title="${L('Vidéo de présentation', 'Presentation video')}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`; } else toast(L('Vidéo à fournir : ajoutez son lien YouTube dans la configuration du site.', 'Video to be provided: add its YouTube link in the site settings.'), 'play'); },
  wa: () => { const p = $('#wapop'), o = !p.classList.contains('open'); p.classList.toggle('open', o); $('#wa').setAttribute('aria-expanded', o); },
  'wa-missing': () => toast(L('Numéro WhatsApp à configurer par l\'établissement.', 'WhatsApp number to be set by the school.'), 'whatsapp'),
  'modal-close': closeModal,
  'modal-close-go': () => { closeModal(); S.ptab = 'paiements'; },
  resyear: el => { S.resYear = el.dataset.v; rerender(); },
  resexam: el => { S.resExam = el.dataset.v; rerender(); },
  atab: el => { S.atab = el.dataset.v; rerender(); const d = $('.dash'); if (d && d.getBoundingClientRect().top < 0) d.scrollIntoView({ block: 'start' }); },
  arole: el => { S.arole = el.dataset.v; S.atab = 'dash'; rerender(); toast(`${L('Vous voyez maintenant l\'espace', 'You now see the area as')} « ${t(ROLES[S.arole].l)} ».`, 'users'); },
  insf: el => { S.insF = el.dataset.v; rerender(); },
  msgread: el => { const m = MESSAGES.find(x => x.id === el.dataset.id); if (m) m.read = true; setTimeout(rerender, 0); },
  adel: el => { const k = el.dataset.k, id = el.dataset.id;
    if (k === 'news') NEWS.splice(NEWS.findIndex(n => n.id === id), 1);
    if (k === 'event') EVENTS.splice(+id, 1);
    if (k === 'gal') GALLERY.splice(+id, 1);
    if (k === 'job') JOBS.splice(+id, 1);
    rerender(); toast(L('Élément retiré du site.', 'Item removed from the site.')); },
  aresyear: el => { S.aresYear = el.dataset.v; rerender(); },
  aresnew: () => { const ys = Object.keys(EXAM_RES).sort(), last = EXAM_RES[ys[ys.length - 1]], ny = String(+ys[ys.length - 1] + 1);
    EXAM_RES[ny] = {}; EXAMS.forEach(e => { EXAM_RES[ny][e.id] = last[e.id].map(r => [r[0], 0, 0, 0, 0, 0]); });
    S.aresYear = ny; rerender(); toast(`${L('Session', 'Session')} ${ny} ${L('créée. Elle restera masquée sur le site tant qu\'elle est vide.', 'created. It stays hidden on the site while empty.')}`, 'calendar'); },
  ansubj: el => { S.anSubj = +el.dataset.v; rerender(); },
  payf: el => { S.payF = el.dataset.v; rerender(); },
  paycsv: () => { paymentsCsv(); toast(L('Fichier CSV téléchargé : il s\'ouvre dans Excel.', 'CSV file downloaded: it opens in Excel.'), 'download'); },
  adduser: () => toast(L('Dans la version réelle, la personne reçoit un e-mail d\'invitation pour créer son mot de passe.', 'In the real version, the person gets an invitation email to set a password.'), 'users'),
  tfilter: el => { S.tFilter = el.dataset.v; rerender(); },
  reload: () => rerender()
};
function closeMenus() { $$('.sub.open').forEach(s => s.classList.remove('open')); $$('[aria-expanded="true"][data-act="dd"],[data-act="bell"]').forEach(b => b.setAttribute('aria-expanded', 'false')); }

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!e.target.closest('.menu li, .nav-actions')) closeMenus();
  if (!e.target.closest('#wapop, #wa')) { $('#wapop').classList.remove('open'); }
  if (e.target.id === 'search') closeSearch();
  if (!el) return;
  const fn = A[el.dataset.act]; if (!fn) return;
  if (el.tagName === 'BUTTON' || el.dataset.act === 'wa-missing') e.preventDefault();
  fn(el, e);
});
document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-form]'); if (!f) return;
  e.preventDefault(); submitForm(f);
});
// Certains aperçus (iframe sans « allow-forms ») bloquent l'événement submit : on traite aussi le clic.
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('button[type=submit], button:not([type])');
  const f = b && b.closest('form[data-form]'); if (!f || e.defaultPrevented || b.disabled) return;
  e.preventDefault(); submitForm(f);
}, true);
function submitForm(f) {
  const k = f.dataset.form;
  if (k === 'newsletter') { const i = f.querySelector('input'); if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim())) { toast(L('Saisissez une adresse e-mail valide.', 'Enter a valid email address.'), 'alert'); i.focus(); return; } f.reset(); toast(L('Abonnement enregistré. Vous recevrez la prochaine lettre d\'information.', 'Subscribed. You will receive the next newsletter.'), 'mail'); return; }
  if (!validate(f)) return;
  FORMS[k] && FORMS[k](f);
}
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.input === 'tq') { S.tQuery = el.value; $('#tgrid').innerHTML = teacherCards(); }
  if (el.id === 'pay-mat') { S.payMat = el.value; $('#pay-who').innerHTML = payWho(); el.closest('.field').classList.remove('err'); }
  if (el.id === 'sq') runSearch(el.value);
  if (el.closest('.field.err') && el.value) el.closest('.field').classList.remove('err');
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.input === 'payitem') { el.checked ? S.paySel.add(el.value) : S.paySel.delete(el.value); $('#pay-sum').innerHTML = paySummary(); $('#pay-btn-tot').textContent = fcfa(payTotal()); }
  if (el.dataset.input === 'insst') { const i = INSCRIPTIONS.find(x => x.ref === el.dataset.ref); i.st = el.value; rerender(); toast(`${i.ref}${COLON}${t(INS_ST[i.st][0])}`, 'edit'); }
  if (el.dataset.input === 'agfile' && el.files[0]) { $('#ag-prev').innerHTML = `<img src="${URL.createObjectURL(el.files[0])}" alt="">`; el.closest('.field').classList.remove('err'); }
  if (el.dataset.input === 'aclogo' && el.files[0]) { S.pendingLogo = URL.createObjectURL(el.files[0]); $('#ac-logo-prev').innerHTML = `<img src="${S.pendingLogo}" alt="">`; }
  if (el.dataset.input === 'paymethod') { S.payMethod = el.value; $('#momo-f').hidden = el.value === 'card'; }
});
document.addEventListener('keydown', e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  if (e.key === 'Escape') { closeSearch(); closeModal(); A['drawer-close'](); closeMenus(); $('#wapop').classList.remove('open'); }
  if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); openSearch(); }
  if ($('#search').classList.contains('open') && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
    const items = $$('#sres a'); if (!items.length) return;
    let i = items.findIndex(a => a.classList.contains('sel'));
    if (e.key === 'Enter') { e.preventDefault(); (items[i] || items[0]).click(); return; }
    e.preventDefault(); items.forEach(a => a.classList.remove('sel'));
    i = e.key === 'ArrowDown' ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1);
    items[i].classList.add('sel'); items[i].scrollIntoView({ block: 'nearest' });
  }
  if (e.key === 'Tab' && $('#modal').classList.contains('open')) {
    const f = [...$('#modal .box').querySelectorAll('button,a[href],input,select,textarea')].filter(x => !x.disabled);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});
document.addEventListener('focusin', e => { if (e.target.closest && e.target.closest('.hero')) stopSlider(); });
document.addEventListener('focusout', e => { if (e.target.closest && e.target.closest('.hero') && route === 'accueil') startSlider(); });
document.addEventListener('mouseover', e => { if (e.target.closest && e.target.closest('.hero .slides')) stopSlider(); });
document.addEventListener('mouseout', e => { if (e.target.closest && e.target.closest('.hero .slides') && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.hero .slides')) && route === 'accueil') startSlider(); });
function nav(h) { VH = h; A['drawer-close'](); closeSearch(); closeModal(); render(); try { if (location.hash !== h) location.hash = h; } catch (e) { } }
window.addEventListener('hashchange', () => { if (VH !== null && VH === location.hash) return; VH = null; A['drawer-close'](); closeSearch(); closeModal(); render(); });
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[href^="#/"]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
  e.preventDefault(); nav(a.getAttribute('href'));
}, true);

try { if (localStorage.getItem('lb-theme') === 'dark') document.documentElement.classList.add('dark'); } catch (e) { }
render();

/* Photos : d'abord le dossier local photos/, sinon la copie en ligne du site officiel, sinon rien. */
const PHOTO_REMOTE = 'https://cs-lebon.com/wp-content/uploads/2026/03/';
document.addEventListener('error', e => {
  const i = e.target;
  if (!i || i.tagName !== 'IMG') return;
  const m = (i.getAttribute('src') || '').match(/^photos\/(.+)$/);
  if (m && !i.dataset.tried) { i.dataset.tried = '1'; i.src = PHOTO_REMOTE + m[1]; }
  else i.style.visibility = 'hidden';
}, true);
