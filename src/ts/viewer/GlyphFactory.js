//var Font = require("./Font.js");
var GlyphFactory = (function () {
    function GlyphFactory() {
    }
    GlyphFactory.getGlyph = function (glyphType, scale) {
        var glyph = Font[glyphType];
        return typeof glyph === "undefined" ? null : glyph.d;
    };
    ;
    GlyphFactory.getBoundingBox = function () {
        return {
            width: Font.boundingBox[2] - Font.boundingBox[0],
            height: Font.boundingBox[3] - Font.boundingBox[1]
        };
    };
    ;
    GlyphFactory.getScaledBoundingBox = function (scale) {
        boundingBox = GlyphFactory.getBoundingBox;
        return {
            width: GlyphFactory.getBoundingBox.width() * scale,
            height: boundingBox.height * scale
        };
    };
    ;
    GlyphFactory.getCenter = function (scale) {
        var boundingBox = GlyphFactory.getBoundingBox();
        var diag = Math.sqrt(Math.pow(0.5 * boundingBox.width, 2) + Math.pow(0.5 * boundingBox.height, 2));
        var angle = Math.atan((0.5 * boundingBox.height) / (0.5 * boundingBox.width));
        var temp = scale * diag;
        return {
            x: Math.cos(angle) * temp,
            y: Math.sin(angle) * temp
        };
    };
    ;
    return GlyphFactory;
})();
//# sourceMappingURL=GlyphFactory.js.map