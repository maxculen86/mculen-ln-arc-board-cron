import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';

export function ContentWrapper({ ...props }) {
    return <Accordion.Body className="flex flex-column gap-24" {...props} />;
}
