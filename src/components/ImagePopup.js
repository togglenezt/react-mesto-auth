function ImagePopup(props) {
    return (
        <div className={`pop-up pop-up-overlay pop-up_opacity ${props.isOpen ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__image-container">
                <img src={props.card.link} alt={props.card.name} className="pop-up__image" />
                <p className="pop-up__text-image">{props.card.name}</p>
                <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;
