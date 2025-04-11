import { Navigate, Route, Routes } from 'react-router';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CalendarPage } from '../calendar/pages/CalendarPage';

export const AppRouter = () => {
  const authStatus = 'not-authenticated';

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <Route path='/*' element={<CalendarPage />} />
      ) : (
        <Route path='/auth/*' element={<AuthRoutes />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
