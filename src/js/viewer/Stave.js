var GlyphFactory = require("./GlyphFactory.js");

Stave = (function() {
  function Stave(paper, x, y, width) {
    this.init(paper, x, y, width);
  }

  Stave.prototype = {
    init: function(paper, x, y, width) {
      this.paper = paper;
      this.x = x;
      this.y = y;
      this.width = width;

      this.heightBetweenLines = 12;
      this.scale = 1.0;
      this.glyphScale = 0.05;
      this.noteStart = x;

      this.shouldDrawClef = true;
      this.idShapeMapping = [];
    },

    render: function() {
      this.drawStave();
      this.drawClef(5 * this.heightBetweenLines);
    },

    getYCoord: function(pitch) {
      var scaledHeight = this.scale * this.heightBetweenLines;

      // TODO Need to change things to make use of octave
      var octave = Math.floor(pitch/12);
      var noteWithinOctave = pitch % 12;
      var notePlacement;

      switch(noteWithinOctave) {

        case 0:
        case 1:
        notePlacement = 0;
       break;

        case 2:
        case 3:
        notePlacement = 1;
      break;

        case 4:
        notePlacement = 2;
        break;

        case 5:
        case 6:
        notePlacement = 3;
        break;

        case 7:
        case 8:
        notePlacement = 4;
        break;

        case 9:
        case 10:
        notePlacement = 5;
        break;

        case 11:
        notePlacement = 6;
        break;
      }

      console.log('Pitch: ' +pitch +'. Octave: ' +octave +'. Note placement: ' +notePlacement);

      return this.y + (6 - octave) * (scaledHeight * 4) + (2 - notePlacement) * scaledHeight / 2;
    },

    renderSequence: function(noteSequence) {
      // TODO Clear existing data


      this.drawStave();
      this.drawClef(5 * this.heightBetweenLines);
      // TODO There is less space available than the total width
      var spaceOfSingleDuration = this.width / noteSequence.durationOfBar;
      var bars = [];
      var notesInBar = [];

      if(noteSequence.length == 0) {
        return;
      }
      console.log('Rendering: ' +noteSequence);
      console.log('Space of single duration: ' +spaceOfSingleDuration);
      console.log('Width: ' +this.width +'. Duration: ' +noteSequence.durationOfBar);

      for (var i = 0; i < noteSequence.notes.length; i++) {
          var currentNote = noteSequence.notes[i];
          if(currentNote.elementType == 'BAR_LINE') {
            bars.push(notesInBar);
            notesInBar = [];
          }
          notesInBar.push({
            id: currentNote.id,
            symbol: GlyphFactory.getGlyph(currentNote.elementType),
            xCoord: currentNote.cumulativeDuration * spaceOfSingleDuration,
            yCoord: this.getYCoord(currentNote.pitch)
          });
      }

      // TODO Render all bars
      this.drawNotes(bars[0]);
    },

    drawStave: function() {
      var scaledHeight = this.scale * this.heightBetweenLines;
      for (var i = 0; i < 5; ++i) {
        this.paper.path("M" + this.x + " " + (this.y + i * scaledHeight) + "h" + this.width);
      }
      this.paper.path("M" + this.x + " " + this.y + "v" + (4 * scaledHeight));
      this.paper.path("M" + (this.x + this.width) + " " + this.y + "v" + (4 * scaledHeight));
    },

    drawClef: function(height) {
      // TODO Just testing with a G-clef now
      var glyphOutline = GlyphFactory.getGlyph('G_CLEF');
      var glyph = this.paper.path(glyphOutline);

      console.log("x: " + this.x + ". y: " + this.y);

      glyph.transform("...s" + this.glyphScale + "," + this.glyphScale + ",0,0");

      console.log("Glyph scale: " + this.glyphScale);

      var center = GlyphFactory.getCenter(this.glyphScale);

      var diffX = this.x - center.x;
      var scaledHeight = this.scale * this.heightBetweenLines;
      var diffY = this.y + 3 * scaledHeight - center.y;

      console.log("diffX: " + diffX + " diffY: " + diffY);

      glyph.transform("...T" + diffX + "," + diffY);
      glyph.attr("fill", "black");

      this.addToNoteStart(glyph.getBBox().width);

      console.log('Bounding box: ' +glyph.getBBox());
      console.log("Center: " + center.x + ", " + center.y);
    },

    addToNoteStart: function(offset) {
      this.noteStart += offset;
    },

    getNoteStart: function() {
      return this.noteStart;
    },

    getHighlightShape: function(id) {
      return this.idShapeMapping[id];
    },

    drawScaledNoteAtPosition: function(glyphPath, xPos, yPos, scale) {
        var path = this.paper.path(glyphPath);
        path.transform("...s" + scale + "," + scale + ",0,0");
        var scaledBox = GlyphFactory.getScaledBoundingBox(scale);

        console.log("Width: " +scaledBox.width +". Height: " +scaledBox.height);

        path.transform("...T" + (xPos - scaledBox.width / 2) + "," + (yPos - scaledBox.height / 2));
        return path;
    },

    drawNotes: function(notes) {
      // TODO Available space for notes is not equal to width
      var space = this.width;
      var currentX = 0; //this.x;

      for (var i = 0; i < notes.length; ++i) {
        console.log("Drawing note: " + notes[i]);
        var noteHeadOutline = notes[i].symbol;

        if(!noteHeadOutline) {
          continue;
        }

        var xOffset = this.getNoteStart();
        var path = this.drawScaledNoteAtPosition(noteHeadOutline, xOffset + notes[i].xCoord, notes[i].yCoord, this.glyphScale);
        // path.transform("...s" + this.glyphScale + "," + this.glyphScale + ",0,0");
        // path.transform("...T" + (xOffset + notes[i].xCoord) + "," + notes[i].yCoord);
        path.attr("fill", "black");

        this.idShapeMapping[notes[i].id] = path;

        var circle = this.paper.circle(0, 0, 50);
        circle.transform("...s" + this.glyphScale + "," + this.glyphScale + ",0,0");
        circle.transform("...T" + (xOffset + notes[i].xCoord) + "," + notes[i].yCoord);
        circle.attr("fill", "red");
      }
    },

    getDrawClef: function() {
      return this.shouldDrawClef;
    },

    setDrawClef: function(drawClef) {
      this.shouldDrawClef = drawClef;
    },

    setType: function(type) {
      this.selectedClef = type;
    },

    getType: function() {
      return this.selectedClef;
    }

  };

  return Stave;

})();
