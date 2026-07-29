// find test button
const testButton = document.getElementById('testButton');

// init synth
const synth = new Tone.Synth().toDestination();

//do something when the button is clicked
testButton.addEventListener('click', playNote);


//function that runs when button is clicked
function playNote(){
    //play a note for a duration
    synth.triggerAttackRelease("C4", "8n");
}
