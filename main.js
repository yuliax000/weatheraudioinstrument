// browser loads html page > browser loads js > open the dialog > user closes the dialog > audio system loads > user clicks sound button.
// find the dialog
const introDialog = document.getElementById('introDialog');
// find intro button to close modal
const introDialogClose = document.getElementById('introButtonClose');
// show the found element in the browser console

// console.log(introDialog);


//find weather elements
const sun= document.getElementById('sunContainer');
const rain = document.getElementById('rainContainer');
const thunder = document.getElementById('thunderContainer');
const wind = document.getElementById('windContainer');
const drum = document.getElementById('drumContainer');

// create synth
const synth = new Tone.Synth({
    oscillator: {
        type: "sine"
    }}).toDestination();
// create drum synth
const drumSynth = new Tone.MembraneSynth({
    pitchDecay: 0.03,
    octaves: 4,
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.001,
        decay: 0.25,
        sustain: 0,
        release: 0.1
    }
}).toDestination();




// arrays for random pitch.

// I choose some higher pitch notes for Sun to fit the warm and positive feeling.
// rain notes and wind notes are lower pitch as a softer feeling
// thunder notes are the lowest so that it can be associated with thunder's sound.



const sunNotes=[ "C4", "D4", "E4", "G4", "A4",
    "C5", "D5", "E5", "G5", "A5",
    "C6", "E6"];
const rainNotes = [
    "D3", "E3", "G3", "A3", "B3",
    "D4", "E4", "G4", "A4", "B4",
    "D5", "E5"
];
const thunderNotes = [
    "C1", "D1", "E1", "G1", "A1",
    "C2", "D2", "E2", "G2", "A2",
    "C3", "D3"
];

const windNotes = [
    "A3", "B3", "C4", "D4", "E4",
    "F4", "G4", "A4", "B4", "C5",
    "D5", "E5", "G5"
];

const drumNotes = [
    "C1", "C2", "D1", "D2", "E1",
    "G1", "G2", "A1", "A2", "C3"
];





////// Dialog
// open the dialog
introDialog.showModal();
//close the dialog
introDialogClose.addEventListener('click', async function (){
    await Tone.start();
    introDialog.close();
});


// whenever the dialog is closed, run toneInit
// introDialog.addEventListener("close", toneInit);
//
// //////Tone
// // run to setup our audio system
// function toneInit(){
//     synth.connect(Tone.Destination)
// }

// add click events to weather elements



// Each element has different length of notes to provide various feelings.
// Sun is shorter as it gives quite neutral feeling in length.
sun.addEventListener ("click", function() {
    const note = pickRandomNote(sunNotes);

    synth.triggerAttackRelease(note, "4n");
    createFallingEmoji(sun,"☀");
});

// Rain uses a slightly longer note length to evoke the feeling of long, thin strands of falling rain.
rain.addEventListener ("click", function() {
    const note = pickRandomNote(rainNotes);

    synth.triggerAttackRelease(note, "2n");
    createFallingEmoji(rain, "💧");
});

// Thunder uses a drum-like low-pitched sound with the shortest note length to create a heavy and powerful impact, similar to the sound of thunder.
thunder.addEventListener("click", function() {
    const note = pickRandomNote(thunderNotes);

    synth.triggerAttackRelease(note, "8n");
    createFallingEmoji(thunder, "⚡");
});


// Wind uses the longest note length to evoke the feeling of a gust of wind sweeping past.
wind.addEventListener("click", function() {
    const note = pickRandomNote(windNotes);

    synth.triggerAttackRelease(note, "1n");
    createFallingEmoji(wind, "🍃");
});

// The drum uses a separate, very short note length to create a stronger sense of rhythm.
drum.addEventListener("click", function (){
    const note = pickRandomNote(drumNotes);

   drumSynth.triggerAttackRelease(note, "16n");
});



//Visual: create emoji when sections are clicked.
function createFallingEmoji(container, emoji) {
    const fallingEmoji = document.createElement('div');
    fallingEmoji.classList.add('fallingEmoji');
    fallingEmoji.textContent = emoji;

    fallingEmoji.style.left = `${Math.random() * 90}%`;
    fallingEmoji.style.fontSize = `${1+Math.random() * 2}rem`;


    container.appendChild(fallingEmoji);

// Delete emoji when if falls off the drum

    fallingEmoji.addEventListener('animationend', function() {
        playDrumSound();
        showDrumHit();
        fallingEmoji.remove();
    });

}

// function to pick a random note from arrays
function pickRandomNote(notes) {
   const randomIndex = Math.floor(Math.random() * notes.length);
    return notes[randomIndex]; 
}

// function to play drum

function playDrumSound() {
    const note = pickRandomNote(drumNotes);
    drumSynth.triggerAttackRelease(note,"16n");
}


// show animation when the falling Emoji hit the Drum
// I think the drum hit feels a little plain without visual feedback. Adding a visual response to the impact could strengthen the sense of collision and make the interaction feel more engaging.

function showDrumHit(){
    drum.classList.add('drumHit');

    drum.addEventListener('animationend', function() {
        drum.classList.remove('drumHit');
    }, {once: true});
}






