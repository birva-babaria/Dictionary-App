const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const word = document.getElementById('inp-word');
const search = document.getElementById('search-btn');
const definitionbox = document.getElementsByClassName('definitionbox')[0];

let speak = null;

let getMeaning = async () => {
    if (word.value == ''){
        alert("You must enter a word!")
    }
    //If the url is already added using the event listener in speak, we gotta pause it
    if (speak) {
        speak.pause();
        speak.currentTime = 0;
    }

    const errordiv = document.getElementsByClassName("error")[0];
    errordiv.innerHTML = '';

    let response = await fetch(`${url}${word.value}`);
    let data = await response.json();
    console.log(data);
    if (!Array.isArray(data)) {
        errordiv.innerHTML = data.message;
        definitionbox.style.display = 'none';
        return;
    }
    
    definitionbox.style.display = 'block';

    const inp_word = document.getElementsByClassName('word')[0];
    const word_class = document.getElementsByClassName('word-class')[0];
    const def = document.getElementsByClassName('def')[0];
    const exp = document.getElementsByClassName('exp')[0];
    const pronunciation = document.getElementsByClassName('pronunciation')[0];

    inp_word.innerHTML = word.value;
    word_class.innerHTML = data[0].meanings[0].partOfSpeech;
    def.innerHTML = data[0].meanings[0].definitions[0].definition;
    exp.innerHTML = data[0].meanings[0].definitions[0].example || '';
    
    const audioUrl = data[0].phonetics[0].audio;
    speak = new Audio(audioUrl);
    pronunciation.addEventListener('click', () => {
        speak.play().catch(error => {
            console.error('Error playing audio:', error)
        })
    });
}

search.addEventListener('click', getMeaning);