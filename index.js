// index.js

var http = require('http');
var url = require('url');

function isPremier(nombre) {
	var i = 0;
	for(i=2;i<=nombre;i++) {
		if(nombre%i==0&&i!=nombre) { // Si le nombre est divisible par un nombre compris entre 2 et nombre-1
			return false; // Alors le nombre n'est pas un nombre premier
		}
		else if(i==nombre) {
			return true;
		}
		else {
			
		}
	}
}

function decompositionPremier(nombre) {
	var i = 0;
	var tmp = 0;
	var compteur = 1;
	var affichage = 0;
	var passage = 0;
	if(isPremier(nombre)) {
		console.log(nombre + " est un nombre premier.");
		return false;
	}
	else {
		for(i=2;i<=nombre;i++) {
			if(isPremier(i)&&nombre%i==0) {
				passage++; // Sert à indiquer à quel tour de boucle on en est (comme la variable d'incrémentation est remise à 2 à chaque test réussi)
				//console.log("\npassage: " + passage + " et i : " + i);
				if((passage!=1&& i!=tmp)||i==nombre) { // Si i est différent de la valeur précédente et si ce n'est pas le tout premier tour de la boucle, alors on peut afficher i
					
					process.stdout.write("" + affichage);
					if(compteur!=1&&nombre!=i) { // Si le compteur a une valeur supérieure à 1, alors on indique la puissance de i
						process.stdout.write("^" + compteur);
					}
					if(i!=nombre) { // Si ce n'est pas la dernière valeur divisible, on affiche le signe de multiplication
						process.stdout.write("x");
						compteur = 1; // On réinitialise le compteur à 0 car i n'est pas égale à la valeur divisible précédente
					}
					/*else {
						process.stdout.write(i);
						if(compteur!=1) {
							process.stdout.write("^"+compteur);
						}
					}*/
				}
				else if(passage==1) { // Si c'est le premier passage dans la boucle, alors on incrémente le compteur
					//console.log("passage : "+passage)
				}
				else { // Si la valeur divisible actuelle est la même que la précédente, alors on incrémente le compteur
					compteur++;
				}
				
				if(nombre!=i) {
					nombre = nombre/i; // On divise notre nombre par la valeur divisible pour les tests suivants
				}
				else if(compteur==1) {
					nombre=1;
				}
				else {
					if(i==tmp) {
						compteur++;
						process.stdout.write("^" + compteur);
						nombre=1;
					}
					else {
						process.stdout.write("^" + compteur + "x");
						compteur=1;
					}
				}

				tmp = i; // On donne la valeur divisible actuelle à la variable tmp afin de pouvoir la tester après
				
				affichage=i;
				
				
				i=1; // On remet i à 2 (1 + 1 avec le tour de boucle) afin de retester tous les nombres premiers avec la nouvelle valeur divisée
			}
		
		}
	}
}

var server = http.createServer(function (requete, reponse) {
		var urlpage = url.parse(requete.url).pathname;
		reponse.writeHead(200,{"Content-Type": "text/plain; charset=utf-8"});
		urlpage = urlpage.substring(1); // On prend ce qu'il y a après le / dans l'url
		decompositionPremier(parseInt(urlpage)); // On convertit la chaîne de caractères de l'url en int avant de la transmettre à la fonction
		reponse.end(urlpage);
});

server.listen(8888);
