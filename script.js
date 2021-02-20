$(function() {
	var $squareButton = $("button.square"), //SQUARE ON THE BOARD
		$start = $("button.start"), //START BUTTON
		$choice = $("form.choice"), //FORM TAG
		$reportPlayer = $("h4.reportPlayer"), //HEADER REPORTING WHO IS PLAYING
		$warning = $("h6.warning"), //HEADER THAT WARNS THE PLAYER IF A SQUARE IS ALREADY TAKEN
		boardPositions = [
			["1", "2", "3"],
			["4", "5", "6"],
			["7", "8", "9"],
			["1", "4", "7"],
			["2", "5", "8"],
			["3", "6", "9"],
			["1", "5", "9"],
			["3", "5", "7"]
		],
		squares = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
		updatedSquares = [],
		playerNow,
		playerTime,
		playerApple = {
			name: "Apple",
			tag: "fa fa-apple",
			time: 1,
			position: []
		},
		playerWindows = {
			name: "Windows",
			tag: "fa fa-windows",
			time: -1,
			position: []
		};

	////////////////////*FUNCTIONS BELOW *////////////////////////////

	////////////*CHECK WIN*////////////////
	function checkWin(player) {
		boardPositions.forEach(function(arr) {
			var i = 0,
				count = 0;
			player.position.forEach(function(number, i) {
				if (arr.indexOf(player.position[i]) != -1) {
					count++;
					if (count === 3) {
						setTimeout(resetGame, 3000);
						$reportPlayer.text("Player " + player.name + " won!").css({
							fontSize: "2em",
							color: "cyan",
							textShadow: "1px 1px 6px black"
						});
						Break;
					}
				}
			});
		});
	}
	////////////*CHECK WIN*////////////////

	////////////*WHO IS PLAYING?*////////////
	function whoIsPlaying() {
		//Selects the current player alternately
		playerTime = playerTime * -1;
		if (playerTime == playerWindows.time) {
			return playerWindows;
		} else {
			return playerApple;
		}
	}
	////////////*WHO IS PLAYING?*////////////

	////////////*PLAYER INSTRUCTIONS*////////////
	function playerInstructions(value, playerNow) {
		//Pushes the position into the current player position array.
		playerNow.position.push(value);

		//Populate the updatedSquares with the squares selected by the players.
		updatedSquares.push(value);

		//Check if some of the players has won, and if positive reset the game.
		checkWin(playerNow);

		//If the checkWin has failed and updatedSquares has 9 squares, seems we have a draw.
		if (updatedSquares.length == 9) {
			setTimeout(resetGame, 3000);
			$reportPlayer.text("We have a draw.").css({
				fontSize: "2em",
				color: "darkred",
				textShadow: "1px 1px 6px black"
			});
			Break;
		}
	}
	////////////*PLAYER INSTRUCTIONS*////////////

	////////////*BOARD*////////////
	function board() {
		$squareButton.on("click", function() {
			//Stores this BUTTON and it's VALUE in 2 different variables.
			var $thisSquareButton = $(this),
				value = $thisSquareButton.val();
			//Test if this square button already has the class 'clicked'.
			//If not, button receives 'clicked'.
			if ($thisSquareButton.hasClass("clicked")) {
				$warning
					.css({ display: "block" })
					.text("Square already in use!")
					.hide()
					.fadeIn(100)
					.fadeOut(1000);
				Continue;
			} else {
				//Puts the 'clicked' and player.tag classes into this button.
				$thisSquareButton.addClass("clicked").addClass(playerNow.tag);

				//Reports on the screen who is playing now.
				if (playerNow.name == playerApple.name) {
					$reportPlayer
						.text("Go player " + playerWindows.name)
						.hide()
						.fadeIn(500);
				} else {
					$reportPlayer
						.text("Go player " + playerApple.name)
						.hide()
						.fadeIn(500);
				}

				//Calls player instructions
				playerInstructions(value, playerNow);

				//Selects the player
				playerNow = whoIsPlaying();
				console.log(playerNow.time);
			}
		});
	}
	////////////*BOARD*////////////

	////////////*SETTINGS*////////////
	function settings() {
		//Puts radio buttons to the player choose between windows or apple.
		$choice
			.show(100)
			.html(
				"<h6>Which player will you choose? </h6>" +
					"<label class='radio-inline'><input type='radio'" +
					"name='chooseChar' class='chooseChar' value='Apple'>Apple</label>" +
					"<label class='radio-inline'><input type='radio'" +
					"name='chooseChar' class='chooseChar' value='Windows'>Windows</label>"
			);

		$("input.chooseChar").on("click", function() {
			var $thisInput = $(this);
			//Stores the chosen 'char'(win or apple) into variable playerNow
			//and playerTime assumes its 'time' attribute.
			if ($thisInput.val() == playerApple.name) {
				playerNow = playerApple;
				playerTime = playerApple.time;
				$thisInput.hide();
				console.log(playerNow.name);
			} else {
				playerNow = playerWindows;
				playerTime = playerWindows.time;
				$thisInput.hide();
				console.log(playerNow.name);
			}
			//Hide first buttons and show buttons where player will choose mode: one or two players
			$choice
				.toggle(200)
				.toggle(200)
				.html(
					"<h6>Which mode do you want to play?  </h6>" +
						"<label class='radio-inline'><input type='radio'" +
						"name='chooseModo' class='chooseModo' value='onePlayer'>One Player</label>" +
						"<label class='radio-inline'><input type='radio'" +
						"name='chooseModo' class='chooseModo' value='twoPlayers'>Two Players</label>"
				);
			//Player choosed the mode of game. Now hide the buttons and change 'START' to 'READY'.		
			$("input.chooseModo").on("click", function() {
				var $selfModo = $(this);
				$choice.hide(200);
				$start
					.css({
						backgroundColor: "#e80909",
						textShadow:
							".2px .1px .1px black," +
							"-.2px -.1px .1px black," +
							".1px .2px .1px black," +
							"-.1px -.2px .1px black",
						marginLeft: "auto"
					})
					.animate({ width: "120px" }, 100)
					.text("READY!?");
				
				if($selfModo.val() == "onePlayer") {
					// alert("One Player Selected");
				}
				
				
				//Turn off click current $start listener and create another listener.
				$start.off("click");
				//Player clicked in the 'READY' button(that actually is $start button).
				$start.on("click", function ready() {
					var $thisStartButton = $(this);
					//Change button to 'START' again.
					$thisStartButton
						.css({
							backgroundColor: "darkcyan",
							textShadow:
								".2px .1px .1px yellow," +
								"-.2px -.1px .1px lightblue," +
								".1px .2px .1px yellow," +
								"-.1px -.2px .1px lightblue"
						})
						.text("RESTART?");
					//Reports the first player on the screens.
					$reportPlayer
						.text("Go player " + playerNow.name)
						.hide()
						.fadeIn(500);

					//Put another listener into $start using the start() function already called "()".
					$start.on("click", start());
					//Turn off this ready function.
					$start.off("click", ready);
					// CALLS THE BOARD FUNCTION SQUARES' LISTENERS.
					board();
				});
			});
		});
		
			
		
	}
	////////////*SETTINGS*////////////

	////////////*RESET GAME*////////////
	function resetGame() {
		//Resets all informations.
		playerWindows.position = [];
		playerApple.position = [];
		updatedSquares = [];
		$choice.html("");
		$reportPlayer.html("");
		$squareButton.removeClass(playerWindows.tag);
		$squareButton.removeClass(playerApple.tag);
		$squareButton.removeClass("clicked");
		$squareButton.off("click");
		$reportPlayer.css({
			fontSize: "1.5em",
			color: "black",
			textShadow: ""
		});
	}
	////////////*RESET GAME*////////////

	////////////*START*////////////
	function start() {
		$start.on("click", function() {
			var $thisStartButton = $(this);
			$thisStartButton
				.css({
					textShadow:
						".2px .1px .1px darkred," +
						"-.2px -.1px .1px darkblue," +
						".1px .2px .1px red," +
						"-.1px -.2px .1px blue"
				})
				.animate({ marginLeft: "0", width: "150px" }, 100)
				.text("SETTINGS");

			//Reset anything to prevent bugs.
			resetGame();

			//Player will choose his settings for the game.
			settings($thisStartButton);

			//Listens to reset button.
			$resetButton.on("click", function() {
				resetGame();
			});
		});
	}
	////////////*START*////////////

	start();
});
