import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { copyListToClipboard } from '../../shoppingList/_helpers';

export const RecipeOptions = ({ list, bookmarkId, setShoppingList }) => {
    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <Dropdown hideArrow className="ml-auto ml-0_md" onClick={handleClick}>
            <Dropdown.Toggle
                className="text-light-800 text-accent-lechuga__hover"
                as={props => (
                    <Button
                        variant="secondary"
                        size={{ sm: 32, md: 40 }}
                        title="ver opciones"
                        iconOnly
                        {...props}
                    />
                )}
            >
                <Icon size={16}>
                    <IconSprite className="sm-none" name="more-horizontal" />
                    <IconSprite className="sm-only" name="more-vertical" />
                </Icon>
            </Dropdown.Toggle>
            <Dropdown.Menu
                alignment="right"
                className="bg-light-1 p-24 rounded-4 shadow-center"
            >
                <ul className="w-202">
                    <Itemcard
                        key={`copy-${bookmarkId}`}
                        icon={<IconSprite name={'copy'} />}
                        onClick={() =>
                            copyListToClipboard([
                                list.find(
                                    articleList =>
                                        articleList.bookmarkId === bookmarkId
                                )
                            ])
                        }
                        text="copiar"
                        variant="default"
                        type="button"
                    />
                    <Itemcard
                        key={`delete-${bookmarkId}`}
                        icon={<IconSprite name={'delete'} />}
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
};
