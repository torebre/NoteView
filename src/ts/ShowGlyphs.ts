import Font from './viewer/Font';

// var Raphael = require('raphael');
// var GlyphFactory = require("../viewer/GlyphFactory.js");
// var Font = require("../viewer/Font.js");
// var Font = require("./all_glyphs.js");


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

    var glyphArea = Raphael(currentX, currentY, scaledBoundedBox.width, scaledBoundedBox.height);
    var rect = glyphArea.rect(0, 0, scaledBoundedBox.width, scaledBoundedBox.height);
    glyphArea.text(50, 10, Font[i].name);

    var glyphPath = Font[i].d;
    var path = glyphArea.path(glyphPath);
    path.transform("s" + scale + "," + scale + ",0,0");

    var circle = glyphArea.circle(0.5 * scaledBoundedBox.width, 0.5 * scaledBoundedBox.height, 2, 2);
    circle.attr("fill", "red");

    currentX += scaledBoundedBox.width;
    if (i > 0 && i % 20 === 0) {
        currentX = startX;
        currentY += scaledBoundedBox.height;
    }
}
