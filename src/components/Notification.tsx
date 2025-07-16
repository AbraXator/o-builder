import { useEffect, useState } from 'react';

export interface NotificationState {
  show: boolean;
  props: NotificationProps;
}

interface NotificationProps {
  message: String;
  type: "error" | "success" | "info";
  onClose?: () => void;
  duration?: number;
}

export function Notification({ message, type, onClose, duration = 1000 }: NotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      if(onClose) setTimeout(onClose, 500);

    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  const color = {
    error: "bg-red-500",
    success: "bg-green-500",
    info: "bg-blue-500"
  }[type];
  const icon = {
    error: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>),
    success: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>),
    info: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>)
  }[type]

  return (
    <div className={`fixed top-12 right-6 px-4 py-2 rounded ${color} text-white shadow-lg transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} z-[9999]`}>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-2'>
          {icon}
          {message}
        </div>
      </div>
    </div>
  )
}