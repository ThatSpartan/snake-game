/*
Nom du fichier : U5_SnakeGame.as
Programmeur : Dominik Dumas
Date : 15 mai 2018
Description : Un jeu de snake.
*/

/*
Note : Désactiver la fonction racourcis de clavier dans l'animation pour que les touches de claviers fonctionnent.
*/

package {

    // importations
    import flash.display.MovieClip;
    import flash.events.Event;
	import flash.events.KeyboardEvent;
	
	import Game;/*
	import Carre;*/

    public class U5_SnakeGame extends MovieClip
    {

        public function U5_SnakeGame()
        {
			
			trace('hello');
			
			var game:Game = new Game(this);
			
			/*var bgd = new Shape();
			bgd.graphics.beginFill(0x999999, 1);
			bgd.graphics.drawRect(0, 0, 200, 50);
			addChild(bgd);*/
			

			
            // event listeners
            //btnTrier.addEventListener(MouseEvent.CLICK, Trier)
            stage.addEventListener(KeyboardEvent.KEY_DOWN, game.ChangerDirection);
			//stage.addEventListener(KeyboardEvent.KEY_DOWN, mouseclick);

        }
		
		public function mouseclick(event:KeyboardEvent)
		{
			
			trace('event');
			trace(event.keyCode);

        }

    }

}