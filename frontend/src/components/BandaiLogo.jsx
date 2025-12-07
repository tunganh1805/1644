import React, { useState } from 'react';
import './BandaiLogo.css';

const BandaiLogo = ({ size = 'medium' }) => {
  const [imgError, setImgError] = useState(false);
  
  const bandaiLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Logo_Bandai.svg/786px-Logo_Bandai.svg.png';
  
  const logoSrc = imgError ? bandaiLogoUrl : '/logobandai.png';

  return (
    <img 
      src={logoSrc}
      alt="Bandai Logo" 
      className={`bandai-logo bandai-logo-${size}`}
      onError={() => {
        if (!imgError) {
          setImgError(true);
        }
      }}
      loading="lazy"
    />
  );
};

export default BandaiLogo;

