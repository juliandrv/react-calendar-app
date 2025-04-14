import 'react-datepicker/dist/react-datepicker.css';

import { useState, useRef, useMemo, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es);

export const CalendarModal = () => {
  const modalRef = useRef(null);

  const { activeEvent, setActiveEvent, startSavingEvent } =
    useCalendarStore();

  const { isDateModalOpen, closeDateModal } = useUiStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: new Date(),
  });

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
    setActiveEvent(null);
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(
      formValues.end,
      formValues.start
    );

    if (isNaN(difference) || difference <= 0) {
      return;
    }

    if (formValues.title.length <= 0) return;

    // TODO: remover errores en pantalla

    await startSavingEvent(formValues);
    onCloseModal();
    setFormSubmitted(false);
  };

  const endDateClass = useMemo(() => {
    if (!formSubmitted) return '';

    return formValues.end && formValues.end > formValues.start
      ? ''
      : 'input-error';
  }, [formValues.end, formSubmitted]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return formValues.title.length >= 3 ? '' : 'input-error';
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  return (
    <dialog
      open={isDateModalOpen}
      ref={modalRef}
      id='my_modal_5'
      className='modal modal-bottom sm:modal-middle'
      onClose={onCloseModal}
    >
      <div className='modal-box'>
        <h1 className='text-3xl'>
          {activeEvent ? formValues.title : 'Nuevo evento'}
        </h1>

        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn btn-lg btn-circle btn-ghost absolute right-4 top-4'>
              ✕
            </button>
          </form>
        </div>

        <form onSubmit={onSubmit} className='space-y-6'>
          <fieldset className='fieldset mb-3'>
            <legend className='fieldset-legend'>
              Fecha y hora inicio
            </legend>
            <DatePicker
              minDate={new Date()}
              selected={formValues.start}
              className='input w-full'
              onChange={(event) => onDateChanged(event, 'start')}
              dateFormat='P, h:mm aaaa'
              timeFormat='h:mm aaaa'
              showTimeSelect
              locale='es'
              timeCaption='Hora'
            />
          </fieldset>

          <fieldset className='fieldset mb-3'>
            <legend className='fieldset-legend'>
              Fecha y hora fin
            </legend>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              className={`input w-full ${endDateClass}`}
              onChange={(event) => onDateChanged(event, 'end')}
              dateFormat='P, h:mm aaaa'
              timeFormat='h:mm aaaa'
              showTimeSelect
              locale='es'
              timeCaption='Hora'
            />
            {endDateClass === 'input-error' && (
              <p className='text-error'>
                La fecha y hora de fin debe ser mayor a la de inicio
              </p>
            )}
          </fieldset>

          <fieldset className='fieldset mb-3'>
            <legend className='fieldset-legend'>Título</legend>
            <input
              type='text'
              className={`input w-full ${titleClass}`}
              placeholder='Título del evento'
              name='title'
              value={formValues.title}
              onChange={onInputChanged}
            />
            {titleClass === 'input-error' && (
              <p className='text-error'>
                Debe tener al menos 3 caracteres
              </p>
            )}
          </fieldset>

          <fieldset className='fieldset mb-3'>
            <legend className='fieldset-legend'>Notas</legend>
            <textarea
              className='textarea h-24 w-full'
              placeholder='Descripción del evento'
              name='notes'
              value={formValues.notes}
              onChange={onInputChanged}
            />
          </fieldset>

          <button
            type='submit'
            className='btn w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white  hover:bg-indigo-500'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3'
              />
            </svg>
            Guardar
          </button>
        </form>
      </div>
    </dialog>
  );
};
