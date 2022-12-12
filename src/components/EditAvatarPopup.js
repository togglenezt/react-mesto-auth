import React from 'react';

import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

export default function EditAvatarPopup(props) {
    const {
        values,
        errors,
        isElementValid,
        handleElementChange,
        resetFormInputs
    } = useForm({});


    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(values);
    }

    React.useEffect(() => {
        resetFormInputs();
    }, [resetFormInputs, props.isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isDisabled={!isElementValid}
        >
            <>
                <input
                    type="url"
                    placeholder="Ссылка на аватарку"
                    className={errors.avatar ? "form__field form__field_type_error" : "form__field"}
                    id="avatar-input"
                    name="avatar"
                    required
                    value={values.avatar || ""}
                    onChange={handleElementChange}
                />
                <span className={errors.avatar ? "form__text-error form__field_type_active" : "form__text-error"}>
                    {errors.avatar}
                </span>
            </>
        </PopupWithForm>
    )
}