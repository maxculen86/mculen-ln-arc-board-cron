import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import Link from '../common/link';

const Icon = ({ name, href, title, target, mod, size }) => {
    const className = `com-icon${name ? ` icon-${name}` : ``}${` ${mod}` ||
        ``}${` ${size}` || ``}`;

    return (
        <>
            {href ? (
                <Link href={href} title={title} target={target}>
                    <i className={className} />
                </Link>
            ) : (
                <i className={className} />
            )}
        </>
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    mod: PropTypes.string,
    size: PropTypes.string
};

export default Icon;
