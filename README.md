# oekaki-board
Projet d'oekaki board

## Présentation:

Oekaki (お絵かき, お絵描き, お絵描 ou très rarement お絵書 et お絵書き) signifie à l'origine, en japonais, un croquis. Sur Internet, le terme désigne une image produite à l'aide d'un programme de dessin en ligne et postée directement sur un site web au sein d'un Bulletin Board System (BBS), c'est-à-dire un système où les visiteurs peuvent échanger des messages autour d'un thème initial : ici, il s'agira en l'occurrence de l'image postée, qui se veut le point de départ d'une série de commentaires et d'échanges entre l'artiste et les visiteurs.

<img width="400" height="241" alt="Oekaki-board" src="https://github.com/user-attachments/assets/03237922-f160-4b37-a31f-8610ae5d8e46" />


## Lancement de l'application:

Visualisation base de données via dbdiagram.io:
https://dbdiagram.io/d/oekaki-board-69cd8f2578c6c4bc7ac30ef4

1) Run backend: npm run dev
- http://localhost:4000/drawings/1 (un dessin par id)
- http://localhost:4000/drawings (tous les dessins)

2) Run frontend: npm run dev
- http://localhost:3000/drawings (page avec tous les dessins récupérés)
- http://localhost:3000/create (page de création / canvas)
