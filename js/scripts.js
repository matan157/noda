(function() {

    // scores per player
    var scores = {
        'icy': [0, 0, 0],
        'spicy': [0, 0, 0]
    };

    // modifiers per player
    var mods = {
        'icy': [1, 1, 1],
        'spicy': [1, 1, 1]
    };

    // make sure the input is between 0 and 50
    function validateScore(score) {
    	return (score >= 0 && score <= 50);
    }

    // when score is put in
    $('input.shot-input').keyup(function(e) {
        var input = $(e.target);
        var player = input.data('player');
        var score = parseInt(e.target.value) || 0;
        var score_str = e.target.value;
        var shot = parseInt(input.data('shot'));

        if (validateScore(score)) {
            updateScores(player, shot, score);
        } else {
        	$(this).val(score_str.substr(0, score_str.length - 1));
        }
    });

    // modifier changes
    $('label.btn').click(function(e) {
        var mod_label = $(e.target);
        var player = mod_label.data('player');
        var shot = parseInt(mod_label.data('shot'));
        var mod = parseInt(mod_label.data('mod'));

        updateMods(player, shot, mod);
    });

    // updating score
    function updateScores(player, shot, score) {
        scores[player][shot - 1] = score;
        updateScoreDisplay(player);
    }

    // updating modifier
    function updateMods(player, shot, mod) {
        mods[player][shot - 1] = mod;
        updateScoreDisplay(player);
    }

    // updating display
    function updateScoreDisplay(player) {
        var total_scores = 0;
        for (var i = 0; i < 3; i++) {
            total_scores += scores[player][i] * mods[player][i];
        }
        $('#' + player + '-score').html(total_scores);
    }
})();