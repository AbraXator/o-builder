import { useEffect, useState } from 'react';

export default function Notification({ message, onClose, duration = 1000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);

    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div className={`fixed top-12 right-6 px-4 py-2 rounded bg-red-600 text-white shadow-lg transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} z-[9999]`}>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          {message}
        </div>
      </div>
    </div>
  )
}