import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';

export function MainWrapper({ visible, ...props }) {
    return (
        <Accordion
            className="border border-all border-light-100 border-secondary-positive__hover border-thin rounded-4 px-16 px-24_md px-32_lg py-12 py-16_lg rounded-4 mt-24"
            visible={visible}
            {...props}
        />
    );
}
