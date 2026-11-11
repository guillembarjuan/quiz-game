# Quiz Trivial

## Propòsit

Joc de preguntes tipus trivial fet amb HTML, CSS i JavaScript (sense frameworks). És la pràctica del mòdul Projecte Web & GitHub del DAM per treballar en equip amb Git/GitHub i amb la metodologia Scrum/Kanban (GitHub Projects).

## Equip

| Nom | Usuari de GitHub | Part |
|-----|------------------|------|
| Guillem Barjuan | [guillembarjuan](https://github.com/guillembarjuan) | Git, organització, temporitzador i integració |
| Miquel | [miguelvico](https://github.com/miguelvico) | Requisits, banc de preguntes, resultats i tornar a jugar |
| Joan | [joanosunaa](https://github.com/joanosunaa) | Mockup, estils base, pantalles de nom i tipus |
| Pol | [polserrano](https://github.com/polserrano) | Joc principal i gestió de preguntes |

## Estructura de carpetes

```
quiz-game/
├── index.html          # Esquelet de la pàgina amb les 4 pantalles
├── README.md
├── css/
│   ├── base.css        # Joan
│   ├── access.css      # Joan
│   ├── game.css        # Pol
│   ├── results.css     # Miquel
│   └── timer.css       # Guillem
├── js/
│   ├── questions.js    # Miquel
│   ├── timer.js        # Guillem
│   ├── access.js       # Joan
│   ├── game.js         # Pol
│   ├── results.js      # Miquel
│   └── main.js         # Guillem
└── docs/
    ├── requisits.md    # Miquel
    ├── planificacio.md # Guillem
    └── mockup/         # Joan
```

## Flux de branques

- `main`: només versions estables i etiquetades. Protegida.
- `test`: branca d'integració on es proven els canvis de tothom junts.
- `dev/<nom>`: branca de treball de cada persona (`dev/guillem`, `dev/miquel`, `dev/joan`, `dev/pol`).
- `feature/...`: una branca per tasca, que surt de la `dev/<nom>` de cadascú.

Recorregut d'un canvi: `feature/...` → `dev/<nom>` → `test` → `main`.
Tot el que entra a `test` o a `main` passa per una pull request aprovada per un company.

## Convenció de commits

Format: `tipus(àmbit): descripció`, en català i en present.

Tipus: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

Exemples:

- `feat(timer): afegeix el compte enrere de cada pregunta`
- `fix(game): corregeix el recompte de respostes correctes`
- `docs(readme): actualitza el flux de branques`

## Versions previstes

| Versió | Contingut |
|--------|-----------|
| v1.0 | Estructura del projecte |
| v1.1 | Accés (nom i tipus) + joc + preguntes |
| v1.2 | Resultats + tornar a jugar + temps |

## Com executar-lo

No cal instal·lar res: obre `index.html` amb el navegador.
