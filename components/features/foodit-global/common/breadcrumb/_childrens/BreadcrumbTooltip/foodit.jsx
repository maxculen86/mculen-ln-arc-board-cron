import React, { useRef } from 'react';
import { Tooltip, useTooltip } from '@ln/common-ui-tooltip';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/common-ui-button';
import { useOnClickOutside } from '@ln/hooks';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';

const BreadcrumbTooltip = () => {
    const { tooltipVisible, openTooltip, closeTooltip } = useTooltip();
    const containerRef = useRef();
    useOnClickOutside(containerRef, closeTooltip);

    return (
        <div className="relative flex" ref={containerRef}>
            <Button title="Mostrar tooltip" onClick={openTooltip}>
                <Icon size={16}>
                    <IconSprite name="info" fill="#B3B3B3" />
                </Icon>
            </Button>
            <Tooltip
                visible={tooltipVisible}
                className="rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 text-12 border border-all border-thin border-light-100 z-5 w-max max-w-248"
            >
                Esta receta la pueden consumir los celíacos si se controla que
                todos los ingredientes envasados que se vayan a utilizar tengan
                el sello Sin tacc.
            </Tooltip>
        </div>
    );
};

export default BreadcrumbTooltip;
