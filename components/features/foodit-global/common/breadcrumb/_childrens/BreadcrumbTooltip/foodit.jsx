import React, { useRef } from 'react';
import { Tooltip, useTooltip } from '@ln/common-ui-tooltip';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/common-ui-button';
import { useOnClickOutside } from '@ln/hooks';

const BreadcrumbTooltip = () => {
    const { tooltipVisible, openTooltip, closeTooltip } = useTooltip();
    const containerRef = useRef();
    useOnClickOutside(containerRef, closeTooltip);

    return (
        <div className="relative flex" ref={containerRef}>
            <Button title="Mostrar tooltip" onClick={openTooltip}>
                {/* TODO: Este icono esta hardcodeado mientras definen el icono correcto */}
                <Icon size={16} color="gray">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M7.99998 14.6666C4.31798 14.6666 1.33331 11.682 1.33331 7.99998C1.33331 4.31798 4.31798 1.33331 7.99998 1.33331C11.682 1.33331 14.6666 4.31798 14.6666 7.99998C14.6666 11.682 11.682 14.6666 7.99998 14.6666ZM7.99998 13.3333C9.41447 13.3333 10.771 12.7714 11.7712 11.7712C12.7714 10.771 13.3333 9.41447 13.3333 7.99998C13.3333 6.58549 12.7714 5.22894 11.7712 4.22874C10.771 3.22855 9.41447 2.66665 7.99998 2.66665C6.58549 2.66665 5.22894 3.22855 4.22874 4.22874C3.22855 5.22894 2.66665 6.58549 2.66665 7.99998C2.66665 9.41447 3.22855 10.771 4.22874 11.7712C5.22894 12.7714 6.58549 13.3333 7.99998 13.3333ZM7.33331 5.33331C7.33331 4.96512 7.63179 4.66665 7.99998 4.66665C8.36817 4.66665 8.66665 4.96512 8.66665 5.33331C8.66665 5.7015 8.36817 5.99998 7.99998 5.99998C7.63179 5.99998 7.33331 5.7015 7.33331 5.33331ZM7.33331 7.99998C7.33331 7.63179 7.63179 7.33331 7.99998 7.33331C8.36817 7.33331 8.66665 7.63179 8.66665 7.99998V10.6666C8.66665 11.0348 8.36817 11.3333 7.99998 11.3333C7.63179 11.3333 7.33331 11.0348 7.33331 10.6666V7.99998Z"
                            fill="#B3B3B3"
                        />
                    </svg>
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
