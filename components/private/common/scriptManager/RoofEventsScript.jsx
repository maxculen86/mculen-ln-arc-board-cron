/* eslint-disable react/no-danger */
import React from 'react';
import {
    createDynamicLabel,
    setEventsRoof,
    setEventsNavigationLinks,
    getAnchorsFromGroup,
    addEventListeners,
    addEventToDataLayer,
    getRoofTitle
} from '../utils/eventsHelper';

export default function RoofEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        ${createDynamicLabel}
                        ${addEventToDataLayer}
                        ${addEventListeners}
                        ${setEventsRoof}
                        ${getAnchorsFromGroup}
                        ${getRoofTitle}
                        ${setEventsRoof}
                        ${setEventsNavigationLinks}

                        setEventsRoof()
                        setEventsNavigationLinks()
                    });
                `
            }}
        />
    );
}
