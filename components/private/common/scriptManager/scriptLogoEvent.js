/* eslint-disable react/no-danger */
import React from 'react';

const ScriptLogoEvent = () => {
    const script = `window.addEventListener('DOMContentLoaded', (event) => {
        document.querySelectorAll('.logo-la-nacion').forEach(item => {
            item.addEventListener('click', event => {
                sessionStorage.setItem('hp', 0);
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
