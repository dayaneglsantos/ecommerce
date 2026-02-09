import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { IoCalendar } from 'react-icons/io5';
import 'react-day-picker/style.css';
import dayjs from 'dayjs';
import { ptBR } from 'react-day-picker/locale';
import { createPortal } from 'react-dom';

interface CalendarInputProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

export default function CalendarInput({
  value,
  onChange,
  placeholder,
}: CalendarInputProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedOutsideContainer =
        containerRef.current && !containerRef.current.contains(target);

      const clickedOutsideCalendar =
        calendarRef.current && !calendarRef.current.contains(target);

      if (clickedOutsideContainer && clickedOutsideCalendar) {
        setShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div
        className="min-w-44 flex items-center justify-between gap-3 px-3 py-2 border bg-white border-gray-300 shadow-sm rounded cursor-pointer"
        onClick={() => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setCalendarPosition({
              top: rect.bottom,
              left: rect.left,
            });
          }
          setShowCalendar(!showCalendar);
        }}
      >
        <span className="text-gray-500">
          {value
            ? dayjs(value).format('DD/MM/YYYY')
            : placeholder || 'Selecione'}
        </span>
        <IoCalendar className="p-1 text-2xl rounded-full text-gray-700" />
      </div>
      {showCalendar &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: calendarPosition.top,
                left: calendarPosition.left,
                pointerEvents: 'auto',
              }}
              ref={calendarRef}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <DayPicker
                animate
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => {
                  if (date) {
                    onChange(dayjs(date).format('YYYY-MM-DD'));
                  }
                  setShowCalendar(false);
                }}
                className="text-sm rounded shadow-lg w-fit p-2 bg-orange-50"
                required
                locale={ptBR}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
