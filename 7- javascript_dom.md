# JavaScript : Le DOM

Découvre ce qu'est le DOM et comment le manipuler en JavaScript

## Ressources

- [MDN: introduction au DOM](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction)
- [Le DOM, c'est quoi exactement ?](https://la-cascade.io/articles/le-dom-cest-quoi-exactement)
- [Video : le DOM simplement](https://www.youtube.com/watch?v=_1fem_5X0Ko)
- [Ajouter, modifier ou supprimer des éléments du DOM avec JavaScript](https://www.pierre-giraud.com/javascript-apprendre-coder-cours/dom-ajout-modification-suppression/)
- [MDN - Utiliser l'API Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

## Contexte du projet

Dans ce brief, nous allons réaliser notre premiere application web. Il s'agit d'un petit jeu où il faut deviner un nombre choisi au hasard entre 1 et 100 avec le moins d'essais possibles.

A chaque proposition, le programme nous dit si le nombre proposé est plus petit ou plus gros que le nombre à deviner.

La partie est gagnée quand on trouve le chiffre exact. Le score est le nombre d'essais necessaire pour trouver le nombre.

Pour créer ce jeu, nous allons :
- utiliser le JavaScript
- réagir à des évènements
- modifier le DOM
- stocker des données dans le localStorage

Ce brief sera découpé en plusieurs parties :

1. Création de la page HTML
2. Initialisation du programme
3. Ecouter l'évenement submit du formulaire
4. Comparer la proposition de l'utilisateur et renvoyer un message
5. Enregistrer le meilleur score dans le localStorage et l'afficher

### 1 - Creation de la page HTML

Pour créer une application web, il nous faut tout d'abord créer un interface homme-machine (IHM). Elle fait le lien entre le programme de l'application (aussi appelée la logique métier) et l'utilisateur. Pour nous, ce sera une page HTML.

Il nous faut donc commencer par créer dans un dossier "guess_the_number" un fichier `index.html`.

Ouvrez ce fichier dans votre IDE VSCode. Il est vide bien sur, mais vous pouvez créer très vitre une ossature de page html5 en tapant la commande `html:5`, puis en appuyant sur la touche [tabulation](https://fr.wikipedia.org/wiki/Touche_de_tabulation).

Vous pouvez utiliser l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de votre IDE pour voir votre page dans votre navigateur.

La page html doit contenir au minimum un formulaire avec un élément `input` et un bouton "valider", pour que le joueur propose sa réponse. Mais vous pouvez aussi ajouter un titre et un texte d'explication.

Soyez créatifs sur la présentation !

Pour rajouter du style, vous pouvez inclure un fichier "style.css" en le créant dans votre dossier, et en ajoutant cette ligne dans la balise `head` dans votre page :

```html
<link href="style.css" rel="stylesheet" />
```

Pour placer facilement mes éléments en CSS, j'utilise presque toujours le positionnement flex.

Vous pouvez découvrir son utilisation avec ce site : [https://flexboxfroggy.com/#fr](https://flexboxfroggy.com/#fr).

Pour finir, nous allons aussi créer un fichier JavaScript dans le dossier "guess_the_number" et le nommer `main.js`.

Dedans, nous allons ajouter :

```js
window.addEventListener('DOMContentLoaded', function() {
	console.log('coucou');
});
```

On va voir ce que cela veut dire dans la seconde partie de ce brief, mais pour l'instant, il suffit de savoir que 'coucou' s'affichera dans la console quand le html est chargé et affiché.

Pour lier le fichier js à notre page index.html, nous allons utiliser une balise `<script>` :

```html
<script src="main.js"></script>
```

Nous allons la placer tout en bas de la partie `<body>` de la page. Pourquoi ici et pas dans le `<head>` ?

Cela permet tout simplement de ne pas bloquer l'affichage du HTML pendant son chargement.

C'est terminé ?

Vous pouvez vérifier que votre message s'affiche bien dans la console de l'inspecteur de votre navigateur.

### 2 - Initialisation du programme

Revenons sur ce bout de code JS que nous avons mis dans le fichier `main.js`.

Pour le comprendre, il faut savoir ce qu'est le Document Object Model ou DOM. Cette ressource va vous aider à comprendre

[Video : le DOM simplement](https://www.youtube.com/watch?v=_1fem_5X0Ko)

Dans la vidéo, on a le `document` tout en haut de l'arbre du DOM. On peut rajouter un niveau : la fenêtre du navigateur. C'est l'élément `window` !

Cet élément, comme tous les éléments du DOM, peut envoyer et recevoir des évènements : un clic, un survol de souris, et de nombreux autres.

Les elements du DOM ont cette capacité, car ils possèdent tous des fonctions dédiées aux évènements.

Dans notre bout de code, on va utiliser une fonction `addEventListener` de l'élement `window` cela s'écrit `window.addEventlistener()` en JavaScript.

On va écouter l'évènement `DOMContentLoaded`, qui se déclenche que le HTML a bien été lu et interprété par le navigateur, et on va executer une fonction quand cet évènement a lieu:

```js
window.addEventListener('DOMContentLoaded', function() {
	// notre programme va être ecrit ici
});
```

C'est important de ne pas interagir avec le DOM s'il n'est pas entierement prêt. C'est pour cela, que tout notre programme sera placé dans cette fonction.

Bon ! Comment allons nous coder notre petit jeu ?

La premiere étape est d'initialiser les variables qui nous permettront de représenter l'état de notre application. Nous aurons besoin :

- d'une variable pour le chiffre à deviner
- d'une variable pour compter les essais de l'utilisateur

On va initialiser ces deux variables, et on va leur attribuer une valeur dans une fonction.

Votre code JavaScript devrait donc ressembler à ceci :

```js
window.addEventListener('DOMContentLoaded', function(event) {

	let tries;
	let randomNumber;

	function startGame(){
		tries = 1;
		randomNumber = Math.floor(Math.random() * 100);

		// Je rajoute ici un console.log() qui permet d'afficher le nombre qui a été tiré au hasard
		console.log('Le nombre à deviner est :' + randomNumber);
	}

	startGame();
})
```

On commence la partie en initialisant le nombre d'essai à 1.

Pour tirer au sort un nombre entre 1 et 100, on va utiliser la classe `Math`, qui contient plusieurs fonctions qui permettent de faire... des maths en JavaScript !

```js
randomNumber = Math.floor(Math.random() * 100);
```

- `Math.random()` génère un nombre aléatoire entre 0 et 1
- on multiplie ce nombre par 100
- `Math.floor()` enleve les chiffres après la virgule pour faire un nombre entier

Pour finir, nous allons executer notre fonction en l'appelant :

```js
startGame();
```

### 3 - Ecouter l'évènement "submit" du formulaire

Le programme JavaScript génère un nombre à deviner. Il faut maintenant donner à l'utilisateur le moyen de soumettre une réponse.

Pour cela, il va utiliser un formulaire. Nous étudierons les formulaires plus tard, pour l'instant, nous allons insérer celui-ci dans notre HTML :

```html
<form id="guess_form">
	<label for="guess">Try to find the number !</label>
	<input name="guess" type="number">
	<input type="submit" value="Submit">
</form>
```

Avec ce formulaire, si nous cliquons sur le bouton "submit", on va voir que la page se recharge : c'est normal, c'est le fonctionnement par défaut des formulaires. Mais ce n'est pas pratique pour nous : cela recharge notre fichier `main.js` et relance notre procédure d'initialisation et notre fonction `startGame()`...

Mais une fois dans notre navigateur, notre formulaire devient un element du DOM. Il devient capable d'émettre des évènements. Et il en émet justement un nommé `submit` quand on le valide. On va donc commencer par capter cet évènement.

Pour cela, il nous faut trouver cet élément form dans le DOM. On lui a assigné un id: "guess_form". On va s'en servir pour le trouver, et on va mettre une référence de cet element dans une variable.

```js
const form = document.getElementById("guess_form");
```

On peut se servir de cette référence à notre element pour écouter l'évènement 'submit' :

```js
function submitForm() {
	console.log('soumission du formulaire')
}
form.addEventListener('submit', submitForm);
```

Ce bout de code permet donc d'écouter l'évènement 'submit', et d'executer la fonction `submitForm()` quand il est émis.

Mais si on execute notre application avec *Live Server*, on voit que ca ne fonctionne pas : 'soumission du formulaire' devrait apparaitre dans la console, et ce n'est pas le cas. C'est parce que le formulaire recharge toujours notre page quand on le valide.

Pas le choix, il faut modifier le comportement par défaut du formulaire !

Pour cela, nous allons prendre en compte le parametre 'event' dans notre fonction:

```js
function submitForm(event) {
	console.log('soumission du formulaire')
}
```

Ce paramètre est envoyé automatiquement. C'est l'évènement capté par notre fonction `addEventListener`.

Nous pouvons modifier cet l'évènement pour qu'il ne cause pas le rechargement de la page :

```js
function submitForm(event) {
	event.preventDefault();
	console.log('soumission du formulaire');
}
```

Super, notre page n'est plus rechargée, et notre `console.log()` s'affiche !

Il nous reste une chose à faire : récupérer le nombre que l'utilisateur a entré dans l'input.

```js
const value = form.guess.value;
```

Essayez de l'afficher dans la console à chaque entrée de l'utilisateur !

### 4 - Comparer la proposition de l'utilisateur et renvoyer un message

Nous avons deux nombres :

- `randomNumber` : qui contient une valeur secrète, celle qui doit être trouvée par le joueur (comprise entre 0 et 99)
- `value` : qui contient l'estimation du joueur

Il va maintenant s'agir de faire les deux actions suivantes :

- comparer les deux nombres : est-ce que le joueur et au-dessus de la valeur recherchée, en-dessus, ou a-t-il trouvé le bon nombre ?
- afficher un message à le joueur pour le tenir au courant de son avancé
- mettre à jour le nombre de tour de jeu (la variable `tries`)
- si la partie est terminée, rappeler la fonction `startGame()`

À vous de jouer !

Pour afficher le message, vous pourrez utiliser la fonction `alert`, dans un premier temps. Cependant, une fois votre code fonctionnel, il faudra réellement afficher le message dans la page web : pour cela, tu vas apprendre à manipuler le DOM !

Tu trouveras ton bonheur ici : [Ajouter, modifier ou supprimer des éléments du DOM avec JavaScript](https://www.pierre-giraud.com/javascript-apprendre-coder-cours/dom-ajout-modification-suppression/).

### 5 - Enregistrer le meilleur score dans le localStorage et l'afficher

Pour compléter le jeu, il serait intéressant d'enregistrer le meilleur score du joueur : c'est à dire le nombre minimal de tours de jeu qu'il lui a fallu pour trouver nombre secret !

L'idée est de faire en sorte que ça soit sauvegardé dans le `localStorage`, afin que le score soit gardé dans le navigateur, même en cas de rafraîchissement de la page.

Encore une fois, la documentation vous viendra en aide : [MDN - Utiliser l'API Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

## Modalités d'évaluation

- Un dépôt GitLab contient le code du projet
- Le programme fonctionne et n’affiche pas d'erreur dans le terminal
- Il est possible de jouer au jeu pour trouver le nombre secret
- Des messages s'affichent afin de tenir au courant le joueur de sa progression
- Le meilleur score du joueur est sauvegardé
- Des commentaires expliquent le code

## Livrables

Un lien vers GitLab

## Critères de performance

- La simplicité de la solution donnée (DRY, KISS)
- Le code source est documenté (commenté)
- Utiliser un outil de gestion de versions
