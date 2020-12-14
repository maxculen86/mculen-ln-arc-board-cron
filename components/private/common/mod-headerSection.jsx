import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-headersection.css';
import ComLine from '../LN/common/footer/com-line';
import ComTitle from './com-title';
import ComLogo from './com-logo';

const ModheaderSection = props => {
    const { title, line, size, sizeLogo, logo, classCondition, link } = props;
    if (!title && !logo) return null;
    return (
        <section className={`mod-headersection ${classCondition || ''}`}>
            {title ? (
                <ComTitle size={size} content={title} link={link} />
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

ModheaderSection.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    logo: PropTypes.string,
    classCondition: PropTypes.string,
    sizeLogo: PropTypes.string,
    line: PropTypes.boolean,
    size: PropTypes.string
};

ModheaderSection.defaultProps = {
    link: null,
    title: null,
    logo: null,
    classCondition: '',
    sizeLogo: null,
    line: true,
    size: '--l'
};

export default ModheaderSection;
