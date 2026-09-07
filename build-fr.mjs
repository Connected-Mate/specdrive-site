#!/usr/bin/env node
/**
 * Regenerates fr/index.html from index.html.
 *
 * The French page is never edited by hand: it is the output of this script.
 * Every user-visible English string is listed below with its French wording.
 * When the English page changes, run `node build-fr.mjs` — any key that can no
 * longer be found is reported on stdout, so the French page can never silently
 * drift out of sync with the English one.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(root, 'index.html'), 'utf8');

let out = source;
let missing = 0;

/**
 * Replaces an English fragment with its French wording.
 * Whitespace in the key is matched loosely, so a key can be written on one line
 * even when the HTML wraps it across several.
 */
function t(en, fr) {
  const pattern = en
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s+');
  const re = new RegExp(pattern, 'g');
  if (!re.test(out)) {
    missing++;
    console.log(`MISSING  ${en.replace(/\s+/g, ' ').slice(0, 88)}`);
    return;
  }
  re.lastIndex = 0;
  out = out.replace(re, () => fr);
}

/* ---------------------------------------------------------------- head --- */

t('<html lang="en">', '<html lang="fr">');
t(
  '<title>SpecDrive — your idea, built for real</title>',
  '<title>SpecDrive — votre idée, construite pour de vrai</title>'
);
t(
  'SpecDrive turns a spoken idea into a rigorously built product. Your AI coding agent does the work; a live spec board keeps it honest — specs, scenarios, proof-gated steps, independent review.',
  'SpecDrive transforme une idée dite à voix haute en produit construit avec rigueur. Votre outil de code IA fait le travail&nbsp;; un tableau vivant le tient honnête — spécifications, scénarios, étapes validées par la preuve, relecture indépendante.'
);
t('<meta property="og:locale" content="en_US" />', '<meta property="og:locale" content="fr_FR" />');
t(
  '<meta property="og:url" content="https://connected-mate.github.io/specdrive-site/" />',
  '<meta property="og:url" content="https://connected-mate.github.io/specdrive-site/fr/" />'
);
t(
  '<meta property="og:title" content="SpecDrive — your idea, built for real" />',
  '<meta property="og:title" content="SpecDrive — votre idée, construite pour de vrai" />'
);
t(
  '<meta name="twitter:title" content="SpecDrive — your idea, built for real" />',
  '<meta name="twitter:title" content="SpecDrive — votre idée, construite pour de vrai" />'
);
t(
  'Give your AI a plan. Watch your idea become a real product. Free, open-source Mac app for Claude Code, Cursor, Codex and more.',
  'Guidez votre IA. Donnez vie à votre projet. Une app Mac gratuite et open source pour Claude Code, Cursor, Codex et bien d’autres.'
);
t(
  'https://connected-mate.github.io/specdrive-site/assets/specdrive-share-en-20260907.png',
  'https://connected-mate.github.io/specdrive-site/assets/specdrive-share-fr-20260907.png'
);
t('<meta property="og:image:width" content="1730" />', '<meta property="og:image:width" content="1729" />');
t('<meta property="og:image:height" content="909" />', '<meta property="og:image:height" content="910" />');
t(
  'SpecDrive — Your idea. Built for real. A preview of the project board. Free and open source for Mac.',
  'SpecDrive — Votre idée. Pour de vrai. Un aperçu du tableau de projet. Gratuit et open source pour Mac.'
);

/* ---------------------------------------------------------------- hero --- */

t(
  '<nav class="lang" aria-label="Language"><a href="./" class="on" data-lang="en">EN</a><a href="./fr/" data-lang="fr">FR</a></nav>',
  '<nav class="lang" aria-label="Langue"><a href="../" data-lang="en">EN</a><a href="./" class="on" data-lang="fr">FR</a></nav>'
);
t(
  '<h1>Say what you want.<br /><em>Watch it get built right.</em></h1>',
  // "comme il faut" is glued so the line never breaks mid-idiom.
  '<h1>Dites ce que vous voulez.<br /><em>Voyez-le construit comme&nbsp;il&nbsp;faut.</em></h1>'
);
t(
  'You already build by talking to an AI coding tool — Claude Code, Cursor, Windsurf… SpecDrive is the <b>supervisor</b> that sits beside it: the AI does the work, and it can\'t call anything “done” without proof.',
  'Vous construisez déjà en parlant à un outil de code IA — Claude Code, Cursor, Windsurf… SpecDrive est le <b>superviseur</b> assis juste à côté&nbsp;: l’IA fait le travail, et elle ne peut rien déclarer «&nbsp;terminé&nbsp;» sans preuve.'
);
t('<span class="btn-arrow" aria-hidden="true">↓</span>&nbsp; Download for Mac', '<span class="btn-arrow" aria-hidden="true">↓</span>&nbsp; Télécharger pour Mac');
t(
  'Works with the AI tool you already use · Everything stays on your Mac · Free &amp; open source',
  'Fonctionne avec l’outil IA que vous utilisez déjà · Tout reste sur votre Mac · Gratuit et open source'
);
t(
  'alt="The SpecDrive board: specs written live by an AI agent, a challenge verdict, the phase stepper and the next-step prompt"',
  'alt="Le tableau SpecDrive&nbsp;: des spécifications écrites en direct par une IA, un verdict de contre-expertise, les phases du projet et la consigne à copier pour l’étape suivante"'
);
t(
  'A real project, filled live by Claude Code — nothing in this screenshot was typed by a human.',
  'Un vrai projet, rempli en direct par Claude Code — rien sur cette image n’a été tapé par un humain.'
);

/* ------------------------------------------------- why an MCP, not a skill */

t('<div class="label reveal">Why an MCP, not a skill</div>', '<div class="label reveal">Pourquoi un MCP, et pas une consigne</div>');
t(
  '<h2 class="reveal title">Prompts get forgotten.<br />Tools can’t be.</h2>',
  '<h2 class="reveal title">Les consignes s’oublient.<br />Les outils, non.</h2>'
);
t(
  'Most attempts at disciplining an AI are just big instructions pasted into its head. They work on day one. Then its memory fills up, the rules fade, and it wanders off. SpecDrive takes the opposite bet: the discipline lives in the <em>tools</em> the AI must use — an MCP, the standard socket every modern AI coding tool can plug into — where no amount of forgetting can erode it.',
  'La plupart des tentatives pour discipliner une IA se résument à de longues instructions collées dans sa tête. Ça tient le premier jour. Puis sa mémoire se remplit, les règles s’effacent, et elle part ailleurs. SpecDrive fait le pari inverse&nbsp;: la discipline vit dans les <em>outils</em> que l’IA est obligée d’utiliser — un MCP, la prise standard sur laquelle se branche tout outil de code IA moderne — là où aucun oubli ne peut l’user.'
);
t('<div class="compare-head">A spec skill / prompt file</div>', '<div class="compare-head">Une consigne, un fichier d’instructions</div>');
t(
  'Lives in the agent’s context — and dies there. The longer the session, the less it weighs.',
  'Vit dans la mémoire de l’agent — et y meurt. Plus la session dure, moins elle pèse.'
);
t(
  'Nothing enforces it. Skipping a step is one token away, and you’ll never know.',
  'Rien ne l’applique. Sauter une étape ne coûte rien, et vous ne le saurez jamais.'
);
t(
  'Every rule you add makes the context heavier — and a heavy context is exactly what makes agents drift.',
  'Chaque règle ajoutée alourdit la mémoire — et c’est précisément une mémoire lourde qui fait dériver les agents.'
);
t(
  '<div class="compare-head">SpecDrive — an MCP the agent can’t ignore</div>',
  '<div class="compare-head">SpecDrive — un MCP impossible à ignorer</div>'
);
t(
  'The rules are in the tools, not in memory. A move that isn’t allowed doesn’t get argued with — it <b>fails</b>.',
  'Les règles sont dans les outils, pas dans la mémoire. Un geste interdit ne se négocie pas — il <b>échoue</b>.'
);
t(
  'The to-do list is forced: next step only exists once the previous one is <b>proven</b> done.',
  'La liste des tâches est imposée&nbsp;: l’étape suivante n’existe qu’une fois la précédente <b>prouvée</b> terminée.'
);
t(
  'Near-zero context cost: the board keeps the memory; the agent only ever receives its next step.',
  'Coût en mémoire quasi nul&nbsp;: le tableau se souvient à sa place&nbsp;; l’agent ne reçoit jamais que son étape suivante.'
);
t(
  'Any agent, any company, same discipline — the workflow travels with the board, not with the model.',
  'N’importe quel agent, n’importe quel éditeur, même discipline — la méthode voyage avec le tableau, pas avec le modèle.'
);

t(
  'aria-label="Animated diagram: any agent connects to the SpecDrive MCP, which forces an ordered to-do list; a skip attempt is blocked until proof is given"',
  'aria-label="Schéma animé&nbsp;: n’importe quel agent se connecte au MCP SpecDrive, qui impose une liste de tâches ordonnée&nbsp;; toute tentative de sauter une étape reste bloquée tant que la preuve n’est pas fournie"'
);
t('<div class="m-core-sub">MCP server</div>', '<div class="m-core-sub">serveur MCP</div>');
t('<span class="m-box"></span> Write the specs', '<span class="m-box"></span> Écrire les spécifications');
t('<span class="m-box"></span> Walk the scenarios', '<span class="m-box"></span> Dérouler les scénarios');
t('<span class="m-box"></span> Build step 3', '<span class="m-box"></span> Construire l’étape 3');
t('<span class="m-proof">proof required</span>', '<span class="m-proof">preuve exigée</span>');
t('<span class="m-box"></span> Independent review', '<span class="m-box"></span> Relecture indépendante');
t('<div class="m-done">Done', '<div class="m-done">Terminé');
t('<span class="m-blocked">✕ blocked — prove it first</span>', '<span class="m-blocked">✕ bloqué — prouvez d’abord</span>');
t(
  'The agent asks for its next step; the server hands out exactly one — and “done” without proof bounces.',
  'L’agent demande son étape suivante&nbsp;; le serveur n’en donne qu’une — et un «&nbsp;terminé&nbsp;» sans preuve est refusé.'
);

/* -------------------------------------------------------- how it works --- */

t('<div class="label reveal">How it works</div>', '<div class="label reveal">Comment ça marche</div>');
t('<h2 class="reveal title">You talk. The board fills itself.</h2>', '<h2 class="reveal title">Vous parlez. Le tableau se remplit.</h2>');
t(
  'No forms, no jargon, nothing to write. Connect the AI agent you already use (Claude Code, Cursor, Windsurf, Gemini, Codex…) and describe what you want in your own words.',
  'Aucun formulaire, aucun jargon, rien à rédiger. Connectez l’agent IA que vous utilisez déjà (Claude Code, Cursor, Windsurf, Gemini, Codex…) et décrivez ce que vous voulez avec vos mots.'
);
t('<b>Tell your idea — or point at your existing app</b>', '<b>Racontez votre idée — ou montrez votre application existante</b>');
t(
  'Blank page or a real codebase with users and history: both work. On an existing app, the agent studies the actual code first and plans changes that don’t break what already works.',
  'Page blanche ou vraie application avec ses utilisateurs et son passé&nbsp;: les deux marchent. Sur une application existante, l’agent étudie d’abord le code réel, puis prévoit des changements qui ne cassent pas ce qui fonctionne déjà.'
);
t('<b>The board captures everything, live</b>', '<b>Le tableau capte tout, en direct</b>');
t(
  'Specs, usage scenarios, sketches of every screen, the plan, the risks — appearing on your screen as you speak. It’s your project’s memory, in plain words.',
  'Spécifications, scénarios d’usage, croquis de chaque écran, le plan, les risques — tout apparaît à l’écran pendant que vous parlez. C’est la mémoire de votre projet, en mots simples.'
);
t('<b>The build runs step by step, under rules</b>', '<b>La construction avance étape par étape, sous règles</b>');
t(
  'Ordered steps with dependencies, each one verified before it turns green. You watch real progress — and you can leave a note on any card; your agent reads it on its next pass.',
  'Des étapes ordonnées, chacune vérifiée avant de passer au vert. Vous suivez une vraie progression — et vous pouvez laisser un mot sur n’importe quelle carte&nbsp;; votre agent le lit à son passage suivant.'
);

/* ------------------------------------------------------- the build loop --- */

t('<div class="label reveal">The build loop</div>', '<div class="label reveal">La boucle de construction</div>');
t('<h2 class="reveal title">Then it builds.</h2>', '<h2 class="reveal title">Ensuite, ça construit.</h2>');
t(
  'The spec is finished — the enforcement isn’t. The same server now hands out the work: one task at a time, in dependency order, each one carrying the exact specs and choices it has to respect. “Done” isn’t a claim, it’s evidence. And the loop can’t be walked out of early — it closes only when everything still lines up and a fresh session, one that never wrote a line of the code, has signed it off.',
  'La spécification est finie — la contrainte, non. Le même serveur distribue maintenant le travail&nbsp;: une tâche à la fois, dans l’ordre des dépendances, chacune portant les spécifications et les choix exacts qu’elle doit respecter. «&nbsp;Terminé&nbsp;» n’est pas une affirmation, c’est une preuve. Et on ne sort pas de la boucle en avance&nbsp;: elle ne se ferme que si tout tient encore debout et qu’une session neuve, qui n’a pas écrit une ligne du code, a donné son feu vert.'
);
t(
  'aria-label="Animated diagram of the build loop: the server hands out the next task in dependency order, the agent builds it against its specs, proves it, and the task turns verified — then the loop repeats until a convergence check and an independent review close it"',
  'aria-label="Schéma animé de la boucle de construction&nbsp;: le serveur distribue la tâche suivante dans l’ordre des dépendances, l’agent la construit en respectant ses spécifications, la prouve, et la tâche passe en vérifiée — puis la boucle recommence jusqu’à ce qu’un contrôle de cohérence et une relecture indépendante la referment"'
);
t('<div class="s-sub">chosen by the server</div>', '<div class="s-sub">choisie par le serveur</div>');
t('</svg> dependency order</span>', '</svg> ordre des dépendances</span>');
t('<div class="s-name">build it</div>', '<div class="s-name">construire</div>');
t('<div class="s-sub">with the specs attached</div>', '<div class="s-sub">spécifications jointes</div>');
t('</svg> respects spec #12</span>', '</svg> respecte la spéc. 12</span>');
t('<div class="s-name">prove it</div>', '<div class="s-name">prouver</div>');
t('<div class="s-sub">what ran, what appeared</div>', '<div class="s-sub">ce qui a tourné et s’affiche</div>');
t('<span class="s-chip">proof attached</span>', '<span class="s-chip">preuve jointe</span>');
t('<div class="s-name">verified</div>', '<div class="s-name">vérifié</div>');
t('<div class="s-sub">green, and it stays green</div>', '<div class="s-sub">au vert, et ça y reste</div>');
t('<span class="s-chip">✓ closed</span>', '<span class="s-chip">✓ clos</span>');
t('<div class="rlabel">next task — no way out of the loop</div>', '<div class="rlabel">tâche suivante — pas de sortie de boucle</div>');
t('<span>final walkthrough of every promise</span>', '<span>revue finale des promesses</span>');
t('<span>review by fresh eyes</span>', '<span>relecture à l’œil neuf</span>');
t('<span>only then: shipped</span>', '<span>et seulement là&nbsp;: livré</span>');
t(
  'Every task carries its own specs, and nothing closes on a promise.',
  'Chaque tâche porte ses propres spécifications, et rien ne se ferme sur une promesse.'
);

/* --------------------------------------------------- loop engineering --- */

t('<div class="label reveal">Loop engineering</div>', '<div class="label reveal">Construction autonome</div>');
t('<h2 class="reveal title">It can build without you.</h2>', '<h2 class="reveal title">Elle peut construire sans vous.</h2>');
t(
  'Launch the autonomous run and walk away: the agent takes the next step, proves it, checks it off, takes the next one. And here is the part that changes everything — <b>it can stop at any moment and lose nothing.</b>',
  'Lancez la construction autonome et allez faire autre chose&nbsp;: l’agent prend l’étape suivante, la prouve, la coche, passe à la suivante. Et voilà ce qui change tout — <b>elle peut s’arrêter à n’importe quel moment sans rien perdre.</b>'
);
t('<b>Your AI plan hits its usage limit? Fine.</b>', '<b>Votre abonnement IA atteint sa limite&nbsp;? Aucun souci.</b>');
t(
  'Every finished step is already saved on the big build to-do list — with its proof. Nothing lives in the agent’s head, so nothing is lost when the session ends.',
  'Chaque étape terminée est déjà enregistrée sur la grande liste de construction — avec sa preuve. Rien ne vit dans la tête de l’agent, donc rien ne se perd quand la session s’arrête.'
);
t('<b>The next session just continues.</b>', '<b>La session suivante reprend, tout simplement.</b>');
t(
  'Open a fresh chat whenever you’re back. It asks the board for the next step and resumes exactly where the last one stopped — same rules, same order, same discipline.',
  'Ouvrez une nouvelle conversation quand vous revenez. Elle demande son étape suivante au tableau et repart exactement là où la précédente s’était arrêtée — mêmes règles, même ordre, même discipline.'
);
t('<b>It knows when to stop on its own.</b>', '<b>Elle sait s’arrêter d’elle-même.</b>');
t(
  'A question only you can answer, a genuinely stuck step, or the end of its budget — the run ends with a plain-words report, never by silently pushing through.',
  'Une question à laquelle vous seul pouvez répondre, une étape vraiment bloquée, ou la fin du budget — la séance se termine par un compte rendu en mots simples, jamais en forçant en silence.'
);
t(
  'aria-label="Animated diagram: a build run pauses when the rate limit is reached, and a fresh session resumes from the exact same step"',
  'aria-label="Schéma animé&nbsp;: une construction se met en pause quand la limite d’usage est atteinte, et une nouvelle session repart exactement à la même étape"'
);
t('<span class="r-box"></span> Step 11 — payment form', '<span class="r-box"></span> Étape 11 — formulaire de paiement');
t('<span class="r-box"></span> Step 12 — error messages', '<span class="r-box"></span> Étape 12 — messages d’erreur');
t('<span class="r-tag">proof saved</span>', '<span class="r-tag">preuve gardée</span>');
t(
  '<span class="r-ic">⏸</span> Rate limit reached — everything is on the board',
  '<span class="r-ic">⏸</span> Limite d’usage atteinte — tout est sur le tableau'
);
t(
  '<span class="r-ic play">▶</span> Fresh session resumes at step 13 — nothing lost',
  '<span class="r-ic play">▶</span> Nouvelle session, reprise à l’étape 13 — rien de perdu'
);
t('<span class="r-box active"></span> Step 13 — email receipt', '<span class="r-box active"></span> Étape 13 — reçu par e-mail');
t('<span class="r-tag live">building…</span>', '<span class="r-tag live">en cours…</span>');
t(
  'The to-do list is the memory. Sessions are disposable; progress isn’t.',
  'La liste des tâches est la mémoire. Les sessions sont jetables&nbsp;; les progrès, non.'
);

/* ---------------------------------------------------------------- band --- */

t(
  '<p class="band-quote">A supervisor the AI<br /><em>cannot talk its way past.</em></p>',
  '<p class="band-quote">Un superviseur que l’IA<br /><em>ne peut pas embobiner.</em></p>'
);
t(
  'Every step proven. Every change re-checked. Nothing closed on a promise.',
  'Chaque étape prouvée. Chaque changement recontrôlé. Rien de clos sur une promesse.'
);

/* -------------------------------------------------------- a look inside --- */

t('<div class="label reveal">A look inside</div>', '<div class="label reveal">Vu de l’intérieur</div>');
t('<h2 class="reveal title">Real pixels, real project.</h2>', '<h2 class="reveal title">Vrais pixels, vrai projet.</h2>');
t(
  'Three moments from the screenshot above — the kind of thing the board does for you all day.',
  'Trois moments tirés de l’image ci-dessus — le genre de chose que le tableau fait pour vous toute la journée.'
);
t(
  'alt="A challenge note on a spec: the AI found a contradiction between two specs and flagged it"',
  'alt="Une contre-expertise sur une spécification&nbsp;: l’IA a trouvé une contradiction entre deux spécifications et l’a signalée"'
);
t('<b>The AI challenges its own specs</b>', '<b>L’IA conteste ses propres spécifications</b>');
t(
  'A fresh session hunted this contradiction down before a single line of code existed — and wrote it on the card, in plain words.',
  'Une session neuve a débusqué cette contradiction avant qu’une seule ligne de code existe — et l’a écrite sur la carte, en mots simples.'
);
t(
  'alt="The next-step rail: where you are, what to do next, one button to copy the prompt"',
  'alt="Le rail de l’étape suivante&nbsp;: où vous en êtes, quoi faire ensuite, un bouton pour copier la consigne"'
);
t('<b>Always one obvious next step</b>', '<b>Toujours une étape suivante évidente</b>');
t(
  'The rail shows where you are in the loop and hands you the exact prompt to paste. One blue button at a time.',
  'Le rail montre où vous en êtes dans la boucle et vous donne la consigne exacte à coller. Un seul bouton bleu à la fois.'
);
t(
  'alt="Hard parts flagged for a dedicated deep-dive session"',
  'alt="Les points difficiles signalés pour une session d’investigation dédiée"'
);
t('<b>Hard parts get their own session</b>', '<b>Les points durs ont leur propre session</b>');
t(
  'Genuinely difficult topics are flagged and get a dedicated investigation prompt — not hand-waved into the plan.',
  'Les sujets vraiment difficiles sont signalés et reçoivent leur propre consigne d’investigation — au lieu d’être glissés dans le plan d’un revers de main.'
);

/* ------------------------------------------------------ why different --- */

t('<div class="label reveal">Why it’s different</div>', '<div class="label reveal">Ce qui change</div>');
t('<h2 class="reveal title">An agent that can’t cut corners.</h2>', '<h2 class="reveal title">Un agent qui ne peut rien bâcler.</h2>');
t(
  'Everything above, in one place — the six guarantees, each enforced by the tools, never by trust.',
  'Tout ce qui précède, réuni — les six garanties, chacune imposée par les outils, jamais par la confiance.'
);
t('<b>Proof, not promises</b>', '<b>Des preuves, pas des promesses</b>');
t(
  'A step can’t be marked done without evidence: what was run, what appeared on screen. It’s shown to you under every finished step.',
  'Une étape ne peut pas être cochée sans preuve&nbsp;: ce qui a été lancé, ce qui s’est affiché à l’écran. C’est montré sous chaque étape terminée.'
);
t('<b>Independent review, enforced</b>', '<b>Relecture indépendante, imposée</b>');
t(
  'A project can’t close until a fresh session — one that didn’t write the code — has reviewed it. And yesterday’s review never covers today’s changes.',
  'Un projet ne peut pas se clore tant qu’une session neuve — qui n’a pas écrit le code — ne l’a pas relu. Et la relecture d’hier ne couvre jamais les changements d’aujourd’hui.'
);
t('<b>Security is not optional</b>', '<b>La sécurité n’est pas optionnelle</b>');
t(
  'Every plan must end with tests and a security &amp; privacy pass. Skipping anything requires a written reason that lands on your board, visibly.',
  'Tout plan doit finir par des tests et un passage sécurité &amp; confidentialité. Sauter quoi que ce soit exige une raison écrite, qui s’affiche sur votre tableau, en clair.'
);
t('<b>It notices drift</b>', '<b>Il repère les écarts</b>');
t(
  'If the code changes while nobody’s watching the board, you get a warning before anything is trusted again.',
  'Si le code bouge pendant que personne ne regarde le tableau, vous êtes prévenu avant qu’on refasse confiance à quoi que ce soit.'
);
t('<b>House rules above projects</b>', '<b>Des règles maison au-dessus des projets</b>');
t(
  'Company charter, compliance, “always in French”, “data stays in the EU” — set standing rules once per folder; every project inside follows them, in every phase.',
  'Charte d’entreprise, conformité, «&nbsp;toujours en français&nbsp;», «&nbsp;les données restent en Europe&nbsp;» — posez les règles une fois par dossier&nbsp;; chaque projet à l’intérieur les suit, à chaque phase.'
);
t('<b>The board talks back</b>', '<b>Le tableau vous répond</b>');
t(
  'Click any card, leave a note in your own words. Your agent treats it as top priority and reports back what it did about it.',
  'Cliquez sur n’importe quelle carte, laissez un mot avec vos mots. Votre agent en fait sa priorité et vous rend compte de ce qu’il en a fait.'
);

/* ---------------------------------------------------------- house rules --- */

t('<div class="label reveal">House rules</div>', '<div class="label reveal">Règles maison</div>');
t('<h2 class="reveal title">Rules that are already there.</h2>', '<h2 class="reveal title">Des règles déjà en place.</h2>');
t(
  'Your company’s non-negotiables shouldn’t be re-explained at the start of every project. Put them on a folder once — security, design, structure, or anything else you care about, from a ready-made preset or in your own words. Every project born in that folder starts with them already loaded, from the first spec to the last line of code.',
  'Les non-négociables de votre entreprise ne devraient pas être réexpliqués au début de chaque projet. Posez-les une seule fois sur un dossier — sécurité, design, structure, ou tout ce qui compte pour vous, à partir d’un modèle prêt à l’emploi ou avec vos propres mots. Chaque projet né dans ce dossier démarre avec elles déjà chargées, de la première spécification à la dernière ligne de code.'
);
t(
  'aria-label="Animated diagram: three standing rules set on a folder — security, design and structure — are stamped automatically onto every new project created inside it"',
  'aria-label="Schéma animé&nbsp;: trois règles permanentes posées sur un dossier — sécurité, design et structure — sont apposées automatiquement sur chaque nouveau projet créé à l’intérieur"'
);
t('</svg>\n            Your folder', '</svg>\n            Votre dossier');
t('<span class="r-rule" style="--i:0">Security — no secrets in code</span>', '<span class="r-rule" style="--i:0">Sécurité — aucun secret dans le code</span>');
t('<span class="r-rule" style="--i:1">Design — tokens only</span>', '<span class="r-rule" style="--i:1">Design — la charte, rien d’autre</span>');
t('<span class="r-rule" style="--i:2">Structure — small modules</span>', '<span class="r-rule" style="--i:2">Structure — de petits modules</span>');
t('<div class="r-card-title">New project</div>', '<div class="r-card-title">Nouveau projet</div>');
t('<div class="r-card-sub">created inside the folder — day one</div>', '<div class="r-card-sub">créé dans le dossier — dès le premier jour</div>');
t('<span class="r-stamp" style="--i:0">Security</span>', '<span class="r-stamp" style="--i:0">Sécurité</span>');
t(
  'Set them once. Every project born in the folder obeys them — in every phase.',
  'Posez-les une fois. Chaque projet né dans le dossier les respecte — à chaque phase.'
);

/* ----------------------------------------------------------------- faq --- */

t('<div class="label reveal">Good to know</div>', '<div class="label reveal">Bon à savoir</div>');
t('<h2 class="reveal title">Before you download.</h2>', '<h2 class="reveal title">Avant de télécharger.</h2>');
t('<summary>Do I need an AI coding tool already?</summary>', '<summary>Faut-il déjà avoir un outil de code IA&nbsp;?</summary>');
t(
  'Yes — SpecDrive supervises the one you use (Claude Code, Cursor, Windsurf, Gemini, Codex…). It doesn’t write code itself; it makes sure the one that does can’t skip steps or claim work it hasn’t proven.',
  'Oui — SpecDrive supervise celui que vous utilisez (Claude Code, Cursor, Windsurf, Gemini, Codex…). Il n’écrit pas le code lui-même&nbsp;; il s’assure que celui qui l’écrit ne peut ni sauter d’étape ni revendiquer un travail qu’il n’a pas prouvé.'
);
t('<summary>Where does my project data live?</summary>', '<summary>Où vivent les données de mon projet&nbsp;?</summary>');
t(
  'On your Mac, in plain files you own. SpecDrive has no account, no server, no telemetry. Your specs never leave your machine.',
  'Sur votre Mac, dans des fichiers ordinaires qui vous appartiennent. SpecDrive n’a ni compte, ni serveur, ni mouchard. Vos spécifications ne quittent jamais votre machine.'
);
t('<summary>Is it really free?</summary>', '<summary>C’est vraiment gratuit&nbsp;?</summary>');
t(
  'Free, and open source. The whole thing — the board, the server, the rules — is on GitHub, and you can read exactly what it does.',
  'Gratuit, et open source. L’ensemble — le tableau, le serveur, les règles — est sur GitHub, et vous pouvez lire exactement ce qu’il fait.'
);
t('<summary>What if I’m not technical at all?</summary>', '<summary>Et si je ne suis pas technique du tout&nbsp;?</summary>');
t(
  'That’s who it’s built for. You describe what you want in your own words; the board is written in plain language, and you can leave a note on any card that your AI reads on its next pass.',
  'C’est exactement pour vous qu’il est fait. Vous décrivez ce que vous voulez avec vos mots&nbsp;; le tableau est écrit en langage clair, et vous pouvez laisser sur chaque carte un mot que votre IA lit à son passage suivant.'
);
t('<summary>What if my AI plan runs out mid-build?</summary>', '<summary>Et si mon abonnement IA s’épuise en pleine construction&nbsp;?</summary>');
t(
  'Nothing is lost. Every finished step is already saved with its proof, so a fresh session picks up at the exact next step.',
  'Rien n’est perdu. Chaque étape terminée est déjà enregistrée avec sa preuve, donc une nouvelle session repart exactement à l’étape suivante.'
);

/* ------------------------------------------------------------ download --- */

t('<div class="label reveal">Get it</div>', '<div class="label reveal">L’obtenir</div>');
t('<h2 class="reveal title">Download SpecDrive</h2>', '<h2 class="reveal title">Télécharger SpecDrive</h2>');
t(
  'SpecDrive doesn’t replace your AI tool — it supervises the one you already have. One click connects the tools we detect; one copy-paste connects any other. And everything — your specs, your plans, your data — stays on your Mac.',
  'SpecDrive ne remplace pas votre outil IA — il supervise celui que vous avez déjà. Un clic connecte les outils que nous détectons&nbsp;; un copier-coller connecte tous les autres. Et tout — vos spécifications, vos plans, vos données — reste sur votre Mac.'
);
t('<span class="btn-arrow" aria-hidden="true">↓</span>&nbsp; Download SpecDrive for Mac', '<span class="btn-arrow" aria-hidden="true">↓</span>&nbsp; Télécharger SpecDrive pour Mac');
t(
  'Version 0.1.5 · macOS 13+ · Macs with Apple chips (M1 and newer) · Free',
  'Version 0.1.5 · macOS 13+ · Mac à puce Apple (M1 et plus récents) · Gratuit'
);

/* ----------------------------------------------------------------- oss --- */

t('<b>Built in the open.</b>', '<b>Construit à ciel ouvert.</b>');
t(
  'The board, the server, the rules — all of it is on GitHub. Read the code, open an issue, or send us a change. We’d rather build this with you than for you.',
  'Le tableau, le serveur, les règles — tout est sur GitHub. Lisez le code, ouvrez un ticket, ou envoyez-nous un changement. On préfère construire ça avec vous que pour vous.'
);
t('>View the code</a>', '>Voir le code</a>');
t("' on GitHub'", "' sur GitHub'");

/* -------------------------------------------------------------- footer --- */

t('Crafted by Connected Mate', 'Conçu par Connected Mate');
t('>Open source on GitHub</a>', '>Open source sur GitHub</a>');
t('>All releases</a>', '>Toutes les versions</a>');

/* ------------------------------------------------- paths, from /fr/ ------ */

out = out.replace(/(src|href)="assets\//g, '$1="../assets/');

/* ---------------------------------------------------------------- write -- */

mkdirSync(join(root, 'fr'), { recursive: true });
writeFileSync(join(root, 'fr', 'index.html'), out, 'utf8');

if (missing > 0) {
  console.log(`\n${missing} English string(s) could not be found — the French page may be stale.`);
  process.exitCode = 1;
} else {
  console.log('fr/index.html regenerated — every string matched.');
}
