import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile" aria-label="Профиль">
                <div className="profile__container">
                    <div className="profile__avatar-container">
                        <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
                        <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__text">
                        <div className="profile__edit-container">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="gallery" aria-label="Фото галлерея">
                {props.cards.map(card => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDeleteClick={props.onCardDeleteClick}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;