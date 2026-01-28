import { useEffect, useState } from 'react';

export function useLive() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(() => new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return {
    raw: now,
    time: now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    date: now.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
