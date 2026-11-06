/* =====================================================================
   CONFIGURATION DE L'ÉTABLISSEMENT — à compléter avec les vraies infos
   ===================================================================== */
const CONFIG = {
  nom: 'Complexe Scolaire LE BON',
  court: 'LE BON',
  devise: { fr: 'Savoir, savoir-faire et valeurs morales', en: 'Knowledge, practical skills and moral values' },
  creation: '19XX',
  adresse: 'Lomé, Togo',
  bp: 'BP 61928',
  tel: '+228 90 23 79 08',
  tel2: '+228 90 85 68 82',
  whatsapp: '',            // numéro international sans « + » ni espaces, ex. 22890000000
  email: 'contact@lebon.example',
  horaires: { fr: 'Lundi à vendredi de 7 h à 17 h, samedi de 8 h à 12 h', en: 'Monday to Friday 7 am to 5 pm, Saturday 8 am to 12 pm' },
  maps: 'Complexe Scolaire Le Bon, Lomé, Togo',
  mapEmbed: '',            // lien « Intégrer une carte » de Google Maps (src de l'iframe)
  logo: 'photos/cropped-logo-150-x-147.jpg',                // chemin ou URL du logo HD (PNG/SVG). Vide = monogramme provisoire
  video: '',               // lien d'intégration YouTube, ex. https://www.youtube.com/embed/XXXX
  heroPhotos: ['photos/DSC_0056-1024x681.jpg', 'photos/DSC_0268-1024x681.jpg', 'photos/DSC_0107-1024x681.jpg', 'photos/DSC_0095-1024x681.jpg'], // photos du diaporama d'accueil (une par diapositive)
  social: { facebook: '#', instagram: '#', tiktok: '#', youtube: '#' },
  annee: '2026-2027',
  dg: 'Le Fondateur'
};

/* ===== Langue & utilitaires ===== */
const S = { lang: 'fr', review: false, parent: null, eleve: null, child: 0, ptab: 'notes', etab: 'notes', newsCat: 'all', galCat: 'all', calMonth: null, calSel: null, slide: 0 };
const L = (fr, en) => S.lang === 'en' ? en : fr;
Object.defineProperty(window, 'COLON', { get: () => S.lang === 'en' ? ': ' : '\u00a0: ' });
const t = x => (x && typeof x === 'object' && 'fr' in x) ? (S.lang === 'en' ? x.en : x.fr) : x;
const ph = x => `<span class="ph">${x}</span>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fcfa = n => Math.round(n).toLocaleString('fr-FR').replace(/ | |\s/g, ' ') + ' FCFA';
const MONTHS = { fr: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'], en: ['January','February','March','April','May','June','July','August','September','October','November','December'] };
const MSHORT = { fr: ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'], en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] };
const DOW = { fr: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'], en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] };
const fdate = iso => { const d = new Date(iso + 'T12:00:00'); return S.lang === 'en' ? `${MONTHS.en[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : `${d.getDate()} ${MONTHS.fr[d.getMonth()]} ${d.getFullYear()}`; };

/* ===== Cycles ===== */
const CYCLES = [
  { id: 'maternelle', img: 'photos/DSC_0268-1024x681.jpg', art: 'blocks', age: { fr: '3 à 5 ans', en: 'Ages 3 to 5' },
    name: { fr: 'Jardin d\'enfants', en: 'Kindergarten' },
    short: { fr: 'Éveil, langage et autonomie par le jeu.', en: 'Early learning, language and independence through play.' },
    classes: { fr: 'Prématernelle et maternelle', en: 'Pre-nursery and nursery' },
    prog: { fr: ['Langage oral et premiers mots écrits', 'Éveil mathématique : formes, nombres, tri', 'Graphisme, dessin, chant et comptines', 'Motricité et jeux collectifs', 'Initiation à l\'anglais par le chant'], en: ['Speaking and first written words', 'Early maths: shapes, numbers, sorting', 'Drawing, singing and nursery rhymes', 'Motor skills and group games', 'English through songs'] },
    hours: { fr: '7 h 30 à 11 h 30, puis 15 h à 16 h 30', en: '7:30 to 11:30 am, then 3 to 4:30 pm' },
    filieres: null, dipl: { fr: 'Passage au cours préparatoire (CP)', en: 'Entry into first grade (CP)' } },
  { id: 'primaire', img: 'photos/DSC_0282-1024x681.jpg', art: 'pencil', age: { fr: '6 à 11 ans', en: 'Ages 6 to 11' },
    name: { fr: 'Primaire', en: 'Primary school' },
    short: { fr: 'Lire, écrire, compter avec méthode, du CP1 au CM2.', en: 'Reading, writing and arithmetic, from CP1 to CM2.' },
    classes: { fr: 'CP1, CP2, CE1, CE2, CM1, CM2', en: 'CP1, CP2, CE1, CE2, CM1, CM2' },
    prog: { fr: ['Français : lecture, écriture, expression', 'Mathématiques et calcul mental', 'Sciences d\'observation', 'Histoire, géographie et éducation civique', 'Anglais, informatique, dessin et EPS'], en: ['French: reading, writing, expression', 'Maths and mental arithmetic', 'Science', 'History, geography and civics', 'English, computing, art and PE'] },
    hours: { fr: '7 h 30 à 12 h, puis 15 h à 17 h', en: '7:30 am to 12 pm, then 3 to 5 pm' },
    filieres: null, dipl: { fr: 'Certificat d\'études du premier degré (CEPD)', en: 'Primary school certificate (CEPD)' } },
  { id: 'college', img: 'photos/DSC_0095-1024x681.jpg', art: 'geometry', age: { fr: '12 à 15 ans', en: 'Ages 12 to 15' },
    name: { fr: 'Collège', en: 'Middle school' },
    short: { fr: 'De la 6e à la 3e, consolider les bases et préparer le BEPC.', en: 'From 6e to 3e, strengthen the basics and prepare the BEPC.' },
    classes: { fr: '6e, 5e, 4e, 3e', en: '6e, 5e, 4e, 3e' },
    prog: { fr: ['Français, anglais, seconde langue', 'Mathématiques, physique-chimie, SVT', 'Histoire-géographie, éducation civique et morale', 'Informatique et EPS', 'Études surveillées en fin de journée'], en: ['French, English, second language', 'Maths, physics-chemistry, life sciences', 'History-geography, civics', 'Computing and PE', 'Supervised study at the end of the day'] },
    hours: { fr: '7 h à 12 h 15, puis 15 h à 17 h', en: '7 am to 12:15 pm, then 3 to 5 pm' },
    filieres: null, dipl: { fr: 'Brevet d\'études du premier cycle (BEPC)', en: 'Lower secondary certificate (BEPC)' } },
  { id: 'lycee', img: 'photos/DSC_0107-1024x681.jpg', art: 'atom', age: { fr: '16 à 18 ans', en: 'Ages 16 to 18' },
    name: { fr: 'Lycée', en: 'High school' },
    short: { fr: 'Séries littéraires et scientifiques jusqu\'au baccalauréat.', en: 'Arts and science tracks up to the baccalaureate.' },
    classes: { fr: 'Seconde, première, terminale', en: 'Seconde, première, terminale' },
    prog: { fr: ['Série A : lettres, langues, philosophie', 'Série C : mathématiques et physique', 'Série D : sciences de la vie et de la Terre', 'Travaux pratiques en laboratoire', 'Orientation et préparation aux concours'], en: ['A track: literature, languages, philosophy', 'C track: maths and physics', 'D track: life and earth sciences', 'Lab practicals', 'Career guidance and entrance exam prep'] },
    hours: { fr: '7 h à 12 h 15, puis 15 h à 18 h', en: '7 am to 12:15 pm, then 3 to 6 pm' },
    filieres: { fr: 'Séries A, C et D', en: 'A, C and D tracks' }, dipl: { fr: 'Baccalauréat (BAC I et BAC II)', en: 'Baccalaureate (BAC I and BAC II)' } },
  { id: 'institut', img: 'photos/DSC_0049-1024x681.jpg', art: 'gears', age: { fr: 'Après la 3e', en: 'After 3e' },
    name: { fr: 'Lycée technique et industriel', en: 'Technical and industrial high school' },
    short: { fr: 'Cinq filières tertiaires et industrielles : G1, G2, G3, F1, F2.', en: 'Five business and industrial tracks: G1, G2, G3, F1, F2.' },
    classes: { fr: 'Seconde, première et terminale techniques', en: 'Technical seconde, première and terminale' },
    prog: { fr: ['Enseignements généraux (français, anglais, mathématiques)', 'Enseignements professionnels propres à chaque filière', 'Ateliers, laboratoires et salle informatique', 'Stage en entreprise en classe de terminale', 'Accompagnement vers l\'emploi ou le BTS'], en: ['General subjects (French, English, maths)', 'Vocational subjects for each track', 'Workshops, labs and computer room', 'Company internship in final year', 'Support towards a job or further studies'] },
    hours: { fr: '7 h à 12 h 15, puis 15 h à 18 h', en: '7 am to 12:15 pm, then 3 to 6 pm' },
    filieres: { fr: 'G1, G2, G3, F1, F2', en: 'G1, G2, G3, F1, F2' }, dipl: { fr: 'Baccalauréat technique (BAC G1, G2, G3, F1, F2)', en: 'Technical baccalaureate (G1, G2, G3, F1, F2)' } }
];

/* ===== Filières de le lycée technique et industriel ===== */
const FILIERES = [
  { code: 'G1', art: 'office', fam: 'tert', name: { fr: 'Techniques administratives', en: 'Administrative techniques' },
    desc: { fr: 'Former des assistants capables d\'organiser un bureau, de rédiger des courriers professionnels et de gérer l\'information d\'une entreprise.', en: 'Training assistants who can run an office, write business correspondence and manage company information.' },
    mat: { fr: ['Secrétariat et bureautique', 'Correspondance commerciale', 'Gestion administrative', 'Droit et économie'], en: ['Office skills and software', 'Business correspondence', 'Administration', 'Law and economics'] },
    jobs: { fr: 'Assistant(e) de direction, secrétaire, agent administratif', en: 'Executive assistant, secretary, administrative officer' } },
  { code: 'G2', art: 'calc', fam: 'tert', name: { fr: 'Techniques quantitatives de gestion', en: 'Quantitative management' },
    desc: { fr: 'Maîtriser la comptabilité, les calculs financiers et l\'informatique de gestion pour tenir les comptes d\'une structure.', en: 'Mastering accounting, financial maths and business computing to keep an organisation\'s books.' },
    mat: { fr: ['Comptabilité générale et analytique', 'Mathématiques financières', 'Fiscalité', 'Informatique de gestion'], en: ['Financial and cost accounting', 'Financial maths', 'Taxation', 'Business computing'] },
    jobs: { fr: 'Aide-comptable, caissier, gestionnaire de stocks', en: 'Accounting assistant, cashier, stock manager' } },
  { code: 'G3', art: 'shop', fam: 'tert', name: { fr: 'Techniques commerciales', en: 'Sales and marketing' },
    desc: { fr: 'Apprendre à vendre, négocier et promouvoir un produit, de l\'étude de marché à la relation client.', en: 'Learning to sell, negotiate and promote a product, from market research to customer relations.' },
    mat: { fr: ['Marketing et étude de marché', 'Techniques de vente et négociation', 'Droit commercial', 'Communication'], en: ['Marketing and market research', 'Sales and negotiation', 'Commercial law', 'Communication'] },
    jobs: { fr: 'Commercial, chargé de clientèle, créateur d\'entreprise', en: 'Sales rep, account manager, entrepreneur' } },
  { code: 'F1', art: 'gears', fam: 'ind', name: { fr: 'Construction mécanique', en: 'Mechanical engineering' },
    desc: { fr: 'Concevoir, dessiner et fabriquer des pièces mécaniques, puis assurer la maintenance des machines.', en: 'Designing, drawing and making mechanical parts, then maintaining machines.' },
    mat: { fr: ['Dessin technique et DAO', 'Fabrication et usinage', 'Mécanique appliquée', 'Maintenance industrielle'], en: ['Technical drawing and CAD', 'Manufacturing and machining', 'Applied mechanics', 'Industrial maintenance'] },
    jobs: { fr: 'Technicien de maintenance, dessinateur industriel, tourneur-fraiseur', en: 'Maintenance technician, draughtsman, machinist' } },
  { code: 'F2', art: 'circuit', fam: 'ind', name: { fr: 'Électronique', en: 'Electronics' },
    desc: { fr: 'Comprendre, monter et dépanner des circuits électroniques, des automatismes et des équipements de télécommunication.', en: 'Understanding, building and repairing electronic circuits, automation and telecom equipment.' },
    mat: { fr: ['Électronique analogique et numérique', 'Mesures et essais', 'Automatismes', 'Télécommunications et réseaux'], en: ['Analogue and digital electronics', 'Testing and measurement', 'Automation', 'Telecoms and networks'] },
    jobs: { fr: 'Technicien en électronique, dépanneur, installateur réseaux', en: 'Electronics technician, repairer, network installer' } }
];

/* ===== Frais (montants d'exemple) ===== */
const FEES = [
  { cycle: 'maternelle', ins: 15000, sco: 120000 },
  { cycle: 'primaire', ins: 15000, sco: 135000 },
  { cycle: 'college', ins: 20000, sco: 165000 },
  { cycle: 'lycee', ins: 20000, sco: 185000 },
  { cycle: 'institut', ins: 25000, sco: 210000 }
];
const PAY_ITEMS = [
  { id: 'sco', icon: 'cap', name: { fr: 'Frais de scolarité', en: 'Tuition fees' }, hint: { fr: '2e tranche', en: '2nd instalment' }, amount: 55000 },
  { id: 'uni', icon: 'shirt', name: { fr: 'Uniformes', en: 'Uniforms' }, hint: { fr: '1 tenue complète', en: '1 full uniform' }, amount: 12000 },
  { id: 'can', icon: 'food', name: { fr: 'Cantine', en: 'Canteen' }, hint: { fr: '2e trimestre', en: '2nd term' }, amount: 25000 },
  { id: 'sor', icon: 'bus', name: { fr: 'Sorties pédagogiques', en: 'School trips' }, hint: { fr: 'Visite du 21 novembre', en: 'Trip on 21 November' }, amount: 5000 }
];

/* ===== Élèves fictifs (démonstration) ===== */
const SUBJ = {
  college: [['Français', 'French', 3, 13.5], ['Anglais', 'English', 2, 14], ['Mathématiques', 'Mathematics', 3, 15.5], ['SVT', 'Life sciences', 2, 13], ['Physique-chimie', 'Physics-chemistry', 2, 12.5], ['Histoire-géographie', 'History-geography', 2, 14.5], ['Éducation civique', 'Civics', 1, 16], ['Informatique', 'Computing', 1, 15], ['EPS', 'PE', 1, 17]],
  primaire: [['Français', 'French', 3, 12], ['Mathématiques', 'Mathematics', 3, 13.5], ['Sciences', 'Science', 2, 14], ['Histoire-géographie', 'History-geography', 1, 11.5], ['Éducation civique', 'Civics', 1, 15], ['Anglais', 'English', 1, 13], ['Dessin', 'Art', 1, 16], ['EPS', 'PE', 1, 16.5]],
  lycee: [['Français', 'French', 2, 13], ['Anglais', 'English', 2, 15], ['Philosophie', 'Philosophy', 2, 12], ['Mathématiques', 'Mathematics', 4, 16.5], ['Physique-chimie', 'Physics-chemistry', 4, 15.5], ['SVT', 'Life sciences', 4, 16], ['Histoire-géographie', 'History-geography', 2, 14], ['EPS', 'PE', 1, 17]],
  institut: [['Comptabilité générale', 'Financial accounting', 5, 13.5], ['Mathématiques financières', 'Financial maths', 3, 12], ['Économie', 'Economics', 2, 13], ['Droit', 'Law', 2, 11.5], ['Informatique de gestion', 'Business computing', 2, 15], ['Français', 'French', 2, 12], ['Anglais', 'English', 2, 13.5], ['EPS', 'PE', 1, 15]]
};
const STUDENTS = [
  { mat: 'LB-26-0142', nom: 'AKAKPO', prenom: 'Esse', classe: '3e A', cycle: 'college', rang: '4 / 38', code: '1234' },
  { mat: 'LB-26-0063', nom: 'AKAKPO', prenom: 'Kafui', classe: 'CM2 B', cycle: 'primaire', rang: '7 / 42', code: '1234' },
  { mat: 'LB-26-0518', nom: 'DOSSOU', prenom: 'Afi', classe: '1re D', cycle: 'lycee', rang: '2 / 41', code: '1234' },
  { mat: 'LB-26-0377', nom: 'MENSAH', prenom: 'Kossi', classe: 'Tle G2', cycle: 'institut', rang: '11 / 32', code: '1234' }
];
const avg = st => { const s = SUBJ[st.cycle]; let a = 0, c = 0; s.forEach(x => { a += x[3] * x[2]; c += x[2]; }); return Math.round(a / c * 100) / 100; };
const mention = n => n >= 16 ? L('Très bien', 'Excellent') : n >= 14 ? L('Bien', 'Good') : n >= 12 ? L('Assez bien', 'Fairly good') : n >= 10 ? L('Passable', 'Pass') : L('Insuffisant', 'Insufficient');
const fmt = n => S.lang === 'en' ? n.toFixed(2) : n.toFixed(2).replace('.', ',');

const PARENT_DATA = {
  absences: [
    { d: '2026-10-06', dur: { fr: 'Matinée', en: 'Morning' }, motif: { fr: 'Maladie (certificat fourni)', en: 'Illness (note provided)' }, ok: true },
    { d: '2026-10-21', dur: { fr: '2 heures (mathématiques)', en: '2 hours (maths)' }, motif: { fr: 'Non justifiée', en: 'Unexcused' }, ok: false }
  ],
  retards: [{ d: '2026-09-29', m: 15 }, { d: '2026-10-13', m: 10 }, { d: '2026-10-27', m: 20 }],
  fees: [
    { k: 'sco', total: 165000, paid: 110000 },
    { k: 'can', total: 75000, paid: 25000 },
    { k: 'uni', total: 24000, paid: 24000 }
  ],
  avis: [
    { d: '2026-10-28', unread: true, title: { fr: 'Réunion parents-professeurs le samedi 14 novembre à 9 h', en: 'Parent-teacher meeting on Saturday 14 November at 9 am' }, body: { fr: 'Rencontre avec les professeurs principaux en salle polyvalente. Merci de confirmer votre présence.', en: 'Meet the form teachers in the main hall. Please confirm attendance.' } },
    { d: '2026-10-22', unread: true, title: { fr: 'Compositions du premier trimestre du 23 au 27 novembre', en: 'First-term exams from 23 to 27 November' }, body: { fr: 'Le calendrier détaillé des épreuves est disponible dans l\'espace élève.', en: 'The detailed timetable is available in the student area.' } },
    { d: '2026-10-02', unread: false, title: { fr: 'Rappel : deuxième tranche de scolarité avant le 30 novembre', en: 'Reminder: second tuition instalment due by 30 November' }, body: { fr: 'Le paiement peut se faire en ligne ou à la comptabilité.', en: 'Payment can be made online or at the accounts office.' } }
  ]
};
const COURSES = [
  { s: 'Mathématiques', t: { fr: 'Chapitre 3 : le théorème de Thalès', en: 'Chapter 3: Thales\' theorem' }, size: '1,2 Mo' },
  { s: 'Français', t: { fr: 'Méthode du résumé de texte', en: 'How to write a summary' }, size: '640 Ko' },
  { s: 'SVT', t: { fr: 'La reproduction humaine (diaporama)', en: 'Human reproduction (slides)' }, size: '3,4 Mo' },
  { s: 'Physique-chimie', t: { fr: 'Les lentilles convergentes', en: 'Converging lenses' }, size: '980 Ko' },
  { s: 'Anglais', t: { fr: 'Reported speech : exercices corrigés', en: 'Reported speech: worked exercises' }, size: '420 Ko' },
  { s: 'Histoire', t: { fr: 'La décolonisation en Afrique', en: 'Decolonisation in Africa' }, size: '1,8 Mo' }
];
const HOMEWORK = [
  { id: 'h1', s: 'Mathématiques', due: '2026-11-03', t: { fr: 'Exercices 4 à 8, page 62', en: 'Exercises 4 to 8, page 62' }, dep: true },
  { id: 'h2', s: 'Anglais', due: '2026-11-04', t: { fr: 'Rédiger un dialogue au discours indirect', en: 'Write a dialogue in reported speech' }, dep: true },
  { id: 'h3', s: 'Français', due: '2026-11-05', t: { fr: 'Rédaction : raconter une sortie scolaire', en: 'Essay: describe a school trip' }, dep: true },
  { id: 'h4', s: 'SVT', due: '2026-11-12', t: { fr: 'Exposé en groupe sur l\'hygiène de vie', en: 'Group talk on healthy living' }, dep: false }
];
const TT = { // emploi du temps 3e A : [créneau, lun, mar, mer, jeu, ven, sam]
  slots: ['7 h', '8 h', '9 h', '10 h 15', '11 h 15', '15 h', '16 h'],
  grid: [
    ['Français|k1', 'Maths|k2', 'Anglais|k3', 'Maths|k2', 'SVT|k4', 'Maths|k2'],
    ['Français|k1', 'Maths|k2', 'Anglais|k3', 'PCT|k4', 'SVT|k4', 'Informatique|k3'],
    ['Hist-géo|k3', 'PCT|k4', 'Maths|k2', 'Français|k1', 'Anglais|k3', 'Informatique|k3'],
    ['Maths|k2', 'Français|k1', 'EPS|k1', 'Hist-géo|k3', 'Français|k1', '—'],
    ['Maths|k2', 'ECM|k4', 'EPS|k1', 'Hist-géo|k3', 'Maths|k2', '—'],
    ['SVT|k4', 'Anglais|k3', '—', 'Français|k1', 'PCT|k4', ''],
    ['Étude|', 'Étude|', '—', 'Étude|', 'Club|', '']
  ]
};

/* ===== Actualités (exemples) ===== */
const NEWS_CATS = [
  ['ecole', { fr: 'Vie de l\'école', en: 'School life' }], ['rentree', { fr: 'Rentrée scolaire', en: 'Back to school' }], ['examens', { fr: 'Examens', en: 'Exams' }], ['reunions', { fr: 'Réunions', en: 'Meetings' }],
  ['sorties', { fr: 'Sorties pédagogiques', en: 'School trips' }], ['conseils', { fr: 'Conseils de classe', en: 'Class councils' }], ['stages', { fr: 'Stages', en: 'Internships' }], ['concours', { fr: 'Concours', en: 'Competitions' }]
];
const NEWS = [
  { id: 'r1', img: 'photos/DSC_0854.jpg', cat: 'ecole', d: '2026-03-07', art: 'trophy', t: { fr: 'Remise des prix aux meilleurs élèves par le Fondateur de CS LE BON', en: 'Prizes for the best students, presented by the Founder' }, x: { fr: 'À CS LE BON, les meilleurs élèves sont souvent primés.', en: 'At CS LE BON, the best students are often rewarded.' }, b: { fr: 'À CS LE BON, les meilleurs élèves sont souvent primés. Le Fondateur de l\'établissement a remis les prix aux élèves qui se sont distingués. Photos et détails à compléter par l\'établissement.', en: 'At CS LE BON, the best students are often rewarded. The school\'s Founder presented the prizes to outstanding students. Photos and details to be added by the school.' } },
  { id: 'r2', img: 'photos/DSC_0107-1024x681.jpg', cat: 'ecole', d: '2026-03-07', art: 'internship', t: { fr: 'Une école qui forme les professionnels de demain', en: 'A school that trains tomorrow\'s professionals' }, x: { fr: 'Des professionnels à la hauteur des défis de la mondialisation, du savoir théorique au savoir-faire pratique.', en: 'Professionals ready for the challenges of globalisation, from theory to practical skills.' }, b: { fr: 'Le développement des technologies de l\'information et de la communication exige des entreprises des ressources humaines qualifiées et des cadres formés au management. CS LE BON forme des femmes et des hommes de qualité, qui allient savoir intellectuel, savoir-faire pratique et valeurs morales.', en: 'The growth of information and communication technologies requires qualified people and managers trained in management. CS LE BON trains people who combine intellectual knowledge, practical skills and moral values.' } },
  { id: 'r3', img: 'photos/DSC_0241-scaled.jpg', cat: 'ecole', d: '2026-03-07', art: 'school', t: { fr: 'Le cadre est vraiment adapté aux apprenants', en: 'A setting that truly suits learners' }, x: { fr: 'Un immeuble à plusieurs étages, sur un grand espace, conforme à la réglementation togolaise.', en: 'A multi-storey building on a large site, compliant with Togolese regulations.' }, b: { fr: 'L\'établissement occupe un immeuble à plusieurs étages sur un grand espace, conforme à la réglementation de la République togolaise. Photos des installations à ajouter.', en: 'The school occupies a multi-storey building on a large site, compliant with the regulations of the Togolese Republic. Photos of the facilities to be added.' } },
  { id: 'r4', img: 'photos/DSC_0095-1024x681.jpg', cat: 'ecole', d: '2026-03-07', art: 'meeting', t: { fr: 'À CS LE BON, vos enfants sont bien encadrés', en: 'At CS LE BON, your children are well supervised' }, x: { fr: 'Un suivi attentif des élèves, de la prématernelle au lycée.', en: 'Attentive follow-up of every student, from pre-nursery to high school.' }, b: { fr: 'Un suivi attentif des élèves, de la prématernelle au lycée. Texte complet à fournir par l\'établissement.', en: 'Attentive follow-up of every student, from pre-nursery to high school. Full text to be provided by the school.' } }
];

/* ===== Agenda (exemples) ===== */
const EVENTS = [
  { d: '2026-11-01', k: 'hol', t: { fr: 'Toussaint (jour férié)', en: 'All Saints\' Day (holiday)' } },
  { d: '2026-11-07', k: 'ev', t: { fr: 'Journée portes ouvertes', en: 'Open day' } },
  { d: '2026-11-14', k: 'ev', t: { fr: 'Réunion parents-professeurs', en: 'Parent-teacher meeting' } },
  { d: '2026-11-20', k: 'ev', t: { fr: 'Clôture des inscriptions au concours de maths', en: 'Maths competition registration closes' } },
  { d: '2026-11-21', k: 'ev', t: { fr: 'Sortie pédagogique des 4e', en: '4e class trip' } },
  { d: '2026-11-23', k: 'exam', t: { fr: 'Début des compositions du 1er trimestre', en: 'First-term exams begin' } },
  { d: '2026-11-27', k: 'exam', t: { fr: 'Fin des compositions', en: 'Exams end' } },
  { d: '2026-11-30', k: 'ev', t: { fr: 'Date limite de la 2e tranche', en: '2nd instalment deadline' } },
  { d: '2026-12-07', k: 'ev', t: { fr: 'Début des conseils de classe', en: 'Class councils begin' } },
  { d: '2026-12-18', k: 'ev', t: { fr: 'Fête de fin de trimestre', en: 'End-of-term celebration' } },
  { d: '2026-12-19', k: 'hol', t: { fr: 'Début des vacances de Noël', en: 'Christmas holidays begin' } },
  { d: '2027-01-04', k: 'ev', t: { fr: 'Rentrée du 2e trimestre', en: 'Second term begins' } }
];

/* ===== Galerie ===== */
const GAL_CATS = [
  ['campus', { fr: 'Le campus', en: 'The campus' }], ['petits', { fr: 'Maternelle et primaire', en: 'Nursery and primary' }],
  ['grands', { fr: 'Collège et lycée', en: 'Middle and high school' }], ['ceremonies', { fr: 'Remise des prix', en: 'Prize-giving' }]
];
const GALLERY = [
  { c: 'campus', img: 'photos/DSC_0056-1024x681.jpg', cls: 'wide', t: { fr: 'Le campus (1)', en: 'The campus (1)' } },
  { c: 'campus', img: 'photos/DSC_0063-1024x681.jpg', t: { fr: 'Le campus (2)', en: 'The campus (2)' } },
  { c: 'campus', img: 'photos/DSC_0071-1024x681.jpg', t: { fr: 'Le campus (3)', en: 'The campus (3)' } },
  { c: 'campus', img: 'photos/DSC_0073-1024x681.jpg', t: { fr: 'Le campus (4)', en: 'The campus (4)' } },
  { c: 'campus', img: 'photos/DSC_0081-1024x681.jpg', t: { fr: 'Le campus (5)', en: 'The campus (5)' } },
  { c: 'petits', img: 'photos/DSC_0268-1024x681.jpg', cls: 'wide', t: { fr: 'Maternelle et primaire (1)', en: 'Nursery and primary (1)' } },
  { c: 'petits', img: 'photos/DSC_0282-1024x681.jpg', t: { fr: 'Maternelle et primaire (2)', en: 'Nursery and primary (2)' } },
  { c: 'petits', img: 'photos/DSC_0287-1024x681.jpg', t: { fr: 'Maternelle et primaire (3)', en: 'Nursery and primary (3)' } },
  { c: 'petits', img: 'photos/DSC_0293-1024x681.jpg', t: { fr: 'Maternelle et primaire (4)', en: 'Nursery and primary (4)' } },
  { c: 'petits', img: 'photos/DSC_0302-1024x681.jpg', t: { fr: 'Maternelle et primaire (5)', en: 'Nursery and primary (5)' } },
  { c: 'grands', img: 'photos/DSC_0082-1-1024x681.jpg', cls: 'wide', t: { fr: 'Collège et lycée (1)', en: 'Middle and high school (1)' } },
  { c: 'grands', img: 'photos/DSC_0095-1024x681.jpg', t: { fr: 'Collège et lycée (2)', en: 'Middle and high school (2)' } },
  { c: 'grands', img: 'photos/DSC_0049-1024x681.jpg', t: { fr: 'Collège et lycée (3)', en: 'Middle and high school (3)' } },
  { c: 'grands', img: 'photos/DSC_0107-1024x681.jpg', t: { fr: 'Collège et lycée (4)', en: 'Middle and high school (4)' } },
  { c: 'ceremonies', img: 'photos/DSC_0854.jpg', cls: 'wide', t: { fr: 'Remise des prix (1)', en: 'Prize-giving (1)' } },
  { c: 'ceremonies', img: 'photos/DSC_0684-1024x722.jpg', t: { fr: 'Remise des prix (2)', en: 'Prize-giving (2)' } },
  { c: 'ceremonies', img: 'photos/DSC_0832-1024x722.jpg', t: { fr: 'Remise des prix (3)', en: 'Prize-giving (3)' } },
  { c: 'ceremonies', img: 'photos/DSC_0836-1024x722.jpg', t: { fr: 'Remise des prix (4)', en: 'Prize-giving (4)' } },
  { c: 'ceremonies', img: 'photos/DSC_0852-1024x722.jpg', t: { fr: 'Remise des prix (5)', en: 'Prize-giving (5)' } }
];
ART.ball = ART.sport;

/* ===== Équipe (fiches d'exemple) ===== */
const TEACHERS = [
  { n: 'Mme Ablavi KOUDJO', m: { fr: 'Français', en: 'French' }, c: 'college', dip: { fr: 'Licence de lettres modernes', en: 'BA in modern literature' }, xp: 9 },
  { n: 'M. Yao SOSSOU', m: { fr: 'Mathématiques', en: 'Mathematics' }, c: 'lycee', dip: { fr: 'Master de mathématiques', en: 'MSc in mathematics' }, xp: 12 },
  { n: 'Mme Mawuéna ADJAHO', m: { fr: 'Anglais', en: 'English' }, c: 'college', dip: { fr: 'CAPES d\'anglais', en: 'English teaching certificate' }, xp: 7 },
  { n: 'M. Edem LAWSON', m: { fr: 'Physique-chimie', en: 'Physics-chemistry' }, c: 'lycee', dip: { fr: 'Licence de physique', en: 'BSc in physics' }, xp: 10 },
  { n: 'Mme Akossiwa AMEGAN', m: { fr: 'SVT', en: 'Life sciences' }, c: 'lycee', dip: { fr: 'Master de biologie', en: 'MSc in biology' }, xp: 6 },
  { n: 'M. Kodjo ATSU', m: { fr: 'Comptabilité (G2)', en: 'Accounting (G2)' }, c: 'institut', dip: { fr: 'Master comptabilité-contrôle', en: 'MSc in accounting' }, xp: 8 },
  { n: 'M. Sélom AKUE', m: { fr: 'Électronique (F2)', en: 'Electronics (F2)' }, c: 'institut', dip: { fr: 'Ingénieur en électronique', en: 'Electronics engineer' }, xp: 11 },
  { n: 'Mme Délali GBEDEMAH', m: { fr: 'Institutrice, CM2', en: 'Primary teacher, CM2' }, c: 'primaire', dip: { fr: 'Certificat d\'aptitude pédagogique', en: 'Teaching certificate' }, xp: 15 }
];
const ADMIN = [
  { r: { fr: 'Directeur Général', en: 'Managing Director' }, icon: 'award', d: { fr: 'Définit le projet d\'établissement, représente l\'école et coordonne l\'ensemble des services.', en: 'Sets the school\'s direction, represents it and coordinates all departments.' } },
  { r: { fr: 'Censeur', en: 'Director of Studies' }, icon: 'book', d: { fr: 'Organise les enseignements, les emplois du temps, les compositions et le suivi pédagogique.', en: 'Organises teaching, timetables, exams and academic follow-up.' } },
  { r: { fr: 'Surveillant Général', en: 'Head of Discipline' }, icon: 'shield', d: { fr: 'Veille à la discipline, au suivi des absences et retards, et à la sécurité des élèves.', en: 'Oversees discipline, absences, lateness and student safety.' } },
  { r: { fr: 'Économe', en: 'Bursar' }, icon: 'chart', d: { fr: 'Gère le budget, les frais de scolarité, le matériel et les services annexes (cantine, uniformes).', en: 'Manages the budget, fees, equipment and services (canteen, uniforms).' } },
  { r: { fr: 'Secrétariat', en: 'Secretariat' }, icon: 'file', d: { fr: 'Accueille les familles, enregistre les inscriptions et délivre les documents administratifs.', en: 'Welcomes families, handles enrolment and issues official documents.' } },
  { r: { fr: 'Comptabilité', en: 'Accounts office' }, icon: 'card', d: { fr: 'Encaisse les paiements, délivre les reçus et tient la comptabilité de l\'établissement.', en: 'Collects payments, issues receipts and keeps the school\'s accounts.' } }
];

/* ===== FAQ, offres d'emploi, documents ===== */
const FAQ = [
  [{ fr: 'Quand ouvrent les inscriptions ?', en: 'When does enrolment open?' }, { fr: 'Les inscriptions pour la rentrée suivante ouvrent généralement en juin. Les admissions en cours d\'année restent possibles selon les places disponibles.', en: 'Enrolment for the next school year usually opens in June. Mid-year admissions are possible depending on available places.' }],
  [{ fr: 'Peut-on payer la scolarité en plusieurs fois ?', en: 'Can tuition be paid in instalments?' }, { fr: 'Oui, en trois tranches : à l\'inscription, avant le 30 novembre et avant le 28 février. Le paiement est possible en ligne ou à la comptabilité.', en: 'Yes, in three instalments: at enrolment, by 30 November and by 28 February. You can pay online or at the accounts office.' }],
  [{ fr: 'Comment obtenir mes codes pour l\'Espace Parents ?', en: 'How do I get my Parent Area login?' }, { fr: 'Les identifiants sont remis par le secrétariat à l\'inscription. En cas de perte, présentez-vous avec une pièce d\'identité.', en: 'Login details are given by the secretariat at enrolment. If lost, come in with ID.' }],
  [{ fr: 'L\'établissement propose-t-il une cantine ?', en: 'Is there a canteen?' }, { fr: 'Oui, une cantine est ouverte du lundi au vendredi. L\'abonnement se règle par trimestre.', en: 'Yes, the canteen is open Monday to Friday. Meals are paid per term.' }],
  [{ fr: 'Les élèves doivent-ils porter un uniforme ?', en: 'Do students wear a uniform?' }, { fr: 'L\'uniforme est obligatoire du lundi au vendredi. Il est vendu à l\'économat et peut être payé en ligne.', en: 'Uniform is required Monday to Friday. It is sold at the bursar\'s office and can be paid online.' }],
  [{ fr: 'Comment consulter les résultats de mon enfant ?', en: 'How can I see my child\'s results?' }, { fr: 'Les notes, bulletins, relevés et attestations sont dans l\'Espace Parents ; l\'élève voit ses notes dans l\'Espace Élèves. La page Résultats présente seulement les taux de réussite de l\'établissement aux examens, sans aucun nom.', en: 'Grades, report cards, transcripts and certificates are in the Parent area; students see their grades in the Student area. The Results page only shows the school\'s exam pass rates, with no names.' }],
  [{ fr: 'Que faire en cas d\'absence ?', en: 'What should I do if my child is absent?' }, { fr: 'Prévenez la surveillance générale le jour même, puis remettez un justificatif au retour de l\'élève.', en: 'Inform the discipline office the same day, then provide a written excuse when the student returns.' }],
  [{ fr: 'Proposez-vous un transport scolaire ?', en: 'Is there school transport?' }, { fr: 'Information à confirmer par l\'établissement.', en: 'To be confirmed by the school.' }, true]
];
const JOBS = [
  { t: { fr: 'Professeur de mathématiques (lycée)', en: 'Mathematics teacher (high school)' }, type: { fr: 'Temps plein', en: 'Full time' }, d: '2026-10-20', p: { fr: 'Master en mathématiques, expérience en classes d\'examen appréciée.', en: 'Master\'s in maths, exam-class experience a plus.' } },
  { t: { fr: 'Professeur d\'électronique (F2)', en: 'Electronics teacher (F2)' }, type: { fr: 'Vacataire', en: 'Part time' }, d: '2026-10-12', p: { fr: 'Diplôme d\'ingénieur ou de technicien supérieur en électronique.', en: 'Engineering or higher technician degree in electronics.' } },
  { t: { fr: 'Surveillant(e) d\'internat et d\'études', en: 'Study supervisor' }, type: { fr: 'Temps plein', en: 'Full time' }, d: '2026-10-05', p: { fr: 'Baccalauréat minimum, sens de l\'écoute et de l\'autorité.', en: 'Baccalaureate minimum, good listener with natural authority.' } }
];
const DOCS = [
  { t: { fr: 'Règlement intérieur', en: 'School rules' }, f: 'PDF', icon: 'shield' },
  { t: { fr: 'Calendrier scolaire 2026-2027', en: '2026-2027 school calendar' }, f: 'PDF', icon: 'calendar' },
  { t: { fr: 'Liste de fournitures : maternelle et primaire', en: 'Supply list: nursery and primary' }, f: 'PDF', icon: 'list' },
  { t: { fr: 'Liste de fournitures : collège et lycée', en: 'Supply list: middle and high school' }, f: 'PDF', icon: 'list' },
  { t: { fr: 'Liste de fournitures : lycée technique et industriel', en: 'Supply list: technical and industrial high school' }, f: 'PDF', icon: 'list' },
  { t: { fr: 'Fiche d\'inscription à imprimer', en: 'Printable enrolment form' }, f: 'PDF', icon: 'edit' }
];

/* ===== Résultats aux examens (chiffres d'exemple, aucune liste nominative) =====
   Une ligne = [série ou filière, candidats, admis, mentions TB, B, AB] */
const EXAMS = [
  { id: 'cepd', name: { fr: 'CEPD', en: 'CEPD' }, full: { fr: 'Certificat d\'études du premier degré', en: 'Primary school certificate' } },
  { id: 'bepc', name: { fr: 'BEPC', en: 'BEPC' }, full: { fr: 'Brevet d\'études du premier cycle', en: 'Lower secondary certificate' } },
  { id: 'bac1', name: { fr: 'BAC I', en: 'BAC I' }, full: { fr: 'Baccalauréat, première partie', en: 'Baccalaureate, part one' } },
  { id: 'bac2', name: { fr: 'BAC II', en: 'BAC II' }, full: { fr: 'Baccalauréat, deuxième partie', en: 'Baccalaureate, part two' } },
  { id: 'bact', name: { fr: 'BAC technique', en: 'Technical BAC' }, full: { fr: 'Filières G1, G2, G3, F1 et F2', en: 'G1, G2, G3, F1 and F2 tracks' } }
];
const EXAM_RES = {
  2026: { cepd: [['', 64, 63, 9, 21, 18]], bepc: [['', 118, 109, 6, 24, 37]],
    bac1: [['A4', 38, 31, 1, 6, 11], ['C', 16, 15, 2, 5, 5], ['D', 47, 41, 2, 9, 14]],
    bac2: [['A4', 42, 35, 1, 5, 12], ['C', 18, 17, 3, 6, 5], ['D', 51, 46, 2, 11, 15]],
    bact: [['G1', 22, 19, 0, 4, 7], ['G2', 28, 25, 1, 6, 9], ['G3', 20, 17, 0, 3, 6], ['F1', 14, 12, 0, 3, 4], ['F2', 16, 15, 1, 4, 5]] },
  2025: { cepd: [['', 58, 56, 7, 18, 17]], bepc: [['', 112, 100, 4, 20, 33]],
    bac1: [['A4', 35, 27, 1, 5, 9], ['C', 15, 13, 1, 4, 5], ['D', 44, 37, 2, 8, 12]],
    bac2: [['A4', 40, 32, 1, 4, 10], ['C', 17, 15, 2, 5, 5], ['D', 48, 41, 1, 9, 13]],
    bact: [['G1', 20, 16, 0, 3, 6], ['G2', 26, 22, 1, 5, 8], ['G3', 19, 15, 0, 2, 6], ['F1', 12, 10, 0, 2, 3], ['F2', 15, 13, 0, 3, 5]] },
  2024: { cepd: [['', 55, 52, 5, 16, 17]], bepc: [['', 105, 91, 3, 17, 30]],
    bac1: [['A4', 33, 24, 0, 4, 8], ['C', 14, 12, 1, 3, 4], ['D', 41, 32, 1, 6, 11]],
    bac2: [['A4', 37, 27, 0, 3, 9], ['C', 15, 13, 1, 4, 4], ['D', 45, 36, 1, 7, 12]],
    bact: [['G1', 18, 13, 0, 2, 5], ['G2', 24, 19, 0, 4, 7], ['G3', 17, 13, 0, 2, 4], ['F1', 11, 8, 0, 1, 3], ['F2', 13, 11, 0, 2, 4]] }
};
const EXAM_OLD = { cepd: [91.2, 93.0], bepc: [80.4, 83.1], bac1: [70.5, 74.0], bac2: [69.8, 74.6], bact: [66.0, 71.5] }; // sessions 2022 et 2023
