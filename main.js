// On va écouter l'évènement DOMContentLoaded, qui se déclenche que le HTML a bien été lu et interprété par le navigateur, et on va executer une fonction quand cet évènement a lieu :
window.addEventListener('DOMContentLoaded', function(event) {
 // C'est important de ne pas interagir avec le DOM s'il n'est pas entierement prêt. C'est pour cela, que tout notre programme sera placé dans cette fonction.

 // Initialisation des variables
	let tries;
	let randomNumber;
    let value;

    //fonction permettant de générer un nombre aléatoire à faire deviner
	function startGame(){
		tries = 1;
		randomNumber = Math.floor(Math.random() * 100) + 1; // math.random génère un nombre aléatoire entre 0 et 0.999, et math.floor l'arrondi à l'inférieur. On ajoute 1 pour pouvoir attendre 100. On pourrait aussi l' écrire Math.floor(Math.random() * 101);

		// Je rajoute ici un console.log() qui permet d'afficher le nombre qui a été tiré au hasard
		console.log('Le nombre à deviner est :' + randomNumber);        
	}

    //fonction permettant de récupérer la valeur utilisateur pour la comparer à celle recherchée
    function submitForm(event) {
        event.preventDefault(); //le formulaire recharge la page quand il est validé, pour éviter ça, on ajoute event et preventDefault
        value = form.guess.value; // Permet de récupérer la valeur entrée par l'utilisateur
        console.log('La valeur entrée par l\'utilisateur est :' + value); 

        const paragraphTextResult = document.getElementById("pForResult"); // récupère l'élément p du html dans une const
        
        function results() {
            if (randomNumber == value) { // 2 = parce que sinon c'est pas les mêmes types, value n'est pas en number mais en string
                return "Bravo ! Vous avez trouvé le bon nombre !";
            } else if (randomNumber > value){
                return "Votre nombre est en dessous de la valeur recherchée.";
            } else if (randomNumber < value){
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
    }

    // Appel de la fonction submitForm quand l'utilisateur clique sur l'envoi du formulaire (submit) pour valider son nombre
    const form = document.getElementById("guess_form"); // récupère le formulaire du html pour le stocker dans la constante
    form.addEventListener('submit', submitForm); // permet d'écouter l'évènement 'submit', et d'executer la fonction submitForm() quand il est émis.

	startGame(); // prmeière fonction lancée, pour créer un nombre à deviner
})