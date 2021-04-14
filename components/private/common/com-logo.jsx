import React from 'react';
import PropTypes from 'fusion:prop-types';
import Link from '../common/com-link';

import '../../../resources/dist/css/ln/components/com-logo.css';

const ComLogo = props => {
    const {
        logoName,
        color,
        size,
        classCondition,
        href,
        target,
        title
    } = props;
    const className = `com-logo${logoName ? ` logo-${logoName}` : ``}${
        classCondition ? ` ${classCondition}` : ``
    }${color ? ` --color` : ``}${size ? ` ${size}` : ``}`;

    if (!logoName) return null;
    return (
        <>
            {href ? (
                <Link link={href} title={title} target={target}>
                    <i className={className} />
                </Link>
            ) : (
                <i className={className} />
            )}
        </>

        // <i
        //     className={`com-logo logo-${
        //         logoName ? logoName : ''
        //     } ${classCondition || ''} ${color ? '--color' : ''} ${size || ''}`}
        // />
    );
};

ComLogo.propTypes = {
    logoName: PropTypes.string.isRequired,
    color: PropTypes.bool.isRequired,
    size: PropTypes.string
};

export default ComLogo;
