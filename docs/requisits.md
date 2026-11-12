# Anàlisi de Requisits — Projecte Quiz Trivial (M010 UF1)

**Autor:** Miquel Vico  
**Data:** 11/11/2026  
**Branca:** dev/miquel  

---

## 1. Requisits Funcionals

* **RF-01: Pantalla de benvinguda:** Demana el nom de l'usuari abans de començar a jugar.
* **RF-02: Menú de selecció:** Mostra un missatge de salutació personalitzat (`Hola [Nom]`) i ofereix la tria de categories (Esport i Menjar).
* **RF-03: Preguntes amb alternatives:** El joc mostra una pregunta a la vegada amb 4 opcions de resposta possibles.
* **RF-04: Temporitzador per pregunta:** Es disposa d'un compte enrere de 15 segons per a cada pregunta. Si el temps s'agota, la pregunta es comptabilitza com a no contestada / fallada.
* **RF-05: Pantalla de resultats:** Mostra la puntuació final (`Nom, has encertat X de N`), detallant per a cada pregunta:
  * El text de la pregunta.
  * La resposta triada per l'usuari (o indicació de temps esgotat).
  * La resposta correcta en cas de fallar.
* **RF-06: Control de flux (Navegació):**
  * Botó **Tornar a jugar**: Permet triar categoria de nou mantenint el nom de l'usuari.
  * Botó **Sortir**: Esborra el nom de l'usuari i torna a la pantalla inicial de benvinguda.

---

## 2. Requisits No Funcionals

* **RNF-01 (Semàntica HTML):** Ús d'etiquetes semàntiques d'HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **RNF-02 (Estils i Disseny Responsive):** CSS basat en Flexbox/Grid que s'adapta correctament a diferents mides de pantalla (mòbil i escriptori).
* **RNF-03 (Modularitat i Propietat de Codi):** Separació clara de responsabilitats en fitxers JavaScript independents carregats directament des d'HTML.
* **RNF-04 (Mantenibilitat):** Codi font clarament comentat i organitzat.
* **RNF-05 (Documentació):** Instruccions completes d'ús i instal·lació contingudes al fitxer `README.md`.

---

## 3. Decisions de Joc Proposades

1. **Mida de partida:** 5 preguntes per partida i categoria.
2. **Opcions per pregunta:** 4 alternatives, on només 1 és correcta (`correct` comença a índex 0).
3. **Temps límit:** 15 segons per pregunta.
4. **Categories inicials:** `esport` (Esport) i `menjar` (Menjar).
5. **Comportament del botó Sortir:** Buida l'estat global (`state.playerName = ""`) i redirigeix a `screen-welcome`.

---

## 4. Qüestions/Dubtes per al Professor

* **Mida del grup:** L'enunciat original especifica equips de 3 persones, però som un equip de 4 membres (Guillem, Miquel, Joan i Pol). Hem adaptat el repartiment de tasques.
* **Incongruència en la plantilla:** La plantilla de l'enunciat fa referència a una *calculadora i conversor de divises*, la qual cosa no concorda amb la temàtica del joc Trivial. S'ha assumit el Trivial com a requisit principal.