import { useDispatch, useSelector } from 'react-redux';
import calendarAPI from '../api/calendarAPI';
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from '../store/auth/authSlice';
import { onLogoutCalendar } from '../store/calendar/calendarSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking());

      const { data } = await calendarAPI.post('/auth', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 3000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(onChecking());

      const { data } = await calendarAPI.post('/auth/new', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg || 'Error'));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 3000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(onLogout());
      return;
    }

    try {
      const { data } = await calendarAPI.get('auth/renew');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
