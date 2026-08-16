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
const synth = new Tone.Synth().toDestination();
// create drum synth
const drumSynth = new Tone.MembraneSynth().toDestination();




// arrays for random pitch.
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
sun.addEventListener ("click", function() {
    const note = pickRandomNote(sunNotes);

    synth.triggerAttackRelease(note, "8n");
    createFallingEmoji(sun,"☀");
});

rain.addEventListener ("click", function() {
    const note = pickRandomNote(rainNotes);

    synth.triggerAttackRelease(note, "8n");
    createFallingEmoji(rain, "💧");
});

thunder.addEventListener("click", function() {
    const note = pickRandomNote(thunderNotes);

    synth.triggerAttackRelease(note, "4n");
    createFallingEmoji(thunder, "⚡");
});

wind.addEventListener("click", function() {
    const note = pickRandomNote(windNotes);

    synth.triggerAttackRelease(note, "2n");
    createFallingEmoji(wind, "🍃");
});

drum.addEventListener("click", function (){
    const note = pickRandomNote(drumNotes);

   synth.triggerAttackRelease(note, "16n");
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
        fallingEmoji.remove();
    });

}

// function to pick a random note from array
function pickRandomNote(notes) {
   const randomIndex = Math.floor(Math.random() * notes.length);
    return notes[randomIndex];
}

// function to play drum

function playDrumSound() {
    const note = pickRandomNote(drumNotes);
    drumSynth.triggerAttackRelease(note,"16n");
}








