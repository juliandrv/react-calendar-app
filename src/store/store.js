import { configureStore } from '@reduxjs/toolkit';

import { uiSlice } from './ui/uiSlice';
import { authSlice } from './auth/authSlice';
import { calendarSlice } from './calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
