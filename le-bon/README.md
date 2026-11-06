# Complexe Scolaire LE BON : maquette du site

Maquette interactive du futur site de l'établissement, préparée pour être présentée à la direction.
Elle couvre les 20 rubriques prévues : accueil, à propos, cycles, institut technique, admissions,
résultats aux examens, actualités et agenda, galerie, vie scolaire, enseignants, administration,
Espace Parents, Espace Élèves, paiement en ligne, contact, FAQ, partenaires, recrutement, documents,
ainsi qu'un Espace Administration pour le personnel.

> **Démonstration uniquement.** Les connexions, le paiement et les formulaires sont simulés dans
> le navigateur : rien n'est envoyé ni enregistré. Les contenus (coordonnées, noms, tarifs,
> chiffres) sont des exemples. L'interrupteur « Maquette » en bas à gauche les surligne en jaune.
> Le site est marqué `noindex` pour ne pas apparaître dans Google.

Comptes de démonstration : `parent.demo`, `eleve.demo` et `admin.demo`, tous avec le mot de passe `demo`.

## Technologies

HTML, CSS et JavaScript, sans framework ni dépendance. Un petit script Node assemble les
sources en une seule page `dist/index.html`.

## Structure

```
src/
  index.html   squelette de la page (contient les marqueurs /*CSS*/ et /*JS*/)
  styles.css   design : couleurs, mise en page, mode sombre, mobile
  icons.js     icônes et dessins « à la craie » (SVG)
  data.js      réglages de l'école (CONFIG) et tous les contenus
  pages.js     pages publiques
  spaces.js    Espace Parents, Espace Élèves, paiement
  admin.js     Espace Administration
  app.js       navigation et interactions
scripts/
  build.mjs    assemble src/ en dist/index.html
vercel.json    réglages de déploiement Vercel
```

## Espace Administration

Accès : lien « Espace Admin » en haut de page, ou `#/admin`. Ce que l'on y modifie s'affiche
aussitôt sur le site public, jusqu'au rechargement de la page.

| Rubrique | Ce qu'elle fait |
|---|---|
| Tableau de bord | Chiffres du jour et raccourcis |
| Pré-inscriptions | Dossiers reçus par le formulaire du site, avec suivi du statut |
| Messages | Messages de la page Contact |
| Actualités, Agenda, Galerie, Recrutement | Publier ou retirer du contenu (photos réelles comprises) |
| Résultats aux examens | Saisir les chiffres de chaque session, sans aucun nom |
| Saisie des notes | Notes d'une classe, visibles ensuite dans l'Espace Parents |
| Avis aux parents | Message envoyé dans l'Espace Parents et la cloche de notifications |
| Paiements | Encaissements en ligne et à la caisse, export CSV pour Excel |
| Comptes et rôles | Qui a accès à quoi |
| Réglages du site | Téléphone, WhatsApp, e-mail, adresse, horaires, devise, logo |

Le sélecteur « Voir en tant que » montre ce que voit chaque rôle : Direction (tout),
Secrétariat, Comptabilité, Enseignant.

## Modifier les contenus

Tout se trouve dans `src/data.js` :

- `CONFIG` : nom, devise, adresse, téléphone, WhatsApp, e-mail, logo, vidéo YouTube, photos du diaporama, réseaux sociaux ;
- `CYCLES`, `FILIERES`, `FEES` : formations et frais de scolarité ;
- `NEWS`, `EVENTS` : actualités et agenda ;
- `EXAM_RES`, `EXAM_OLD` : résultats aux examens (statistiques, aucun nom) ;
- `TEACHERS`, `ADMIN`, `FAQ`, `JOBS`, `DOCS` : équipe, questions fréquentes, offres d'emploi, documents.

## Lancer en local

Il faut [Node.js](https://nodejs.org) 18 ou plus récent.

```bash
npm run build   # génère dist/index.html
npm run dev     # génère puis ouvre http://localhost:3000
```

On peut aussi ouvrir directement `dist/index.html` dans un navigateur.

## Mettre en ligne sur Vercel

### Option A : depuis GitHub (recommandé)

1. Créer un dépôt vide sur GitHub, puis dans ce dossier :
   ```bash
   git remote add origin https://github.com/VOTRE-COMPTE/le-bon-maquette.git
   git branch -M main
   git push -u origin main
   ```
2. Sur [vercel.com](https://vercel.com), cliquer sur **Add New… → Project**, puis importer le dépôt.
3. Laisser les réglages par défaut : `vercel.json` indique déjà la commande (`npm run build`)
   et le dossier publié (`dist`). Cliquer sur **Deploy**.

Chaque `git push` sur `main` remet ensuite le site à jour automatiquement.

### Option B : en ligne de commande

```bash
npx vercel          # première fois : connexion au compte et création du projet
npx vercel --prod   # publication
```
