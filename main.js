window.addEventListener('DOMContentLoaded', function(event) {

	let tries;
	let randomNumber;
    let value;

	function startGame(){
		tries = 1;
		randomNumber = Math.floor(Math.random() * 100) + 1;

		// Je rajoute ici un console.log() qui permet d'afficher le nombre qui a été tiré au hasard
		console.log('Le nombre à deviner est :' + randomNumber);        
	}

    function submitForm(event) {
        event.preventDefault();
        value = form.guess.value;
        console.log('La valeur entrée par l\'utilisateur est :' + value);

        const paragraphTextResult = document.getElementById("pForResult");
        let result;
        function results() {
            if (randomNumber == value) {
                result = "Bravo ! Vous avez trouvé le bon nombre !"
            } else if (randomNumber > value){
                result = "Votre nombre est en dessous de la valeur recherchée."
            } else if (randomNumber < value){
                result = "Votre nombre dépasse la valeur recherchée."
            } else {
                console.log("Erreur !")
            }
            paragraphTextResult.textContent = result;
        }
        results();
        
        let nombreEssaisEcrit = document.getElementById("essais");
        let nombreEssaisToAdd = document.createTextNode(tries);
        nombreEssaisEcrit.appendChild(nombreEssaisToAdd);
        tries++;
    }

    const form = document.getElementById("guess_form");
    form.addEventListener('submit', submitForm);

	startGame();
})

