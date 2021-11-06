<img src="public/icon.png" alt="icon copac" width="30"/> Meet Trees - plantam impreuna! <img src="public/icon.png" alt="icon copac" width="30"/>

## Introducere

In Meet Trees, un cetatean responsabil poate sa organizeze evenimente de plantat puieti la o locatie aleasa de el, iar alti cetateni responsabili se pot alatura cauzei nobile.
In lista de evenimente comuna pentru toata lumea, exista doua categorii.

1. Evenimente viitoare
   In aceasta categorie, sunt listate mai multe evenimente, iar oricine poate alege sa participe la eveniment prin rezervarea unui numar de puieti - click pe <i>Vreau sa particip</i>
2. Evenimente curente si trecute
   Aceasta categorie e formata din evenimente care au inceput deja, iar cei care au participat la eveniment isi pot valida codurile.

## Aspecte tehnice

Aplicatia functioneaza cu doua servere care ruleaza in paralel. Unul din servere se ocupa de front-end si este construit cu Next.js, iar celalalt este un API construit cu Flask.
Toate datele despre evenimente sunt tinute intr-o baza de data sqlite, care este integrata in serverul de Flask.
Design-ul site-ului este facut cu ajutorul librariei Bootstrap.
