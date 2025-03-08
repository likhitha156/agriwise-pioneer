
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FontLoader: React.FC = () => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set the lang attribute on the html element
    document.documentElement.lang = i18n.language;
    
    // Clean up any previously loaded language-specific fonts
    const existingLinks = document.head.querySelectorAll('link[data-font]');
    existingLinks.forEach(link => {
      document.head.removeChild(link);
    });
    
    // Add the appropriate fonts based on language
    const fontLinks: { [key: string]: string } = {
      // Default fonts - always load these
      'default': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&display=swap',
      // Language-specific fonts
      'hi': 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
      'te': 'https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap'
    };
    
    // Always load default fonts
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'stylesheet';
    defaultLink.href = fontLinks['default'];
    defaultLink.setAttribute('data-font', 'default');
    document.head.appendChild(defaultLink);
    
    // Load language-specific fonts if needed
    if (fontLinks[i18n.language]) {
      const langLink = document.createElement('link');
      langLink.rel = 'stylesheet';
      langLink.href = fontLinks[i18n.language];
      langLink.setAttribute('data-font', i18n.language);
      document.head.appendChild(langLink);
    }
  }, [i18n.language]);
  
  return null; // This component doesn't render anything
};

export default FontLoader;
