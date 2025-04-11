import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';

import { Navbar } from '../components/Navbar';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';

import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { useState } from 'react';

const events = [
  {
    title: 'Aprender React',
    notes: 'Estudiar diariamente',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Julián',
    },
  },
];

export const CalendarPage = () => {
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
    console.log({ click: event });
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
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
      />

      <CalendarModal />
    </>
  );
};
