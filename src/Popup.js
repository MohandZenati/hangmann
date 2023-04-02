const Popup = ({status, word, reset}) => {
    if (!status)
        return null

    return <div className="popup">
        <p>Tu as {status}!</p>
        <p>Le mot été {word}</p>
        <button className="pulse" onClick={reset}>
           Recommencer
        </button>
    </div>
}

export default Popup