import React from 'react';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import useApiGuard from '../../recetario/hooks/useApiGuard';

export function DropdownCard({ bookmarkId, onDelete, onMove }) {
    const { guardedExecute } = useApiGuard();

    const dropdownItems = [
        {
            id: `move-${bookmarkId}`,
            icon: <IconSprite name="move" />,
            onClick: e => {
                e.stopPropagation();
                e.preventDefault();

                if (!onMove) return;

                guardedExecute(onMove);
            },
            text: 'Mover',
            variant: 'default',
            type: 'button'
        },
        {
            id: `delete-${bookmarkId}`,
            icon: <IconSprite name="delete" />,
            onClick: e => {
                e.stopPropagation();
                e.preventDefault();

                if (!onDelete) return;

                guardedExecute(onDelete);
            },
            text: 'Eliminar',
            variant: 'danger',
            type: 'button'
        }
    ];

    return (
        <Dropdown hideArrow className="ml-auto ml-0_md" toggleOn="click">
            <Dropdown.Toggle
                data-testid="dropdown-toggle"
                className="text-light-800 text-accent-lechuga__hover"
            >
                <IconSprite name="more-vertical" />
            </Dropdown.Toggle>
            <Dropdown.Menu
                alignment="right"
                className="bg-light-1 p-24 rounded-4 shadow-center"
            >
                <ul className="w-202">
                    {dropdownItems.map(
                        ({ id, icon, onClick, text, variant, type }) => (
                            <Itemcard
                                key={id}
                                icon={icon}
                                onClick={onClick}
                                text={text}
                                variant={variant}
                                type={type}
                            />
                        )
                    )}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}
