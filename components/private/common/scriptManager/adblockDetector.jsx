/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const AdblockDetector = ({ location = 'body-bottom' }) => {
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
            'event' : 'adblock-detected'
          });
        });
    });
  `;

    return (
        <>
            <script defer dangerouslySetInnerHTML={{ __html: script }} />
        </>
    );
};

AdblockDetector.propTypes = {
    location: PropTypes.string
};

export default AdblockDetector;
