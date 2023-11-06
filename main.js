// On va écouter l'évènement DOMContentLoaded, qui se déclenche que le HTML a bien été lu et interprété par le navigateur, et on va executer une fonction quand cet évènement a lieu :
window.addEventListener("DOMContentLoaded", function (event) {
  // C'est important de ne pas interagir avec le DOM s'il n'est pas entierement prêt. C'est pour cela, que tout notre programme sera placé dans cette fonction.


  // Initialisation des variables
  let tries;
  let randomNumber;
  let value;
  let scoreAffichage = document.getElementById("score"); // récupère le p avec id 'score' du html


  //fonction permettant de générer un nombre aléatoire à faire deviner
  function startGame() {
    tries = 1;
    randomNumber = Math.floor(Math.random() * 100) + 1; // math.random génère un nombre aléatoire entre 0 et 0.999, et math.floor l'arrondi à l'inférieur. On ajoute 1 pour pouvoir attendre 100. On pourrait aussi l' écrire Math.floor(Math.random() * 101);


    // Je rajoute ici un console.log() qui permet d'afficher le nombre qui a été tiré au hasard
    console.log("Le nombre à deviner est :" + randomNumber);
  }


  //fonction permettant de récupérer la valeur utilisateur pour la comparer à celle recherchée
  function submitForm(event) {
    event.preventDefault(); //le formulaire recharge la page quand il est validé, pour éviter ça, on ajoute event et preventDefault
    value = form.guess.value; // Permet de récupérer la valeur entrée par l'utilisateur
    console.log("La valeur entrée par l'utilisateur est :" + value); // pour tricher


    const paragraphTextResult = document.getElementById("pForResult"); // récupère l'élément p du html dans une const


    function results() {
      if (randomNumber == value) {
        // 2 = et pas 3 parce que sinon c'est pas les mêmes types, value n'est pas en number mais en string
        if ( // si un score existe dans le stockage et s'il est battu par le nombre d'essais actuel
          localStorage.getItem("Score de la partie") &&
          tries < localStorage.getItem("Score de la partie")
        ) { // alors on retire l'ancien score pour mettre le nouveau
          localStorage.removeItem("Score de la partie");
          localStorage.setItem("Score de la partie", tries);
        }
        localStorage.setItem("Score de la partie", tries); // on stocke dans local storage le nombre d'essais quand gagné
        return "Bravo ! Vous avez trouvé le bon nombre !";
      } else if (randomNumber > value) {
        return "Votre nombre est en dessous de la valeur recherchée.";
      } else if (randomNumber < value) {
        return "Votre nombre dépasse la valeur recherchée.";
      } else {
        console.log("Erreur !");
      }
    }
    paragraphTextResult.textContent = results(); // On met la phrase stockée dans result, dans le contenu texte du paragraphe créé en html


    // Ajout du nombre d'essais
    let nombreEssaisEcrit = document.getElementById("essais"); // récupère le p avec id 'essais' du html
    nombreEssaisEcrit.textContent = "Nombre d'essais : " + tries; // remplace le contenu de ce p avec le nombre d'essais
    tries++; // incrémente à chaque boucle le nombre d'essais


    // Score
    if (localStorage.getItem("Score de la partie") != null) { // Si le score stocké n'est pas null
      scoreAffichage.textContent =
        "Votre meilleur score est de : " +
        localStorage.getItem("Score de la partie") +
        " essais"; // remplace le contenu de ce p avec le meilleur score
    }
  }


  // Appel de la fonction submitForm quand l'utilisateur clique sur l'envoi du formulaire (submit) pour valider son nombre
  const form = document.getElementById("guess_form"); // récupère le formulaire du html pour le stocker dans la constante
  form.addEventListener("submit", submitForm); // permet d'écouter l'évènement 'submit', et d'executer la fonction submitForm() quand il est émis.


  startGame(); // première fonction lancée, pour créer un nombre à deviner
});


// Fonction permettant de remettre à 0 le score
//onclick = cherche la fonction dans le scope global du js. Donc la fonction reset n'est pas accessible si elle est mise dans window.addEventListener("DOMContentLoaded").
//Si l'on veut bien lancer tout le js uniquement une fois que le DOM est lancé, dans ce cas il faut changer le onclick par un addEventListener sur le bouton pour reset.
function reset() {
  scoreAffichage = document.getElementById("score"); // récupère le p avec id 'score' du html
  if (localStorage.getItem("Score de la partie") != null) { // Si un score a été stocké, alors
    localStorage.removeItem("Score de la partie"); // remplace le contenu de ce p avec le meilleur score
    scoreAffichage.textContent =
      "Votre score a été réinitialisé. Vous pouvez lancer une nouvelle partie !";
  } else {
    scoreAffichage.textContent =
      "Veuillez gagner au moins une fois pour obtenir un score";
  }
}