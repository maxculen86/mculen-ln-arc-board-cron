import React from 'react';
import propTypes from 'prop-types';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { Tooltip } from '@ln/common-ui-tooltip';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function ActionsButtons({ handleOpen }) {
    const options = [
        {
            icon: (
                <Icon size={20}>
                    <IconSprite name="bookmark" critical />
                </Icon>
            ),
            text: 'Guardar',
            action: () => console.log('Guardar')
        },
        {
            icon: (
                <Icon size={20} className="relative">
                    <span className="w-14 h-14 flex ai-center jc-center roboto roboto-bold text-8 top-0 right-0 translate-x-50 absolute rounded-circle bg-danger-500 text-light-1">
                        2
                    </span>
                    <IconSprite name="weekly-menu" critical />
                </Icon>
            ),
            text: 'Agregar al menú semanal',
            action: handleOpen
        },
        {
            icon: (
                <Icon size={20}>
                    <IconSprite name="shopping-list" critical />
                </Icon>
            ),
            text: 'Agregar a la lista de compras',
            tooltip: (
                <span className="text-12">
                    Los ingredientes de esta receta ya se encuentran en la lista
                    de compras
                </span>
            ),
            action: () => console.log('Agregar a la lista de compras')
        }
    ];

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
                {options.map(({ text, icon, tooltip, action }) => (
                    <li key={text} className="flex jc-center ai-center gap-8">
                        <Itemcard
                            onClick={action}
                            fullWidth
                            type="button"
                            icon={icon}
                            text={text}
                            className={tooltip ? 'card-item-disabled' : ''}
                        />
                        {tooltip && (
                            <Tooltip
                                position="bottom-center"
                                toggleOn="click"
                                style={{ maxWidth: '152px' }}
                                content={tooltip}
                                className="flex rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 border border-all border-thin border-light-100 z-5"
                            >
                                <Button title="Mostrar tooltip" variant="link">
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
    handleOpen: propTypes.func.isRequired
};
