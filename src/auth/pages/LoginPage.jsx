import { NavLink } from 'react-router';

export const LoginPage = () => {
  return (
    <>
      <div className='flex justify-center items-center w-full min-h-screen'>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              alt='Your Company'
              src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
              className='mx-auto h-10 w-auto'
            />
            <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-white'>
              Inicia sesión en tu cuenta
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6'>
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
                  placeholder='mail@site.com'
                  required
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
                  type='password'
                  required
                  placeholder='Password'
                  minLength='8'
                  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                  title='Debe contener más de 8 caracteres, incluyendo un número,
                una letra minúscula y una letra mayúscula'
                />
              </label>
              <p className='validator-hint hidden mt-0'>
                Debe contener más de 8 caracteres, incluyendo un
                número, una letra minúscula y una letra mayúscula
              </p>

              <button
                type='submit'
                className='btn w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white  hover:bg-indigo-500'
              >
                Iniciar sesión
              </button>
            </form>

            <p className='mt-10 text-center text-sm/6 text-gray-500'>
              ¿No tienes una cuenta?{' '}
              <NavLink
                to='/auth/register'
                className='font-semibold text-indigo-600 hover:text-indigo-500'
              >
                Regístrate aquí
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
