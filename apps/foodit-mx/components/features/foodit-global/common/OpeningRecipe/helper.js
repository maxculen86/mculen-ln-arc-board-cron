import React from 'react';
import Static from 'fusion:static';
import { Itemcard } from '@ln/foodit-ui-itemcard';

export const renderItemCard = ({
    text,
    icon,
    action,
    bookmarkId,
    articleId
}) => {
    const isGuardarOption = text === 'Guardar';
    const isShoppingListOption = text.includes('lista de compras');
    const shouldDisable = isShoppingListOption && bookmarkId !== null;

    if (isGuardarOption) {
        return (
            <Static id={`btn-saved-${articleId}`}>
                <Itemcard
                    onClick={action}
                    fullWidth
                    type="button"
                    icon={icon}
                    text={text}
                    data-id={articleId}
                    data-modal="open-modal"
                />
            </Static>
        );
    }

    return (
        <Itemcard
            onClick={action}
            fullWidth
            type="button"
            icon={icon}
            text={text}
            className={shouldDisable ? 'card-item-disabled' : ''}
            style={{
                cursor: shouldDisable ? 'not-allowed' : 'pointer'
            }}
            disabled={shouldDisable}
        />
    );
};
