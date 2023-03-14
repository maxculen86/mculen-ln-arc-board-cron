/* eslint-disable react/no-danger */
import React from 'react';
import { setEventsFooter } from './_helper';

export default function FooterEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
            window.addEventListener('DOMContentLoaded', () => {
                ${setEventsFooter}
                setEventsFooter();
            });
        `
            }}
        />
    );
}
