import React from 'react';
import PropTypes from 'fusion:prop-types';

import Link from './com-link';

import '../../../resources/dist/css/ln/modules/mod-list.css';

const List = ({ children, order, inline, mod, size }) => {
    const CustomTag = order ? 'ol' : 'ul';
    const className = `mod-list${order ? ` --ordered` : ''}${
        inline ? ` --inline` : ''
    }${mod ? ` ${mod}` : ''}${size ? ` ${size}` : ''}`;

    return (
        <CustomTag className={className}>
            {children.map((item, index) => (
                <li key={index}>
                    {item.href ? (
                        <Link
                            textname={item.text}
                            title={item.text}
                            link={item.href}
                            target={item.target}
                        />
                    ) : (
                        item.text
                    )}
                </li>
            ))}
        </CustomTag>
    );
};

List.propTypes = {
    children: PropTypes.element,
    order: PropTypes.bool,
    inline: PropTypes.bool,
    mod: PropTypes.string,
    size: PropTypes.string
};

export default List;
