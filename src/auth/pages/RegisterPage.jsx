import { NavLink } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useState } from 'react';

const formFields = {
  username: '',
  email: '',
  password: '',
};

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { startRegister, errorMessage } = useAuthStore();

  const { username, email, password, onInputChange } =
    useForm(formFields);

  const onSubmit = (event) => {
    event.preventDefault();
    startRegister({ name: username, email, password });
  };

  return (
    <>
      <div className='flex justify-center items-center w-full min-h-screen'>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <div className='flex items-center justify-center gap-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-10 text-center'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
                />
              </svg>
              <h1 className='text-3xl font-bold'>CalendarApp</h1>
            </div>
            <h2 className='mt-10 text-center text-2xl'>
              Crea una nueva cuenta
            </h2>

            {errorMessage && (
              <div
                role='alert'
                className='alert alert-error alert-soft transition mt-2'
              >
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={onSubmit} className='space-y-6'>
              <label className='input validator w-full'>
                <svg
                  className='h-[1em] opacity-50'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <g
                    strokeLinejoin='round'
                    strokeLinecap='round'
                    strokeWidth='2.5'
                    fill='none'
                    stroke='currentColor'
                  >
                    <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                    <circle cx='12' cy='7' r='4'></circle>
                  </g>
                </svg>
                <input
                  type='input'
                  required
                  placeholder='Nombre de usuario'
                  pattern='[A-Za-z][A-Za-z0-9\-]*'
                  minLength='3'
                  maxLength='30'
                  title='Solo letras, números o guiones'
                  name='username'
                  value={username}
                  onChange={onInputChange}
                />
              </label>
              <p className='validator-hint hidden mt-0'>
                Debe comenzar con una letra y tener entre 2 y 30
                caracteres
              </p>

              <label className='input validator w-full'>
                <svg
                  className='h-[1em] opacity-50'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <g
                    strokeLinejoin='round'
                    strokeLinecap='round'
                    strokeWidth='2.5'
                    fill='none'
                    stroke='currentColor'
                  >
                    <rect
                      width='20'
                      height='16'
                      x='2'
                      y='4'
                      rx='2'
                    ></rect>
                    <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
                  </g>
                </svg>
                <input
                  type='email'
                  placeholder='correo@ejemplo.com'
                  required
                  name='email'
                  value={email}
                  onChange={onInputChange}
                />
              </label>
              <div className='validator-hint hidden mt-0'>
                Ingresa un correo válido
              </div>

              <label className='input validator w-full'>
                <svg
                  className='h-[1em] opacity-50'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <g
                    strokeLinejoin='round'
                    strokeLinecap='round'
                    strokeWidth='2.5'
                    fill='none'
                    stroke='currentColor'
                  >
                    <path d='M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z'></path>
                    <circle
                      cx='16.5'
                      cy='7.5'
                      r='.5'
                      fill='currentColor'
                    ></circle>
                  </g>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder='Contraseña'
                  minLength='8'
                  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                  title='Debe contener más de 8 caracteres, incluyendo un número,
                una letra minúscula y una letra mayúscula'
                  name='password'
                  value={password}
                  onChange={onInputChange}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2'
                  aria-label={
                    showPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5 opacity-50'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5 opacity-50'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  )}
                </button>
              </label>
              <p className='validator-hint hidden mt-0'>
                Debe contener más de 8 caracteres, incluyendo un
                número, una letra minúscula y una letra mayúscula
              </p>

              <button
                type='submit'
                className='btn w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white  hover:bg-indigo-500'
              >
                Crear cuenta
              </button>
            </form>

            <p className='mt-10 text-center text-sm/6 text-gray-500'>
              ¿Ya estas registrado?{' '}
              <NavLink
                to='/auth/login'
                className='font-semibold text-indigo-600 hover:text-indigo-500'
              >
                Ingresa aquí
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
