/* eslint-disable react/no-danger */
import React from 'react';
import {
    createDynamicLabel,
    setEventsDollar,
    setEventsAccess,
    setEventSubscribe
} from './_helper';

export default function SubHeaderEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
            window.addEventListener('DOMContentLoaded', () => {
                ${createDynamicLabel}
                ${setEventsDollar}
                ${setEventsAccess}
                ${setEventSubscribe}
                setEventsDollar();
                setEventsAccess();
                setEventSubscribe();
            });
        `
            }}
        />
    );
}
