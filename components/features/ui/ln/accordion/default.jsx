import React from 'react';
import { Accordion as CommonAccordion } from '@ln/ds-common-accordion';
import { useAppContext } from 'fusion:context';
import generateIconPath from '../icon/helpers';

/**
 * @typedef {import('@ln/ds-common-accordion').AccordionRootProps} AccordionProps
 */

/**
 * @param {AccordionProps} props
 * @returns {React.ReactElement}
 */
function Accordion({ ...props }) {
    return <CommonAccordion {...props} />;
}

function AccordionIcon({ type = 'default', path, ...props }) {
    const { contextPath, deployment } = useAppContext();

    const iconPath =
        path ||
        generateIconPath({
            contextPath,
            deployment,
            type
        });

    return <CommonAccordion.Icon {...props} path={iconPath} />;
}

export default Accordion;

Accordion.Item = CommonAccordion.Item;
Accordion.Header = CommonAccordion.Header;
Accordion.Content = CommonAccordion.Content;
Accordion.Icon = AccordionIcon;
