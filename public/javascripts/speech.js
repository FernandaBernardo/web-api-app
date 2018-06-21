var synth = window.speechSynthesis;
var speakButton = document.querySelector('.speak');
var inputTxt = document.querySelector('.description');
var voice;

function populateVoiceList() {
    var voices = synth.getVoices();

    for(i = 0; i < voices.length ; i++) {
        if(voices[i].lang == 'pt-BR') {
            voice = voices[i];
            break;
        }
    }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
    voices = synth.getVoices()
}

speakButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    var utterThis = new SpeechSynthesisUtterance(inputTxt.textContent);    
    utterThis.voice = voice;
    synth.speak(utterThis);
    
    utterThis.onpause = function(event) {
        var char = event.utterance.text.charAt(event.charIndex);
        console.log('Speech paused at character ' + event.charIndex + ' of "' +
        event.utterance.text + '", which is "' + char + '".');
    }
});