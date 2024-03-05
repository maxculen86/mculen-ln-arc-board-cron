import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';

export const ContentWrapper = ({ isMobile, ...props }) => {
    if (isMobile)
        return (
            <Accordion.Body className="flex flex-column gap-24" {...props} />
        );
    return <div className="flex flex-column gap-24" {...props} />;
};
