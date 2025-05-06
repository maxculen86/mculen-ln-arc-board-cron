import React, { useEffect, useMemo, useState } from 'react';
import Static from 'fusion:static';
import propTypes from 'prop-types';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { Tooltip } from '@ln/common-ui-tooltip';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import getBookmarks from '../bookmark/api/getBookmarks';
import { dayFoodQuantities } from '../MenuSemanal/helpers/_helper';
import useAuthManager from '../../../../private/common/auth/hooks/useAuthManager';
import { handleIngredientListButton } from '../../Body/PowerupsReceta/ingredientsBox/_helper';
import { useIsInShoppingList } from '../../Body/PowerupsReceta/ingredientsBox/hooks/useIsInShoppingList';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../private/common/auth/helper/loginHelper';
import usePortions from '../../Body/PowerupsReceta/ingredientsBox/hooks/usePortions';
import useIngredientsList from '../../Body/PowerupsReceta/ingredientsBox/hooks/useIngredientsList';
import get from '../../../../private/common/utils/get';

export function ActionsButtons({
    handleOpen,
    article: { _id: articleId },
    article
}) {
    const title = get(article, 'headlines.basic', '');
    const [countDayFood, setCountDayFood] = useState(0);
    const { token, accessToken } = useAuthManager();
    const isSuscriptor = useMemo(
        () => isSubscribed(SUBSCRIBED_HELPER.FOODIT),
        []
    );

    const { bookmarkId, setBookmarkId } = useIsInShoppingList(
        isSuscriptor,
        articleId
    );

    const { portionsValue } = usePortions('recipe-portions');
    const { ingredientsLists } = useIngredientsList('ingredients-list');

    const handleWeeklyMenuCount = async () => {
        if (!token || !accessToken) return;

        try {
            const { data = [] } = await getBookmarks(
                token,
                accessToken,
                'weeklyMenu'
            );
            const dayFoodCountArray = dayFoodQuantities(data);
            const count = dayFoodCountArray.reduce((acc, item) => {
                const { count: total } = item;
                return acc + total;
            }, 0);
            setCountDayFood(count);
        } catch (error) {
            console.error('Error fetching weekly menu count:', error);
        }
    };

    useEffect(() => {
        if (token && accessToken) {
            handleWeeklyMenuCount();
        }
    }, [token, accessToken]);

    const handleShoppingListAdd = async () => {
        try {
            await handleIngredientListButton({
                isSuscriptor,
                title,
                articleId,
                bookmarkId,
                setBookmarkId,
                ingredientsLists,
                portions: portionsValue
            });
        } catch (error) {
            console.error('Shopping list update failed:', error);
        }
    };

    const options = [
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
                <Icon size={20} className="relative">
                    {countDayFood > 0 && (
                        <span className="w-14 h-14 flex ai-center jc-center roboto roboto-bold text-8 top-0 right-0 translate-x-50 absolute rounded-circle bg-danger-500 text-light-1">
                            {countDayFood}
                        </span>
                    )}
                    <IconSprite name="weekly-menu" critical />
                </Icon>
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
                    Los ingredientes de esta receta ya se encuentran en la lista
                    de compras
                </span>
            ),
            action: handleShoppingListAdd
        }
    ];

    const renderItemCard = item => {
        const { text, icon, action } = item;
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

    return (
        <Dropdown hideArrow className="print-hide">
            <Dropdown.Toggle className="text-light-800 text-accent-lechuga__hover">
                <Button title="Agregar" size={{ sm: 32, lg: 40 }}>
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
                        {renderItemCard({ text, icon, tooltip, action })}
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
    );
}

ActionsButtons.propTypes = {
    handleOpen: propTypes.func.isRequired,
    article: propTypes.shape({
        _id: propTypes.string.isRequired
    }).isRequired
};
