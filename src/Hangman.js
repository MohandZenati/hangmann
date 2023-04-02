import React, { useEffect, useState } from 'react';
import Pendu from './Pendu'
import Popup from './Popup'
import Frenchword from './french.json';

export default function Hangman() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const words = Frenchword;
    console.log(words);
 
    const [corrects, setCorrects] = useState([])
    const [fails, setFails] = useState([])
    const [word,setWord] = useState('')
    const [status,setStatus] = useState('')
    const maskWord =
        word
            .split('')
            .map(letter => corrects.includes(letter) ? letter : "_")
            .join(" ")
    
    const onGuess = letter => {
        if (fails.length > 9 || status)
            return

        if (word.includes(letter)) {
            setCorrects([...corrects, letter])
        }
        else {
            setFails([...fails, letter])
        }
    }

    const randomizeWord = () => setWord(words[Math.floor(Math.random() * words.length)].toUpperCase())

    const reset = () => {
        randomizeWord()
        setCorrects([])
        setFails([])
        setStatus('')
    }

    useEffect(reset,[])

    useEffect(() => {
        if (corrects.length && word.split("").every(letter => corrects.includes(letter)))
            setStatus('gagné');
    },[corrects])

    useEffect(() => {
        if (fails.length === 10)
            setStatus('perdu');
    },[fails])



    return (
        <div>
            <p className='mask'>{maskWord}</p>
            <div>
                {letters
                .map((letter, index) => 
                    <button 
                        key={index} 
                        disabled= {corrects.includes(letter) || fails.includes(letter)}
                        onClick={() => onGuess(letter)}>
                        {letter}
                    </button>
                )}
            </div>
            <Pendu fails={fails.length}/>
            <Popup status={status} word={word} reset={reset}/>

        </div>
    );
}