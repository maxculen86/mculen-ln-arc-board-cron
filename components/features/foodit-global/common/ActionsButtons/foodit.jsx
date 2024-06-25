import { buttonConfig, renderAction } from './_helper';
import get from '../../../../private/common/utils/get';

export const ActionsButtons = ({ article = {} }) => {
    const allowComment = get(article, 'comments.display_comments', true);

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
