const speech = window.speechSynthesis;

const form = document.querySelector('form'); 
const textInput = document.querySelector('#text-input') as HTMLInputElement; 
const rateValue = document.querySelector('#rate-value') as HTMLDivElement; 
const pitchValue = document.querySelector('#pitch-value') as HTMLDivElement; 
const rate = document.querySelector('#rate') as HTMLInputElement; 
const pitch = document.querySelector('#pitch') as HTMLInputElement; 
const voiceSelect = document.querySelector('#voice-select') as HTMLSelectElement; 
const button = document.querySelector('button'); 

let voices : SpeechSynthesisVoice []; 

const getVoices = () => {
    voices = speech.getVoices(); 

    voices.forEach(voice => {
        const option = document.createElement('option'); 

        option.textContent = voice.name + '('+ voice.lang +')'; 

        option.setAttribute('data-lang', voice.lang); 
        option.setAttribute('data-name', voice.name);
        
        voiceSelect?.appendChild(option); 
    }); 
}

getVoices(); 
if(speech.onvoiceschanged !== undefined) {
    speech.onvoiceschanged = getVoices; 
}

const speak = (isSpeaking: boolean, text: string) => {
    if(isSpeaking) {

        console.error('Already speaking...'); 
        return;
    }
    if(text !== ''){

        const textToSpeak = new SpeechSynthesisUtterance(text); 

        textToSpeak.onend = event => {
            console.log('Speaking finished...'); 
        }

        textToSpeak.onerror = event => {
            console.error('Failed to speak the text...');  
        }

        const chosenVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        
         voices.forEach(voice => {
             if (voice.name === chosenVoice) {
                 textToSpeak.voice = voice; 
             }
         }); 

         textToSpeak.rate = parseInt(rate.value, 10); 
         textToSpeak.pitch = parseInt(pitch.value, 10); 

         speech.speak(textToSpeak); 
    }
}; 

form?.addEventListener('submit', event => {
    event.preventDefault(); 

    speak(speech.speaking, textInput.value); 
    textInput.blur(); 
}); 

rate.addEventListener('change', () => {
    rateValue.innerText = rate.value; 
}); 

pitch.addEventListener('change', () => {
    pitchValue.innerText = pitch.value; 
}); 
