import React from 'react';
import PropTypes from 'prop-types';
import LogoComponent from '../common/logos/LogoComponent';

import '../../../resources/dist/css/ln/components/com-logo.css';
import ComLink from './com-link';

const ComLogo = props => {
    const { logoName, size, classCondition, href, title } = props;

    if (!logoName) return null;
    return (
        <>
            {href ? (
                <ComLink link={href} alt={title}>
                    <LogoComponent
                        name={logoName}
                        size={size}
                        classCondition={classCondition}
                    />
                </ComLink>
            ) : (
                <LogoComponent
                    name={logoName}
                    size={size}
                    classCondition={classCondition}
                />
            )}
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
    classCondition: '',
    logoName: '',
    title: '',
    href: '',
    size: ''
};
export default ComLogo;
