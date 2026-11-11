# Estil del Quiz Trivial

Mockups de referència: `01-benvinguda.png`, `02-tipus.png`, `03-pregunta.png` i `04-resultats.png`.
Són propostes visuals; joc i resultats corresponen a Pol i Miquel.

## Paleta i tipografia

| Ús | Color |
| --- | --- |
| Principal i botons | `#4338ca` |
| Fons | `#f4f5fb` |
| Text | `#172033` |
| Targetes i text sobre botó | `#ffffff` |

Tipografia de sistema: system-ui, Segoe UI, sans-serif. Text base de 16 px,
interlineat 1,5. Títols entre 28 i 36 px. No cal carregar fonts externes.

## Components

- `.screen`: ocupa com a mínim l’alçada de la finestra; amagada per defecte.
  `main.js` hi afegeix `.active` per mostrar-la.
- `.card`: superfície blanca, amplada màxima 42rem, cantonades d’1rem.
- `.btn`: botó amb vora principal, alçada mínima 48px i focus visible.
- `.btn--primary`: fons principal i text blanc.
- Separació base: `--space: 1rem`; espais més grans en escriptori.
- Formulari amb etiqueta sempre visible i errors en text, sense dependre del color.

## Flux

1. Benvinguda: nom obligatori, sense espais als extrems i màxim 20 caràcters.
2. Tipus: salutació amb el nom i categories llegides de `QUESTIONS`.
3. Pregunta: progrés, temps restant, enunciat i quatre respostes.
4. Resultats: puntuació, revisió de respostes, tornar a jugar o sortir.

En mòbil els controls s’apilen. En escriptori les categories poden ocupar dues columnes.
Les categories dels dibuixos són exemples, no una llista fixa.
