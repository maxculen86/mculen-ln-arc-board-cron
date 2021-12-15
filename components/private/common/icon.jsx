import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import Link from './link';
import setIconClassName from './utils/setIconClassName';

const Icon = ({ name, href, title, target, mod, rel, size, children }) => {
    const className = setIconClassName({ name, href, mod, size });

    return (
        <>
            {href ? (
                <Link
                    href={href}
                    title={title}
                    target={target}
                    mod={mod}
                    rel={rel}
                >
                    <i className={className} />
                    {children}
                </Link>
            ) : (
                <i className={className} />
            )}
        </>
    );
};

Icon.defaultProps = {
    href: '',
    target: '',
    title: '',
    mod: '',
    rel: '',
    size: '',
    children: ''
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    mod: PropTypes.string,
    rel: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.string
};

export default Icon;
