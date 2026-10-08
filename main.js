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

const sunIcon = document.getElementById('sunIcon');
const rainIcon = document.getElementById('rainIcon');
const thunderIcon = document.getElementById('thunderIcon');
const windIcon = document.getElementById('windIcon');
const grassIcon = document.getElementById('grassIcon');

//I found that generating falling images only within their corresponding sections felt a little repetitive and did not reflect how weather behaves in reality. For example, rain would not fall within a strictly defined area. Therefore, I expanded the range of the falling icons to cover the entire webpage. I also changed the trigger interaction so that users click the corresponding weather image to generate the falling icons, rather than clicking anywhere within a section. In other words, each weather image now works like a button that generates its corresponding visual elements.



const main = document.querySelector("main")

// find volume slider

const volumeSlider = document.getElementById('volumeSlider');
const volumeHand = document.getElementById('volumeHand');


    // slider value binding with hand position

function updateVolumeControl() {
    const min = Number(volumeSlider.min);
    const max = Number(volumeSlider.max);
    const value = Number(volumeSlider.value);


    const percent = (value - min) / (max - min);
    const sliderWidth = volumeSlider.getBoundingClientRect().width;
    const thumbWidth = 22;

    const handPosition = thumbWidth / 2 + percent * (sliderWidth - thumbWidth);

    volumeHand.style.left = `${handPosition}px`;


    if (value === 0) {
        Tone.Destination.volume.value = -Infinity;
    } else {
        Tone.Destination.volume.value = (value - 100) / 2;
    }
}

volumeSlider.addEventListener('input', updateVolumeControl);
updateVolumeControl();




// create reverb
const reverb = new Tone.Reverb(8).toDestination();
reverb.wet.value = 0.8;


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
sunIcon.addEventListener ("click", function() {
    const note = pickRandomNote(sunNotes);

    synth.triggerAttackRelease(note, "4n");
    createSkyFallingIcon("assets/sun.png");
});

rainIcon.addEventListener ("click", function() {
    const note = pickRandomNote(rainNotes);

    synth.triggerAttackRelease(note, "2n");
    createSkyFallingIcon("assets/water.png")
});

thunderIcon.addEventListener("click", function() {
    const note = pickRandomNote(thunderNotes);

    synth.triggerAttackRelease(note, "8n");
    createSkyFallingIcon("assets/thunder.png");
});

windIcon.addEventListener("click", function() {
    const note = pickRandomNote(windNotes);

    synth.triggerAttackRelease(note, "1n");
    createSkyFallingIcon("assets/leaf.png")
});

drum.addEventListener("click", function (){
    const note = pickRandomNote(drumNotes);



    synth.triggerAttackRelease(note, "16n");
});




//Visual: create emoji when sections are clicked.


// function createFallingEmoji(container, imagePath) {
//     const fallingEmoji = document.createElement('img');
//     fallingEmoji.classList.add('fallingEmoji');
//     fallingEmoji.src = imagePath;
//     fallingEmoji.alt = "";
//
//     fallingEmoji.style.left = `${Math.random() * 90}%`;
//     fallingEmoji.style.fontSize = `${1+Math.random() * 2}rem`;
//
//
//     container.appendChild(fallingEmoji);
//
// // Delete emoji when if falls off the drum
//
//     fallingEmoji.addEventListener('animationend', function() {
//         playDrumSound();
//         showDrumHit();
//         fallingEmoji.remove();
//     });
//
// }

// let the icons falling from whole sky area

function createSkyFallingIcon(imagePath) {
    const fallingIcon = document.createElement("img");

    const landingPosition = 5 + Math.random() * 90;

    fallingIcon.classList.add("skyFallingIcon");
    fallingIcon.src = imagePath;
    fallingIcon.alt = "";
    fallingIcon.style.left = `${landingPosition}%`;

    main.appendChild(fallingIcon);

    fallingIcon.addEventListener("animationend", function() {
        playDrumSound();
        showDrumHit();
        showGrassAt(landingPosition);
        fallingIcon.remove();
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

function showDrumHit(){
    drum.classList.add('drumHit');
    // showGrassPop();

    drum.addEventListener('animationend', function() {
        drum.classList.remove('drumHit');
    }, {once: true});
}

// I chose to make the grass pop up while the icons hit the ground because it provides more visual feedback
// grass pop up function
// function showGrassPop() {
//     const grass = document.createElement("img");
//
//     grass.classList.add("grassPop");
//     grass.src = "assets/grass.png";
//     grass.alt = "";
//
//     grass.style.left = `${Math.random() * 90}%`;
//
//     drum.appendChild(grass);
//
//     grass.addEventListener("animationend", function() {
//         grass.remove();
//     });
// }


// show grass at the corresponding position

function showGrassAt(position) {
    const grass = document.createElement("img");

    grass.classList.add("grassPop");
    grass.src = "assets/grass60.png";
    grass.alt = "";
    grass.style.left = `${position}%`;

    drum.appendChild(grass);

    grass.addEventListener("animationend", function() {
        grass.remove();
    });
}











