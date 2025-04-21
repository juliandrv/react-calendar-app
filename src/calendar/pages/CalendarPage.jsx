import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useEffect, useMemo, useState } from 'react';

import { Calendar } from 'react-big-calendar';

import { Navbar } from '../components/Navbar';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { FabAddEvent } from '../components/FabAddEvent';
import { FabDeleteEvent } from '../components/FabDeleteEvent';

import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';

import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useAuthStore } from '../../hooks/useAuthStore';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { activeEvent } = useCalendarStore();

  const {
    events,
    hasEventSelected,
    setActiveEvent,
    startLoadingEvents,
  } = useCalendarStore();
  const { isDateModalOpen, openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    // if (!isMyEvent) return;

    const style = {
      backgroundColor: isMyEvent ? '#355cf7' : '#665660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onSelected = (event) => {
    setActiveEvent(event);
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  const onSelectSlot = () => {
    if (!hasEventSelected) return;
    setActiveEvent(null);
  };

  const isMyEvent = useMemo(() => {
    if (!hasEventSelected) return false;

    return user.uid === activeEvent.user._id;
  }, [hasEventSelected, activeEvent]);

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        formats={{
          timeGutterFormat: 'hh:mm a',
        }}
        style={{
          height: 'calc(100vh - 72px)',
          backgroundColor: 'white',
          color: 'black',
        }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={onSelected}
        onDoubleClickEvent={onDoubleClick}
        onView={onViewChanged}
        selectable={true}
        onSelectSlot={onSelectSlot}
      />

      <CalendarModal />

      <FabAddEvent />

      {hasEventSelected && !isDateModalOpen && isMyEvent && (
        <FabDeleteEvent />
      )}
    </>
  );
};
