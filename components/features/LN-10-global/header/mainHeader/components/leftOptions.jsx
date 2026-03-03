/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import classNames from 'classnames';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { useHeaderContext } from '../../context';
import { sectionsCallback } from '../_helper';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

import GetQuerylyScript from '../../../../../private/common/scriptManager/GetQuerylyScript';

export function LeftOptions() {
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
            <label
                htmlFor="queryly_toggle"
                title="Ir al buscador"
                className={customButtonsClassName}
                onClick={() =>
                    addEventToDataLayerV2({
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
}
