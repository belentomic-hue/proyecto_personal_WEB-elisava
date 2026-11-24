# Registre de canvis (Log)

Aquest fitxer documenta els canvis rellevants del projecte, del més recent al més antic.

## Quan cal afegir una entrada?

Afegeix una entrada quan un canvi:
- modifica el contingut o el comportament de la web;
- afegeix, elimina o reorganitza fitxers;
- corregeix un error;
- canvia el disseny, l'accessibilitat o la compatibilitat;
- modifica una decisió tècnica o un requisit del projecte.

No cal registrar cada petit retoc tipogràfic ni canvis automàtics sense impacte. Agrupa canvis petits relacionats en una sola entrada.

## Procés recomanat

1. Abans d'acabar una tasca, comprova què has modificat amb `git diff` o revisant els fitxers a GitHub.
2. Si el canvi és rellevant, afegeix una entrada nova **a dalt del registre**, just després d'aquestes instruccions i abans de les entrades antigues.
3. Utilitza la data del dia en format ISO: `AAAA-MM-DD`.
4. Escriu què ha canviat i per què, en punts breus. Anota incidències o tasques pendents només si n'hi ha.
5. Inclou `log.md` en el mateix commit que el canvi documentat, sempre que sigui pràctic.
6. Abans de fer el commit, comprova que l'entrada sigui fidel als canvis reals. No anotis tasques com a completades si no s'han verificat.

## Format de cada entrada

```markdown
## AAAA-MM-DD — Títol breu del canvi
- **Canvis:** què s'ha afegit, modificat o corregit.
- **Motiu:** quin objectiu té el canvi.
- **Verificació:** com s'ha comprovat (si escau).
- **Pendents/incidències:** només si n'hi ha.
```

Omet els camps que no siguin pertinents. Mantén les entrades concises i orientades a resultats.

---

## 2026-11-24 — Creación de estructura.md v0.1
- **Canvis:** afegit `estructura.md` amb el sistema global de moviment, avatar, càmera-scroll, interaccions, materialitat, color, navegació, cinc etapes narratives i decisions pendents.
- **Motiu:** consolidar la base de disseny aprovada per l'usuària abans de continuar prototipant.
- **Verificació:** publicació i lectura posterior del fitxer a GitHub.
- **Pendents/incidències:** validar la implementació en el navegador, colors exactes, geometria 3D i continguts autobiogràfics.


## 2026-11-24 — Primera web inmersiva fluorescente
- **Canvis:** substituïda la plantilla HTML/CSS/JS per una primera experiència responsive amb portada editorial, organisme procedural de fibres projectades en 3D sobre Canvas 2D, scroll de càmera, cinc etapes narratives, pausa blanca, set chakras i panells interactius.
- **Motiu:** traslladar la direcció visual acordada i els referents cromàtics fluorescents a un prototip editable sense dependències de framework.
- **Verificació:** lectura de les versions del repositori i confirmació dels commits de publicació; pendent revisió visual i de comportament al navegador i en mòbil.
- **Pendents/incidències:** millorar el volum 3D real mitjançant WebGL si es considera necessari; incorporar testimonis i cites autèntiques, validar accessibilitat i rendiment, ampliar els capítols dels chakras.

## 2026-11-24 — Creación de narrativa.md v0.2
- **Canvis:** creat `narrativa.md` amb el pròleg, la pausa blanca que respira, l'avatar sense rostre, els set capítols dels chakras, preguntes, microtextos poètics i el tancament de l'ecosistema.
- **Motiu:** conservar la base narrativa aprovada per desenvolupar-la progressivament durant el disseny de la web.
- **Verificació:** publicació i lectura posterior del document a GitHub.
- **Pendents/incidències:** substituir marcadors autobiogràfics amb fragments reals, aprofundir els textos i verificar fonts tradicionals.

## 2026-11-24 — Actualización de personalidad.md v0.3
- **Canvis:** actualitzades les seccions sobre la personalitat d'Ecosistema del Ser, el llenguatge narratiu espiritual i l'estètica abstracta/cel·lular, d'acord amb el nou recorregut dels set chakras. Es mantenen la identitat i la filosofia creativa general de la dissenyadora.
- **Motiu:** evitar contradiccions amb `context.md` v0.2 sense alterar la identitat professional definida prèviament.
- **Verificació:** document publicat a GitHub; verificació posterior dels apartats i de la versió.
- **Pendents/incidències:** desenvolupar els documents de narrativa, referents i estructura.

## 2026-11-24 — Nueva dirección de Ecosistema del Ser: context.md v0.2
- **Canvis:** actualitzat `context.md` amb 29 seccions sobre el nou recorregut dels set chakras, el pròleg autobiogràfic, l'avatar cel·lular, els scrolls, les pauses i els criteris de respecte cultural i privacitat.
- **Motiu:** documentar la nova direcció aprovada sense perdre la investigació original amb Gemini ni les sis categories anteriors.
- **Verificació:** publicació i lectura posterior de `context.md` a GitHub.
- **Pendents/incidències:** desenvolupar `narrativa.md`, `estructura.md` i `referentes.md`; revisar la coherència de documents antics amb la nova estructura.

## 2026-11-18 — Aprobación y publicación de context.md v0.1
- **Canvis:** substituït el context tècnic inicial per un document aprovat de 23 seccions que descriu l'origen autobiogràfic, la recerca amb Gemini, el projecte familiar, els sis territoris, l'univers 3D, el paper previst de la IA i les decisions obertes.
- **Motiu:** conservar el fonament de la investigació i orientar el desenvolupament coherent d'Ecosistema del Ser.
- **Verificació:** publicació de `context.md` confirmada per GitHub; comprovació posterior de lectura pendent.
- **Pendents/incidències:** desenvolupar `narrativa.md`, `referentes.md` i `estructura.md`; completar les decisions encara obertes.

## 2026-11-18 — Aprobación de personalidad.md v0.2
- **Canvis:** substituïda la plantilla de `personalidad.md` pel document aprovat de 13 seccions sobre identitat creativa, filosofia, llenguatge narratiu i criteris de col·laboració amb la IA.
- **Motiu:** establir una referència de personalitat coherent per al projecte i les exploracions relacionades.
- **Verificació:** actualització confirmada per GitHub; pendent revisar-ne la visualització al navegador.
- **Pendents/incidències:** continuar amb els altres documents de definició.

## 2026-11-02 — Revisió inicial i documentació
- **Canvis:** revisats `README.md`, `index.html`, `style.css` i `script.js`; afegits `memoria.md`, `context.md` i aquest registre.
- **Motiu:** documentar l'estructura inicial i establir una base per al manteniment.
- **Verificació:** llegits els quatre fitxers originals; identificada una pàgina HTML bàsica amb CSS i JavaScript.
- **Pendents/incidències:** definir el contingut definitiu de la pàgina i millorar el disseny.
