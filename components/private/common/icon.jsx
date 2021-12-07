import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import Link from './link';
import MapperIcon from './icons/mapperIcon';

const Icon = ({
    name,
    href,
    title,
    target,
    extraClass,
    rel,
    size,
    children,
    negative,
    ...r
}) => {
    const className = `com-icon${name ? ` icon-${name}` : ``}${
        negative ? ` --negative` : ``
    }${href ? `` : ` ${extraClass || ``}`} ${size || ``}`;

    return (
        <>
            {href ? (
                <Link
                    href={href}
                    title={title}
                    target={target}
                    mod={extraClass}
                    rel={rel}
                >
                    <i className={className}>
                        <MapperIcon name={name} {...r} />
                    </i>
                    {children}
                </Link>
            ) : (
                <i className={className}>
                    <MapperIcon name={name} {...r} />
                </i>
            )}
        </>
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    extraClass: PropTypes.string,
    rel: PropTypes.string,
    size: PropTypes.string,
    negative: PropTypes.bool
};

export default Icon;
