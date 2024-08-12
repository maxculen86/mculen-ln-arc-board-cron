import React from 'react';
import { useTooltip } from '../hooks/useTooltip';
import { Header } from './header';
import { Text } from '@ln/common-ui-text';
import { Disclaimer } from './disclaimer';
import classNames from 'classnames';

export const Tooltip = ({ glossaryData = [] }) => {
    const { tooltipRef, show, key, value, tooltipLocation } = useTooltip(
        glossaryData
    );
    const classnames = classNames(
        'tooltip-glossary w-250 border border-thin border-all border-neutral-light-100 shadow-down-xs rounded-4 bg-white p-12',
        show ? 'fixed z-1 flex flex-column gap-8' : 'none'
    );
    const { left, top } = tooltipLocation;

    return (
        <div
            className={classnames}
            role="tooltip"
            style={{
                left,
                top,
                zIndex: 10000
            }}
            ref={tooltipRef}
        >
            <Header keyGlossary={key} />
            <Text as="p" className="text-16">
                {value}
            </Text>
            <Disclaimer />
        </div>
    );
};

export default Tooltip;
