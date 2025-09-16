import React from 'react';
import { TwitterIcon } from './icons/TwitterIcon.tsx';
import { InstagramIcon } from './icons/InstagramIcon.tsx';
import { TwitchIcon } from './icons/TwitchIcon.tsx';

const socialLinks = [
  { name: 'Twitter', href: 'https://x.com/ElevateGG_BR', icon: TwitterIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/elevate.gg/', icon: InstagramIcon },
  { name: 'Twitch', href: 'https://www.twitch.tv/elevategg', icon: TwitchIcon },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-deep border-t border-border-primary mt-16">
      <div className="container mx-auto px-4 py-8 text-center text-text-muted">
        <div className="flex justify-center items-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors duration-300"
              aria-label={`Elevate no ${link.name}`}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} Elevate Forge. Todos os direitos reservados.</p>
        <p className="text-sm mt-1">Hub de votação e transmissão do torneio.</p>
      </div>
    </footer>
  );
};