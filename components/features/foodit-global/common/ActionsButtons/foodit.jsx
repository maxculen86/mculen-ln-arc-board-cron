import React from 'react';
import { buttonConfig, renderAction } from './_helper';

export const ActionsButtons = ({ article = {} }) => {
    return buttonConfig
        .filter(button => button.enabled)
        .map(({ IconButton, description, handleClick, type }) => {
            return renderAction({
                IconButton,
                description,
                handleClick,
                type,
                article
            });
        });
};

export default ActionsButtons;
