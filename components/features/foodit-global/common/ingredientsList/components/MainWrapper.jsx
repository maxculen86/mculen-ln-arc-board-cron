import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';

export const MainWrapper = ({ isMobile, visible, ...props }) => {
    if (isMobile) return <Accordion visible={visible} {...props} />;

    return <div className="flex flex-column gap-24" {...props} />;
};
