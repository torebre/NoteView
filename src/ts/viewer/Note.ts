import {GlyphType} from "./GlyphType";

export class Note {

    constructor(public id:number,
                public elementType:GlyphType,
                public pitch:number,
                public durationWithinBar:number) {

    }


}