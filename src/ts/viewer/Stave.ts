import {GlyphFactory} from "./GlyphFactory";
import {NoteSequence} from "./NoteSequence";
import {RenderNote} from "./RenderNote";
import {StaveUtilities} from "./StaveUtilities";
import {GlyphType} from "./GlyphType";


export class Stave {
    private heightBetweenLines:number = 12;
    private scale:number = 1.0;
    private glyphScale:number = 0.05;

    private noteStart:number = 0;

// Height and width of a bar before scaling
    private unscaledWidth:number = 300;
    private unscaledHeight:number = 200;

    shouldDrawClef:boolean = true;
    idShapeMapping:Array<RaphaelPath> = [];


    constructor(private paper:RaphaelPaper, private x:number, private y:number,
                private width:number, private height:number) {
        this.noteStart = x;
    }


    render() {
        this.drawStave();
        this.drawClef(5 * this.heightBetweenLines);
    }

    getYCoord(octave:number, notePlacement:number) {
        var scaledHeight = this.scale * this.heightBetweenLines;

        return this.y + (6 - octave) * (scaledHeight * 4) + (2 - notePlacement) * scaledHeight / 2;
    }

    // renderSequence(notesequence:string) {
    //     this.renderSequence((NoteSequence)notesequence)
    // }

    renderSequence(noteSequence:NoteSequence) {
        // TODO Clear existing data

        console.log("Note sequence: " +noteSequence);

        this.drawStave();
        this.drawClef(5 * this.heightBetweenLines);
        // TODO There is less space available than the total width
        var spaceOfSingleDuration = this.unscaledWidth / noteSequence.durationOfBar;
        var bars:Array<Array<RenderNote>> = [];
        var notesInBar:Array<RenderNote> = [];

        if (noteSequence.notes.length == 0) {
            return;
        }
        console.log('Rendering: ' + noteSequence);
        console.log('Space of single duration: ' + spaceOfSingleDuration);
        console.log('Width: ' + this.width + '. Duration: ' + noteSequence.durationOfBar);
        console.log('Notes: ' +noteSequence.notes.length);

        for (var i = 0; i < noteSequence.notes.length; i++) {
            var currentNote = noteSequence.notes[i];
            if (currentNote.elementType == "BAR_LINE") { //GlyphType.BAR_LINE) {
                bars.push(notesInBar);
                notesInBar = [];
            }

            var placement = StaveUtilities.getNoteLinePlacement(currentNote.pitch);

            // console.log("Glyph: " +GlyphFactory.getGlyph(currentNote.elementType));

            notesInBar.push(new RenderNote(
                currentNote.id,
                GlyphFactory.getGlyph(currentNote.elementType),
                currentNote.durationWithinBar * spaceOfSingleDuration,
                placement.notePlacement,
                placement.octave
            ));
        }

        if(notesInBar.length != 0) {
            bars.push(notesInBar);
        }

        // TODO Render all bars
        this.drawNotes(bars[0]);
    }

    drawStave() {
        var scaledHeight = this.scale * this.heightBetweenLines;
        for (var i = 0; i < 5; ++i) {
            this.paper.path("M" + this.x + " " + (this.y + i * scaledHeight) + "h" + this.unscaledWidth);
        }
        this.paper.path("M" + this.x + " " + this.y + "v" + (4 * scaledHeight));
        this.paper.path("M" + (this.x + this.unscaledWidth) + " " + this.y + "v" + (4 * scaledHeight));
    }

    drawClef(height:number) {
        // TODO Just testing with a G-clef now
        var glyphOutline = GlyphFactory.getGlyph("G_CLEF"); // GlyphFactory.getGlyph(GlyphType.G_CLEF);
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

        console.log('Bounding box: ' + glyph.getBBox());
        console.log("Center: " + center.x + ", " + center.y);
    }

    addToNoteStart(offset:number) {
        this.noteStart += offset;
    }

    getNoteStart() {
        return this.noteStart;
    }

    getHighlightShape(id:number) {
        return this.idShapeMapping[id];
    }

    drawScaledNoteAtPosition(glyphPath:string, xPos:number, yPos:number, scale:number) {
        var path = this.paper.path(glyphPath);
        path.transform("...s" + scale + "," + scale + ",0,0");
        var scaledBox = GlyphFactory.getScaledBoundingBox(scale);
        path.transform("...T" + (xPos - scaledBox.width / 2) + "," + (yPos - scaledBox.height / 2));
        return path;
    }

    drawNotes(notes:Array<RenderNote>) {
        // TODO Available space for notes is not equal to width
        var space = this.unscaledWidth;
        var currentX = 0;

        console.log("Notes to render: " +notes);

        for (var i = 0; i < notes.length; ++i) {
            console.log("Drawing note: " + notes[i].symbol);
            var noteHeadOutline = notes[i].symbol;
            if (!noteHeadOutline) {
                continue;
            }

            var xOffset = this.getNoteStart();
            var yCoord = this.getYCoord(notes[i].octave, notes[i].placement);
            var path = this.drawScaledNoteAtPosition(noteHeadOutline, xOffset + notes[i].xCoord, yCoord, this.glyphScale);
            // path.transform("...s" + this.glyphScale + "," + this.glyphScale + ",0,0");
            // path.transform("...T" + (xOffset + notes[i].xCoord) + "," + notes[i].yCoord);
            path.attr("fill", "black");

            this.idShapeMapping[notes[i].id] = path;

            var circle = this.paper.circle(0, 0, 50);
            circle.transform("...s" + this.glyphScale + "," + this.glyphScale + ",0,0");
            circle.transform("...T" + (xOffset + notes[i].xCoord) + "," + yCoord);
            circle.attr("fill", "red");
            this.drawExtraLines(xOffset + notes[i].xCoord, notes[i].octave, notes[i].placement);
        }
    }

    drawExtraLines(xCoord:number, octave:number, notePlacement:number) {
        var line = octave * 6 + notePlacement;
        var scaledHeight = this.scale * this.heightBetweenLines;
        var lineCounter = 1;

        if (line < 31) {
            for (var current = 30; current >= line; current = current - 2) {
                var path = "M" + (xCoord - 15) + " " + (this.y + (4 + lineCounter) * scaledHeight) + "h" + 30;
                this.paper.path(path);
                ++lineCounter;
            }
        } else if (line > 45) {
            for (var current = 46; current <= line; current = current + 2) {
                // TODO There should be a check somewhere to prevent from getting negative y-coordinates
                var path = "M" + (xCoord - 15) + " " + (this.y - lineCounter * scaledHeight) + "h" + 30;
                this.paper.path(path);
                ++lineCounter;
            }
        }

    }

    getDrawClef() {
        return this.shouldDrawClef;
    }

    setDrawClef(drawClef:boolean) {
        this.shouldDrawClef = drawClef;
    }

}
