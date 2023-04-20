/* eslint-disable react/no-danger */
import React from 'react';
import {
    setEventsWeather,
    setEventsTopics,
    addEventListeners,
    addEventToDataLayer,
    createDynamicLabel
} from '../utils/eventsHelper';

export default function PreHeaderEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        ${createDynamicLabel}
                        ${addEventToDataLayer}
                        ${addEventListeners}
                        ${setEventsWeather}
                        ${setEventsTopics}

                        setEventsWeather();
                        setEventsTopics();
                    });
                `
            }}
        />
    );
}
