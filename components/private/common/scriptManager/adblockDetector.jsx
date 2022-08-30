/* eslint-disable react/no-danger */
import React from 'react';

const AdblockDetector = () => {
    const script = `
    window.addEventListener('load', () => {
      const check = new Request(
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        { method: 'HEAD', mode: 'no-cors' }
      );
  
      fetch(check)
        .catch((err) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event' : 'adblock-detected',
            'detectado': 'true'
          });
        });
    });
  `;

    return <script defer dangerouslySetInnerHTML={{ __html: script }} />;
};

export default AdblockDetector;
