package {
	
	public class Player {
		
		var body;

		public function Player() {

			body = [];

		}

		public function get getBody() { return 'hello there buddy'; }
		public function set setBody(val) { body = val; }

		public function Init() {

			// body = [2, 1, 0]; // changer pour objet

			setBody = [ {x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0} ];

		}

		

	}

}