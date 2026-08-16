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
    synth.triggerAttackRelease("C4", "8n");
    createFallingEmoji(sun,"☀");
});

rain.addEventListener ("click", function() {
    synth.triggerAttackRelease("E4", "8n");
    createFallingEmoji(rain, "💧");
});

thunder.addEventListener("click", function() {
    synth.triggerAttackRelease("G2", "4n");
    createFallingEmoji(thunder, "⚡");
});

wind.addEventListener("click", function() {
    synth.triggerAttackRelease("A2", "2n");
    createFallingEmoji(wind, "🍃");
});

drum.addEventListener("click", function (){
   synth.triggerAttackRelease("C2", "16n");
})



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
        fallingEmoji.remove();
    })

}


