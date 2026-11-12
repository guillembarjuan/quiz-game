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
