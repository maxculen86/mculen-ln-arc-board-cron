import React from 'react';
import { Breadcrumb as CommonBreadcrumb } from '@ln/ds-common-breadcrumb';

/**
 * @typedef {import('@ln/ds-common-breadcrumb').BreadcrumbProps} BreadcrumbProps
 */
/**
 * @param {string} props.extraPropFacade
 * @param {BreadcrumbProps} props
 * @returns {React.ReactElement}
 */
function Breadcrumb({ ...props }) {
    return <CommonBreadcrumb {...props} />;
}

export default Breadcrumb;

Breadcrumb.List = CommonBreadcrumb.List;
Breadcrumb.Separator = CommonBreadcrumb.Separator;
Breadcrumb.Item = CommonBreadcrumb.Item;
Breadcrumb.Link = CommonBreadcrumb.Link;
