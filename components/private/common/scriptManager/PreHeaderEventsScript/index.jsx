/* eslint-disable react/no-danger */
import React from 'react';
import { setEventsWeather, setEventsTopics } from './_helper';

export default function PreHeaderEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
            window.addEventListener('DOMContentLoaded', () => {
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
