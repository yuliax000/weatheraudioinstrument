// browser loads html page > browser loads js > open the dialog > user closes the dialog > audio system loads > user clicks sound button.
// find the dialog
const introDialog = document.getElementById('introDialog');
// find intro button to close modal
const introDialogClose = document.getElementById('introButtonClose');
// show the found element in the browser console

// console.log(introDialog);


////// Dialog
// open the dialog
introDialog.showModal();
//close the dialog
introDialogClose.addEventListener('click', function closeIntroDialog(){
    introDialog.close();
});



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
