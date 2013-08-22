var HanoiUI = (function (HanoiUI) {

	var Game = HanoiUI.Game = function() {
		this.start();
		this.fromClick = null;
	};

	Game.prototype.start = function () {
		this.createTowers();
		this.renderTowers();
		// this.setClickListener();
		var that = this;

		$('.tower').on('click', function () {
			if (!that.fromClick) {
				that.fromClick = this.id.match(/tower(\d)/)[1];
				console.log("From click: " + that.fromClick);
			} else {
				var toClick = this.id.match(/tower(\d)/)[1];
				console.log("To click: " + toClick);
				that.move(that.fromClick, toClick);
				that.fromClick = null;
				that.renderTowers();
			}

		});

	};



	Game.prototype.createTowers = function () {
		$('body').append($('<div class="towers"></div>'));

		for(var i = 1; i <= 3; i++){
			$('.towers').append($('<div class="tower" id="tower' + i +'"></div>'));
		}

		$.each($('.tower'), function(idx, elm) {
			$(elm).append($('<p>I\'m Tower '+ (idx + 1) + '</p>'));
		});
	}


	Game.prototype.renderTowers = function () {
		for (var i = 1; i <= 3; i++) {
			this.renderTower(i);
		}
	}

	// Tower is an Array.
	Game.prototype.renderTower = function (i) {
		var tower = Hanoi["tower" + i];
		var towerDiv = $("#tower" + i);
		towerDiv.children('.disk').remove();
		for (var j = tower.length - 1; j > -1; j--) {
			towerDiv.append($('<div class="disk" id="disk' + tower[j] + '"></div>'));
		}
	}

	Game.prototype.move = function (from, to) {
		var towerFrom = Hanoi["tower" + from];
		var towerTo = Hanoi["tower" + to];
		if (Hanoi.move_valid(towerFrom, towerTo)) {
			Hanoi.move(towerFrom, towerTo);
		}
	}

	return HanoiUI;
})(HanoiUI || {});