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
            value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
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
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
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
