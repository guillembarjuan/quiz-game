# Planificació

Planificació del Quiz Trivial: com treballem, qui fa què, quan i com arriba cada canvi a `main`.

## 1. Metodologia

Fem servir **Scrumban**: el tauler de Kanban del GitHub Project per seguir la feina dia a dia i sprints curts de Scrum per marcar objectius i dates.

### Tauler Kanban

Cada tasca és una issue amb la seva targeta al tauler. Les columnes són:

| Columna | Significat |
|---------|------------|
| Backlog | Tasques pendents, encara no començades |
| In progress | Algú hi està treballant a la seva branca |
| In review | Hi ha una PR oberta esperant la revisió d'un company |
| Done | La tasca compleix la definició de fet |

**Límit de WIP:** cada persona pot tenir com a **màxim 2 targetes a In progress**. Per començar-ne una de nova, primer se n'ha d'acabar o bloquejar una altra.

### Sprints i cerimònies

Els sprints són curts (d'un o dos dies) i cadascun acaba amb una versió etiquetada a `main`.

| Cerimònia | Quan | Durada | Contingut |
|-----------|------|--------|-----------|
| Sprint planning | 11/11 a la nit | 15 min | Repartir les tasques i omplir el tauler |
| Daily | 12/11 al matí | 15 min | Què vaig fer, què faré, què em bloqueja |
| Sprint review | Seguiment del 12/11 | El que marqui el professor | Ensenyar la versió de `main` |
| Retrospectiva | Després del seguiment | 15 min | Què ha anat bé, què millorem |

### Definició de fet

Una tasca està feta quan:

- [ ] Funciona al navegador.
- [ ] La PR l'ha revisada i aprovada un company.
- [ ] Els commits segueixen el format `tipus(àmbit): descripció`.
- [ ] La issue és a la columna Done.

## 2. Equip i rols

| Nom | Usuari de GitHub | Rol |
|-----|------------------|-----|
| Guillem | guillembarjuan | Integració, temporitzador i etiquetes de versió |
| Miquel | miguelvico | Preguntes, resultats i requisits |
| Pol | polserrano | Lògica del joc |
| Joan | joanosunaa | Disseny, mockup i pantalles d'accés |

## 3. Sprints

### Sprint 1 (10/11 – 11/11)

**Objectiu:** tenir l'estructura, el mockup i una partida jugable (accés, joc i preguntes) i publicar-ho com a v1.1.

| Tasca | Responsable | Branca | PR |
|-------|-------------|--------|----|
| Estructura del repo, Project i planificació | guillembarjuan | dev/guillem | — |
| Mockup i CSS base | joanosunaa | dev/joan | #2 |
| Pantalles d'accés (nom i tipus) | joanosunaa | dev/joan | #11 |
| Banc de preguntes (`js/questions.js`) | miguelvico | dev/miquel | #9 |
| Joc principal, gestió de preguntes i temps per pregunta | polserrano | dev/pol | #15 |
| Tag v1.1 | guillembarjuan | main | — |

### Sprint 2 (12/11)

**Objectiu:** completar la partida amb resultats i temporitzador, integrar-ho tot a `test` i publicar la v1.2 abans del seguiment.

| Tasca | Responsable | Branca |
|-------|-------------|--------|
| Temporitzador (`js/timer.js`, `css/timer.css`) | guillembarjuan | dev/guillem |
| Resultats i tornar a jugar | miguelvico | dev/miquel |
| Anàlisi de requisits (`docs/requisits.md`) | miguelvico | dev/miquel |
| Integració a `test`, PR a `main` i tag v1.2 | guillembarjuan | dev/guillem |

## 4. Flux de Git

| Branca | Ús |
|--------|----|
| `main` | Protegida. Només versions estables, cadascuna amb el seu tag. |
| `test` | Integració: s'hi proven junts els canvis de tothom abans de passar a `main`. |
| `dev/<nom>` | Branca de treball de cada persona (`dev/guillem`, `dev/miquel`, `dev/joan`, `dev/pol`). |
| `feature/*` | Una branca per tasca, creada des de la `dev/<nom>` de cadascú. |

Recorregut d'un canvi: `feature/*` → `dev/<nom>` → `test` → `main`.

Normes:

- Tot el que entra a `test` o a `main` passa per una **pull request amb revisió creuada**: l'aprova un company que no n'és l'autor.
- Les PR es fusionen amb **merge commit**, per conservar l'historial de cada branca.
- **Mai s'esborren branques**, tampoc després de fusionar-les.
- Cada versió de `main` porta un **tag anotat** amb el format `vX.Y - contingut`.

## 5. Versions

| Versió | Estat | Contingut |
|--------|-------|-----------|
| v1.0 | Publicada (11/11) | Estructura inicial del projecte i README |
| v1.1 | Publicada (12/11) | Accés (nom i tipus), joc i preguntes, amb el mockup i els estils base |
| v1.2 | Prevista (12/11) | Resultats, tornar a jugar i temporitzador |

## 6. Normes de commits

Format: `tipus(àmbit): descripció`, en català i en present.

| Tipus | Quan s'usa |
|-------|------------|
| `feat` | Funcionalitat nova |
| `fix` | Correcció d'un error |
| `docs` | Documentació |
| `style` | Estils o format, sense canviar la lògica |
| `refactor` | Reorganització del codi sense canviar-ne el comportament |
| `test` | Proves |
| `chore` | Manteniment i estructura del repo |

L'àmbit és la part del projecte: `timer`, `game`, `access`, `questions`, `results`, `base`, `mockup`, `planificacio`...

Exemples:

- `feat(timer): afegeix el compte enrere de cada pregunta`
- `fix(game): corregeix el recompte de respostes correctes`
- `docs(readme): actualitza el flux de branques`
