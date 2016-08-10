import {NoteSequence} from "./NoteSequence";
import {Stave} from "./Stave";

/**
 * Renders a sequence of notes and provides methods
 * for manipulating it.
 */
export class NoteViewer {
    noteArea:RaphaelPaper;

    // TODO Determine margins dynamically
    xMargin:number = 50;
    yMargin:number = 50;


    constructor(parentElement:string, width: number, height: number) {
        this.noteArea = Raphael(parentElement, width, height);
    }


    // renderGlyph() {
    //     this.noteArea.rect(0, 0, this.noteArea.width, this.noteArea.height);
    //     var stave2 = new Stave(this.noteArea, this.xMargin, this.yMargin, this.noteArea.width, this.noteArea.height);
    //     stave2.renderSequence(notes);
    //
    //     var currentTime = 0;
    //     // for (var i = 0; i < notes.notes.length; ++i) {
    //     //   var path = stave2.getHighlightShape(notes.notes[i].id);
    //     //   if (!path) {
    //     //     continue;
    //     //   }
    //     //   setTimeout(getFunction(path, 'red'), currentTime);
    //     //   currentTime += 100;
    //     //   setTimeout(getFunction(path, 'black'), currentTime);
    //     //   currentTime += 100;
    //     // }
    // }


    drawNotes(noteSequence: NoteSequence) {
        this.noteArea.clear();
        this.noteArea.rect(0, 0, this.noteArea.width, this.noteArea.height);
        var stave = new Stave(this.noteArea, this.xMargin, this.yMargin, this.noteArea.width, this.noteArea.height);
        stave.renderSequence(noteSequence);
    }


}