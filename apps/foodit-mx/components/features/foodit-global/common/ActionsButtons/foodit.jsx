import { buttonConfig, renderAction } from './_helper';
import get from '../../../../private/common/utils/get';

export const ActionsButtons = ({
    article = {},
    isPrivate = false,
    printButtonType = 'regular'
}) =>
    buttonConfig.reduce(
        (
            acc,
            { type, handleClick, IconButton, description, isPrivateButton }
        ) => {
            if (
                !(isPrivate && isPrivateButton) &&
                (type !== 'comment' ||
                    get(article, 'comments.display_comments', true))
            ) {
                acc.push(
                    renderAction({
                        IconButton,
                        description,
                        handleClick,
                        type,
                        article,
                        printButtonType
                    })
                );
            }
            return acc;
        },
        []
    );

export default ActionsButtons;
