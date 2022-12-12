import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `place__delite-button ${isOwn ? 'place__delite-button_visible' : 'place__delite-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `${isLiked ? 'place__like place__like_click_active' : 'place__like'}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card);
      }

      function handleDeleteClick() {
        props.onCardDeleteClick(props.card)
      }


    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="place">
            <img src={props.card.link} alt={props.card.name} className="place__image" onClick={handleClick} />
            <div className="place__text">
                <h2 className="place__title">{props.card.name}</h2>
                <div className="place__like-display">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="place__like-counter" name="">{props.card.likes.length}</p>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </article>
    )
}
