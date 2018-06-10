package {

	public class Game {

		// canvas width: 550
		// canvas height: 400

		private var dir;
		private var height;
		private var width;

		private var listeDesCases:Array;
		
		public function Game(display) {
			
			var display = display;

			var joueur:Player = new Player();

			dir:string = 'default';

			listeDesCases:Array = new Array();

			var temp:Array = new Array();
			for (var range = 0; range < 10; range++) {

				temp = new Array();
				for	(var colonne = 0; colonne < 10; colonne++) {
				
					var c:Carre = new Carre();

					c.stop();
					c.x = range * (15 + 2); // + center (largeur: 550, hauteur: 400)
					c.y = colonne * (15 + 2); // ..

					temp.push(c);
					display.addChild(c);

				}
				listeDesCases.push(temp);
				
			}
				
		}

		public function NouvellePartie() {

			player.Init();



		}

		public function Update() {

// bouger le joueur

			listeDesCases.map(function(x) { x.gotoAndStop(1); });

			joueur.body.map(function(c) { listeDesCases[c.x].gotoAndStop(2); });
			listeDesCases.gotoAndStop( joueur.body[0] );

		}

		public function ChangerDirection(event) {
// tester que ça crée pas une nouvelle instance
			switch (event.keyCode) {

				case 1: console.log('haut');	dir = 'haut'; 	break;
				case 2: console.log('bas');		dir = 'bas'; 	break;
				case 3: console.log('droite');	dir = 'droite'; break;
				case 4: console.log('gauche');	dir = 'gauche'; break;

			}

		}
		
	}

}