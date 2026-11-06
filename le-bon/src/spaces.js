/* ===== Espaces sécurisés (démonstration, aucune donnée envoyée) ===== */
function loginCard(kind) {
  const p = kind === 'parent', a = kind === 'admin';
  return `<div class="card"><div class="ico">${ic(p ? 'lock' : a ? 'key' : 'user')}</div><h2 style="font-size:1.5rem">${p ? L('Connexion parent', 'Parent sign-in') : a ? L('Connexion du personnel', 'Staff sign-in') : L('Connexion élève', 'Student sign-in')}</h2>
    <div class="demo-cred">${ic('info')} <b>${L('Démonstration', 'Demo')}</b>${COLON}${L('identifiant', 'username')} <code>${kind}.demo</code>, ${L('mot de passe', 'password')} <code>demo</code>. ${L('Aucune donnée n\'est envoyée.', 'No data is sent.')}</div>
    <form class="form" data-form="login-${kind}" novalidate>
      ${field(kind + '-id', L('Identifiant', 'Username'), { value: kind + '.demo', auto: 'username' })}
      ${field(kind + '-pw', L('Mot de passe', 'Password'), { type: 'password', value: 'demo', auto: 'current-password' })}
      <button class="btn btn-block" type="submit">${ic('lock')}${L('Se connecter', 'Sign in')}</button>
    </form>
    <p class="small muted" style="margin:1rem 0 0">${a ? L('Accès perdu ? La direction peut réinitialiser votre compte.', 'Lost access? Management can reset your account.') : p ? L('Identifiants oubliés ? Présentez-vous au secrétariat avec une pièce d\'identité.', 'Forgot your login? Visit the secretariat with ID.') : L('Identifiants oubliés ? Demandez-les à la surveillance générale.', 'Forgot your login? Ask the discipline office.')}</p></div>`;
}
function sideMenu(kind, tabs, cur, who, sub, ini) {
  return `<aside class="side" aria-label="${L('Menu de l\'espace', 'Area menu')}"><div class="who"><span class="av">${ini}</span><div><b>${who}</b><small>${sub}</small></div></div>
    ${tabs.map(tb => `<button data-act="${kind}tab" data-v="${tb[0]}" aria-current="${cur === tb[0]}">${ic(tb[1])}${tb[2]}${tb[3] ? `<span class="count">${tb[3]}</span>` : ''}</button>`).join('')}
    <button data-act="logout" data-v="${kind}">${ic('logout')}${L('Se déconnecter', 'Sign out')}</button></aside>`;
}
const SJ = { 'Mathématiques': 'Mathematics', 'Français': 'French', 'Physique-chimie': 'Physics-chemistry', 'Anglais': 'English', 'Histoire': 'History', 'SVT': 'Life sciences' };
const sj = x => S.lang === 'en' ? (SJ[x] || x) : x;
const fsize = x => S.lang === 'en' ? x.replace(',', '.').replace('Mo', 'MB').replace('Ko', 'KB') : x;
const kids = () => [STUDENTS[0], STUDENTS[1]];
const childData = i => i === 0 ? PARENT_DATA : { absences: [], retards: [PARENT_DATA.retards[1]], fees: [{ k: 'sco', total: 135000, paid: 135000 }, { k: 'can', total: 75000, paid: 50000 }], avis: PARENT_DATA.avis };

function pParents() {
  const head = phead('parents', L('Suivez la scolarité de vos enfants : notes, bulletins, absences, paiements et avis de l\'établissement.', 'Follow your children\'s schooling: grades, reports, absences, payments and school notices.'));
  if (!S.parent) return `${head}<section class="sec"><div class="wrap"><div class="auth">${loginCard('parent')}</div></div></section>`;
  const st = kids()[S.child], cd = childData(S.child), m = avg(st);
  const unread = PARENT_DATA.avis.filter(a => a.unread).length;
  const due = cd.fees.reduce((s, f) => s + f.total - f.paid, 0);
  const tabs = [['notes', 'chart', L('Notes', 'Grades')], ['bulletins', 'file', L('Bulletins', 'Reports')], ['absences', 'clock', L('Absences et retards', 'Absences and lateness')], ['paiements', 'card', L('Paiements', 'Payments')], ['avis', 'bell', L('Avis', 'Notices'), unread]];
  let panel = '';
  if (S.ptab === 'notes') panel = `<div class="kpis"><div class="kpi"><span>${L('Moyenne générale', 'Average')}</span><b>${fmt(m)}</b><small>/ 20, ${mention(m).toLowerCase()}</small></div><div class="kpi"><span>${L('Rang', 'Rank')}</span><b>${st.rang.split(' / ')[0]}</b><small>${L('sur', 'of')} ${st.rang.split(' / ')[1]}</small></div><div class="kpi"><span>${L('Absences', 'Absences')}</span><b>${cd.absences.length}</b><small>${cd.absences.filter(a => !a.ok).length} ${L('non justifiée(s)', 'unexcused')}</small></div><div class="kpi"><span>${L('Reste à payer', 'Balance due')}</span><b style="font-size:1.35rem">${fcfa(due)}</b><small>${due ? `<button class="linkbtn" data-act="ptab" data-v="paiements">${L('Voir le détail', 'See details')}</button>` : L('À jour', 'Up to date')}</small></div></div>
    <h2 style="font-size:1.4rem">${L('Notes du 1er trimestre', 'First-term grades')}</h2>${notesTable(st)}`;
  if (S.ptab === 'bulletins') panel = `<h2 style="font-size:1.4rem">${L('Bulletins et documents', 'Reports and documents')}</h2><div class="card" style="padding:.5rem 1.5rem">
    ${[['bulletin', L('Bulletin de mi-trimestre, 1er trimestre', 'Mid-term report, 1st term') + ' ' + CONFIG.annee, L('Disponible depuis le 26 octobre 2026', 'Available since 26 October 2026')], ['releve', L('Relevé de notes, 1er trimestre', 'Transcript, 1st term'), L('Mis à jour en continu', 'Updated continuously')], ['attestation', L('Attestation de scolarité', 'Certificate of enrolment') + ' ' + CONFIG.annee, L('Valable pour l\'année en cours', 'Valid for the current year')]].map(d => `<div class="list-row"><span class="ico">${ic('file')}</span><div class="grow"><h4>${d[1]}</h4><p>${d[2]}</p></div><button class="btn btn-sm btn-ghost" data-act="doc" data-doc="${d[0]}" data-mat="${st.mat}">${ic('download')}${L('Télécharger', 'Download')}</button></div>`).join('')}
    <div class="list-row"><span class="ico">${ic('lock')}</span><div class="grow"><h4>${L('Bulletin du 1er trimestre', '1st-term report card')}</h4><p>${L('Disponible après les conseils de classe du 7 au 11 décembre', 'Available after class councils, 7 to 11 December')}</p></div><span class="tag">${L('Bientôt', 'Soon')}</span></div></div>`;
  if (S.ptab === 'absences') panel = `<h2 style="font-size:1.4rem">${L('Absences', 'Absences')}</h2>${cd.absences.length ? `<div class="tbl-wrap"><table><thead><tr><th>${L('Date', 'Date')}</th><th>${L('Durée', 'Duration')}</th><th>${L('Motif', 'Reason')}</th><th>${L('Statut', 'Status')}</th></tr></thead><tbody>${cd.absences.map(a => `<tr><td>${fdate(a.d)}</td><td>${t(a.dur)}</td><td>${t(a.motif)}</td><td><span class="tag ${a.ok ? 'green' : 'red'}">${a.ok ? L('Justifiée', 'Excused') : L('À justifier', 'To be excused')}</span></td></tr>`).join('')}</tbody></table></div>` : `<div class="notice ok">${ic('check')}<span>${L('Aucune absence ce trimestre.', 'No absences this term.')}</span></div>`}
    <h2 style="font-size:1.4rem;margin-top:2rem">${L('Retards', 'Lateness')}</h2>${cd.retards.length ? `<div class="tbl-wrap"><table><thead><tr><th>${L('Date', 'Date')}</th><th class="num">${L('Retard', 'Minutes late')}</th></tr></thead><tbody>${cd.retards.map(r => `<tr><td>${fdate(r.d)}</td><td class="num">${r.m} min</td></tr>`).join('')}</tbody></table></div>` : ''}
    ${cd.absences.some(a => !a.ok) ? `<div class="notice" style="margin-top:1.2rem">${ic('alert')}<span>${L('Une absence reste à justifier. Remettez un mot écrit à la surveillance générale.', 'One absence still needs an excuse. Hand a written note to the discipline office.')}</span></div>` : ''}`;
  if (S.ptab === 'paiements') panel = `<h2 style="font-size:1.4rem">${L('Situation des paiements', 'Payment status')}</h2><div class="grid">${cd.fees.map(f => { const it = PAY_ITEMS.find(p => p.id === f.k), pct = Math.round(f.paid / f.total * 100); return `<div class="card"><div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap"><h3 style="margin:0">${t(it.name)}</h3><span class="tag ${f.paid >= f.total ? 'green' : 'gold'}">${f.paid >= f.total ? L('Soldé', 'Paid') : L('Reste', 'Due') + ' ' + fcfa(f.total - f.paid)}</span></div><div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${t(it.name)}"><i style="width:${pct}%"></i></div><span class="small muted">${fcfa(f.paid)} ${L('payés sur', 'paid of')} ${fcfa(f.total)}</span></div>`; }).join('')}</div>
    ${due ? `<a class="btn btn-green" style="margin-top:1.5rem" href="#/paiement" data-act="paychild" data-mat="${st.mat}">${ic('card')}${L('Payer le solde', 'Pay the balance')}, ${fcfa(due)}</a>` : `<div class="notice ok" style="margin-top:1.5rem">${ic('check')}<span>${L('Tous les frais sont à jour.', 'All fees are up to date.')}</span></div>`}`;
  if (S.ptab === 'avis') panel = `<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap"><h2 style="font-size:1.4rem;margin:0">${L('Avis de l\'établissement', 'School notices')}</h2>${unread ? `<button class="linkbtn" data-act="readall">${L('Tout marquer comme lu', 'Mark all as read')}</button>` : ''}</div><div class="card" style="padding:.5rem 1.5rem;margin-top:1rem">${PARENT_DATA.avis.map((a, i) => `<div class="list-row">${a.unread ? '<span class="unread" aria-label="' + L('Non lu', 'Unread') + '"></span>' : '<span style="width:9px"></span>'}<div class="grow"><h4>${t(a.title)}</h4><p>${t(a.body)}</p><p class="small" style="margin-top:.3rem">${fdate(a.d)}</p></div>${a.unread ? `<button class="btn btn-sm btn-ghost" data-act="read" data-i="${i}">${L('Marquer comme lu', 'Mark as read')}</button>` : ''}</div>`).join('')}</div>`;
  return `${head}<section class="sec"><div class="wrap dash">${sideMenu('p', tabs, S.ptab, L('M. ou Mme AKAKPO', 'Mr or Mrs AKAKPO'), L('Compte parent', 'Parent account'), 'AK')}
    <div><div class="chips" role="group" aria-label="${L('Choisir un enfant', 'Choose a child')}">${kids().map((k, i) => `<button class="chip" data-act="child" data-i="${i}" aria-pressed="${i === S.child}">${k.prenom} ${k.nom}, ${k.classe}</button>`).join('')}</div>${panel}</div></div></section>`;
}

function pStudents() {
  const head = phead('eleves', L('Tes notes, tes cours, ton emploi du temps et tes devoirs, au même endroit.', 'Your grades, lessons, timetable and homework, all in one place.'));
  if (!S.eleve) return `${head}<section class="sec"><div class="wrap"><div class="auth">${loginCard('eleve')}</div></div></section>`;
  const st = STUDENTS[0], m = avg(st);
  S.submitted = S.submitted || new Set();
  const todo = HOMEWORK.filter(h => !S.submitted.has(h.id)).length;
  const tabs = [['notes', 'chart', L('Mes notes', 'My grades')], ['cours', 'book', L('Cours à télécharger', 'Lessons')], ['edt', 'calendar', L('Emploi du temps', 'Timetable')], ['devoirs', 'list', L('Devoirs', 'Homework'), todo], ['depot', 'upload', L('Déposer un travail', 'Hand in work')]];
  let panel = '';
  if (S.etab === 'notes') panel = `<div class="kpis"><div class="kpi"><span>${L('Moyenne', 'Average')}</span><b>${fmt(m)}</b><small>/ 20</small></div><div class="kpi"><span>${L('Rang', 'Rank')}</span><b>${st.rang.split(' / ')[0]}</b><small>${L('sur', 'of')} ${st.rang.split(' / ')[1]}</small></div><div class="kpi"><span>${L('Meilleure note', 'Best grade')}</span><b>17</b><small>EPS</small></div><div class="kpi"><span>${L('Devoirs à rendre', 'Homework due')}</span><b>${todo}</b><small><button class="linkbtn" data-act="etab" data-v="devoirs">${L('Voir', 'View')}</button></small></div></div>${notesTable(st)}`;
  if (S.etab === 'cours') panel = `<h2 style="font-size:1.4rem">${L('Supports de cours', 'Lesson materials')}</h2><div class="card" style="padding:.5rem 1.5rem">${COURSES.map(c => `<div class="list-row"><span class="ico">${ic('file')}</span><div class="grow"><h4>${t(c.t)}</h4><p>${sj(c.s)}, PDF, ${fsize(c.size)}</p></div><button class="btn btn-sm btn-ghost" data-act="dl" data-name="${esc(t(c.t))}">${ic('download')}${L('Télécharger', 'Download')}</button></div>`).join('')}</div>`;
  if (S.etab === 'edt') { const days = S.lang === 'en' ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    panel = `<h2 style="font-size:1.4rem">${L('Emploi du temps, 3e A', 'Timetable, 3e A')}</h2><div class="tbl-wrap" style="padding:1rem"><div class="tt"><span></span>${days.map(d => `<span class="h">${d}</span>`).join('')}${TT.grid.map((row, r) => `<span class="t">${TT.slots[r]}</span>${row.map(c => { if (!c) return '<span></span>'; if (c === '—') return `<span class="c brk">${L('Libre', 'Free')}</span>`; const [n, k] = c.split('|'); return `<span class="c ${k}"><b>${n}</b></span>`; }).join('')}`).join('')}</div></div><p class="small muted" style="margin-top:.6rem">${L('Pause de 10 h à 10 h 15. Pause de midi de 12 h 15 à 15 h.', 'Break 10 to 10:15 am. Lunch 12:15 to 3 pm.')}</p>`; }
  if (S.etab === 'devoirs') panel = `<h2 style="font-size:1.4rem">${L('Devoirs', 'Homework')}</h2><div class="card" style="padding:.5rem 1.5rem">${HOMEWORK.map(h => { const done = S.submitted.has(h.id); return `<div class="list-row"><span class="ico">${ic(done ? 'check' : 'edit')}</span><div class="grow"><h4>${t(h.t)}</h4><p>${sj(h.s)}, ${L('à rendre le', 'due')} ${fdate(h.due)}</p></div>${done ? `<span class="tag green">${L('Rendu', 'Handed in')}</span>` : h.dep ? `<button class="btn btn-sm btn-ghost" data-act="todepot" data-id="${h.id}">${ic('upload')}${L('Déposer', 'Hand in')}</button>` : `<span class="tag">${L('À rendre en classe', 'Hand in at school')}</span>`}</div>`; }).join('')}</div>`;
  if (S.etab === 'depot') { const open = HOMEWORK.filter(h => h.dep && !S.submitted.has(h.id));
    panel = `<h2 style="font-size:1.4rem">${L('Déposer un travail', 'Hand in work')}</h2>${open.length ? `<div class="card" style="padding:2rem;max-width:620px"><form class="form" data-form="depot" novalidate>
      ${field('dp-dev', L('Devoir concerné', 'Assignment'), { options: open.map(h => [h.id, `${sj(h.s)}${COLON}${t(h.t)}`]), value: S.depotSel || '' })}
      <div class="field"><label for="dp-file">${L('Fichier', 'File')}</label><span class="hint">${L('PDF, Word ou photo, 10 Mo maximum', 'PDF, Word or photo, 10 MB max')}</span><input id="dp-file" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required><span class="msg">${L('Choisissez le fichier à déposer.', 'Choose the file to hand in.')}</span></div>
      ${field('dp-com', L('Message au professeur', 'Message to teacher'), { type: 'textarea', req: false })}
      <button class="btn btn-gold" type="submit">${ic('upload')}${L('Déposer le travail', 'Hand in work')}</button></form></div>` : `<div class="notice ok">${ic('check')}<span>${L('Tous les devoirs à déposer en ligne ont été rendus.', 'All online homework has been handed in.')}</span></div>`}`; }
  return `${head}<section class="sec"><div class="wrap dash">${sideMenu('e', tabs, S.etab, `${st.prenom} ${st.nom}`, `${st.classe}, ${st.mat}`, st.prenom[0] + st.nom[0])}<div>${panel}</div></div></section>`;
}

/* ===== Paiement ===== */
function pPay() {
  S.paySel = S.paySel || new Set(['sco']);
  if (S.payMat === undefined || S.payMat === null) S.payMat = 'LB-26-0142';
  return `${phead('paiement', L('Réglez la scolarité, les uniformes, la cantine et les sorties pédagogiques depuis votre téléphone ou votre ordinateur.', 'Pay tuition, uniforms, canteen and school trips from your phone or computer.'))}
  <section class="sec"><div class="wrap pay">
    <form class="card form" data-form="pay" novalidate style="padding:2rem">
      <div class="notice">${ic('alert')}<span><b>${L('Démonstration', 'Demo')}</b>${COLON}${L('aucun paiement réel n\'est effectué. En production, cette page sera reliée à un prestataire de paiement agréé (Mobile Money et cartes bancaires).', 'no real payment is made. In production this page will connect to a licensed payment provider (Mobile Money and cards).')}</span></div>
      <div class="demo-cred">${ic('info')} <b>${L('Matricules de démonstration', 'Demo student numbers')}</b>${COLON}${STUDENTS.map(s => `<button type="button" class="linkbtn" data-act="paymat" data-mat="${s.mat}"><code>${s.mat}</code></button> (${s.prenom})`).join(', ')}. ${L('Mobile Money : code 1234. Carte : 4242 4242 4242 4242.', 'Mobile Money PIN: 1234. Card: 4242 4242 4242 4242.')}</div>
      <h3 style="margin:.6rem 0 0">1. ${L('L\'élève', 'The student')}</h3>
      ${field('pay-mat', L('Matricule de l\'élève', 'Student number'), { value: S.payMat || '', ph: L('ex. LB-26-0142', 'e.g. LB-26-0142'), hint: L('Inscrit sur la carte scolaire et les bulletins.', 'Shown on the school card and reports.') })}
      <p id="pay-who" class="small" aria-live="polite">${payWho()}</p>
      <h3 style="margin:.6rem 0 0">2. ${L('Ce que vous réglez', 'What you are paying')}</h3>
      <fieldset style="border:0;padding:0;margin:0;display:grid;gap:.6rem"><legend class="sr">${L('Rubriques', 'Items')}</legend>
      ${PAY_ITEMS.map(p => `<label class="opt"><input type="checkbox" name="item" value="${p.id}" ${S.paySel.has(p.id) ? 'checked' : ''} data-input="payitem"><span class="ico" style="width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:var(--tint2);color:var(--link)">${ic(p.icon)}</span><span style="flex:1"><b>${t(p.name)}</b><small>${t(p.hint)}</small></span><b>${fcfa(p.amount)}</b></label>`).join('')}</fieldset>
      <h3 style="margin:.6rem 0 0">3. ${L('Moyen de paiement', 'Payment method')}</h3>
      <fieldset style="border:0;padding:0;margin:0;display:grid;gap:.6rem"><legend class="sr">${L('Moyen de paiement', 'Payment method')}</legend>
        <label class="opt"><input type="radio" name="method" value="momo" ${S.payMethod !== 'card' ? 'checked' : ''} data-input="paymethod"><span class="ico" style="width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:var(--gold-soft);color:var(--gold-ink)">${ic('mobile')}</span><span><b>Mobile Money</b><small>${L('Vous validez sur votre téléphone avec votre code secret.', 'You confirm on your phone with your PIN.')}</small></span></label>
        <label class="opt"><input type="radio" name="method" value="card" ${S.payMethod === 'card' ? 'checked' : ''} data-input="paymethod"><span class="ico" style="width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:var(--green-soft);color:var(--green)">${ic('card')}</span><span><b>${L('Carte bancaire', 'Bank card')}</b><small>${L('Visa ou Mastercard, sur la page sécurisée du prestataire.', 'Visa or Mastercard, on the provider\'s secure page.')}</small></span></label>
      </fieldset>
      <div id="momo-f" ${S.payMethod === 'card' ? 'hidden' : ''}>${field('pay-tel', L('Numéro Mobile Money', 'Mobile Money number'), { type: 'tel', auto: 'tel', value: '90 00 00 00' })}</div>
      <button class="btn btn-green btn-block" type="submit">${ic('lock')}${L('Payer', 'Pay')} <span id="pay-btn-tot">${fcfa(payTotal())}</span></button>
    </form>
    <aside class="card summary"><h3>${L('Récapitulatif', 'Summary')}</h3><div id="pay-sum">${paySummary()}</div><p class="small muted" style="margin:1rem 0 0">${L('Le reçu est envoyé par SMS et reste disponible dans l\'Espace Parents.', 'The receipt is sent by SMS and stays available in the Parent area.')}</p></aside>
  </div></section>`;
}
const payTotal = () => PAY_ITEMS.filter(p => S.paySel.has(p.id)).reduce((s, p) => s + p.amount, 0);
function paySummary() {
  const items = PAY_ITEMS.filter(p => S.paySel.has(p.id));
  return items.length ? `${items.map(p => `<div class="row"><span>${t(p.name)}</span><span>${fcfa(p.amount)}</span></div>`).join('')}<div class="tot"><span>Total</span><span>${fcfa(payTotal())}</span></div>` : `<p class="muted">${L('Cochez au moins une rubrique à régler.', 'Tick at least one item to pay.')}</p>`;
}
function payWho() {
  const st = STUDENTS.find(s => s.mat.toLowerCase() === (S.payMat || '').trim().toLowerCase());
  return st ? `${ic('check')} <b>${st.prenom} ${st.nom}</b>, ${st.classe}` : (S.payMat ? `<span style="color:var(--red)">${L('Matricule introuvable. Vérifiez le format, par exemple LB-26-0142.', 'Student number not found. Check the format, e.g. LB-26-0142.')}</span>` : '');
}

/* ===== Documents imprimables (démo) ===== */
function docSheet(kind, st) {
  const m = avg(st);
  const head = `<div class="dh"><div style="display:flex;gap:.8rem;align-items:center"><span style="width:48px;height:48px;display:block">${logo()}</span><div><b>${CONFIG.nom}</b><br><span style="font-size:.8125rem;color:#4F6157">${CONFIG.adresse}, ${CONFIG.tel}</span></div></div><div style="text-align:right"><b>${L('Année scolaire', 'School year')} ${CONFIG.annee}</b><br><span style="font-size:.8125rem">${L('Édité le', 'Issued')} ${fdate(new Date().toISOString().slice(0, 10))}</span></div></div>`;
  const wm = `<div class="wm">${L('DOCUMENT DE DÉMONSTRATION, SANS VALEUR OFFICIELLE', 'DEMO DOCUMENT, NOT AN OFFICIAL RECORD')}</div>`;
  const info = `<p><b>${st.nom} ${st.prenom}</b>, ${L('matricule', 'student no.')} ${st.mat}, ${L('classe', 'class')} ${st.classe}</p>`;
  if (kind === 'attestation') return `<div class="docsheet">${head}<h3 style="text-align:center;margin:1.5rem 0">${L('Attestation de scolarité', 'Certificate of enrolment')}</h3>${wm}
    <p style="line-height:1.9">${L('Le Directeur Général du', 'The Managing Director of')} ${CONFIG.nom} ${L('atteste que l\'élève', 'certifies that')} <b>${st.nom} ${st.prenom}</b>, ${L('matricule', 'student no.')} ${st.mat}, ${L('est régulièrement inscrit(e) en classe de', 'is enrolled in class')} <b>${st.classe}</b> ${L('pour l\'année scolaire', 'for the school year')} ${CONFIG.annee}.</p>
    <p>${L('La présente attestation est délivrée pour servir et valoir ce que de droit.', 'This certificate is issued for all legal purposes.')}</p><p style="text-align:right;margin-top:2.5rem">${L('Le Directeur Général', 'The Managing Director')}<br><br>${CONFIG.dg}</p></div>`;
  const rows = SUBJ[st.cycle].map(s => `<tr><td>${S.lang === 'en' ? s[1] : s[0]}</td><td class="num">${s[2]}</td><td class="num">${fmt(s[3])}</td><td class="num">${fmt(s[3] * s[2])}</td>${kind === 'bulletin' ? `<td>${mention(s[3])}</td>` : ''}</tr>`).join('');
  const tc = SUBJ[st.cycle].reduce((a, s) => a + s[2], 0), tp = SUBJ[st.cycle].reduce((a, s) => a + s[2] * s[3], 0);
  return `<div class="docsheet">${head}<h3>${kind === 'bulletin' ? L('Bulletin de notes, 1er trimestre', 'Report card, 1st term') : L('Relevé de notes, 1er trimestre', 'Transcript, 1st term')}</h3>${info}${wm}
    <table><thead><tr><th>${L('Matière', 'Subject')}</th><th class="num">Coef.</th><th class="num">${L('Note', 'Grade')}</th><th class="num">${L('Points', 'Points')}</th>${kind === 'bulletin' ? `<th>${L('Appréciation', 'Comment')}</th>` : ''}</tr></thead><tbody>${rows}</tbody>
    <tfoot><tr><td>Total</td><td class="num">${tc}</td><td></td><td class="num">${fmt(tp)}</td>${kind === 'bulletin' ? '<td></td>' : ''}</tr></tfoot></table>
    ${kind === 'bulletin' ? `<p style="margin-top:1rem"><b>${L('Moyenne', 'Average')}${COLON}${fmt(m)} / 20</b>, ${L('rang', 'rank')} ${st.rang}, ${mention(m)}.</p><p><b>${L('Appréciation du conseil', 'Council comment')}</b>${COLON}${m >= 14 ? L('Bon trimestre, continuez ainsi.', 'Good term, keep it up.') : L('Ensemble correct, des efforts à poursuivre.', 'Fair overall, keep working.')}</p>` : `<p style="margin-top:1rem"><b>${L('Moyenne', 'Average')}${COLON}${fmt(m)} / 20</b></p>`}</div>`;
}
