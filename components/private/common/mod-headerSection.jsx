import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-headersection.css';
import ComLine from '../LN/common/footer/com-line';
import ComTitle from './com-title';
import ComLogo from './com-logo';

const ModheaderSection = props => {
    const { title, line, size, sizeLogo, logo, classCondition } = props;
    if (!title && !logo) {
        null;
    }
    return (
        <section className={`mod-headersection ${classCondition || ''}`}>
            {title ? (
                <ComTitle size={size} content={title} />
            ) : (
                <ComLogo
                    size={sizeLogo}
                    logoName={logo}
                    classCondition={classCondition}
                />
            )}
            {line ? <ComLine /> : ''}
        </section>
    );
};

export default ModheaderSection;
