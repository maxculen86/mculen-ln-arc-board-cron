import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import classNames from 'classnames';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { useHeaderContext } from '../../context';
import { sectionsCallback } from '../_helper';
import InputSearch from './SearchLN';

export function LeftOptions({ isOpen, setIsOpen }) {
    const { negative } = useHeaderContext();

    const customButtonsClassName = classNames(
        'button ln-button rounded-4 p-4',
        negative
            ? 'text-neutral-dark-999'
            : 'text-light-700 bg-secondary__hover'
    );

    return (
        <>
            <Button
                title="Secciones"
                variant="custom"
                size="inherit"
                className={customButtonsClassName}
                onClick={sectionsCallback}
                onAuxClick={sectionsCallback}
            >
                <Icon size={24} color="inherit">
                    <IconSprite name="menu" critical />
                </Icon>
                <Text className="text-14">SECCIONES</Text>
            </Button>
            <InputSearch isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}
