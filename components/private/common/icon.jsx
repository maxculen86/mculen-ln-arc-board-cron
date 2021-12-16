/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import Link from './link';
import setIconClassName from './utils/setIconClassName';
import MapperIcon from './icons/mapperIcon';

const Icon = ({
    name,
    href,
    title,
    target,
    rel,
    size,
    children,
    extraClass,
    negative,
    ...r
}) => {
    const className = setIconClassName({
        name,
        href,
        extraClass,
        negative,
        size
    });

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

Icon.defaultProps = {
    href: '',
    target: '',
    title: '',
    rel: '',
    size: '',
    children: '',
    extraClass: '',
    negative: false
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    extraClass: PropTypes.string,
    rel: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.string,
    negative: PropTypes.bool
};

export default Icon;
