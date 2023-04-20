/* eslint-disable react/no-danger */
import React from 'react';
import {
    createDynamicLabel,
    setEventSubscribe,
    setEventsSections,
    setEventSearch,
    setEventSignIn,
    addEventListeners,
    addEventToDataLayer
} from '../utils/eventsHelper';

export default function MainHeaderEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        ${addEventToDataLayer}
                        ${addEventListeners}
                        ${createDynamicLabel}
                        ${setEventSubscribe}
                        ${setEventSignIn}
                        ${setEventsSections}
                        ${setEventSearch}
                        
                        setEventSubscribe();
                        setEventSignIn();
                        setEventsSections();
                        setEventSearch();
                    });
                `
            }}
        />
    );
}
