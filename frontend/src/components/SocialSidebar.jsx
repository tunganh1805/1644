import React from 'react';
import './SocialSidebar.css';

const SocialSidebar = () => {
  const socialLinks = [
    { name: 'Zalo', icon: '💬', color: '#0068FF' },
    { name: 'Shopee', icon: '🛒', color: '#EE4D2D' },
    { name: 'TikTok', icon: '🎵', color: '#000000' },
    { name: 'Facebook', icon: '📘', color: '#1877F2' },
  ];

  return (
    <aside className="social-sidebar">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href="#"
          className="social-link"
          style={{ backgroundColor: social.color }}
          title={social.name}
        >
          <span className="social-icon">{social.icon}</span>
        </a>
      ))}
    </aside>
  );
};

export default SocialSidebar;

