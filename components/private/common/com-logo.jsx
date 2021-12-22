import React from 'react';
import PropTypes from 'prop-types';
import LogoComponent from '../common/logos/LogoComponent';

import '../../../resources/dist/css/ln/components/com-logo.css';

const ComLogo = props => {
    const { logoName, size, classCondition, href, title } = props;

    if (!logoName) return null;
    return (
        <>
            <LogoComponent
                name={logoName}
                alt={title}
                size={size}
                href={href || title}
                classCondition={classCondition}
            />
        </>
    );
};

ComLogo.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string,
    logoName: PropTypes.string,
    classCondition: PropTypes.string,
    size: PropTypes.string
};

ComLogo.defaultProps = {
    logoName: '',
    title: '',
    href: '',
    size: ''
};
export default ComLogo;
