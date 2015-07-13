var Raphael = require('raphael');
var staveData = require("./Stave.js");
var Player = require("../midi/Player.js");
var GlyphFactory = require("./GlyphFactory.js");
var $ = require('jquery');
var notes = require("./test_output.json");


renderGlyph = function () {
	var testStave = Raphael(document.getElementById('note-view'), 2000, 2000);
	testStave.rect(0, 0, testStave.width, testStave.height);
	var stave2 = new Stave(testStave, 100, 100, 400);
	stave2.renderSequence(notes);

	var currentTime = 0;
	for(var i = 0; i < notes.notes.length; ++i) {
		var path = stave2.getHighlightShape(notes.notes[i].id);
		if(!path) {
			continue;
		}
		setTimeout(getFunction(path, 'red'), currentTime);
		currentTime += 100;
		setTimeout(getFunction(path, 'black'), currentTime);
		currentTime += 100;
	}

	function getFunction(path, fillColour) {
		return function() {
			path.attr('fill', fillColour);
		};
	}

	};
