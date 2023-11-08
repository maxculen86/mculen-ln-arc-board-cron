/* eslint-disable react/no-danger */
import React from 'react';
import {
    addEventListeners,
    addEventToDataLayer,
    createDynamicLabel,
    setEventsGames
} from '../utils/eventsHelper';

//TO DO : Test
export default function GameEventScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {                
                        ${addEventToDataLayer}
                        ${addEventListeners}
                        ${createDynamicLabel}
                        ${setEventsGames}
                      
                        setEventsGames();
                    });
                `
            }}
        />
    );
}
