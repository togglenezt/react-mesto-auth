import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(isLiked, card._id)
      .then((updateCard) => {
        const updatedCards = cards.map((c) => (c._id === card._id ? updateCard : c))
        setCards(updatedCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const updatedCards = cards.filter((c) => (c._id !== card._id))
        setCards(updatedCards)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupState(!isImagePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarState(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfileState(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlaceState(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setImagePopupState(false);
    setDeletePopupState(false);
    setSelectedCard({});
  }


  function handleUpdateUser(onUpdateUser) {
    api.setUserInfo(onUpdateUser)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(onUpdateAvatar) {
    api.setAvatar(onUpdateAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlace(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setDeletePopupState(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDeleteClick={handleCardDeleteClick}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        selectedCard={selectedCard}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
