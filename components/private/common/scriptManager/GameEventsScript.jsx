/* eslint-disable react/no-danger */
import React from 'react';
import {
    addEventListeners,
    addEventToDataLayer,
    createDynamicLabel
} from '../utils/eventsHelper';

export const setEventsGames = (createLabelFunction, addListenersFunction) => {
    const games = window.document.querySelectorAll('.ln-card-games > a');
    const ACTION = 'jugar';
    const JUEGOS_LN10 = 'juegos_ln10';
    games.forEach(game => {
        if (!game) return;
        const titleFormatted = createLabelFunction(game.title);
        const payload = {
            action: ACTION,
            label: `${ACTION}_${titleFormatted}`,
            category: JUEGOS_LN10
        };

        addListenersFunction(game, payload);
    });
};
const GameEventScript = () => {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {                
                        ${addEventToDataLayer}
                        const addEventListeners = ${addEventListeners.toString()};
                        const createDynamicLabel = ${createDynamicLabel.toString()};
                        const setEvents = ${setEventsGames.toString()};
                        
                        setEvents(createDynamicLabel, addEventListeners);
                    });
                `
            }}
        />
    );
};

export default GameEventScript;
