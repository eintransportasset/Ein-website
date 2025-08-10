'use client'; 
import { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';


export default function DateInput({ control, name ,register}: any) {
  const [showCalendar, setShowCalendar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Optional: Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div ref={ref} style={{ position: 'relative' }}>
                     <input
             type="text"
             value={field.value || ''}
             readOnly
             onClick={() => setShowCalendar((prev) => !prev)}
             placeholder="Select date"
             style={{ padding: '8px', width: '300px' }}
             className='input'
             {...register}
           />

          {showCalendar && (
            <div style={{ position: 'absolute', zIndex: 10, background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                             <DayPicker
                 mode="single"
                 selected={field.value ? new Date(field.value + 'T00:00:00') : undefined}
                onSelect={(date) => {
                  // Convert Date to YYYY-MM-DD format to avoid timezone issues
                  if (date) {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const dateString = `${year}-${month}-${day}`;
                    field.onChange(dateString);
                  } else {
                    field.onChange('');
                  }
                  setShowCalendar(false);
                }}
              />
            </div>
          )}
        </div>
      )}
    />
  );
}
