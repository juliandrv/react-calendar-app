import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(
    (state) => state.calendar
  );

  const setActiveEvent = (event) => {
    dispatch(onSetActiveEvent(event));
  };

  const startSavingEvent = async (event) => {
    //TODO: llegar al backend

    if (event._id) {
      dispatch(onUpdateEvent({ ...event }));
    } else {
      // Creando
      dispatch(
        onAddNewEvent({ ...event, _id: new Date().getTime() })
      );
    }
  };

  const startDeletingEvent = () => {
    //TODO: llamar al backend

    dispatch(onDeleteEvent());
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
