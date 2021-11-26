import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-icon.css';
import Link from '../common/link';

const Icon = ({ name, href, title, target, mod, rel, size, children }) => {
    //const className = `com-icon${name ? ` icon-${name}` : ``}${` ${mod}` || ``}${` ${size}` || ``}`;
    const className = `com-icon${name ? ` --${name}` : ``}${
        href ? `` : ` ${mod || ``}`
    } ${size || ``}`;

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
                    <i className={className}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 13V15H11V13H9ZM9 5V11H11V5H9Z"
                                fill="red"
                            />
                        </svg>
                    </i>
                    {children}
                </Link>
            ) : (
                <i className={className}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 13V15H11V13H9ZM9 5V11H11V5H9Z"
                            fill="red"
                        />
                    </svg>
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
    mod: PropTypes.string,
    rel: PropTypes.string,
    size: PropTypes.string
};

export default Icon;
