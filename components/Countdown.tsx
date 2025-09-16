import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft | null => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0) {
    return null;
  }

  return {
    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / 1000 / 60) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  };
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[70px] sm:min-w-[90px]">
      <span className="text-5xl sm:text-6xl font-bold text-primary tracking-tighter font-heading" style={{ textShadow: '0 0 15px var(--color-primary-glow)' }}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-md md:text-lg uppercase text-text-secondary mt-1 tracking-widest font-heading">{label}</span>
    </div>
);

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      if (!newTimeLeft) {
        clearInterval(timer);
        // Força um re-render no componente pai para remover o countdown
        window.location.reload();
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="card p-8">
      <h2 className="text-center text-xl sm:text-2xl font-semibold text-text-secondary tracking-widest uppercase mb-6 font-heading">A Votação Começa Em</h2>
      <div className="flex justify-center space-x-4 sm:space-x-8">
        <TimeUnit value={timeLeft.dias} label="Dias" />
        <TimeUnit value={timeLeft.horas} label="Horas" />
        <TimeUnit value={timeLeft.minutos} label="Minutos" />
        <TimeUnit value={timeLeft.segundos} label="Segundos" />
      </div>
    </div>
  );
};