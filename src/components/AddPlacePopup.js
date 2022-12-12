import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

export default function AddPlacePopup(props) {

    const {
        values,
        errors,
        isElementValid,
        handleElementChange,
        resetFormInputs
    } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace(values);
    }

    React.useEffect(() => {
        resetFormInputs();
    }, [resetFormInputs, props.isOpen]);

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isDisabled={!isElementValid}
        >
            <>
                <input
                    type="text"
                    placeholder="Название"
                    className={errors.name ? "form__field form__field_type_error" : "form__field"}
                    name="name"
                    id="place-name-input"
                    required minLength="2"
                    maxLength="30"
                    value={values.name || ""}
                    onChange={handleElementChange}
                />
                <span className={errors.name ? "form__text-error form__field_type_active" : "form__text-error"}>
                    {errors.name}
                </span>

                <input
                    type="url"
                    placeholder="Ссылка на картинку"
                    className={errors.link ? "form__field form__field_type_error" : "form__field"}
                    id="place-link-input"
                    name="link"
                    required
                    value={values.link || ""}
                    onChange={handleElementChange}
                />
                <span className={errors.name ? "form__text-error form__field_type_active" : "form__text-error"}>
                    {errors.link}
                </span>
            </>
        </PopupWithForm>
    )
}