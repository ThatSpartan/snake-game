﻿package {

	public class Game {

		// canvas width: 550
		// canvas height: 400

		private var dir;
		private var height	= 550;
		private var width	= 400;
		private const SIZE	= 15;

		var display = display;
		var joueur:Player = new Player(SIZE);

		private var listeDesCases:Array;
		
		public function Game(display) {

			dir = 'default';

			listeDesCases = [];

			var temp = [];
			for (var range = 0; range < 10; range++) {

				temp = [];
				for	(var colonne = 0; colonne < 10; colonne++) {
				
					var c:Carre = new Carre();

					c.stop();
					c.x = range * (SIZE + 2); // + center (largeur: 550, hauteur: 400)
					c.y = colonne * (SIZE + 2); // ..

					temp.push(c);
					display.addChild(c);

				}
				listeDesCases.push(temp);
				
			}

			trace(listeDesCases);
			
			NouvellePartie();
				
		}

		public function NouvellePartie() {

			joueur.Init();

			Update();

		}

		public function Update() {

// bouger le joueur

			//listeDesCases.map(function(x) { x.gotoAndStop(1); });
<<<<<<< HEAD
			//listeDesCases.forEach( function(x) { 
			//	x.forEach( function (y) { 
			//		y.gotoAndStop(1); 
			//	});
			//});
=======
			listeDesCases.forEach( function(x) { 
				x.forEach( function (y) { 
					y.gotoAndStop(1); 
				});
			});
>>>>>>> 94b237714e8724459847dbc5cdf6e18bc921be2c

			trace(joueur.getBody());

			//joueur.getBody.map(function(c) { listeDesCases[c.x].gotoAndStop(2); });
			//joueur.getBody.map(function(c) { trace(c); });
			listeDesCases[0][0].gotoAndStop(2);
			//listeDesCases.gotoAndStop( joueur.body[0] );			erreur ..

		}

		public function ChangerDirection(event) {
// tester que ça crée pas une nouvelle instance

trace(event.keyCode);

			switch (event.keyCode) {

				case 87: trace('haut');		dir = 'haut'; 	break;
				case 83: trace('bas');		dir = 'bas'; 	break;
				case 68: trace('droite');	dir = 'droite'; break;
				case 65: trace('gauche');	dir = 'gauche'; break;

			}

		}
		
	}

}