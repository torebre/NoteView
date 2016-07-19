import {Font} from "./Font";
import {GlyphType} from "./GlyphType";


export class GlyphFactory {

    static getGlyph(glyphType: GlyphType, scale: number = 1.0): string {
        return Font.getPath(glyphType);
    };

    static getBoundingBox() {
        return {
            width: Font.boundingBox[2] - Font.boundingBox[0],
            height: Font.boundingBox[3] - Font.boundingBox[1]
        };
    }

    static getScaledBoundingBox(scale: number) {
        var boundingBox = GlyphFactory.getBoundingBox();
        return {
            width: boundingBox.width * scale,
            height: boundingBox.height * scale
        };
    }

    static getCenter(scale: number) {
        var boundingBox = GlyphFactory.getBoundingBox();
        var diag = Math.sqrt(Math.pow(0.5 * boundingBox.width, 2) + Math.pow(0.5 * boundingBox.height, 2));
        var angle = Math.atan((0.5 * boundingBox.height) / (0.5 * boundingBox.width));
        var temp = scale * diag;
        return {
            x: Math.cos(angle) * temp,
            y: Math.sin(angle) * temp
        };
    };



}
