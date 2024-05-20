import React from 'react';
import { buttonConfig, renderAction } from './_helper';
import { allowCommentsFoodit } from '../../../../private/common/utils/commentsHelper';

export const ActionsButtons = ({ article = {} }) => {
    const allowComment = allowCommentsFoodit({ article });

    const updateButtons = button => {
        if (button.type === 'comment') {
            return { ...button, enabled: allowComment };
        }
        return button;
    };

    return buttonConfig
        .map(updateButtons)
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
