import {GlyphType} from "./GlyphType";

export class Note {

    // id": 0,
    // "pitch": 60,
    // "cumulativeDuration": 0,
    // "elementType": "HALFNOTE"


    constructor(public id:number,
                public elementType:GlyphType,
                public pitch:number,
                public cumulativeDuration:number) {

    }


}