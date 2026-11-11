# Comprovació de les pantalles d'accés

Obre `index.html` directament al navegador. No necessita servidor ni mòduls.

| Cas | Resultat esperat |
| --- | --- |
| Nom buit o només espais, amb Enter | Error visible i focus al camp |
| Nom de 21 caràcters | Error de màxim 20 caràcters |
| `  Joan  `, amb Enter | `state.playerName` és `Joan` i salutació `Hola, Joan!` |
| Banc de preguntes buit | Missatge de categories no disponibles |
| Categoria afegida a `QUESTIONS` | Botó amb el seu `label`, sense editar access.js |
| Selecció de categoria | `startGame(state.playerName, clau)` |
| Nom amb etiquetes HTML | Es mostra com a text, sense interpretar HTML |
| Amplades de 390 i 1280 px | Sense desbordament horitzontal |

Verificat amb Chrome automatitzat el 11/11/2026, sense errors de JavaScript.
Les categories i la crida a `startGame` s'han comprovat amb dades i una funció
de prova en memòria: no s'han modificat `questions.js` ni `game.js`.
La partida completa s'ha de comprovar quan els companys integrin les seves parts.

La primera PR (#2) conté mockups i base i està aprovada per Pol i fusionada.
Les pantalles de `feature/access-screens` estan integrades a `dev/joan`,
sincronitzada amb `test`, per a la segona PR. Cal l'aprovació de Pol abans
de fusionar aquesta segona PR cap a `test`.
