import {AllGlyphs} from "./AllGlyphs";
import {GlyphFactory} from "./viewer/GlyphFactory";


console.log("Test21");


function drawGlyphs() {
    var startX = 100;
    var currentY = 300;
    var currentX = startX;
    var scale = 0.05;
    var scaledBoundedBox = GlyphFactory.getScaledBoundingBox(scale);
    
    var glyphs:Array<any> = AllGlyphs.GLYPH_ARRAY;

    console.log('Font: ' + glyphs.length);

    for (var i = 0; i < glyphs.length; ++i) {
        console.log("Test" + i);

        var glyphArea:RaphaelPaper = Raphael(currentX, currentY, scaledBoundedBox.width, scaledBoundedBox.height);
        var rect = glyphArea.rect(0, 0, scaledBoundedBox.width, scaledBoundedBox.height);
        glyphArea.text(50, 10, glyphs[i].name);

        var glyphPath = glyphs[i].d;
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

}



// document.addEventListener('DOMContentLoaded', function () {
    // var testStave = Raphael(0, 0, 2000, 2000);
    
    // console.log("Test20");
    
    drawGlyphs();
// });

