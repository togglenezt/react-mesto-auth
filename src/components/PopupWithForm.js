import React from 'react';



function PopupWithForm(props) {
    return (
        <div className={`pop-up popup_type_${props.name} ${props.isOpen ? 'pop-up_opened' : ''}`}>
            <form action="#" className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
                <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
                <h3 className="form__title">{props.title}</h3>
                {props.children}
                <button disabled={props.isDisabled} className={props.isDisabled ? "form__submit-button form__submit-button_disabled" : "form__submit-button"} type="submit">
                    {props.buttonText}
                    </button>
            </form>
        </div>
    )
}

export default PopupWithForm;