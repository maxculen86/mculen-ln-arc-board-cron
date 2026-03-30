import React, { useRef } from 'react';
import { Tooltip } from '@ln/common-ui-tooltip';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/common-ui-button';
import IconSprite from '../../../../../private-global/common/iconSprite/IconSprite';

function BreadcrumbTooltip() {
    const containerRef = useRef();

    return (
        <div className="relative" ref={containerRef}>
            <Tooltip
                role="tooltip"
                toggleOn="click"
                position="bottom-right"
                style={{ maxWidth: '248px' }}
                content={
                    <span className="text-12">
                        Esta receta la pueden consumir los celíacos si se
                        controla que todos los ingredientes envasados que se
                        vayan a utilizar tengan el sello Sin tacc.
                    </span>
                }
                className="flex rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 border border-all border-thin border-light-100 z-5"
            >
                <Button className="flex ai-center" title="Mostrar tooltip">
                    <Icon size={24}>
                        <IconSprite
                            name="gluten-free"
                            className="text-light-800"
                        />
                    </Icon>
                </Button>
            </Tooltip>
        </div>
    );
}

export default BreadcrumbTooltip;
