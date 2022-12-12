import React from 'react';

import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';

export default function EditProfilePopup(props) {

    const {
        values,
        errors,
        isElementValid,
        handleElementChange,
        resetFormInputs
    } = useForm({});

    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser(values);
    }

    React.useEffect(() => {
        if (currentUser) {
            resetFormInputs(currentUser);
        }
    }, [currentUser, resetFormInputs, props.isOpen]);

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isDisabled={!isElementValid}
        >
            <>
                <input
                    type="text"
                    placeholder="Имя"
                    className={errors.name ? "form__field form__field_type_error" : "form__field"}
                    id="name-input" name="name"
                    required minLength="2"
                    maxLength="40"
                    value={values.name || ""}
                    onChange={handleElementChange}
                />
                <span className={errors.name ? "form__text-error form__field_type_active" : "form__text-error"}>
                    {errors.name}
                </span>

                <input
                    type="text"
                    placeholder="О себе"
                    className={errors.about ? "form__field form__field_type_error" : "form__field"}
                    id="job-input"
                    name="about"
                    required minLength="2"
                    maxLength="200"
                    value={values.about || ""}
                    onChange={handleElementChange}
                />
                <span className={errors.name ? "form__text-error form__field_type_active" : "form__text-error"}>
                    {errors.about}
                </span>
            </>
        </PopupWithForm>
    )
}