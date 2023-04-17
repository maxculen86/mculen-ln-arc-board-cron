/* eslint-disable react/no-danger */
import React from 'react';
import {
    createDynamicLabel,
    setEventsFooter,
    addEventListeners,
    addEventToDataLayer
} from '../utils/eventsHelper';

export default function FooterEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {                
                        ${addEventToDataLayer}
                        ${addEventListeners}
                        ${createDynamicLabel}
                        ${setEventsFooter}
                        
                        setEventsFooter();
                    });
                `
            }}
        />
    );
}
