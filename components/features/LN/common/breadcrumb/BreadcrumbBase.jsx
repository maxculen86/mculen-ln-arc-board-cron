import React from 'react';
import renderBreadcrumbItems from './helpers/renderBreadcrumbItems';

// TODO para front: realizar ajustes de estilos segun diseño
function BreadcrumbBase(props) {
    const { sections, dataSection, lastLinked, host } = props;
    const extraOpts = {};

    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }

    return (
        <nav className="com-breadcrumb --no-app">
            {renderBreadcrumbItems({
                sections,
                lastLinked,
                extraOpts,
                host
            })}
        </nav>
    );
}

export default BreadcrumbBase;
