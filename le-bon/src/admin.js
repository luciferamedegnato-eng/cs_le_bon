/* =====================================================================
   ESPACE ADMINISTRATION (démonstration)
   Les modifications s'appliquent au site public jusqu'au rechargement de la page.
   La version réelle les enregistrera dans une base de données.
   ===================================================================== */
const ROLES = {
  direction: { l: { fr: 'Direction', en: 'Management' }, mods: ['dash', 'ins', 'msg', 'news', 'agenda', 'gal', 'results', 'notes', 'avis', 'pay', 'jobs', 'users', 'settings'] },
  secretariat: { l: { fr: 'Secrétariat', en: 'Secretariat' }, mods: ['dash', 'ins', 'msg', 'news', 'agenda', 'gal', 'avis', 'jobs'] },
  compta: { l: { fr: 'Comptabilité', en: 'Accounts' }, mods: ['dash', 'pay', 'ins'] },
  enseignant: { l: { fr: 'Enseignant', en: 'Teacher' }, mods: ['dash', 'notes', 'avis'] }
};
const MODS = [
  ['dash', 'home', { fr: 'Tableau de bord', en: 'Dashboard' }],
  ['ins', 'edit', { fr: 'Pré-inscriptions', en: 'Applications' }],
  ['msg', 'mail', { fr: 'Messages', en: 'Messages' }],
  ['news', 'file', { fr: 'Actualités', en: 'News' }],
  ['agenda', 'calendar', { fr: 'Agenda', en: 'Calendar' }],
  ['gal', 'image', { fr: 'Galerie', en: 'Gallery' }],
  ['results', 'chart', { fr: 'Résultats aux examens', en: 'Exam results' }],
  ['notes', 'book', { fr: 'Saisie des notes', en: 'Grade entry' }],
  ['avis', 'bell', { fr: 'Avis aux parents', en: 'Notices to parents' }],
  ['pay', 'card', { fr: 'Paiements', en: 'Payments' }],
  ['jobs', 'briefcase', { fr: 'Recrutement', en: 'Careers' }],
  ['users', 'users', { fr: 'Comptes et rôles', en: 'Accounts and roles' }],
  ['settings', 'gear', { fr: 'Réglages du site', en: 'Site settings' }]
];

/* ----- Données de démonstration (personnes fictives) ----- */
const INSCRIPTIONS = [
  { ref: 'PI-48213', d: '2026-10-29', nom: 'KOFFI', prenom: 'Ama', naiss: '2015-04-12', cycle: 'college', classe: '6e', parent: 'KOFFI Yawa', tel: '+XXX 90 00 00 01', st: 'new' },
  { ref: 'PI-47961', d: '2026-10-27', nom: 'AGBO', prenom: 'Komi', naiss: '2010-09-03', cycle: 'institut', classe: '2nde G2', parent: 'AGBO Dédé', tel: '+XXX 90 00 00 02', st: 'new' },
  { ref: 'PI-47502', d: '2026-10-24', nom: 'TCHALLA', prenom: 'Essi', naiss: '2022-01-20', cycle: 'maternelle', classe: 'Petite section', parent: 'TCHALLA Kodjo', tel: '+XXX 90 00 00 03', st: 'docs' },
  { ref: 'PI-46877', d: '2026-10-18', nom: 'LAWSON', prenom: 'Yao', naiss: '2011-06-30', cycle: 'college', classe: '4e', parent: 'LAWSON Akossiwa', tel: '+XXX 90 00 00 04', st: 'test' },
  { ref: 'PI-46120', d: '2026-10-11', nom: 'ADJOVI', prenom: 'Mawuli', naiss: '2009-02-14', cycle: 'lycee', classe: '2nde C', parent: 'ADJOVI Sena', tel: '+XXX 90 00 00 05', st: 'ok' }
];
const INS_ST = { new: [{ fr: 'Nouvelle', en: 'New' }, 'gold'], docs: [{ fr: 'Dossier complet', en: 'File complete' }, ''], test: [{ fr: 'Test programmé', en: 'Test scheduled' }, ''], ok: [{ fr: 'Acceptée', en: 'Accepted' }, 'green'], ko: [{ fr: 'Refusée', en: 'Declined' }, 'red'] };
const MESSAGES = [
  { id: 'm1', d: '2026-10-30', nom: 'Mme SOSSOU', mail: 'parent1@exemple.com', tel: '+XXX 90 00 00 11', sujet: 'pay', msg: 'Bonjour, est-il possible de régler la deuxième tranche en deux fois ?', read: false },
  { id: 'm2', d: '2026-10-28', nom: 'M. AMEDOME', mail: 'parent2@exemple.com', tel: '+XXX 90 00 00 12', sujet: 'rdv', msg: 'Je souhaite rencontrer le censeur au sujet de l\'orientation de mon fils en seconde.', read: false },
  { id: 'm3', d: '2026-10-25', nom: 'Entreprise partenaire (exemple)', mail: 'rh@exemple.com', tel: '+XXX 22 00 00 13', sujet: 'autre', msg: 'Nous pouvons accueillir deux stagiaires de F1 en février.', read: true }
];
const MSG_SUJ = { ins: { fr: 'Inscription', en: 'Enrolment' }, pay: { fr: 'Paiement', en: 'Payment' }, res: { fr: 'Résultats', en: 'Results' }, rdv: { fr: 'Rendez-vous', en: 'Meeting' }, autre: { fr: 'Autre', en: 'Other' } };
const PAYMENTS = [
  { ref: 'PAY-10452', d: '2026-10-30', mat: 'LB-26-0377', eleve: 'MENSAH Kossi', k: 'sco', amt: 63000, m: 'momo' },
  { ref: 'PAY-10447', d: '2026-10-29', mat: 'LB-26-0518', eleve: 'DOSSOU Afi', k: 'can', amt: 25000, m: 'momo' },
  { ref: 'PAY-10431', d: '2026-10-27', mat: 'LB-26-0142', eleve: 'AKAKPO Esse', k: 'uni', amt: 12000, m: 'card' },
  { ref: 'PAY-10418', d: '2026-10-24', mat: 'LB-26-0063', eleve: 'AKAKPO Kafui', k: 'sco', amt: 40500, m: 'caisse' },
  { ref: 'PAY-10402', d: '2026-10-21', mat: 'LB-26-0518', eleve: 'DOSSOU Afi', k: 'sco', amt: 55500, m: 'momo' },
  { ref: 'PAY-10389', d: '2026-10-15', mat: 'LB-26-0377', eleve: 'MENSAH Kossi', k: 'sor', amt: 5000, m: 'momo' },
  { ref: 'PAY-10377', d: '2026-10-09', mat: 'LB-26-0142', eleve: 'AKAKPO Esse', k: 'can', amt: 25000, m: 'caisse' },
  { ref: 'PAY-10350', d: '2026-09-28', mat: 'LB-26-0142', eleve: 'AKAKPO Esse', k: 'sco', amt: 66000, m: 'momo' }
];
const METHODS = { momo: { fr: 'Mobile Money', en: 'Mobile Money' }, card: { fr: 'Carte bancaire', en: 'Bank card' }, caisse: { fr: 'Caisse', en: 'Cash desk' } };
const USERS = [
  { n: CONFIG.dg, r: 'direction', mail: 'direction@lebon.example', last: '2026-10-31' },
  { n: { fr: 'Secrétariat (compte du service)', en: 'Secretariat (office account)' }, r: 'secretariat', mail: 'secretariat@lebon.example', last: '2026-10-31' },
  { n: { fr: 'Comptabilité (compte du service)', en: 'Accounts (office account)' }, r: 'compta', mail: 'compta@lebon.example', last: '2026-10-30' },
  { n: 'M. Yao SOSSOU', r: 'enseignant', mail: 'y.sossou@lebon.example', last: '2026-10-29' },
  { n: 'Mme Ablavi KOUDJO', r: 'enseignant', mail: 'a.koudjo@lebon.example', last: '2026-10-28' }
];
const CLASS3A = ['AKAKPO Esse', 'ADJO Kossiwa', 'BANKOLE Koffi', 'EDOH Akouvi', 'KPODAR Elom', 'TOSSOU Yawo'];
const NOTES3A = {};
const notes3A = i => { const s = SUBJ.college[i]; if (!NOTES3A[s[0]]) { const base = [12, 9.5, 14, 11, 16.5]; NOTES3A[s[0]] = [s[3], ...base.map((_, k) => base[(k + i) % base.length])]; } return NOTES3A[s[0]]; };
const CAT_ART = { rentree: 'school', examens: 'exam', reunions: 'meeting', sorties: 'trip', conseils: 'meeting', stages: 'internship', concours: 'trophy' };
const todayIso = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const sessions = () => Object.keys(EXAM_RES).filter(y => EXAMS.some(e => EXAM_RES[y][e.id].some(r => r[1] > 0))).sort();

/* ----- Page ----- */
function pAdminSpace() {
  const head = phead('admin', L('Gérez le site et la vie de l\'établissement : inscriptions, messages, publications, notes et paiements.', 'Manage the website and school life: applications, messages, posts, grades and payments.'));
  if (!S.admin) return `${head}<section class="sec"><div class="wrap"><div class="auth">${loginCard('admin')}</div></div></section>`;
  S.arole = ROLES[S.arole] ? S.arole : 'direction';
  const role = ROLES[S.arole], mods = MODS.filter(m => role.mods.includes(m[0]));
  if (!role.mods.includes(S.atab)) S.atab = 'dash';
  const counts = { ins: INSCRIPTIONS.filter(i => i.st === 'new').length, msg: MESSAGES.filter(m => !m.read).length };
  const panel = ({ dash: aDash, ins: aIns, msg: aMsg, news: aNews, agenda: aAgenda, gal: aGal, results: aResults, notes: aNotes, avis: aAvis, pay: aPay, jobs: aJobs, users: aUsers, settings: aSettings })[S.atab]();
  return `${head}<section class="sec"><div class="wrap">
    <div class="adm-top"><div class="notice">${ic('info')}<span><b>${L('Démonstration', 'Demo')}</b>${COLON}${L('vos modifications s\'affichent tout de suite sur le site public, jusqu\'au rechargement de la page. La version réelle les enregistrera dans une base de données.', 'your changes appear right away on the public site, until the page is reloaded. The real version will save them in a database.')}</span></div>
      <div class="chips" style="margin:0" role="group" aria-label="${L('Profil de démonstration', 'Demo profile')}"><span class="small muted" style="align-self:center">${L('Voir en tant que', 'View as')}</span>${Object.keys(ROLES).map(k => `<button class="chip" data-act="arole" data-v="${k}" aria-pressed="${k === S.arole}">${t(ROLES[k].l)}</button>`).join('')}</div></div>
    <div class="dash">${sideMenu('a', mods.map(m => [m[0], m[1], t(m[2]), counts[m[0]] || 0]), S.atab, t(ROLES[S.arole].l), L('Compte personnel', 'Staff account'), t(ROLES[S.arole].l).slice(0, 2).toUpperCase())}
      <div class="adm">${panel}</div></div>
  </div></section>`;
}
const can = m => ROLES[S.arole].mods.includes(m);
const aHead = (title, sub, action = '') => `<div class="sec-h" style="margin-bottom:1.25rem"><div><h2 style="font-size:1.5rem">${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${action}</div>`;
const insTag = st => `<span class="tag ${INS_ST[st][1]}">${t(INS_ST[st][0])}</span>`;
const cycName = id => t((CYCLES.find(c => c.id === id) || { name: id }).name);

function aDash() {
  const mon = todayIso().slice(0, 7);
  const cash = PAYMENTS.filter(p => p.d.startsWith(mon)).reduce((s, p) => s + p.amt, 0);
  const kp = [
    can('ins') && [L('Pré-inscriptions à traiter', 'Applications to process'), INSCRIPTIONS.filter(i => i.st === 'new').length, 'ins'],
    can('msg') && [L('Messages non lus', 'Unread messages'), MESSAGES.filter(m => !m.read).length, 'msg'],
    can('pay') && [L('Encaissé ce mois-ci', 'Collected this month'), fcfa(cash), 'pay'],
    can('news') && [L('Actualités publiées', 'News published'), NEWS.length, 'news'],
    can('notes') && [L('Notes à saisir', 'Grades to enter'), L('3e A, 1er trimestre', '3e A, 1st term'), 'notes'],
    can('avis') && [L('Avis envoyés', 'Notices sent'), PARENT_DATA.avis.length, 'avis']
  ].filter(Boolean).slice(0, 4);
  const quick = [can('news') && ['news', 'file', L('Publier une actualité', 'Post news')], can('avis') && ['avis', 'bell', L('Envoyer un avis', 'Send a notice')], can('notes') && ['notes', 'book', L('Saisir des notes', 'Enter grades')], can('gal') && ['gal', 'image', L('Ajouter une photo', 'Add a photo')], can('pay') && ['pay', 'download', L('Exporter les paiements', 'Export payments')]].filter(Boolean);
  return `${aHead(L('Tableau de bord', 'Dashboard'), L('Bonjour. Voici ce qui demande votre attention aujourd\'hui.', 'Hello. Here is what needs your attention today.'))}
    <div class="kpis">${kp.map(k => `<button class="kpi kpi-btn" data-act="atab" data-v="${k[2]}"><span>${k[0]}</span><b style="${String(k[1]).length > 8 ? 'font-size:1.3rem' : ''}">${k[1]}</b></button>`).join('')}</div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem">${quick.map(q => `<button class="btn btn-sm btn-ghost" data-act="atab" data-v="${q[0]}">${ic(q[1])}${q[2]}</button>`).join('')}</div>
    <div class="grid g2">
      ${can('ins') ? `<div class="card"><h3>${L('Dernières pré-inscriptions', 'Latest applications')}</h3>${INSCRIPTIONS.slice(0, 4).map(i => `<div class="list-row"><div class="grow"><h4>${i.nom} ${i.prenom}</h4><p>${cycName(i.cycle)}, ${i.classe}, ${fdate(i.d)}</p></div>${insTag(i.st)}</div>`).join('')}</div>` : ''}
      ${can('notes') && !can('ins') ? `<div class="card"><h3>${L('Mes classes', 'My classes')}</h3><div class="list-row"><div class="grow"><h4>3e A</h4><p>${CLASS3A.length} ${L('élèves (démonstration)', 'students (demo)')}</p></div><button class="btn btn-sm" data-act="atab" data-v="notes">${L('Saisir les notes', 'Enter grades')}</button></div></div>` : ''}
      ${can('pay') && !can('ins') ? '' : ''}
      <div class="card"><h3>${L('Prochains rendez-vous', 'Coming up')}</h3>${agenda(upcoming(4))}</div>
    </div>`;
}

function aIns() {
  const f = S.insF || 'all', list = INSCRIPTIONS.filter(i => f === 'all' || i.st === f);
  return `${aHead(L('Pré-inscriptions', 'Applications'), L('Demandes reçues par le formulaire du site. Changez le statut au fil du dossier.', 'Requests received from the website form. Update the status as the file progresses.'))}
    <div class="chips" role="group" aria-label="${L('Filtrer par statut', 'Filter by status')}"><button class="chip" data-act="insf" data-v="all" aria-pressed="${f === 'all'}">${L('Toutes', 'All')} (${INSCRIPTIONS.length})</button>${Object.keys(INS_ST).map(k => `<button class="chip" data-act="insf" data-v="${k}" aria-pressed="${f === k}">${t(INS_ST[k][0])} (${INSCRIPTIONS.filter(i => i.st === k).length})</button>`).join('')}</div>
    ${list.length ? `<div class="tbl-wrap"><table><thead><tr><th>${L('Dossier', 'File')}</th><th>${L('Élève', 'Student')}</th><th>${L('Classe demandée', 'Class')}</th><th>${L('Parent', 'Parent')}</th><th>${L('Statut', 'Status')}</th></tr></thead><tbody>
      ${list.map(i => `<tr><td><b>${i.ref}</b><br><span class="small muted">${fdate(i.d)}</span></td><td>${esc(i.nom)} ${esc(i.prenom)}<br><span class="small muted">${L('né(e) le', 'born')} ${fdate(i.naiss)}</span></td><td>${cycName(i.cycle)}<br><span class="small muted">${esc(i.classe)}</span></td><td>${esc(i.parent)}<br><a class="small" href="tel:${i.tel.replace(/\s/g, '')}">${esc(i.tel)}</a></td>
        <td><label class="sr" for="st-${i.ref}">${L('Statut du dossier', 'File status')} ${i.ref}</label><select id="st-${i.ref}" class="st-sel" data-input="insst" data-ref="${i.ref}">${Object.keys(INS_ST).map(k => `<option value="${k}" ${k === i.st ? 'selected' : ''}>${t(INS_ST[k][0])}</option>`).join('')}</select></td></tr>`).join('')}
    </tbody></table></div>` : `<div class="notice info">${ic('info')}<span>${L('Aucun dossier avec ce statut.', 'No file with this status.')}</span></div>`}
    <p class="small muted" style="margin-top:.8rem">${L('Astuce : remplissez le formulaire de pré-inscription du site, le dossier apparaît ici.', 'Tip: fill in the website\'s pre-registration form and the file appears here.')} <a href="#/admissions/form">${L('Ouvrir le formulaire', 'Open the form')}</a></p>`;
}

function aMsg() {
  return `${aHead(L('Messages', 'Messages'), L('Messages envoyés depuis la page Contact.', 'Messages sent from the Contact page.'))}
    <div class="card" style="padding:.5rem 1.5rem">${MESSAGES.map(m => `<div class="list-row" style="align-items:flex-start">${m.read ? '<span style="width:9px"></span>' : `<span class="unread" style="margin-top:.5rem" aria-label="${L('Non lu', 'Unread')}"></span>`}
      <div class="grow"><h4>${esc(m.nom)} <span class="tag" style="margin-left:.3rem">${t(MSG_SUJ[m.sujet] || MSG_SUJ.autre)}</span></h4><p style="color:var(--ink);margin:.3rem 0">${esc(m.msg)}</p><p>${fdate(m.d)}, <a href="mailto:${esc(m.mail)}">${esc(m.mail)}</a>${m.tel ? `, ${esc(m.tel)}` : ''}</p></div>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;justify-content:flex-end"><a class="btn btn-sm" href="mailto:${esc(m.mail)}?subject=${encodeURIComponent(CONFIG.nom)}" data-act="msgread" data-id="${m.id}">${ic('send')}${L('Répondre', 'Reply')}</a>${m.read ? '' : `<button class="btn btn-sm btn-ghost" data-act="msgread" data-id="${m.id}">${L('Marquer comme lu', 'Mark as read')}</button>`}</div></div>`).join('')}</div>`;
}

function aNews() {
  return `${aHead(L('Actualités', 'News'), L('Ce que vous publiez ici apparaît sur la page Actualités et sur l\'accueil.', 'What you post here appears on the News page and the homepage.'))}
    <div class="split" style="gap:2rem">
      <div class="card" style="padding:1.75rem"><h3>${L('Nouvelle actualité', 'New post')}</h3><form class="form" data-form="adm-news" novalidate>
        ${field('an-t', L('Titre', 'Title'))}
        <div class="two">${field('an-cat', L('Catégorie', 'Category'), { options: NEWS_CATS.map(c => [c[0], t(c[1])]) })}${field('an-d', L('Date', 'Date'), { type: 'date', value: todayIso() })}</div>
        ${field('an-x', L('Résumé', 'Summary'), { hint: L('Une ou deux phrases, affichées sur la carte.', 'One or two sentences, shown on the card.') })}
        ${field('an-b', L('Texte complet', 'Full text'), { type: 'textarea' })}
        <button class="btn btn-gold" type="submit">${ic('send')}${L('Publier', 'Publish')}</button></form></div>
      <div><h3>${L('Publiées', 'Published')} (${NEWS.length})</h3><div class="card" style="padding:.25rem 1.25rem">${[...NEWS].sort((a, b) => b.d.localeCompare(a.d)).map(n => `<div class="list-row"><div class="grow"><h4>${t(n.t)}</h4><p>${catName(n.cat)}, ${fdate(n.d)}</p></div><button class="iconbtn" data-act="adel" data-k="news" data-id="${n.id}" aria-label="${L('Supprimer', 'Delete')} : ${t(n.t)}">${ic('close')}</button></div>`).join('')}</div></div>
    </div>`;
}

function aAgenda() {
  const list = [...EVENTS].sort((a, b) => a.d.localeCompare(b.d));
  const kinds = [['ev', L('Événement', 'Event')], ['exam', L('Examens', 'Exams')], ['hol', L('Congé', 'Holiday')]];
  return `${aHead(L('Agenda', 'Calendar'), L('Les dates ajoutées s\'affichent dans le calendrier du site et sur l\'accueil.', 'Dates you add show in the website calendar and on the homepage.'))}
    <div class="split" style="gap:2rem">
      <div class="card" style="padding:1.75rem"><h3>${L('Ajouter une date', 'Add a date')}</h3><form class="form" data-form="adm-event" novalidate>
        ${field('ae-t', L('Intitulé', 'Title'), { ph: L('ex. Journée portes ouvertes', 'e.g. Open day') })}
        <div class="two">${field('ae-d', L('Date', 'Date'), { type: 'date' })}${field('ae-k', L('Type', 'Type'), { options: kinds, value: 'ev' })}</div>
        <button class="btn btn-gold" type="submit">${ic('calendar')}${L('Ajouter à l\'agenda', 'Add to calendar')}</button></form></div>
      <div><h3>${L('Dates prévues', 'Scheduled')} (${list.length})</h3><div class="card" style="padding:.25rem 1.25rem">${list.map(e => `<div class="list-row"><div class="grow"><h4>${t(e.t)}</h4><p>${fdate(e.d)}, ${kinds.find(k => k[0] === e.k)[1]}</p></div><button class="iconbtn" data-act="adel" data-k="event" data-id="${EVENTS.indexOf(e)}" aria-label="${L('Supprimer', 'Delete')}">${ic('close')}</button></div>`).join('')}</div></div>
    </div>`;
}

function aGal() {
  return `${aHead(L('Galerie', 'Gallery'), L('Ajoutez les vraies photos de l\'établissement : elles remplacent les dessins provisoires.', 'Add real photos of the school: they replace the placeholder drawings.'))}
    <div class="card" style="padding:1.75rem;margin-bottom:2rem"><form class="form" data-form="adm-gal" novalidate><div class="two">
      <div class="stack">${field('ag-t', L('Légende', 'Caption'), { ph: L('ex. Cours de chimie en 1re D', 'e.g. Chemistry lesson, 1re D') })}${field('ag-c', L('Rubrique', 'Category'), { options: GAL_CATS.filter(c => c[0] !== 'videos').map(c => [c[0], t(c[1])]) })}
        <div class="field"><label for="ag-file">${L('Photo', 'Photo')}</label><span class="hint">${L('JPG ou PNG. Dans la version réelle, elle sera compressée automatiquement.', 'JPG or PNG. In the real version it will be compressed automatically.')}</span><input id="ag-file" type="file" accept="image/*" required data-input="agfile"><span class="msg">${L('Choisissez une photo.', 'Choose a photo.')}</span></div>
        <button class="btn btn-gold" type="submit">${ic('upload')}${L('Ajouter à la galerie', 'Add to gallery')}</button></div>
      <div class="ill" id="ag-prev" style="aspect-ratio:4/3">${art('library')}<span class="note">${L('Aperçu', 'Preview')}</span></div></div></form></div>
    <h3>${L('Éléments de la galerie', 'Gallery items')} (${GALLERY.length})</h3>
    <div class="thumbs">${GALLERY.map((g, i) => `<div class="thumb"><div class="ill ${(g.cls || '').replace('wide', '')}">${g.img ? `<img src="${g.img}" alt="">` : art(g.art)}</div><div class="cap"><span>${t(g.t)}</span><button class="iconbtn" data-act="adel" data-k="gal" data-id="${i}" aria-label="${L('Retirer', 'Remove')} : ${t(g.t)}">${ic('close')}</button></div></div>`).join('')}</div>`;
}

function aResults() {
  const ys = Object.keys(EXAM_RES).sort(), y = S.aresYear && EXAM_RES[S.aresYear] ? S.aresYear : ys[ys.length - 1], next = String(+ys[ys.length - 1] + 1);
  const R = EXAM_RES[y];
  const inp = (e, i, c, v) => `<input class="cell" type="number" min="0" step="1" value="${v}" name="r|${e}|${i}|${c}" aria-label="${e} ${i} ${c}">`;
  return `${aHead(L('Résultats aux examens', 'Exam results'), L('Saisissez les chiffres de chaque session. Aucun nom d\'élève n\'est publié.', 'Enter the figures for each session. No student names are published.'), `<button class="btn btn-sm btn-ghost" data-act="aresnew">${ic('calendar')}${L('Préparer la session', 'Prepare session')} ${next}</button>`)}
    <div class="chips" role="group" aria-label="${L('Session', 'Session')}">${ys.map(k => `<button class="chip" data-act="aresyear" data-v="${k}" aria-pressed="${k === y}">${k}</button>`).join('')}</div>
    <form data-form="adm-results" data-year="${y}" novalidate><div class="tbl-wrap"><table><thead><tr><th>${L('Examen', 'Exam')}</th><th>${L('Série', 'Track')}</th><th class="num">${L('Candidats', 'Candidates')}</th><th class="num">${L('Admis', 'Passed')}</th><th class="num">${L('Très bien', 'Distinction')}</th><th class="num">${L('Bien', 'Merit')}</th><th class="num">${L('Assez bien', 'Credit')}</th></tr></thead><tbody>
      ${EXAMS.map(e => R[e.id].map((r, i) => `<tr>${i === 0 ? `<td rowspan="${R[e.id].length}"><b>${t(e.name)}</b></td>` : ''}<td>${r[0] || L('Toutes', 'All')}</td>${[1, 2, 3, 4, 5].map(c => `<td class="num">${inp(e.id, i, c, r[c])}</td>`).join('')}</tr>`).join('')).join('')}
    </tbody></table></div>
    <div id="res-err" role="alert"></div>
    <button class="btn btn-gold" type="submit" style="margin-top:1rem">${ic('check')}${L('Enregistrer la session', 'Save session')} ${y}</button> <a href="#/resultats" style="margin-left:1rem">${L('Voir la page publique', 'View public page')}</a></form>`;
}

function aNotes() {
  const si = S.anSubj || 0, s = SUBJ.college[si], notes = notes3A(si);
  return `${aHead(L('Saisie des notes', 'Grade entry'), L('Classe de 3e A, composition du 1er trimestre. Les parents voient les notes dès l\'enregistrement.', 'Class 3e A, first-term exam. Parents see the grades as soon as you save.'))}
    <div class="chips" role="group" aria-label="${L('Matière', 'Subject')}">${SUBJ.college.map((x, i) => `<button class="chip" data-act="ansubj" data-v="${i}" aria-pressed="${i === si}">${S.lang === 'en' ? x[1] : x[0]}</button>`).join('')}</div>
    <form data-form="adm-notes" data-subj="${si}" novalidate><div class="tbl-wrap" style="max-width:560px"><table><thead><tr><th>${L('Élève', 'Student')}</th><th class="num">${L('Note / 20', 'Grade / 20')}</th></tr></thead><tbody>
      ${CLASS3A.map((n, i) => `<tr><td>${n}${i === 0 ? ` <span class="tag" style="margin-left:.3rem">${L('compte démo', 'demo account')}</span>` : ''}</td><td class="num"><input class="cell" type="number" min="0" max="20" step="0.25" name="n${i}" value="${notes[i]}" aria-label="${L('Note de', 'Grade for')} ${n}"></td></tr>`).join('')}
    </tbody></table></div><p class="small muted">${L('Coefficient', 'Coefficient')} ${s[2]}. ${L('Notes de 0 à 20, au quart de point.', 'Grades from 0 to 20, in quarter points.')}</p>
    <div id="notes-err" role="alert"></div>
    <button class="btn btn-gold" type="submit">${ic('check')}${L('Enregistrer les notes', 'Save grades')}</button></form>`;
}

function aAvis() {
  return `${aHead(L('Avis aux parents', 'Notices to parents'), L('L\'avis arrive dans l\'Espace Parents et dans la cloche de notifications.', 'The notice reaches the Parent area and the notification bell.'))}
    <div class="split" style="gap:2rem">
      <div class="card" style="padding:1.75rem"><h3>${L('Nouvel avis', 'New notice')}</h3><form class="form" data-form="adm-avis" novalidate>
        ${field('av-to', L('Destinataires', 'Recipients'), { options: [['all', L('Tous les parents', 'All parents')], ['3eA', L('Parents de la 3e A', 'Parents of 3e A')], ['tleg2', L('Parents de la Tle G2', 'Parents of Tle G2')]], value: 'all' })}
        ${field('av-t', L('Objet', 'Subject'))}
        ${field('av-b', L('Message', 'Message'), { type: 'textarea' })}
        <label class="check"><input type="checkbox" id="av-sms" checked> <span>${L('Prévenir aussi par SMS', 'Also notify by SMS')} <span class="muted small">(${L('version réelle', 'real version')})</span></span></label>
        <button class="btn btn-gold" type="submit">${ic('send')}${L('Envoyer l\'avis', 'Send notice')}</button></form></div>
      <div><h3>${L('Avis envoyés', 'Sent notices')}</h3><div class="card" style="padding:.25rem 1.25rem">${PARENT_DATA.avis.map(a => `<div class="list-row"><div class="grow"><h4>${t(a.title)}</h4><p>${fdate(a.d)}${a.to ? ', ' + esc(a.to) : ''}</p></div></div>`).join('')}</div></div>
    </div>`;
}

function aPay() {
  const f = S.payF || 'all', list = PAYMENTS.filter(p => f === 'all' || p.k === f), tot = list.reduce((s, p) => s + p.amt, 0);
  const byM = Object.keys(METHODS).map(m => [m, list.filter(p => p.m === m).reduce((s, p) => s + p.amt, 0)]);
  return `${aHead(L('Paiements', 'Payments'), L('Tous les encaissements : en ligne et à la caisse.', 'All payments received: online and at the cash desk.'), `<button class="btn btn-sm" data-act="paycsv">${ic('download')}${L('Exporter pour Excel (CSV)', 'Export for Excel (CSV)')}</button>`)}
    <div class="kpis"><div class="kpi"><span>${L('Total affiché', 'Total shown')}</span><b style="font-size:1.35rem">${fcfa(tot)}</b><small>${list.length} ${L('paiements', 'payments')}</small></div>${byM.map(m => `<div class="kpi"><span>${t(METHODS[m[0]])}</span><b style="font-size:1.35rem">${fcfa(m[1])}</b></div>`).join('')}</div>
    <div class="chips" role="group" aria-label="${L('Filtrer par rubrique', 'Filter by item')}"><button class="chip" data-act="payf" data-v="all" aria-pressed="${f === 'all'}">${L('Toutes les rubriques', 'All items')}</button>${PAY_ITEMS.map(p => `<button class="chip" data-act="payf" data-v="${p.id}" aria-pressed="${f === p.id}">${t(p.name)}</button>`).join('')}</div>
    <div class="tbl-wrap"><table><thead><tr><th>${L('Date', 'Date')}</th><th>${L('Référence', 'Reference')}</th><th>${L('Élève', 'Student')}</th><th>${L('Rubrique', 'Item')}</th><th>${L('Moyen', 'Method')}</th><th class="num">${L('Montant', 'Amount')}</th></tr></thead><tbody>
      ${list.map(p => `<tr><td>${fdate(p.d)}</td><td>${p.ref}</td><td>${esc(p.eleve)}<br><span class="small muted">${p.mat}</span></td><td>${t(PAY_ITEMS.find(x => x.id === p.k).name)}</td><td>${t(METHODS[p.m])}</td><td class="num"><b>${fcfa(p.amt)}</b></td></tr>`).join('')}
    </tbody></table></div>`;
}

function aJobs() {
  return `${aHead(L('Recrutement', 'Careers'), L('Les offres publiées s\'affichent sur la page Recrutement.', 'Published openings show on the Careers page.'))}
    <div class="split" style="gap:2rem">
      <div class="card" style="padding:1.75rem"><h3>${L('Nouvelle offre', 'New opening')}</h3><form class="form" data-form="adm-job" novalidate>
        ${field('aj-t', L('Intitulé du poste', 'Job title'), { ph: L('ex. Professeur d\'anglais (collège)', 'e.g. English teacher (middle school)') })}
        ${field('aj-type', L('Type de contrat', 'Contract'), { options: [['tp', L('Temps plein', 'Full time')], ['vac', L('Vacataire', 'Part time')], ['stage', L('Stage', 'Internship')]], value: 'tp' })}
        ${field('aj-p', L('Profil recherché', 'Requirements'), { type: 'textarea' })}
        <button class="btn btn-gold" type="submit">${ic('send')}${L('Publier l\'offre', 'Publish opening')}</button></form></div>
      <div><h3>${L('Offres en ligne', 'Live openings')} (${JOBS.length})</h3><div class="card" style="padding:.25rem 1.25rem">${JOBS.map((j, i) => `<div class="list-row"><div class="grow"><h4>${t(j.t)}</h4><p>${t(j.type)}, ${fdate(j.d)}</p></div><button class="iconbtn" data-act="adel" data-k="job" data-id="${i}" aria-label="${L('Retirer', 'Remove')}">${ic('close')}</button></div>`).join('')}</div></div>
    </div>`;
}

function aUsers() {
  return `${aHead(L('Comptes et rôles', 'Accounts and roles'), L('Chaque personne ne voit que les rubriques de son rôle. Essayez « Voir en tant que » en haut de page.', 'Each person only sees the sections for their role. Try “View as” at the top.'), `<button class="btn btn-sm" data-act="adduser">${ic('users')}${L('Ajouter un compte', 'Add an account')}</button>`)}
    <div class="tbl-wrap"><table><thead><tr><th>${L('Nom', 'Name')}</th><th>${L('Rôle', 'Role')}</th><th>E-mail</th><th>${L('Dernière connexion', 'Last sign-in')}</th></tr></thead><tbody>
      ${USERS.map(u => `<tr><td><b>${t(u.n)}</b></td><td><span class="tag">${t(ROLES[u.r].l)}</span></td><td>${u.mail}</td><td>${fdate(u.last)}</td></tr>`).join('')}
    </tbody></table></div>
    <h3 style="margin-top:2rem">${L('Ce que chaque rôle peut faire', 'What each role can do')}</h3>
    <div class="grid g2">${Object.keys(ROLES).map(k => `<div class="card"><h4>${t(ROLES[k].l)}</h4><p class="muted small" style="margin:0">${ROLES[k].mods.filter(m => m !== 'dash').map(m => t(MODS.find(x => x[0] === m)[2])).join(', ')}</p></div>`).join('')}</div>
    <div class="notice info" style="margin-top:1.5rem">${ic('lock')}<span>${L('Les comptes parents et élèves sont créés automatiquement à l\'inscription, avec un mot de passe à changer à la première connexion.', 'Parent and student accounts are created automatically at enrolment, with a password to change at first sign-in.')}</span></div>`;
}

function aSettings() {
  return `${aHead(L('Réglages du site', 'Site settings'), L('Coordonnées et identité affichées partout sur le site.', 'Contact details and identity shown across the site.'))}
    <div class="card" style="padding:1.75rem;max-width:760px"><form class="form" data-form="adm-config" novalidate>
      <div class="two">${field('ac-tel', L('Téléphone', 'Phone'), { value: CONFIG.tel })}${field('ac-wa', L('WhatsApp (format international, sans +)', 'WhatsApp (international format, no +)'), { value: CONFIG.whatsapp, req: false, ph: 'ex. 22890000000' })}</div>
      ${field('ac-mail', 'E-mail', { value: CONFIG.email })}
      ${field('ac-adr', L('Adresse', 'Address'), { value: CONFIG.adresse })}
      ${field('ac-hor', L('Horaires d\'accueil', 'Office hours'), { value: t(CONFIG.horaires) })}
      ${field('ac-dev', L('Devise', 'Motto'), { value: t(CONFIG.devise) })}
      <div class="field"><label for="ac-logo">${L('Logo', 'Logo')}</label><span class="hint">${L('PNG ou SVG sur fond transparent, carré de préférence.', 'PNG or SVG on a transparent background, ideally square.')}</span>
        <div style="display:flex;gap:1rem;align-items:center"><span class="logo-prev" id="ac-logo-prev">${logo()}</span><input id="ac-logo" type="file" accept="image/*" data-input="aclogo"></div></div>
      <button class="btn btn-gold" type="submit">${ic('check')}${L('Enregistrer les réglages', 'Save settings')}</button></form></div>`;
}

/* ----- Export CSV ----- */
function paymentsCsv() {
  const rows = [['Date', 'Référence', 'Matricule', 'Élève', 'Rubrique', 'Moyen', 'Montant (FCFA)'], ...PAYMENTS.map(p => [p.d, p.ref, p.mat, p.eleve, PAY_ITEMS.find(x => x.id === p.k).name.fr, METHODS[p.m].fr, p.amt])];
  const csv = '﻿' + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `paiements-${todayIso()}.csv`; document.body.appendChild(a); a.click(); a.remove();
}
