import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';

import { authorize, checkToken, register } from '../utils/auth';

export default function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isToolTipPopupOpen, setToolTipPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isAvatarLoading, setAvatarLoading] = React.useState(false);
  const [isUserInfoLoading, setUserInfoLoading] = React.useState(false);
  // const [isButtonSubmitLoading, setButtonSubmitLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState({});
  const [isSuccessTooltipStatus, setSuccessTooltipStatus] = React.useState(false);

  const history = useHistory();

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setDeletePopupOpen(false);
    setToolTipPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(updatedUserInfo) {
    // setButtonSubmitLoading(true);
    setUserInfoLoading(true);
    api.setUserInfo(updatedUserInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserInfoLoading(false);
        // setButtonSubmitLoading(false);
      })
  }

  function handleUpdateAvatar(updatedAvatar) {
    setAvatarLoading(true);
    //setButtonSubmitLoading(true);
    api.setAvatar(updatedAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAvatarLoading(false);
        // setButtonSubmitLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(isLiked, card._id)
      .then((updateCard) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? updateCard : c)))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    //setButtonSubmitLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => (c._id !== card._id)))
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setButtonSubmitLoading(false);
      })
  }

  function handleAddPlace(card) {
    //setButtonSubmitLoading(true);
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //setButtonSubmitLoading(false);
      })
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setDeletePopupOpen(true);
  }

  function handleRegister(data) {
    // setButtonSubmitLoading(true);
    register(data)
      .then((res) => {
        if (res) {
          setSuccessTooltipStatus(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setToolTipPopupOpen(true);
        setSuccessTooltipStatus(false);
      })
      .finally(() => {
        // setButtonSubmitLoading(false);
        setToolTipPopupOpen(true);
      })
  }

  function handleLogin(data) {
    //setButtonSubmitLoading(true);
    authorize(data)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setUserEmail(data);
          localStorage.setItem('jwt', res.token);
          history.push('/');

        }
      })
      .catch((err) => {
        setSuccessTooltipStatus(false);
        setToolTipPopupOpen(true);
      })
      .finally(() => {
        //setButtonSubmitLoading(false);
      })
  }


  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setIsLoggedIn(false);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setUserEmail(res.data);
          history.push('/');
        })

      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
          setAvatarLoading(true);
          setUserInfoLoading(true);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(() => {
          setUserInfoLoading(false);
          setAvatarLoading(false);
        })

    }
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />

        <Switch>

          <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}
              cards={cards}
              isAvatarLoading={isAvatarLoading}
              isUserInfoLoading={isUserInfoLoading}
            />

            <Footer />
          </ProtectedRoute>

          <Route path='/sign-up'>
            <Register
              onSignUp={handleRegister}
              isSuccessTooltipStatus={isSuccessTooltipStatus}
            // isLoading={isButtonSubmitLoading}
            />
          </Route>

          <Route path='/sign-in'>

            <Login
              onSignIn={handleLogin}
              isLoggedIn={isLoggedIn}
            //isLoading={isButtonSubmitLoading}
            />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>

        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        //isLoading={isButtonSubmitLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        //isLoading={isButtonSubmitLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        // isLoading={isButtonSubmitLoading}
        />

        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          //  isLoading={isButtonSubmitLoading}
          selectedCard={selectedCard}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          isOpen={isToolTipPopupOpen}
          isSuccessTooltipStatus={isSuccessTooltipStatus}
          onClose={closeAllPopups}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}