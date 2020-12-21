import { notesToPlayInOrder } from "./music-to-play";
import { MusicalNote, BEATS_PER_MINUTE } from "./musical-score";


function playSingleNote(notes:Array<MusicalNote>,noteNumber:number,time:number )
{
    let note  = notes[noteNumber]
    let id = `${note.pitch}${note.octave}`
    if(note.accidental)
    {
        id+=`${note.accidental}`
    }
    let src= document.getElementById(`${id}`)?.getAttribute("src")
    
    let audio = new Audio(`${src}`)
    audio.load()
    audio.play()

    // playSingleNote() is called recursively according to the number of beats to be played
    setTimeout(()=>{
        audio.pause()
        console.log(time*note.beats)
        playSingleNote(notes, (noteNumber+1)%notes.length, time)
    }, time*note.beats)
}

function playMusic() {
    const notes = notesToPlayInOrder;
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    const timePerBeat= 1*60*1000/BEATS_PER_MINUTE; //time period per beat
    
    // function to play single note
    playSingleNote(notes, 0, timePerBeat)
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
