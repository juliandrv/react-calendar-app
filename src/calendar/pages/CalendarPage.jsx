import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';

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

export const CalendarPage = () => {
  const { events, hasEventSelected, setActiveEvent } =
    useCalendarStore();
  const { isDateModalOpen, openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
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

      {hasEventSelected && !isDateModalOpen && <FabDeleteEvent />}
    </>
  );
};
