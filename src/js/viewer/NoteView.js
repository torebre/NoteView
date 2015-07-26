var Raphael = require('raphael');
var staveData = require("./Stave.js");
var GlyphFactory = require("./GlyphFactory.js");
var $ = require('jquery');


// Making this a global class
window.NoteView = function(parentElement, width, height) {
  var noteArea = Raphael(parentElement, width, height);

  // TODO Determine margins dynamically
  var xMargin = 50;
  var yMargin = 50;

  this.renderGlyph = function() {
    noteArea.rect(0, 0, noteArea.width, noteArea.height);
    var stave2 = new Stave(noteArea, xMargin, yMargin, noteArea.width);
    stave2.renderSequence(notes);

    var currentTime = 0;
    // for (var i = 0; i < notes.notes.length; ++i) {
    //   var path = stave2.getHighlightShape(notes.notes[i].id);
    //   if (!path) {
    //     continue;
    //   }
    //   setTimeout(getFunction(path, 'red'), currentTime);
    //   currentTime += 100;
    //   setTimeout(getFunction(path, 'black'), currentTime);
    //   currentTime += 100;
    // }
  }

  this.drawNotes = function(noteSequence) {
    noteArea.clear();
    noteArea.rect(0, 0, noteArea.width, noteArea.height);
    var stave = new Stave(noteArea, xMargin, yMargin, noteArea.width, noteArea.height);
    stave.renderSequence(noteSequence);
  }

}
