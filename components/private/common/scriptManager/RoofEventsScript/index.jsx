/* eslint-disable react/no-danger */
import React from 'react';
import { setScriptRoof, getAnchorsFromGroup, setHandleClick } from './_helper';

export default function RoofEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        ${setHandleClick}
                        ${getAnchorsFromGroup}
                        ${setScriptRoof}
                        setScriptRoof()
                    });
                `
            }}
        />
    );
}
