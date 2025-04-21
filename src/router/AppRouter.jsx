import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { useAuthStore } from '../hooks/useAuthStore';

export const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route path='/' element={<CalendarPage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
};
