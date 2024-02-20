import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Menu, Search } from '@ln/contenidos-ui-assets';
import { useHeaderContext } from '../../context';
import { sectionsCallback } from '../_helper';

import classNames from 'classnames';
import { setEventSearch } from '../../../../../private/common/utils/eventsHelper';

export const LeftOptions = () => {
    const { toggleDesplegable, negative } = useHeaderContext();

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
                onClick={e => sectionsCallback(e, toggleDesplegable)}
                onAuxClick={e => sectionsCallback(e, toggleDesplegable)}
            >
                <Icon size={24} color="inherit">
                    <Menu />
                </Icon>
                <Text className="text-14">SECCIONES</Text>
            </Button>
            <label
                onClick={setEventSearch}
                id="querylyButton"
                htmlFor="queryly_toggle"
                title="Ir al buscador"
                className={customButtonsClassName}
            >
                <Icon size={24} color="inherit">
                    <Search />
                </Icon>
            </label>
        </>
    );
};
