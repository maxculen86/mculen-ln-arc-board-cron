/* eslint-disable react/no-danger */
import React from 'react';
import {
    setEventsSecciones,
    setEventsRevistas,
    setEventsProductos
} from './_helper';

export default function FooterEventsScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
            window.addEventListener('DOMContentLoaded', () => {
                ${setEventsSecciones}
                ${setEventsRevistas}
                ${setEventsProductos}
                setEventsSecciones();
                setEventsRevistas();
                setEventsProductos();
            });
        `
            }}
        />
    );
}
