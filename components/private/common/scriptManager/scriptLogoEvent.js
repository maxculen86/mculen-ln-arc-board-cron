/* eslint-disable react/no-danger */
import React from 'react';

const ScriptLogoEvent = () => {
    const script = `window.addEventListener('DOMContentLoaded', (event) => {
        document.querySelectorAll('.nacion-home').forEach(item => {
            item.addEventListener('click', event => {
                sessionStorage.removeItem('hp');
                sessionStorage.removeItem('lb');
            })
          })
    });`;

    return (
        <script
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: script }}
        />
    );
};

export default ScriptLogoEvent;
