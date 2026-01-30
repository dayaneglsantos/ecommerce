import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { IoCalendar } from 'react-icons/io5';
import 'react-day-picker/style.css';
import dayjs from 'dayjs';
import { ptBR } from 'react-day-picker/locale';

interface DateSelectProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

export default function DateSelect({
  value,
  onChange,
  placeholder,
}: DateSelectProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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
        className="min-w-44 flex items-center justify-between gap-3 px-3 py-2 border border-primary-light rounded cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span className="text-gray-500">
          {value
            ? dayjs(value).format('DD/MM/YYYY')
            : placeholder || 'Selecione'}
        </span>
        <IoCalendar className="p-1 text-2xl rounded-full text-gray-700" />
      </div>
      {showCalendar && (
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
          className="text-sm mb-2 z-50 absolute rounded shadow-lg w-fit p-2 bg-orange-50"
          required
          locale={ptBR}
        />
      )}
    </div>
  );
}
