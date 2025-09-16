import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-bg-secondary/70 backdrop-blur-lg sticky top-0 z-50 border-b border-border-primary/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-start space-x-4">
        <img 
          src="https://i.imgur.com/jz6xdOw.png" 
          alt="Elevate Logo" 
          className="h-12 transition-transform duration-300 hover:scale-105"
        />
        <span className="font-heading text-2xl font-bold text-text-primary tracking-widest uppercase">
          Elevate <span className="text-primary">Forge</span>
        </span>
      </div>
    </header>
  );
};