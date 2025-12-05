import React, { useCallback, useMemo } from 'react';
import propTypes from 'prop-types';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useDisclosure } from '@ln/hooks';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { handleIngredientListButton } from '../../Body/PowerupsReceta/ingredientsBox/_helper';
import { useIsInShoppingList } from '../../Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../private/common/auth/helper/loginHelper';
import usePortions from '../../Body/PowerupsReceta/ingredientsBox/hooks/usePortions';
import useIngredientsList from '../../Body/PowerupsReceta/ingredientsBox/hooks/useIngredientsList';
import get from '../../../../private/common/utils/get';
import { renderItemCard } from './helper';
import isSSR from '../../../../private/LN/common/utils/isSSR';

export function RecipeActionsDropdown({
    handleOpen,
    countDayFood,
    article: { _id: articleId },
    article
}) {
    const title = get(article, 'headlines.basic', '');
    const canonicalUrl = get(article, 'canonical_url', '');
    const isSuscriptor = isSubscribed(SUBSCRIBED_HELPER.FOODIT);
    const tooltipWasVisible =
        !isSSR() && window?.localStorage.getItem('menu-semanal-tooltip');
    const { isOpen, onClose } = useDisclosure(!tooltipWasVisible);

    const handleVisibility = () => {
        onClose();
        window.localStorage.setItem('menu-semanal-tooltip', 'show');
    };

    const { bookmarkId, setBookmarkId } = useIsInShoppingList(
        isSuscriptor,
        articleId
    );

    const { portionsValue } = usePortions('recipe-portions');
    const { ingredientsLists } = useIngredientsList('ingredients-list');

    const handleShoppingListAdd = useCallback(async () => {
        try {
            await handleIngredientListButton({
                isSuscriptor,
                title,
                articleId,
                bookmarkId,
                setBookmarkId,
                ingredientsLists,
                portions: portionsValue,
                canonicalUrl
            });
        } catch (error) {
            console.error('Shopping list update failed:', error);
        }
    }, [
        isSuscriptor,
        title,
        articleId,
        bookmarkId,
        setBookmarkId,
        ingredientsLists,
        portionsValue,
        canonicalUrl
    ]);

    const options = useMemo(
        () => [
            {
                id: `btn-saved-${articleId}`,
                icon: (
                    <Icon size={20}>
                        <IconSprite name="bookmark" critical />
                    </Icon>
                ),
                text: 'Guardar',
                action: () => {}
            },
            {
                id: `btn-weekly-menu-${articleId}`,
                icon: (
                    <div className="relative">
                        {countDayFood > 0 && (
                            <span
                                style={{ fontStyle: 'normal' }}
                                className="w-14 h-14 flex ai-center jc-center roboto roboto-bold text-8 top-0 right-0 translate-x-50 absolute rounded-circle bg-info-700 text-light-1"
                            >
                                {countDayFood}
                            </span>
                        )}
                        <IconSprite
                            width={20}
                            height={20}
                            name="weekly-menu"
                            critical
                        />
                    </div>
                ),
                text: 'Agregar al menú semanal',
                action: handleOpen
            },
            {
                id: `btn-shopping-list-${articleId}`,
                icon: (
                    <Icon size={20}>
                        <IconSprite name="shopping-list" critical />
                    </Icon>
                ),
                text: 'Agregar a la lista de compras',
                tooltip: bookmarkId && (
                    <span className="text-12">
                        Los ingredientes de esta receta ya se encuentran en la
                        lista de compras
                    </span>
                ),
                action: handleShoppingListAdd
            }
        ],
        [articleId, countDayFood, handleOpen, handleShoppingListAdd, bookmarkId]
    );

    return (
        <Tooltip
            style={{ maxWidth: '109px' }}
            content={
                <div className="flex">
                    <span className="text-12">¡Descubrí Menú semanal!</span>
                </div>
            }
            className="flex rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 text-12 border border-all border-thin border-light-100 z-5 w-max max-w-248"
            disableTrigger
            visible={isOpen}
            position="right-center"
        >
            <Dropdown hideArrow className="print-hide">
                <Dropdown.Toggle className="text-light-800 text-accent-lechuga__hover">
                    <Button
                        onClick={handleVisibility}
                        title="Agregar"
                        size={{ sm: 32, lg: 40 }}
                    >
                        <Icon size={16}>
                            <IconSprite name="plus" />
                        </Icon>
                        AGREGAR
                    </Button>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    alignment="left"
                    className="bg-light-1 p-24 flex flex-column rounded-4 shadow-center"
                >
                    {options.map(({ id, text, icon, tooltip, action }) => (
                        <li key={id} className="flex jc-center ai-center gap-8">
                            {renderItemCard({
                                text,
                                icon,
                                action,
                                bookmarkId,
                                articleId
                            })}
                            {bookmarkId !== null &&
                                tooltip &&
                                text.includes('lista de compras') && (
                                    <Tooltip
                                        position="bottom-center"
                                        toggleOn="click"
                                        style={{ maxWidth: '152px' }}
                                        content={tooltip}
                                        className="flex rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 border border-all border-thin border-light-100 z-5"
                                    >
                                        <Button
                                            title="Mostrar tooltip"
                                            variant="link"
                                        >
                                            <Icon size={16}>
                                                <IconSprite
                                                    name="info"
                                                    fill="#B3B3B3"
                                                />
                                            </Icon>
                                        </Button>
                                    </Tooltip>
                                )}
                        </li>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </Tooltip>
    );
}

RecipeActionsDropdown.propTypes = {
    handleOpen: propTypes.func.isRequired,
    countDayFood: propTypes.number.isRequired,
    article: propTypes.shape({
        _id: propTypes.string.isRequired
    }).isRequired
};
