import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
} from '../store/calendar/calendarSlice';
import calendarAPI from '../api/calendarAPI';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(
    (state) => state.calendar
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (event) => {
    dispatch(onSetActiveEvent(event));
  };

  const startSavingEvent = async (event) => {
    try {
      if (event.id) {
        await calendarAPI.put(`/events/${event.id}`, event);

        dispatch(
          onUpdateEvent({
            ...event,
            user: {
              _id: user.uid,
              name: user.name,
            },
          })
        );

        return;
      }

      // Creando
      const { data } = await calendarAPI.post('/events', event);

      dispatch(
        onAddNewEvent({
          ...event,
          id: data.event.id,
          user: {
            _id: user.uid,
            name: user.name,
          },
        })
      );
    } catch (error) {
      console.log(error);
      console.log('Error al guardar el evento');
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarAPI.delete(`/events/${activeEvent.id}`);
    } catch (error) {
      console.log(error);
      console.log('Error al eliminar el evento');
    }

    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPI.get('/events');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
