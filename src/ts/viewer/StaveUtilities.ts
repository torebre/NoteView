/**
  Collection of utility methods used when drawing the notes.

**/
  class StaveUtilities {


    static getNoteLinePlacement(pitch:number) {
        // TODO This is only correct if we are in C-major

        var octave = Math.floor(pitch / 12);
        var noteWithinOctave = pitch % 12;
        var notePlacement;

        switch (noteWithinOctave) {
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

        return {
            octave: octave,
            noteWithinOctave: noteWithinOctave,
            notePlacement: notePlacement
        }
    }
}
