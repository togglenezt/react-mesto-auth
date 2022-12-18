import React from 'react';
import AuthForm from './AuthForm';
import useFormValidator from '../hooks/useFormValidator';

export default function Register(props) {

  const {
    values,
    errors,
    isElementValid,
    handleElementChange,
  } = useFormValidator({});

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onSignUp(values)
  }

  
  return (
    <AuthForm
      submitButtonText='Зарегистрироваться'
      title='Регистрация'
      isValid={isElementValid}
      onSubmit={handleSubmit}
      formName='register'
    >

      <input
        className='auth__input'
        placeholder='Email'
        aria-label='электронная почта'
        type='email'
        id='email'
        name='email'
        value={values.email || ''}
        onChange={handleElementChange}
        required
      />

      <span className={errors.email ? "auth__input-error auth__input-error_visible" : "auth__input-error"}>
        {errors.email}
      </span>

      <input
        className='auth__input'
        placeholder='Пароль'
        type='password'
        id='password'
        name='password'
        value={values.password || ''}
        onChange={handleElementChange}
        required
      />

      <span className={errors.password ? "auth__input-error auth__input-error_visible" : "auth__input-error"}>
        {errors.password}
      </span>

    </AuthForm>
  )
}