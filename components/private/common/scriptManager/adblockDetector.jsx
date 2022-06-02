import React from 'react';

const AdblockDetector = () => {
    const anotherScript = `
    window.addEventListener('load', () => {
        setTimeout(function() {
            if ( typeof(window.google_jobrunner) === "undefined" ) {
              console.log("ad blocker installed");
            } else {
              console.log("no ad blocking found.");
            }
          }, 10000);
      });
    `;

    return (
        <>
            <script dangerouslySetInnerHTML={{ __html: anotherScript }} />
        </>
    );
};

export default AdblockDetector;
