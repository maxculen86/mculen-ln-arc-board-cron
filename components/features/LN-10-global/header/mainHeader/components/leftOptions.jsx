import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { useHeaderContext } from '../../context';
import { sectionsCallback } from '../_helper';
import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';

import classNames from 'classnames';
import GetQuerylyScript from '../../../../../private/common/scriptManager/GetQuerylyScript';

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
                    <IconSprite name="menu" critical />
                </Icon>
                <Text className="text-14">SECCIONES</Text>
            </Button>

            <label
                htmlFor="queryly_toggle"
                title="Ir al buscador"
                className={customButtonsClassName}
                onClick={() =>
                    addEventToDataLayer({
                        event: 'e_linkclick',
                        action: 'header_logo',
                        category: 'home_ln10',
                        label: 'search'
                    })
                }
            >
                <Icon size={24} color="inherit">
                    <IconSprite name="search" critical />
                </Icon>
            </label>

            <GetQuerylyScript />
        </>
    );
};
