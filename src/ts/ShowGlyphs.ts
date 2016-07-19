import {Font} from './viewer/Font';
import {GlyphFactory} from "./viewer/GlyphFactory";
import {AllGlyphs} from "./AllGlyphs";


// Test stave
var testStave = Raphael(0, 0, 2000, 2000);


var startX = 100;
var currentY = 300;
var currentX = startX;
var scale = 0.05;
var scaledBoundedBox = GlyphFactory.getScaledBoundingBox(scale);

console.log('Font: ' +Font.length);

for (var i = 0; i < Font.length; ++i) {
    console.log("Test" + i);

    var glyphArea:RaphaelPaper = Raphael(currentX, currentY, scaledBoundedBox.width, scaledBoundedBox.height);
    var rect = glyphArea.rect(0, 0, scaledBoundedBox.width, scaledBoundedBox.height);
    glyphArea.text(50, 10, AllGlyphs.GLYPH_ARRAY[i].name);

    var glyphPath = AllGlyphs.GLYPH_ARRAY[i].d;
    var path = glyphArea.path(glyphPath);
    path.transform("s" + scale + "," + scale + ",0,0");

    var circle = glyphArea.circle(0.5 * scaledBoundedBox.width, 0.5 * scaledBoundedBox.height, 2);
    circle.attr("fill", "red");

    currentX += scaledBoundedBox.width;
    if (i > 0 && i % 20 === 0) {
        currentX = startX;
        currentY += scaledBoundedBox.height;
    }
}
