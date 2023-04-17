/* eslint-disable react/no-danger */
import React from 'react';
import {
    createDynamicLabel,
    setEventsDollar,
    setEventsAccess,
    addEventListeners,
    addEventToDataLayer
} from '../utils/eventsHelper';

export default function SubHeaderEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        ${addEventToDataLayer}
                        ${addEventListeners}
                        ${createDynamicLabel}
                        ${setEventsDollar}
                        ${setEventsAccess}

                        setEventsDollar();
                        setEventsAccess();
                    });
                `
            }}
        />
    );
}
