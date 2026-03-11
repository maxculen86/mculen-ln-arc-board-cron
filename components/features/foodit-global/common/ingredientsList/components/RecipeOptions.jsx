import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { SITE_FOODIT } from 'fusion:environment';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import {
    copyListToClipboard,
    formatShoppingList,
    shareList
} from '../../shoppingList/_helpers';

function DropdownToggle(props) {
    return (
        <Button
            variant="secondary"
            size={{ sm: 32, md: 40 }}
            title="ver opciones"
            iconOnly
            {...props}
        >
            <Icon size={16}>
                <IconSprite className="sm-none" name="more-horizontal" />
                <IconSprite className="sm-only" name="more-vertical" />
            </Icon>
        </Button>
    );
}

export function RecipeOptions({ list = [], bookmarkId, setShoppingList }) {
    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const currentRecipe = list.find(
        articleList => articleList.bookmarkId === bookmarkId
    );

    const formattedShoppingList = formatShoppingList([currentRecipe]);

    const canonicalPath = currentRecipe?.canonicalUrl || '';
    const fullUrl = canonicalPath ? `${SITE_FOODIT}${canonicalPath}` : '';

    return (
        <Dropdown hideArrow className="ml-auto ml-0_md" onClick={handleClick}>
            <Dropdown.Toggle
                className="text-light-800 text-accent-lechuga__hover"
                as={DropdownToggle}
            />
            <Dropdown.Menu
                alignment="right"
                className="bg-light-1 p-24 rounded-4 shadow-center"
            >
                <ul className="w-202">
                    <Itemcard
                        key={`copy-${bookmarkId}`}
                        icon={<IconSprite name="copy" />}
                        onClick={() =>
                            copyListToClipboard(formattedShoppingList, fullUrl)
                        }
                        text="copiar"
                        variant="default"
                        type="button"
                    />
                    <Itemcard
                        icon={<IconSprite name="share" />}
                        text="Compartir"
                        variant="default"
                        type="button"
                        onClick={() =>
                            shareList(formattedShoppingList, fullUrl)
                        }
                    />
                    <Itemcard
                        key={`delete-${bookmarkId}`}
                        icon={<IconSprite name="delete" />}
                        onClick={() =>
                            window.LN.observable.publish(
                                'showModalIngredient',
                                {
                                    show: true,
                                    data: {
                                        type: 'recipe',
                                        bookmarkId,
                                        setShoppingList
                                    }
                                }
                            )
                        }
                        text="Eliminar"
                        variant="danger"
                        type="button"
                    />
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}
