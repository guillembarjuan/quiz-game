# Estil del Quiz Trivial

La referència visual completa és **`mockup.html`**: obre'l directament al navegador
(doble clic o arrossega'l a la finestra). No necessita servidor ni connexió.

Els PNG `01-benvinguda.png`, `02-tipus.png`, `03-pregunta.png` i `04-resultats.png`
són captures de les pantalles de `mockup.html` (escriptori a 1280 px i mòbil a 390 px).

Tots els valors d'aquest document surten del CSS real de l'app (`css/*.css`).
Si l'app canvia, cal actualitzar `mockup.html`, aquest fitxer i les captures.

## Paleta de colors

Contrast: ràtio WCAG 2.1 entre el text i el fons indicats. AA demana 4,5:1 per a
text normal i 3:1 per a text gran.

| Nom | Valor | Ús | Contrast |
| --- | --- | --- | --- |
| Primari | `#4338ca` (`--color-primary`) | Botons, vores dels botons, etiqueta superior, temporitzador | 7,90:1 amb blanc (AAA) |
| Fons | `#f4f5fb` (`--color-bg`) | Fons de la pàgina | 14,95:1 amb el text (AAA) |
| Text | `#172033` (`--color-text`) | Text general, vora del camp de nom, contorn de focus | 16,27:1 sobre blanc (AAA) |
| Superfície | `#ffffff` (`--color-surface`) | Targetes, botons secundaris, text dels botons primaris | — |
| Encert | vora `#147a45`, fons `#e6f7ee`, text `#115c35` | Opció correcta (`.correct`) | 7,25:1 (AAA) |
| Error / perill | vora `#b42332`, fons `#fff0f0`, text `#8c1b28` | Opció incorrecta (`.wrong`), error del joc, temporitzador als últims 5 s | 8,24:1 (AAA) |
| Avís | `#d35400` | «Resposta correcta: …» a la llista de resultats | 4,17:1 sobre blanc, 3,90:1 sobre `#fff5f5` (no AA) |
| Vora desactivada | `#cbd0df` | Opcions que ja no es poden triar | 1,54:1 (només decorativa) |
| Pista del temporitzador | `color-mix(text 10 %, superfície)` ≈ `#e8e9eb` | Fons de la barra de temps | — |

Colors que només surten a `results.css` i no formen part de la paleta:
`#2ecc71` i `#f0fff4` (encert), `#e74c3c` i `#fff5f5` (error), i els valors per
defecte `#e0e0e0`, `#ccc` i `#f9f9f9` de variables que no existeixen.

## Tipografia

Una sola família, la del sistema: `system-ui, -apple-system, "Segoe UI", sans-serif`.
No es carrega cap font externa. Text base de 16 px i interlineat 1,5.

| Element | Mida | Pes | Interlineat / altres |
| --- | --- | --- | --- |
| Títol de pantalla (`h1`/`h2` de benvinguda i tipus) | 28–36 px (`clamp(1.75rem, 5vw, 2.25rem)`) | 700 | 1,5 |
| Subtítol (`h2` de resultats) | 24 px | 700 | 1,5 |
| Enunciat de la pregunta | 24 px | 700 | 1,35 |
| Xifra del temporitzador | 28 px | 700 | xifres tabulars |
| Resum de resultats | 20 px | 700 | color primari, centrat |
| Cos | 16 px | 400 | 1,5 |
| Etiqueta superior | 16 px | 750 | majúscules, espaiat .08em (.06em al joc) |
| Etiqueta de formulari | 16 px | 650 | — |
| Botó | 16 px | 650 | — |
| Ajuda, temps i «Tornar als tipus» | 14,4 px (.9rem) | 400 / 650 | — |
| Insígnia de resultat | 12,8 px (.8rem) | 700 | majúscules |

## Espaiats, radis i ombres

Unitat base `--space: 1rem` (16 px). Escala utilitzada: 8, 12, 16, 24, 40 i 48 px.

| On | Mòbil | ≥ 48rem (768 px) |
| --- | --- | --- |
| Marge de la pantalla (`.screen`) | 16 px | 48 px |
| Farciment de la targeta (`.card`) | 24 px | 40 px |
| Separació entre opcions de resposta | 12 px | 12 px |
| Separació entre categories i entre resultats | 16 px | 16 px |
| Botó | 12 × 20 px, alçada mínima 48 px | igual |

- Radis: targeta 16 px (`--radius`), botó i camp 8 px, barra del temporitzador 999 px,
  element de resultats 6 px i insígnia 4 px.
- Ombra de la targeta: `0 12px 40px #17203312` (text al 7 % d'opacitat).
- Focus: `outline: 3px solid #172033` amb `outline-offset: 4px`.
- Punts de tall: 40rem (640 px) opcions en 2 columnes; 48rem (768 px) més marge i
  categories en 2 columnes.

## Components

| Component | Estats dibuixats a `mockup.html` |
| --- | --- |
| Botó `.btn` (secundari) i `.btn--primary` | normal, hover (`brightness(.93)`), focus, desactivat (`opacity: .55`) |
| Camp de text `#player-name` | normal, focus, error (vora discontínua i missatge en negreta) |
| Opció de resposta `.game-option` | normal, hover, seleccionada (focus de teclat), correcta, incorrecta, desactivada |
| Pregunta resposta | encert, error i temps esgotat, amb el missatge de feedback |
| Targeta `.card` | amplada màxima 42rem (46rem al joc, 650 px als resultats) |
| Temporitzador `#timer` | inici (15 s), normal, últims 5 segons (`.timer--danger`), esgotat |
| Barra de progrés | a l'app és text («Pregunta 2 de 5» i «Punts: 1»); la barra visual és una **proposta** |
| Element de resultats `.results__item` | correcte, incorrecte, temps esgotat |

El resultat d'una resposta no depèn només del color: les opcions hi afegeixen el text
«— Correcta» o «— La teva resposta», i el feedback ho diu amb paraules.

## Pantalles i flux

1. **Benvinguda**: nom obligatori, sense espais als extrems i màxim 20 caràcters.
2. **Tipus**: salutació amb el nom i un botó per categoria, llegides de `QUESTIONS`.
3. **Pregunta**: categoria, progrés, punts, temporitzador de 15 s, enunciat i quatre
   respostes. Cada partida té 5 preguntes en ordre aleatori.
4. **Resultats**: puntuació, revisió de respostes, «Tornar a jugar» (va als tipus i
   manté el nom) o «Sortir» (va a la benvinguda i esborra el nom).

Des de la pregunta, «Tornar als tipus» atura la partida. En mòbil les opcions i les
categories s'apilen en una columna. Les categories dels dibuixos són les del banc
actual (Esport i Menjar), no una llista fixa.

## Diferències pendents entre l'app i la guia

L'app no s'ha modificat. Aquests punts s'haurien de revisar en una issue a part:

- `results.css` fa servir colors fora de la paleta (`#2ecc71`, `#e74c3c`, `#d35400`)
  en lloc dels d'encert i error de `game.css`.
- Les insígnies «Correcta» (2,10:1) i «Incorrecta» (3,82:1) i el text «Resposta
  correcta» sobre `#fff5f5` (3,90:1) no arriben al contrast AA.
- `results.css` fa servir variables que no existeixen (`--color-border`,
  `--color-bg-card`) i un color per defecte `#2c3e50` per al primari.
- Radis en píxels a resultats (6 px i 4 px) i amplada de 650 px, mentre la resta fa
  servir `--radius` i `rem`.
- `#b42332` es repeteix a `game.css` i `timer.css` sense ser una variable.
- L'etiqueta superior té espaiat .08em a les pantalles d'accés i .06em al joc.
- Hi ha dos punts de tall diferents (40rem al joc i 48rem a la resta).
- No hi ha barra visual de progrés: es proposa al mockup.
