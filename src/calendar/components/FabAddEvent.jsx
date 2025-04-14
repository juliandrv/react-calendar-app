import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

export const FabAddEvent = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleNewEvent = () => {
    setActiveEvent({
      title: 'Nuevo Evento',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: '#fafafa',
      user: {
        _id: 'XXX',
        name: 'Julián',
      },
    });
    openDateModal();
  };

  return (
    <button
      onClick={handleNewEvent}
      className='btn btn-xl btn-circle bg-primary border-0 absolute bottom-6 right-6'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-7'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 4.5v15m7.5-7.5h-15'
        />
      </svg>
    </button>
  );
};
